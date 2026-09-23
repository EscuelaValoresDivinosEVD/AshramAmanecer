import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PlaceDetail from "@/components/PlaceDetail";
import { getPlace, places } from "@/data/places";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
// Identified buildings open their real /espacios/ page; only the rest need this provisional one.
export const generateStaticParams = () => places.filter((p) => !p.href).map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const place = getPlace((await params).slug);
  return { title: place ? `${place.name} · Ashram Caminantes del Amanecer` : "Ashram Caminantes del Amanecer" };
}

export default async function PlacePage({ params }: Props) {
  const place = getPlace((await params).slug);
  if (!place) notFound();
  return <PlaceDetail place={place} />;
}
