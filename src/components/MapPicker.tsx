"use client";

import { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Loader2 } from 'lucide-react';
import debounce from 'lodash.debounce';

// Using a delivery car emoji for the marker
const customIcon = L.divIcon({
    html: '<div style="font-size: 32px; line-height: 1; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));">🚚</div>',
    className: 'custom-emoji-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

interface MapPickerProps {
    onChange: (lat: number, lng: number, address: string) => void;
    initialLat?: number;
    initialLng?: number;
    initialAddress?: string;
}

function LocationMarker({ position, onMapClick }: { position: L.LatLng, onMapClick: (latlng: L.LatLng) => void }) {
    const map = useMapEvents({
        click(e) {
            onMapClick(e.latlng);
        },
    });

    useEffect(() => {
        map.flyTo(position, map.getZoom());
    }, [position, map]);

    return position === null ? null : (
        <Marker position={position} icon={customIcon} />
    );
}

export default function MapPicker({ onChange, initialLat, initialLng, initialAddress = "" }: MapPickerProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [position, setPosition] = useState<L.LatLng>(new L.LatLng(initialLat || 52.5200, initialLng || 13.4050));
    const [address, setAddress] = useState(initialAddress);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Reverse Geocode when map is clicked
    const handleMapClick = async (latlng: L.LatLng) => {
        setPosition(latlng);
        setIsSearching(true);
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`);
            const data = await res.json();
            // Format address nicely (e.g. city, country)
            const parts = [];
            if (data.address.city || data.address.town || data.address.village) parts.push(data.address.city || data.address.town || data.address.village);
            if (data.address.state) parts.push(data.address.state);
            if (data.address.country) parts.push(data.address.country);
            
            const newAddress = parts.length > 0 ? parts.join(", ") : (data.display_name || "Unknown Location");
            setAddress(newAddress);
            onChange(latlng.lat, latlng.lng, newAddress);
        } catch (error) {
            console.error("Geocoding failed", error);
            onChange(latlng.lat, latlng.lng, address);
        } finally {
            setIsSearching(false);
        }
    };

    // Forward Geocode when address is searched
    const searchAddress = async (query: string) => {
        if (!query.trim()) return;
        setIsSearching(true);
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
            const data = await res.json();
            if (data && data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lng = parseFloat(data[0].lon);
                setPosition(new L.LatLng(lat, lng));
                onChange(lat, lng, query);
            }
        } catch (error) {
            console.error("Geocoding failed", error);
        } finally {
            setIsSearching(false);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(debounce(searchAddress, 1000), []);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
        onChange(position.lat, position.lng, e.target.value);
        debouncedSearch(e.target.value);
    };

    if (!isMounted) return <div className="w-full h-80 bg-slate-100 animate-pulse rounded-2xl border-2 border-dashed border-slate-200" />;

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest ml-1">Current Location (Auto-Syncs with Map)</label>
                <div className="relative">
                    <input
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 pl-12 pr-12 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-bold text-black"
                        placeholder="e.g. Heathrow Airport, UK"
                        value={address}
                        onChange={handleAddressChange}
                        required
                    />
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    {isSearching && <Loader2 className="absolute right-5 top-1/2 -translate-y-1/2 text-primary animate-spin" size={20} />}
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">Select Surveillance Coordinates</label>
                    <div className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">Click map to pinpoint</div>
                </div>
                <div className="h-48 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-inner group">
                    <MapContainer
                        center={[position.lat, position.lng]}
                        zoom={10}
                        className="w-full h-full z-0"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker position={position} onMapClick={handleMapClick} />
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}
