"use client";

import { DivIcon, LatLng, Map } from "leaflet";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import dynamic from "next/dynamic";

import {
	MapContainer,
	TileLayer,
	Popup,
	useMapEvents,
	Marker,
} from "react-leaflet";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { countryStateAtom } from "@/atoms/country";

interface LatLngType {
	lat: number;
	lng: number;
}

interface MapProps {
	onSelect: (latlng: LatLngType) => void;
	position: LatLngType;
	className?: string;
}

const MapComponent = ({ onSelect, position, className }: MapProps) => {
	const [_position, setPosition] = useState<LatLng>(
		new LatLng(position.lat, position.lng)
	);
	const country = useAtomValue(countryStateAtom);
	const iconHTML = ReactDOMServer.renderToString(
		<MapPinIcon className="size-6" />
	);
	const mapRef = useRef<Map | null>(null);

	const customIcon = new DivIcon({
		html: iconHTML,
		className: "custom-marker", // Optional: to style the marker
		iconSize: [24, 24], // Adjust size to fit your needs
	});

	useEffect(() => {
		if (country && mapRef.current) {
			const newLatLng = new LatLng(country.lat, country.lng);
			setPosition(newLatLng);
			mapRef.current.setView(newLatLng, 10); // Zoom to level 10, adjust as needed
		}
	}, [country]);

	function LocationMarker() {
		const map = useMapEvents({
			click(e) {
				const latlng = { lat: e.latlng.lat, lng: e.latlng.lng };
				onSelect(latlng);
				setPosition(e.latlng);
				map.setView(e.latlng, map.getZoom());
			},
		});
		return _position === null ? null : (
			<Marker position={_position} icon={customIcon}>
				<Popup>You are here</Popup>
			</Marker>
		);
	}
	return (
		<MapContainer
			className={cn("w-full h-full", className)}
			center={_position}
			zoom={10}
			scrollWheelZoom={true}
			ref={mapRef}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<LocationMarker />
		</MapContainer>
	);
};

// Export with dynamic import to avoid SSR issues
export default dynamic(() => Promise.resolve(MapComponent), {
	ssr: false,
	loading: () => <div className="w-full h-full bg-gray-200 animate-pulse" />,
});
