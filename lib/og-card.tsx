import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { theme } from "@/data/theme";

export const ogSize = { width: 1200, height: 630 };

export async function renderOg(title: string, subtitle: string) {
  const [logo, air] = await Promise.all([
    readFile(path.join(process.cwd(), "public/murales/logo-scudo.png")),
    readFile(path.join(process.cwd(), "public/murales/dirigibile.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const airSrc = `data:image/png;base64,${air.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: theme.inchiostro,
          color: theme.fondo,
        }}
      >
        <div
          style={{
            width: 420,
            height: "100%",
            background: theme.fondo,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={airSrc} width={220} height={125} alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={210} height={318} alt="" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "56px 64px",
            flex: 1,
          }}
        >
          <div style={{ fontSize: 28, letterSpacing: 4, color: theme.tiffany }}>DOWN UNDER CAFÈ</div>
          <div style={{ fontSize: 58, lineHeight: 1.05, marginTop: 24 }}>{title}</div>
          <div style={{ fontSize: 28, marginTop: 28, color: theme.mutoChiaro }}>{subtitle}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
