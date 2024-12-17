'use server';

import { revalidateTag } from "next/cache";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createRouteAction(state: any, formData: FormData) {
  
    const {sourceId, destinationId} = Object.fromEntries(formData.entries());
  
    console.log(sourceId, destinationId);
  
    const directionsResponse = await fetch(
      `http://localhost:3000/directions?originId=${sourceId}&destinationId=${destinationId}`, {
        // cache: "force-cache",
        // next: {
        //   revalidate: 1 * 60 * 60 * 24, // 1 day
        // }
      }
    );
  
    if (!directionsResponse.ok) {
      return {error: "Erro ao buscar a direções"}
    }
  
    const directionsData = await directionsResponse.json();
  
    const startAdress = directionsData.routes[0].legs[0].start_address;
    const endAdress = directionsData.routes[0].legs[0].end_address;
  
    const response = await fetch("http://localhost:3000/routes", {
      method: "POST",
      body: JSON.stringify({
        name: `${startAdress} - ${endAdress}`,
        source_id: directionsData.request.origin.place_id.replace("place_id:", ""),
        destination_id: directionsData.request.destination.place_id.replace("place_id:", ""),
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });
  
    if (!response.ok) {
      return {error: "Erro ao adicionar rota"}
    }

    revalidateTag("routes");
    
    return {sucess: true};
  }

  