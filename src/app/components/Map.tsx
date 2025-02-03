import { DivIcon, LatLng } from "leaflet";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";

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
import { countries } from "@/assets/constants/country";

interface MapProps {
  onSelect: (latlng: LatLng) => void;
  position: LatLng;
  className?: string;
}

const Map = ({ onSelect, position, className }: MapProps) => {
  const [_position, setPosition] = useState<LatLng>(position);
  const country = useAtomValue(countryStateAtom);
  const iconHTML = ReactDOMServer.renderToString(
    <MapPinIcon className="size-6" />
  );
  const mapRef = useRef<any>(null);

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
        onSelect(e.latlng);
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
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default Map;
