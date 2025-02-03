
import { QueryClientAPI } from "@/api/route";
import { useQuery } from "@tanstack/react-query";
import { LatLng } from "leaflet";


export const useGetWeatherByLatLong = (latlng: LatLng) => {
    const queryClient = new QueryClientAPI()
    return useQuery({
        queryKey: [queryClient.key.getWeatherByCity, latlng.lat, latlng.lng],
        queryFn: async () => {
            const response = await queryClient.getWeatherByLatLong(latlng.lat, latlng.lng)
            return response
        }
    })
}