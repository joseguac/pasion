"use client";

import Image from "next/image";
import ClubScene from "./club/ClubScene";

export default function Home() {
  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <ClubScene />
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "15vh",
        pointerEvents: "none"
      }}>
        <Image 
          src="/pasion.png" 
          alt="Pasion Especial" 
          width={1800}
          height={1800}
          style={{ maxWidth: "100%", height: "auto" }}
          priority
        />
      </div>
    </div>
  );
}

