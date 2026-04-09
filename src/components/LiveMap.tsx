"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Using a delivery car emoji for the marker
const customIcon = L.divIcon({
    html: '<div style="font-size: 32px; line-height: 1; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));">🚚</div>',
    className: 'custom-emoji-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

interface LiveMapProps {
    lat: number;
    lng: number;
    zoom?: number;
}

// Component to handle map center updates
function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
}

export default function LiveMap({ lat, lng, zoom = 13 }: LiveMapProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <div className="w-full h-full bg-slate-100 animate-pulse rounded-3xl" />;

    const position: [number, number] = [lat, lng];

    return (
        <MapContainer
            center={position}
            zoom={zoom}
            className="w-full h-full rounded-3xl z-0"
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon} />
            <ChangeView center={position} zoom={zoom} />
        </MapContainer>
    );
}
