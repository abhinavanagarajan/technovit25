import { Suspense } from "react";
import LaunchClient from "./LaunchClient";

function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-white p-4">
      <p className="animate-pulse text-2xl font-semibold tracking-wider">
        Validating Access...
      </p>
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
