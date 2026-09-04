import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventDetail from "@/components/EventDetail";
import { events, getEvent } from "@/data/events";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return { title: "Event not found" };
  return { title: event.name, description: event.summary };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();
  return <EventDetail event={event} />;
}
