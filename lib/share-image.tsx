import { ImageResponse } from "next/og";

export const shareSize = { width: 1200, height: 630 };
export const shareContentType = "image/png";

export function shareImage(title: string, subtitle: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#f3eee4",
          color: "#1c3d2e",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 28, height: 28, borderRadius: 14, background: "#9a2e28" }} />
          <div style={{ fontSize: 28 }}>Robin & Radish</div>
        </div>
        <div style={{ fontSize: 68, marginTop: 28, lineHeight: 1.05, maxWidth: 980 }}>{title}</div>
        <div style={{ fontSize: 32, marginTop: 24, color: "#3e5c4c", maxWidth: 900 }}>{subtitle}</div>
      </div>
    ),
    { ...shareSize },
  );
}
