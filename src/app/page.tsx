import { Nav } from "@/components/landing/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main
        className="min-h-screen"
        style={{ background: "var(--bg)", color: "var(--fg)" }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            textTransform: "uppercase" as const,
            letterSpacing: "0.08em",
            padding: 32,
            color: "var(--fg-mute)",
          }}
        >
          Kodus / Setup OK
        </p>
      </main>
    </>
  );
}
