import { QueryClientAPI } from "@/lib/weatherApi";
import { useQuery } from "@tanstack/react-query";

interface LatLngType {
	lat: number;
	lng: number;
}

export const useGetWeatherByLatLong = (latlng: LatLngType | null) => {
	const queryClient = new QueryClientAPI();
	return useQuery({
		queryKey: [queryClient.key.getWeatherByCity, latlng?.lat, latlng?.lng],
		queryFn: async () => {
			if (!latlng) throw new Error("Location is required");
			const response = await queryClient.getWeatherByLatLong(
				latlng.lat,
				latlng.lng
			);
			return response;
		},
		enabled: !!latlng,
	});
};
