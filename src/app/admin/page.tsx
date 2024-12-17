"use client";

import { useRef } from "react";
import { useMap } from "../../hooks/useMap";

export function AdminPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  useMap(mapContainerRef);

  return <div className="w-full h-full" ref={mapContainerRef} />;
}

export default AdminPage;
