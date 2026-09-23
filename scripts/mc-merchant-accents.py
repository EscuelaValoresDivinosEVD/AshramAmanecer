# Adds Spanish accents (á é í ó ú ñ ü, ¿ ¡, dashes) to MC Merchant, which ships
# them mapped to unaccented letters. Input: mcmerchant.otf -> mcmerchant-es.woff2
# (copied to src/fonts/mc-merchant.woff2). Requires: pip install fonttools brotli
import math
from fontTools.ttLib import TTFont
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.t2CharStringPen import T2CharStringPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.filterPen import FilterPen
from fontTools.misc.transform import Transform

src = TTFont("mcmerchant.otf")
gs = src.getGlyphSet()
order = list(src.getGlyphOrder())
hmtx = dict(src["hmtx"].metrics)

def bounds(name, t=Transform()):
    bp = BoundsPen(gs); gs[name].draw(TransformPen(bp, t)); return bp.bounds

class Wave(FilterPen):
    """Bends a horizontal bar into a tilde-like wave."""
    def __init__(self, out, x0, w, amp):
        super().__init__(out); self.x0, self.w, self.amp = x0, w, amp
    def _t(self, p):
        x, y = p; return (x, y + self.amp * math.sin(2 * math.pi * (x - self.x0) / self.w))
    def moveTo(self, p): self._outPen.moveTo(self._t(p))
    def lineTo(self, p): self._outPen.lineTo(self._t(p))
    def curveTo(self, *ps): self._outPen.curveTo(*[self._t(p) for p in ps])
    def qCurveTo(self, *ps): self._outPen.qCurveTo(*[self._t(p) for p in ps])

def mark_drawer(kind):
    """Returns draw(pen, cx, top) placing the mark centred at cx above y=top."""
    if kind == "acute":
        def d(pen, cx, top):
            t0 = Transform().translate(-102, -721).rotate(math.radians(-38)).scale(0.62)
            b = bounds("quotesingle", t0)
            t = Transform().translate(cx - (b[0] + b[2]) / 2, top + 55 - b[1]).transform(t0)
            gs["quotesingle"].draw(TransformPen(pen, t))
        return d
    if kind == "dieresis":
        def d(pen, cx, top):
            for dx in (-120, 120):
                t = Transform().translate(cx + dx - 135 * 0.6 / 1, top + 60).scale(0.6).translate(-(38 + 232) / 2 + 135, -2)
                gs["period"].draw(TransformPen(pen, t))
        return d
    if kind == "tilde":
        def d(pen, cx, top):
            # hyphen bar (31..321 x 334..453), widened then waved
            t0 = Transform().translate(cx, top + 95).scale(1.25, 0.8).translate(-176, -393)
            b = bounds("hyphen", t0)
            gs["hyphen"].draw(TransformPen(Wave(pen, b[0], b[2] - b[0], 38), t0))
        return d

def compose(base, kind):
    p = T2CharStringPen(hmtx[base][0], gs)
    gs[base].draw(p)
    b = bounds(base)
    top = b[3]
    mark_drawer(kind)(p, (b[0] + b[2]) / 2, top)
    return p.getCharString(), hmtx[base]

def transformed(base, t, width=None):
    p = T2CharStringPen(width or hmtx[base][0], gs)
    gs[base].draw(TransformPen(p, t))
    return p.getCharString(), (width or hmtx[base][0], hmtx[base][1])

charstrings = {}
for g in order:
    p = T2CharStringPen(hmtx[g][0], gs); gs[g].draw(p); charstrings[g] = p.getCharString()

new = {}
acc = {"á": ("a", "acute"), "é": ("e", "acute"), "í": ("i", "acute"), "ó": ("o", "acute"), "ú": ("u", "acute"),
       "ñ": ("n", "tilde"), "ü": ("u", "dieresis"), "ï": ("i", "dieresis"), "ä": ("a", "dieresis"),
       "ë": ("e", "dieresis"), "ö": ("o", "dieresis"), "ã": ("a", "tilde"), "õ": ("o", "tilde")}
for ch, (base, kind) in acc.items():
    name = f"{base}{kind}"
    new[name] = compose(base, kind)
# inverted marks and dashes
qb = bounds("question"); eb = bounds("exclam")
new["questiondown"] = transformed("question", Transform().translate(qb[0] + qb[2], qb[1] + qb[3] - 150).scale(-1, -1))
new["exclamdown"] = transformed("exclam", Transform().translate(eb[0] + eb[2], eb[1] + eb[3] - 150).scale(-1, -1))
new["endash"] = transformed("hyphen", Transform().translate(10, 0).scale(1.6, 1), 540)
new["emdash"] = transformed("hyphen", Transform().translate(10, 0).scale(2.8, 1), 900)
new["periodcentered"] = transformed("period", Transform().translate(40, 300).scale(0.6), 230)

for name, (cs, m) in new.items():
    charstrings[name] = cs; hmtx[name] = m; order.append(name)

cmap = dict(src.getBestCmap())
for ch, (base, kind) in acc.items():
    cmap[ord(ch)] = f"{base}{kind}"; cmap[ord(ch.upper())] = f"{base}{kind}"
cmap.update({0xBF: "questiondown", 0xA1: "exclamdown", 0x2013: "endash", 0x2014: "emdash", 0xB7: "periodcentered"})

fb = FontBuilder(1000, isTTF=False)
fb.setupGlyphOrder(order)
fb.setupCharacterMap(cmap)
fb.setupCFF("MCMerchant-Regular", {"FullName": "MC Merchant"}, charstrings, {})
fb.setupHorizontalMetrics(hmtx)
hh = src["hhea"]; fb.setupHorizontalHeader(ascent=max(hh.ascent, 1050), descent=hh.descent)
fb.setupNameTable({"familyName": "MC Merchant", "styleName": "Regular"})
os2 = src["OS/2"]
fb.setupOS2(sTypoAscender=max(os2.sTypoAscender, 1050), sTypoDescender=os2.sTypoDescender, usWinAscent=max(os2.usWinAscent, 1100), usWinDescent=os2.usWinDescent, usWeightClass=400)
fb.setupPost()
f = fb.font
for tag in ("GPOS", "GSUB"):
    if tag in src: f[tag] = src[tag]
f.save("mcmerchant-es.otf")
f.flavor = "woff2"; f.save("mcmerchant-es.woff2")
print("ok", len(order))
