import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PlaceDetail from "@/components/PlaceDetail";
import { getPlace, places } from "@/data/places";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => places.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const place = getPlace((await params).slug);
  return { title: place ? `${place.name} · Ashram Amanecer` : "Ashram Amanecer" };
}

export default async function PlacePage({ params }: Props) {
  const place = getPlace((await params).slug);
  if (!place) notFound();
  return <PlaceDetail place={place} />;
}
