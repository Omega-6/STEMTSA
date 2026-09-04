import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[86rem] px-4 py-24 sm:px-6">
      <p className="label text-signal">Error 404</p>
      <h1 className="display mt-3 text-[clamp(2.5rem,6vw,4rem)] uppercase">Page not found</h1>
      <p className="mt-4 max-w-xl text-ink-2">
        That link does not point anywhere on this site. It may have been an event page that was renamed between
        seasons.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">
          Home <span aria-hidden>→</span>
        </Link>
        <Link href="/compete" className="btn">
          Event directory
        </Link>
        <Link href="/hub" className="btn">
          TSA Hub
        </Link>
      </div>
    </div>
  );
}
