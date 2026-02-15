/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          background:
            "linear-gradient(115deg, #000 0%, #0b0b0c 45%, rgba(0,115,228,0.25) 100%)",
          color: "white",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "60px",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 16,
                background: "#0073e4",
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
                fontSize: 36,
              }}
            >
              Y
            </div>
            <div>
              <div style={{ fontSize: 40, fontWeight: 700 }}>YOM Car Care</div>
              <div style={{ fontSize: 18, opacity: 0.8 }}>Lubumbashi - Cash on Delivery</div>
            </div>
          </div>

          <div style={{ fontSize: 54, fontWeight: 700, lineHeight: 1.15 }}>
            Premium car care products for a{" "}
            <span style={{ color: "#79b7ff" }}>showroom shine</span>
          </div>

          <div style={{ display: "flex", gap: 20, fontSize: 22, opacity: 0.9 }}>
            <div>Exterior</div>
            <div>Interior</div>
            <div>Detailing</div>
            <div>Accessories</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
