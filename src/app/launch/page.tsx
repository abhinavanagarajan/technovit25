"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface ValidateResponse {
  valid: boolean;
  reason?: string;
}

interface LaunchResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

export default function LaunchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [authStatus, setAuthStatus] = useState<
    "validating" | "authorized" | "unauthorized"
  >("validating");
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

        const data: ValidateResponse = await response.json();

        if (response.ok && data.valid) {
          setAuthStatus("authorized");
        } else {
          console.error(
            "Token validation failed:",
            data.reason || "Unknown error"
          );
          setAuthStatus("unauthorized");
          router.push("/");
        }
      } catch (error) {
        console.error("Failed to validate token:", error);
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
      const response = await fetch("/api/launch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data: LaunchResponse = await response.json();

      if (response.ok) {
        setMessage("🚀 SUCCESS! technoVIT is now LIVE!");
      } else {
        throw new Error(data.error || "Something went wrong.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Launch Failed: ${error.message}`);
      } else {
        setMessage("Launch Failed: An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (authStatus !== "authorized") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "#000",
          color: "white",
          fontSize: "1.5rem",
        }}
      >
        <p>Validating Access...</p>
      </div>
    );
  }

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
        textAlign: "center",
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
          margin: "20px 0",
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
