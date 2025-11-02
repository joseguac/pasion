"use client";

import Image from "next/image";
import ClubScene from "./club/ClubScene";
import { useState, useEffect } from "react";

interface Show {
  id: number;
  venue: string;
  location: string;
  date: string;
  time: string;
  status: "upcoming" | "past";
}

function ContactDialog({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", phone: "", message: "" });
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
      onClick={onClose}
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
          onClick={onClose}
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

        <h2 style={{ color: "#ff0000", marginBottom: "10px", fontSize: "28px" }}>
          Déjanos Un Mensaje Aquí
        </h2>

        <p style={{ color: "#999", fontSize: "14px", marginBottom: "30px" }}>
          Si unos de los numeros no contestan o solo prefiere mandar mensaje por aqui deje su numero o otro tipo de informacion.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name*"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{
              width: "100%",
              padding: "15px",
              marginBottom: "20px",
              backgroundColor: "#0a0a0a",
              border: "1px solid #333",
              borderRadius: "8px",
              color: "#ffffff",
              fontSize: "16px",
              outline: "none"
            }}
          />

          <input
            type="tel"
            placeholder="Mobile*"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            style={{
              width: "100%",
              padding: "15px",
              marginBottom: "20px",
              backgroundColor: "#0a0a0a",
              border: "1px solid #333",
              borderRadius: "8px",
              color: "#ffffff",
              fontSize: "16px",
              outline: "none"
            }}
          />

          <textarea
            placeholder="Message*"
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={5}
            style={{
              width: "100%",
              padding: "15px",
              marginBottom: "20px",
              backgroundColor: "#0a0a0a",
              border: "1px solid #333",
              borderRadius: "8px",
              color: "#ffffff",
              fontSize: "16px",
              outline: "none",
              resize: "vertical"
            }}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: "#ff0000",
              border: "none",
              borderRadius: "8px",
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              opacity: isSubmitting ? 0.7 : 1
            }}
          >
            {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
          </button>

          {submitStatus === "success" && (
            <p style={{ color: "#00ff00", marginTop: "15px", textAlign: "center" }}>
              ¡Mensaje enviado con éxito!
            </p>
          )}

          {submitStatus === "error" && (
            <p style={{ color: "#ff0000", marginTop: "15px", textAlign: "center" }}>
              Error al enviar. Por favor intenta de nuevo.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default function Home() {
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showShows, setShowShows] = useState(false);
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/shows.json")
      .then((res) => res.json())
      .then((data) => {
        const now = new Date();
        const updatedShows = data.shows.map((show: Show) => {
          const showDate = new Date(show.date);
          const status = showDate >= now ? "upcoming" : "past";
          return { ...show, status };
        });
        setShows(updatedShows);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const upcomingShows = shows.filter((show) => show.status === "upcoming");
  const pastShows = shows
    .filter((show) => show.status === "past")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div style={{ minHeight: "100vh", width: "100vw", position: "relative", display: "flex", justifyContent: "center" }}>
      {/* Smoke background - fills entire screen */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" }}>
        <ClubScene />
      </div>
      
      {/* Content wrapper - mobile view container like Linktree */}
      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: "420px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "10vh",
        paddingBottom: "120px"
      }}>
        {/* Logo */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          pointerEvents: "none",
          width: "100%"
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

        {/* View Shows Button */}
        <button
          onClick={() => setShowShows(!showShows)}
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 0, 0, 0.2)",
            borderRadius: "12px",
            padding: "15px 30px",
            color: "#ff0000",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "20px",
            pointerEvents: "auto",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)"
          }}
        >
          {showShows ? "Hide Shows" : "View Upcoming Shows"}
        </button>

        {/* Shows Section */}
        <div style={{
          width: "100%",
          marginTop: "20px",
          maxHeight: showShows ? "5000px" : "0",
          overflow: "hidden",
          transition: "max-height 0.5s ease-in-out, opacity 0.3s ease-in-out",
          opacity: showShows ? 1 : 0,
          padding: "20px"
        }}>
          {loading ? (
            <p style={{ color: "#999", textAlign: "center" }}>Loading...</p>
          ) : (
            <>
              {/* Upcoming Shows */}
              {upcomingShows.length > 0 && (
                <div style={{ marginBottom: "30px" }}>
                  <h3 style={{ color: "#ff0000", marginBottom: "15px", fontSize: "20px" }}>
                    Upcoming Shows
                  </h3>
                  {upcomingShows.map((show) => (
                    <div
                      key={show.id}
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 0, 0, 0.2)",
                        borderRadius: "8px",
                        padding: "20px",
                        marginBottom: "15px"
                      }}
                    >
                      <h4 style={{ color: "#ffffff", marginBottom: "8px", fontSize: "18px" }}>
                        {show.venue}
                      </h4>
                      <p style={{ color: "#999", marginBottom: "5px", fontSize: "14px" }}>
                        📍 {show.location}
                      </p>
                      <p style={{ color: "#ff0000", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>
                        📅 {formatDate(show.date)}
                      </p>
                      <p style={{ color: "#999", fontSize: "14px" }}>
                        🕐 {show.time}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* No Upcoming Shows Message */}
              {upcomingShows.length === 0 && (
                <div style={{ marginBottom: "30px" }}>
                  <p style={{ color: "#999", marginBottom: "20px", textAlign: "center", fontSize: "16px" }}>
                    No upcoming shows right now — check out where we've played recently!
                  </p>
                </div>
              )}

              {/* Past Shows */}
              {pastShows.length > 0 && (
                <div>
                  <h3 style={{ color: "#ff0000", marginBottom: "15px", fontSize: "20px" }}>
                    Past Shows
                  </h3>
                  {pastShows.map((show) => (
                    <div
                      key={show.id}
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 0, 0, 0.2)",
                        borderRadius: "8px",
                        padding: "20px",
                        marginBottom: "15px",
                        opacity: 0.7
                      }}
                    >
                      <h4 style={{ color: "#ffffff", marginBottom: "8px", fontSize: "18px" }}>
                        {show.venue}
                      </h4>
                      <p style={{ color: "#999", marginBottom: "5px", fontSize: "14px" }}>
                        📍 {show.location}
                      </p>
                      <p style={{ color: "#999", marginBottom: "5px", fontSize: "14px" }}>
                        📅 {formatDate(show.date)}
                      </p>
                      <p style={{ color: "#999", fontSize: "14px" }}>
                        🕐 {show.time}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
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
            style={{
              cursor: "pointer",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 0, 0, 0.2)",
              borderRadius: "50%",
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)"
            }}
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
            style={{
              cursor: "pointer",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 0, 0, 0.2)",
              borderRadius: "50%",
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)"
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
            </svg>
          </a>

          {/* Contact Message */}
          <button
            onClick={() => setShowContactDialog(true)}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 0, 0, 0.2)",
              borderRadius: "50%",
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: 0,
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)"
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Contact Dialog */}
      {showContactDialog && (
        <ContactDialog onClose={() => setShowContactDialog(false)} />
      )}
    </div>
  );
}

