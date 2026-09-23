import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Aarush Gupta — Freelance Developer & AI Builder",
  description:
    "Thoughtful websites, apps, and AI automations. Aarush Gupta is a freelance developer turning ambitious ideas into useful digital experiences, with fair pricing and a fast, collaborative process.",
  openGraph: {
    title: "Aarush Gupta — Ideas made real.",
    description:
      "Freelance web & app development. AI & automation. Let’s build something that works beautifully.",
    type: "website",
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/json"
          id="design-contract"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              thesis:
                "A working digital sculpture studio: playful engineering presented with editorial clarity.",
              world:
                "Ivory paper, near-black Archivo typography, signal orange lacquer and polished chrome; open layouts and fine rules.",
              story:
                "Meet the builder, explore real client work, understand the services, start a project.",
              firstViewport:
                "Oversized left-aligned promise and direct work CTA; right-side live 3D knot with pointer interaction, a quiet availability navigation and material controls.",
              form: "Sculpture studio, grounded candidate 5, seed 7383ee57. Code-first under user-delegated creative freedom.",
              finish:
                "unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
