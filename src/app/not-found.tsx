import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-[70vh] items-center justify-center px-5 pt-16">
      <div className="max-w-md text-center">
        <p className="font-mono text-sm text-accent">404 · route not found</p>
        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Signal lost in the network.
        </h1>
        <p className="mt-4 text-pretty text-dim">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-mono text-sm font-medium text-[#03201b] transition-colors hover:bg-accent/90"
        >
          <span aria-hidden>←</span> back to base
        </Link>
      </div>
    </main>
  );
}