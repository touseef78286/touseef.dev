import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const alt = "Touseef Panjtan — AI Systems Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpengraphImage() {
  const { name, handle, tagline } = siteConfig;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#070a0f",
          color: "#e6edf3",
          padding: "64px 72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* grid backdrop */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -100,
            width: 480,
            height: 480,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(94,234,212,0.22), transparent 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            style={{
              fontSize: 20,
              color: "#5eead4",
              border: "1px solid rgba(94,234,212,0.4)",
              borderRadius: 8,
              padding: "8px 14px",
            }}
          >
            @{handle}
          </span>
          <span style={{ fontSize: 20, color: "#64707f" }}>· systems engineer</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.1 }}>
            {tagline}
          </span>
          <span style={{ fontSize: 28, color: "#9aa7b7" }}>
            AI agents · multi-agent systems · automation · infrastructure
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 22 }}>
          <span style={{ color: "#34d399" }}>● available for new projects</span>
          <span style={{ color: "#64707f" }}>{name}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}