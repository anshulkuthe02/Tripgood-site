import React from "react";
import "./WomenSafetyCard.css";

const WomenSafetyPage = () => {
  const helplines = [
    { label: "National Helpline", number: "1091" },
    { label: "Women Helpline", number: "181" },
    { label: "Police Control Room", number: "100" },
    { label: "Emergency Response", number: "112" }
  ];

  const handleSOS = () => {
    alert("🚨 SOS alert sent to nearest police station!");
    // Here you can integrate your backend or location-based logic
  };

  const sendWhatsAppSOS = () => {
    const phone = "+919359823302"; // Replace with actual number
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const mapsLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      const message = encodeURIComponent(
        `🚨 SOS! I need urgent help. My live location: ${mapsLink}`
      );
      window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    });
  };

  return (
    <div className="women-safety-container">
      <h2 className="safety-title">Women Safety Emergency Contacts</h2>

      <div className="helpline-list">
        {helplines.map((line, index) => (
          <div key={index} className="helpline-box">
            <h3>{line.label}</h3>
            <p className="helpline-number">📞 {line.number}</p>
          </div>
        ))}
      </div>

      <button className="sos-button" onClick={handleSOS}>
        🚨 SOS - Send Emergency Alert
      </button><br />

      <button className="whatsapp-sos-btn" onClick={sendWhatsAppSOS}>
        🟢 WhatsApp SOS
      </button>
    </div>
  );
};

export default WomenSafetyPage;