"use client";

import Image from "next/image";
import ClubScene from "./club/ClubScene";
import { useState } from "react";

export default function Home() {
  const [showContactDialog, setShowContactDialog] = useState(false);

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <ClubScene />
      
      {/* Logo */}
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

      {/* Social Media Icons */}
      <div style={{
        position: "absolute",
        bottom: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "30px",
        alignItems: "center",
        pointerEvents: "auto"
      }}>
        {/* Instagram */}
        <a
          href="https://www.instagram.com/pasionespecial"
          target="_blank"
          rel="noopener noreferrer"
          style={{ cursor: "pointer" }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>

        {/* TikTok */}
        <a
          href="https://www.tiktok.com/@pasionespecial"
          target="_blank"
          rel="noopener noreferrer"
          style={{ cursor: "pointer" }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
          </svg>
        </a>

        {/* Contact Message */}
        <button
          onClick={() => setShowContactDialog(true)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>

      {/* Contact Dialog */}
      {showContactDialog && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            pointerEvents: "auto"
          }}
          onClick={() => setShowContactDialog(false)}
        >
          <div
            style={{
              backgroundColor: "#1a1a1a",
              padding: "40px",
              borderRadius: "12px",
              maxWidth: "500px",
              width: "90%",
              border: "2px solid #ff0000",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowContactDialog(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "transparent",
                border: "none",
                color: "#ffffff",
                fontSize: "24px",
                cursor: "pointer",
                padding: "5px 10px"
              }}
            >
              ×
            </button>
            
            <h2 style={{ color: "#ff0000", marginBottom: "20px", fontSize: "28px" }}>
              Para Contrataciones
            </h2>
            
            <div style={{ color: "#ffffff", fontSize: "18px", marginBottom: "30px" }}>
              <p style={{ marginBottom: "20px" }}>
                Llámanos al:
              </p>
              <a
                href="tel:714-720-8320"
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#ff0000",
                  textDecoration: "none"
                }}
              >
                714-720-8320
              </a>
            </div>
            
            <p style={{ color: "#999", fontSize: "14px" }}>
              O visita nuestro{" "}
              <a
                href="https://linktr.ee/pasionespecial"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ff0000" }}
              >
                Linktree
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

