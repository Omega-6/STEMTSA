import type { Announcement } from "@/lib/types";

/* Reads like a school paper: rule above, kicker, headline, byline, standfirst. */
export default function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  return (
    <article className="border-t border-ink py-6">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="label text-navy">{announcement.category}</span>
        <span className="label text-ink-3">{announcement.date}</span>
        {announcement.isTemplate && (
          <span className="label border border-signal px-1.5 py-0.5 text-signal">Example post</span>
        )}
      </div>
      <h3 className="display mt-2 text-2xl leading-tight sm:text-3xl">{announcement.title}</h3>
      <p className="label mt-2 text-ink-3">By {announcement.author}</p>
      <p className="mt-3 max-w-2xl text-ink-2">{announcement.excerpt}</p>
      {announcement.body.length > 0 && (
        <div className="mt-3 max-w-2xl space-y-2 text-sm text-ink-2">
          {announcement.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
    </article>
  );
}
