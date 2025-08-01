"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useGetWeatherByLatLong } from "@/hooks/queires/useGetWeather";
import CountrySelector from "@/components/CountrySelector";
import { useAtomValue } from "jotai";
import { countryStateAtom } from "@/atoms/country";

// Dynamic import for Map component to avoid SSR issues
const Map = dynamic(() => import("@/components/Map"), {
	ssr: false,
	loading: () => <div className="w-full h-full bg-gray-200 animate-pulse" />,
});

interface LatLngType {
	lat: number;
	lng: number;
}

const Weather = () => {
	const [location, setLocation] = useState<LatLngType | null>(null);
	const { data: weatherData } = useGetWeatherByLatLong(location);
	const country = useAtomValue(countryStateAtom);

	const onMapSelect = (latlng: LatLngType) => {
		setLocation(latlng);
	};

	useEffect(() => {
		// Initialize location on client side
		if (typeof window !== "undefined") {
			setLocation({ lat: 13.7563, lng: 100.5018 });
		}
	}, []);

	useEffect(() => {
		if (country && typeof window !== "undefined") {
			setLocation({ lat: country.lat, lng: country.lng });
		}
	}, [country]);

	const iconUrl = `http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png`;

	if (!location) {
		return <div className="w-full h-full bg-gray-200 animate-pulse" />;
	}

	return (
		<div className="flex flex-col w-full h-full md:flex-row">
			<div className="flex w-full h-1/2 relative md:w-1/2 md:h-full">
				<Map onSelect={onMapSelect} position={location} />
			</div>
			<div className="flex flex-col relative w-full h-1/2 items-center justify-center md:w-1/2 md:h-full">
				<CountrySelector className="absolute top-6" />
				<div className="flex flex-col items-center justify-center">
					<img
						src={iconUrl}
						alt={weatherData?.weather[0].description}
						className="object-cover aspect-square md:w-96  w-60 h-60"
					/>
				</div>
				<div className="flex flex-col items-center justify-center gap-1">
					<span className="text-2xl font-bold">{weatherData?.name}</span>
					<span>{weatherData?.sys.country}</span>
					<span>
						{weatherData?.main.temp
							? (weatherData?.main.temp - 273.15).toFixed(2)
							: 0}
						°C
					</span>
				</div>
			</div>
		</div>
	);
};

// Export with dynamic import to avoid SSR issues
export default dynamic(() => Promise.resolve(Weather), {
	ssr: false,
	loading: () => <div className="w-full h-full bg-gray-200 animate-pulse" />,
});
