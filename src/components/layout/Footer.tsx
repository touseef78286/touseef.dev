import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { IconArrowUpRight, IconGithub, IconLinkedIn, IconX } from "@/components/ui/icons";

export function Footer() {
  const hasGithub = !siteConfig.links.github?.includes("[owner:github]");
  const hasLinkedin = !siteConfig.links.linkedin?.includes("[owner:linkedin]");
  const hasX = false;

  return (
    <footer className="relative border-t border-line bg-surface-deep">
      <Container className="flex flex-col gap-8 py-12 sm:py-16">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="font-mono text-sm text-foreground">
              <span className="text-mute">~/</span>
              {siteConfig.handle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-dim">
              Systems, agents & automation — built to be observed, measured, and
              pushed further.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
                Index
              </p>
              <ul className="space-y-2.5">
                {[
                  { label: "Approach", href: "/#approach" },
                  { label: "Systems", href: "/#systems" },
                  { label: "Capabilities", href: "/#capabilities" },
                  { label: "Lab", href: "/#lab" },
                  { label: "Contact", href: "/#contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-mono text-[13px] text-dim transition-colors hover:text-accent"
                    >
                      <span className="text-mute">/</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
                Signals
              </p>
              <ul className="space-y-2.5">
                {hasGithub ? (
                  <li>
                    <a
                      href={siteConfig.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[13px] text-dim transition-colors hover:text-accent"
                    >
                      <IconGithub className="h-4 w-4" /> GitHub
                      <IconArrowUpRight className="h-3 w-3 text-mute" />
                    </a>
                  </li>
                ) : null}
                {hasLinkedin ? (
                  <li>
                    <a
                      href={siteConfig.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[13px] text-dim transition-colors hover:text-accent"
                    >
                      <IconLinkedIn className="h-4 w-4" /> LinkedIn
                      <IconArrowUpRight className="h-3 w-3 text-mute" />
                    </a>
                  </li>
                ) : null}
                {hasX ? (
                  <li>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[13px] text-dim transition-colors hover:text-accent"
                    >
                      <IconX className="h-4 w-4" /> X / Twitter
                    </a>
                  </li>
                ) : null}
                <li>
                  <a
                    href={`mailto:${siteConfig.links.email}`}
                    className="inline-flex items-center gap-1.5 font-mono text-[13px] text-dim transition-colors hover:text-accent"
                  >
                    <span className="text-mute">@</span> Email
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-line-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] tracking-wide text-mute">
            © {new Date().getFullYear()} {siteConfig.handle.replace(/^@/, "")} · Built as a system, not a template.
          </p>
          <p className="font-mono text-[11px] tracking-wide text-mute">
            <span className="text-ok">●</span> all_agents_operational
          </p>
        </div>
      </Container>
    </footer>
  );
}