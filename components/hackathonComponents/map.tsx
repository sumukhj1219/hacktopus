"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { Hackathons } from "@prisma/client";
import { GlowingCard } from "@/components/ui/glowing-card";
import { Sparkles } from "@/components/ui/sparkles";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

const MapComponent = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [hackathons, setHackathons] = useState<Hackathons[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setLoading(false);
      },
      (err) => {
        console.error("Geolocation error:", err);
        // Default to a central position if geolocation fails
        setPosition([20, 0]);
        setLoading(false);
      }
    );

    async function fetchHackathons() {
      try {
        const response = await axios.get("/api/hackathons");
        if (response.status === 200 && response.data.results.hackathons) {
          setHackathons(response.data.results.hackathons);
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (error) {
        console.error("Error fetching hackathons:", error);
      }
    }

    fetchHackathons();
  }, []);

  const customIcon = L.icon({
    iconUrl: "/location-pin.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -20],
  });

  const hackathonIcon = L.icon({
    iconUrl: "/hack-pin.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -20],
  });

  if (!isClient) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlowingCard className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            <span className="ml-2">Loading map...</span>
          </div>
        ) : position ? (
          <div className="h-[60vh] w-full relative">
            <MapContainer
              center={position}
              zoom={4}
              style={{ height: "100%", width: "100%", borderRadius: "0.75rem" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={position} icon={customIcon}>
                <Popup>
                  <Sparkles>
                    <span className="font-medium">Your location</span>
                  </Sparkles>
                </Popup>
              </Marker>

              {hackathons.map((hackathon, index) => (
                <Marker key={index} position={[hackathon.lat, hackathon.long]} icon={hackathonIcon}>
                  <Popup>
                    <div className="p-1">
                      <h3 className="font-bold text-orange-600">{hackathon.hackathon_name}</h3>
                      {hackathon.date && <p className="text-sm">Date: {hackathon.date}</p>}
                      {hackathon.theme && <p className="text-sm">Theme: {hackathon.theme}</p>}
                      <a
                        href={hackathon.hackathon_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                      >
                        View details
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[60vh]">
            <p>Unable to fetch location. Please enable location services.</p>
          </div>
        )}
      </GlowingCard>
    </motion.div>
  );
};

export default MapComponent;
