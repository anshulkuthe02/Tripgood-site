import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { 
  searchPlaces, 
  getCurrentLocation, 
  getBikeRentals, 
  bookBikeRental, 
  getNearbyServices 
} from "../api/locationAPI";

// Fix Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const NAGPUR_CENTER = [21.1458, 79.0882];

const LocationPage = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [selected, setSelected] = useState(null);
  const [userPos, setUserPos] = useState(null);
  const [liveTrackingEnabled, setLiveTrackingEnabled] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [address, setAddress] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [bikeRentals, setBikeRentals] = useState([]);
  const [nearbyServices, setNearbyServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeService, setActiveService] = useState("places");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tripgood_favorites")) || [];
    setFavorites(stored);
    
    // Get user's current location on component mount
    handleGetCurrentLocation();
  }, []);

  useEffect(() => {
    localStorage.setItem("tripgood_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleGetCurrentLocation = async () => {
    try {
      const location = await getCurrentLocation();
      setUserPos([location.latitude, location.longitude]);
      setAddress(location.address);
    } catch (error) {
      console.error('Error getting current location:', error);
      setError('Failed to get current location');
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const results = await searchPlaces(searchQuery, userPos);
      setPlaces(results);
      setActiveService("places");
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search places');
    } finally {
      setLoading(false);
    }
  };

  const handleGetBikeRentals = async () => {
    if (!userPos) {
      setError('Location access required');
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const rentals = await getBikeRentals(userPos[0], userPos[1]);
      setBikeRentals(rentals);
      setActiveService("bikes");
    } catch (err) {
      console.error('Bike rentals error:', err);
      setError('Failed to get bike rentals');
    } finally {
      setLoading(false);
    }
  };

  const handleBookBike = async (bikeId) => {
    try {
      const booking = await bookBikeRental(bikeId, userPos[0], userPos[1]);
      alert(`Bike booked successfully! Booking ID: ${booking.bookingId}`);
    } catch (error) {
      console.error('Bike booking error:', error);
      setError('Failed to book bike');
    }
  };

  const handleGetNearbyServices = async (serviceType) => {
    if (!userPos) {
      setError('Location access required');
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const services = await getNearbyServices(userPos[0], userPos[1], serviceType);
      setNearbyServices(services);
      setActiveService("services");
    } catch (err) {
      console.error('Nearby services error:', err);
      setError('Failed to get nearby services');
    } finally {
      setLoading(false);
    }
  };

  const toggleLiveTracking = () => {
  if (!liveTrackingEnabled) {
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        console.log("📍 Live location position:", pos);
        setUserPos([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.warn("❌ Live location error:", err);
        alert("Please enable location access in your browser.");
      },
      { enableHighAccuracy: true }
    );
    setWatchId(id);
    setLiveTrackingEnabled(true);
  } else {
    navigator.geolocation.clearWatch(watchId);
    setUserPos(null);
    setLiveTrackingEnabled(false);
  }
};


  useEffect(() => {
    if (watchId) {
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [watchId]);

  const fetchAddress = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      setAddress(res.data.display_name || "Unknown address");
    } catch {
      setAddress("Address unavailable");
    }
  };

  useEffect(() => {
    const query = `
      [out:json][timeout:25];
      (
        node["tourism"="attraction"](around:5000,21.1458,79.0882);
        node["amenity"="restaurant"](around:5000,21.1458,79.0882);
        node["leisure"="park"](around:5000,21.1458,79.0882);
        node["amenity"="toilets"](around:5000,21.1458,79.0882);
      );
      out body;
    `;

    axios
      .post("https://overpass-api.de/api/interpreter", query, {
        headers: { "Content-Type": "text/plain" },
      })
      .then((res) => {
        if (res.data?.elements) setPlaces(res.data.elements);
      })
      .catch((err) => console.error("Overpass API error:", err));
  }, []);

  const getMarkerIcon = (place) => {
    const { tourism, amenity, leisure } = place.tags || {};
    if (tourism === "attraction") {
      return L.icon({
        iconUrl: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
        iconSize: [32, 32],
      });
    } else if (amenity === "restaurant" || amenity === "toilets" || leisure === "park") {
      return L.icon({
        iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        iconSize: [32, 32],
      });
    }
    return L.icon({
      iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
      iconSize: [32, 32],
    });
  };

  const toggleFavorite = (place) => {
    const exists = favorites.find((fav) => fav.id === place.id);
    if (exists) {
      setFavorites(favorites.filter((fav) => fav.id !== place.id));
    } else {
      setFavorites([...favorites, place]);
    }
  };

  return (
    <div className="tripgood-bg relative h-screen w-screen">
      {/* Search and Service Controls */}
      <div className="absolute top-4 left-4 z-[1000] space-y-4">
        <div className="glass-card p-4">
          <div className="flex gap-2 mb-4">
            <input
              className="px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 text-sm"
              type="text"
              placeholder="Search places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-4 py-2 bg-blue-500/30 hover:bg-blue-500/40 text-white rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {loading ? '...' : 'Search'}
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleGetBikeRentals}
              className="px-3 py-1 bg-green-500/30 hover:bg-green-500/40 text-white rounded text-sm"
            >
              🚲 Bike Rentals
            </button>
            <button
              onClick={() => handleGetNearbyServices('restaurant')}
              className="px-3 py-1 bg-orange-500/30 hover:bg-orange-500/40 text-white rounded text-sm"
            >
              🍽️ Restaurants
            </button>
            <button
              onClick={() => handleGetNearbyServices('hospital')}
              className="px-3 py-1 bg-red-500/30 hover:bg-red-500/40 text-white rounded text-sm"
            >
              🏥 Hospitals
            </button>
            <button
              onClick={() => handleGetNearbyServices('gas_station')}
              className="px-3 py-1 bg-purple-500/30 hover:bg-purple-500/40 text-white rounded text-sm"
            >
              ⛽ Gas Stations
            </button>
          </div>
        </div>

        {error && (
          <div className="glass-card p-3 bg-red-500/20">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}
      </div>

      <button
        onClick={() => navigate("/home")}
        className="absolute bottom-4 left-4 z-[1000] glass-card px-4 py-2 text-white font-medium hover:bg-white/30"
      >
        ⬅ Back
      </button>

      <button
        onClick={toggleLiveTracking}
        className="absolute top-4 right-4 z-[1000] glass-card px-6 py-4 text-white text-lg font-semibold hover:bg-white/30"
      >
        {liveTrackingEnabled ? "❌ Disable Live Location" : "📍 Enable Live Location"}
      </button>

      <MapContainer center={NAGPUR_CENTER} zoom={13} className="h-full w-full z-0">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {userPos && (
          <Marker
            position={userPos}
            icon={L.icon({
              iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
              iconSize: [32, 32],
            })}
          >
            <Popup>Your Live Location</Popup>
          </Marker>
        )}

        {places.map((place, idx) => (
          <Marker
            key={idx}
            position={[place.lat, place.lon]}
            icon={getMarkerIcon(place)}
            eventHandlers={{
              click: () => {
                setSelected(place);
                fetchAddress(place.lat, place.lon);
              },
            }}
          />
        ))}
      </MapContainer>

      {/* Service Results Panel */}
      {(activeService === 'bikes' && bikeRentals.length > 0) && (
        <div className="absolute top-20 right-4 glass-card w-80 max-h-96 overflow-y-auto z-[1000] p-4">
          <h3 className="text-white font-bold mb-3">🚲 Bike Rentals Near You</h3>
          <div className="space-y-3">
            {bikeRentals.map((bike, idx) => (
              <div key={idx} className="p-3 bg-white/10 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-medium">{bike.name}</h4>
                  <span className="text-green-300 font-bold">₹{bike.pricePerHour}/hr</span>
                </div>
                <p className="text-white/80 text-sm mb-2">{bike.type} • {bike.distance}m away</p>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">⭐ {bike.rating} • {bike.available} available</span>
                  <button
                    onClick={() => handleBookBike(bike.id)}
                    className="px-3 py-1 bg-green-500/30 hover:bg-green-500/40 text-white rounded text-sm"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeService === 'services' && nearbyServices.length > 0) && (
        <div className="absolute top-20 right-4 glass-card w-80 max-h-96 overflow-y-auto z-[1000] p-4">
          <h3 className="text-white font-bold mb-3">📍 Nearby Services</h3>
          <div className="space-y-3">
            {nearbyServices.map((service, idx) => (
              <div key={idx} className="p-3 bg-white/10 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-medium">{service.name}</h4>
                  <span className="text-white/80 text-sm">{service.distance}m</span>
                </div>
                <p className="text-white/80 text-sm mb-2">{service.type} • {service.address}</p>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">⭐ {service.rating} • {service.status}</span>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${service.latitude},${service.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 bg-blue-500/30 hover:bg-blue-500/40 text-white rounded text-sm"
                  >
                    Directions
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selected && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass-card w-[98%] md:w-[520px] px-8 py-6 z-[1000] transition-all duration-500 ease-out animate-fade-in">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {selected.tags?.name || "Unnamed Place"}
              </h2>
              <p className="text-sm text-white/80 mt-1">
                🏷️ {selected.tags?.tourism || selected.tags?.amenity || selected.tags?.leisure || "Unknown"}
              </p>
              <p className="text-sm text-white/80 mt-1">📍 {address}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                <span className="glass-card px-2 py-1 text-yellow-300 bg-yellow-500/30">
                  ⭐ 4.2 rating (mock)
                </span>
                <span className="glass-card px-2 py-1 text-green-300 bg-green-500/30">
                  💰 Free / Varies
                </span>
                <button
                  onClick={() => toggleFavorite(selected)}
                  className={`glass-card px-3 py-1 font-medium ${
                    favorites.find((fav) => fav.id === selected.id)
                      ? "text-pink-300 bg-pink-500/30"
                      : "text-white/80 bg-white/20"
                  }`}
                >
                  {favorites.find((fav) => fav.id === selected.id)
                    ? "💖 Saved"
                    : "🤍 Save as Favorite"}
                </button>
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-white/70 text-xl hover:text-white"
              title="Close"
            >
              ✕
            </button>
          </div>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lon}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 block text-center glass-card bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white font-medium py-2 hover:from-blue-500/40 hover:to-purple-500/40 transition"
          >
            🧭 Get Directions
          </a>
        </div>
      )}
    </div>
  );
};

export default LocationPage;
