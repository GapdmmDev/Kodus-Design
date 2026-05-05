import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kodus — Sites que vendem";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          background: "#0a0a0a",
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 900,
            height: 900,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,91,31,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 14,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#6b665d",
            marginBottom: 28,
            display: "flex",
          }}
        >
          kodus.studio · São Paulo, BR
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 96,
            fontStyle: "italic",
            fontWeight: 400,
            color: "#f4f1ea",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ display: "flex" }}>
            Kodus
            <span style={{ color: "#ff5b1f" }}>.</span>
          </span>
          <span style={{ fontSize: 48, marginTop: 20, fontStyle: "normal", color: "#a8a39a" }}>
            Sites que vendem.
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
