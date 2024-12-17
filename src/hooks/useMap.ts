import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useState } from "react";
import { getCurrentPosition } from "./geolocation";
import { Map } from "../utils/map";

export function useMap(containerRef: React.RefObject<HTMLDivElement | null> ) {
  const [map, setMap] = useState<Map>();

  useEffect(() => {
    (async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: ["routes", "geometry", "marker"],
      });
      const [, , , position] = await Promise.all([
        loader.importLibrary("routes"),
        loader.importLibrary("geometry"),
        loader.importLibrary("marker"),
        getCurrentPosition({ enableHighAccuracy: true }),
      ]);
      const map = new Map(containerRef.current!, {
        mapId: "8e0a97af9386fef", //theme
        zoom: 15,
        center: position,
      });
      console.log('Mapa inicializado:', map);
      setMap(map);
    })();
  }, [containerRef]);

  return map;
}