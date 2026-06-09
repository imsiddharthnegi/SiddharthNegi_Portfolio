import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0c0c",
          borderRadius: 7,
        }}
      >
        <span
          style={{
            fontFamily: "sans-serif",
            fontSize: 14,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          SN
        </span>
      </div>
    ),
    { ...size }
  )
}
