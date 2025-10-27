import { Suspense } from "react";
import LaunchClient from "./LaunchClient";

function Loading() {
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

export default function LaunchPage() {
  return (
    <Suspense fallback={<Loading />}>
      <LaunchClient />
    </Suspense>
  );
}
