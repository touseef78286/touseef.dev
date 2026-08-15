import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowUpRight, IconGithub, IconLinkedIn, IconMail } from "@/components/ui/icons";

function hasLink(value?: string) {
  return !!value && !value.includes("[owner:");
}

export function Contact() {
  const email = siteConfig.links.email;

  return (
    <section id="contact" className="relative border-t border-line-soft">
      <div
        aria-hidden
        className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]"
      />
      <Container className="relative py-24 sm:py-32">
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-ok/25 bg-ok/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ok">
              <span aria-hidden className="pulse-dot h-1.5 w-1.5 rounded-full bg-ok" />
              {siteConfig.availability.label}
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Have a system worth building?{" "}
              <span className="text-accent">Send a signal.</span>
            </h2>
            <p className="max-w-md text-pretty text-base leading-relaxed text-dim sm:text-lg">
              Open to projects where intelligent systems meet real problems —
              agents, automation, tooling, or something we should design from
              scratch.
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${email}?subject=Signal%20from%20portfolio%20%E2%80%94%20let's%20build%20a%20system`}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-mono text-sm font-medium text-[#03201b] shadow-[0_0_0_1px_rgba(94,234,212,0.35),0_8px_24px_-8px_rgba(94,234,212,0.4)] transition-colors hover:bg-accent/90"
              >
                <IconMail className="h-4 w-4" aria-hidden />
                {email}
              </a>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              {hasLink(siteConfig.links.github) ? (
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 font-mono text-[13px] text-dim transition-colors hover:border-accent/40 hover:text-foreground"
                >
                  <IconGithub className="h-4 w-4" /> GitHub
                  <IconArrowUpRight className="h-3 w-3 text-mute" />
                </a>
              ) : null}
              {hasLink(siteConfig.links.linkedin) ? (
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 font-mono text-[13px] text-dim transition-colors hover:border-accent/40 hover:text-foreground"
                >
                  <IconLinkedIn className="h-4 w-4" /> LinkedIn
                  <IconArrowUpRight className="h-3 w-3 text-mute" />
                </a>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}