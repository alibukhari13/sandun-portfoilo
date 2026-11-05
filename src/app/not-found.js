import Link from "next/link";

export default function NotFound() {
  return (
    <main className="unavailable-page">
      <p className="section-kicker">Sandun Munasinghe</p>
      <h1>This page is unavailable</h1>
      <p>It is turned off or no longer on the site.</p>
      <Link className="button lime-button" href="/">
        Back to home
      </Link>
    </main>
  );
}
