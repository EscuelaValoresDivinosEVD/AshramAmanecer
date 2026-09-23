import { eventos, eventosSample } from "@/data/eventos";
import TLink from "./TLink";

export default function EventList() {
  return (
    <div className="events" data-reveal="stagger">
      {eventos.map((e) => (
        <TLink key={e.slug} href={e.href} className="event-row">
          <span className="t-cond">{e.date}</span>
          <div>
            <h3 className="t-italic">
              {e.title} {eventosSample && <span className="sample-tag">Ejemplo</span>}
            </h3>
            <p>{e.text}</p>
          </div>
          <span className="t-caps">{e.duration} →</span>
        </TLink>
      ))}
    </div>
  );
}
