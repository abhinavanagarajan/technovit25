"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LaunchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [authStatus, setAuthStatus] = useState("validating");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setAuthStatus("unauthorized");
      router.push("/");
      return;
    }

    const validateToken = async () => {
      try {
        const response = await fetch("/api/validate-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          setAuthStatus("authorized"); // Token is valid, allow access
        } else {
          setAuthStatus("unauthorized");
          router.push("/"); // Token is invalid, redirect
        }
      } catch (error) {
        setAuthStatus("unauthorized");
        router.push("/");
      }
    };

    validateToken();
  }, [router, searchParams]);

  const handleLaunch = async () => {
    setIsLoading(true);
    setMessage("");
    const token = searchParams.get("token");

    try {
      const response = await fetch("/api/trigger-launch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("🚀 SUCCESS! technoVIT is now LIVE!");
      } else {
        throw new Error(data.error || "Something went wrong.");
      }
    } catch (error: any) {
      setMessage(`Launch Failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Render content based on authorization status
  if (authStatus !== "authorized") {
    // Show a loading/validating message while checking or redirecting
    return (
      <div
        style={
          {
            /* ... your loading styles ... */
          }
        }
      >
        <p>Validating Access...</p>
      </div>
    );
  }

  // If authorized, show the actual launch page content
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#000",
        color: "white",
      }}
    >
      <h1>technoVIT '25 Grand Launch</h1>
      <button
        onClick={handleLaunch}
        disabled={isLoading}
        style={{
          padding: "20px 40px",
          fontSize: "2rem",
          cursor: "pointer",
          background: "crimson",
          color: "white",
          border: "none",
          borderRadius: "10px",
        }}
      >
        {isLoading ? "Launching..." : "LAUNCH NOW"}
      </button>
      {message && (
        <p style={{ marginTop: "20px", fontSize: "1.5rem" }}>{message}</p>
      )}
    </div>
  );
}
