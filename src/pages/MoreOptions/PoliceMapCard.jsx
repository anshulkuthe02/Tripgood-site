// src/components/PoliceMapCard.jsx
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.fullscreen/Control.FullScreen.css";
import "leaflet.fullscreen";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import policeData from "../../data/PoliceStations.json";
import "../../pages/MoreOptions/PoliceMapCard.css";

const PoliceMapCard = () => {
  const mapRef = useRef(null);
  const routingRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map("police-map", {
      fullscreenControl: true,
      fullscreenControlOptions: { position: "topright" }
    }).setView([21.1458, 79.0882], 12);

    mapRef.current = map;

    // Map tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    // Add police markers
    policeData.forEach((station) => {
      L.marker([station.lat, station.lng])
        .addTo(map)
        .bindPopup(`
          <div class="popup-card">
            <h4>${station.name}</h4>
            <p><strong>Address:</strong> ${station.address}</p>
            <p><strong>Phone:</strong> ${station.phone}</p>
          </div>
        `);
    });

    // Add user marker
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const userLatLng = [latitude, longitude];
        setUserLocation(userLatLng);

        const userMarker = L.marker(userLatLng, {
          icon: L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
            iconSize: [28, 28]
          })
        }).addTo(map);

        userMarker.bindPopup("📍 You are here").openPopup();
        map.setView(userLatLng, 13);
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Couldn't access your location.");
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const handleFindNearest = () => {
    if (!userLocation || !mapRef.current) return;

    const map = mapRef.current;

    // Remove previous routing line
    if (routingRef.current) {
      map.removeControl(routingRef.current);
    }

    // Find nearest station
    const nearest = policeData.reduce((closest, station) => {
      const dist = map.distance(userLocation, [station.lat, station.lng]);
      return !closest || dist < closest.distance
        ? { ...station, distance: dist }
        : closest;
    }, null);

    // Show route using Leaflet Routing Machine
    const routeControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(nearest.lat, nearest.lng)
      ],
      lineOptions: {
        styles: [{ color: "#2563eb", weight: 6, opacity: 0.9 }]
      },
      show: false,
      addWaypoints: false,
      routeWhileDragging: false,
      createMarker: function () {
        return null; // don't add new markers
      }
    }).addTo(map);

    routingRef.current = routeControl;
  };

  return (
    <div className="police-map-card">
      <h2>🚨 Police Stations in Nagpur</h2>
      <div id="police-map"></div>
      <button className="find-police-btn" onClick={handleFindNearest}>
        🧭 Find Nearest Police Station
      </button>
    </div>
  );
};

export default PoliceMapCard;
