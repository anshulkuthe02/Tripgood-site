import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "./HospitalMapCard.css";

const HospitalMapCard = () => {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const routingControlRef = useRef(null);

  useEffect(() => {
    fetch("/src/data/hospitals.json")
      .then((res) => res.json())
      .then((data) => setFacilities(data));
  }, []);

  useEffect(() => {
    const leafletMap = L.map("hospital-map").setView([21.1458, 79.0882], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(leafletMap);
    setMap(leafletMap);

    navigator.geolocation.getCurrentPosition((position) => {
      const coords = [position.coords.latitude, position.coords.longitude];
      setUserLocation(coords);

      const redIcon = L.icon({
        iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png",
        iconSize: [32, 32],
      });

      L.marker(coords, { icon: redIcon })
        .addTo(leafletMap)
        .bindPopup("📍 You are here")
        .openPopup();
    });

    return () => leafletMap.remove();
  }, []);

  const getIconByType = (type) =>
    L.icon({
      iconUrl:
        type === "Hospital"
          ? "https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
          : type === "Clinic"
          ? "https://cdn-icons-png.flaticon.com/512/892/892458.png"
          : type === "Medical Store"
          ? "https://cdn-icons-png.flaticon.com/512/1045/1045705.png"
          : "https://cdn-icons-png.flaticon.com/512/3456/3456426.png",
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -30],
    });

  useEffect(() => {
    if (!map || facilities.length === 0) return;

    facilities.forEach((facility) => {
      const { lat, lng } = facility.location;
      const marker = L.marker([lat, lng], {
        icon: getIconByType(facility.type),
        title: facility.name,
      }).addTo(map);

      marker.on("click", () => {
        setSelectedFacility(facility);
        setShowRoute(true);

        if (!userLocation) return;

        if (routingControlRef.current) {
          map.removeControl(routingControlRef.current);
        }

        routingControlRef.current = L.Routing.control({
          waypoints: [L.latLng(userLocation), L.latLng(lat, lng)],
          routeWhileDragging: false,
          addWaypoints: false,
          draggableWaypoints: false,
          createMarker: function (i, wp) {
            return L.marker(wp.latLng, {
              icon: L.divIcon({
                html: i === 0 ? "🚶" : "🔹",
                className: "custom-dir-icon",
                iconSize: [20, 20],
                iconAnchor: [10, 10],
              }),
            });
          },
          lineOptions: {
            styles: [{ color: "#007bff", weight: 5 }],
          },
        }).addTo(map);
      });
    });

    map.on("click", () => {
      setSelectedFacility(null);
      setShowRoute(false);
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }
    });
  }, [map, facilities, userLocation]);

  const toggleFullscreen = () => {
    const mapElement = document.getElementById("hospital-map");
    if (mapElement.requestFullscreen) {
      mapElement.requestFullscreen();
    }
  };

  return (
    <div className="hospital-map-wrapper">
      <div className="map-toolbar">
        <button className="fullscreen-btn" onClick={toggleFullscreen}>⛶ Fullscreen</button>
      </div>

      <div id="hospital-map" className="hospital-map" />

      {showRoute && (
        <div className="route-box fade-in">
          <button
            className="close-btn"
            onClick={() => {
              setShowRoute(false);
              if (routingControlRef.current) {
                map.removeControl(routingControlRef.current);
                routingControlRef.current = null;
              }
            }}
          >
            ❌
          </button>
        </div>
      )}

      {selectedFacility && (
        <div className="info-card slide-up bottom-left">
          <button
            className="close-btn"
            onClick={() => setSelectedFacility(null)}
          >
            ❌
          </button>
          <h3>{selectedFacility.name}</h3>
          <p><strong>📞</strong> {selectedFacility.phoneNumbers.join(", ")}</p>
          <p><strong>👨‍⚕️ Doctors:</strong> {selectedFacility.doctors.length ? selectedFacility.doctors.join(", ") : "N/A"}</p>
          <p><strong>🛠️ Services:</strong> {selectedFacility.services.join(", ")}</p>
          <div className="review-section">
            <strong>📝 Reviews:</strong>
            {selectedFacility.reviews.map((r, i) => (
              <p key={i}>⭐ {r.rating} – "{r.comment}" – {r.user}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalMapCard;
