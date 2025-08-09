import React, { useState, useEffect } from "react";
import "./TravelItems.css";
import { FaSuitcase, FaStar, FaUmbrellaBeach, FaMountain, FaCity, FaMapMarkerAlt } from "react-icons/fa";

const locationOptions = {
  "Beach Trip": [
    "Sunscreen",
    "Swimsuit",
    "Beach Towel",
    "Flip-Flops",
    "Sun Hat",
    "Waterproof Phone Pouch",
    "Portable Fan",
    "Aloe Vera Gel",
    "Snorkeling Gear",
    "Beach Mat"
  ],
  "Mountain Trek": [
    "Hiking Shoes",
    "Water Bottle",
    "Raincoat",
    "First Aid Kit",
    "Trekking Poles",
    "Thermal Wear",
    "Flashlight",
    "Multi-tool Knife",
    "Protein Bars",
    "Gloves & Cap"
  ],
  "City Side Trip": [
    "Power Bank",
    "Guidebook",
    "Camera",
    "Hand Sanitizer",
    "Reusable Shopping Bag",
    "Comfortable Walking Shoes",
    "City Pass Card",
    "Public Transport Map",
    "Notepad",
    "Small Umbrella"
  ],
  "Remote Area Trip": [
    "Mosquito Repellent",
    "Offline Maps",
    "Snacks",
    "Torch",
    "Solar Charger",
    "Water Purification Tablets",
    "Satellite Phone",
    "Dry Food Packets",
    "Blanket",
    "Lighter/Matches"
  ]
};

const basicItems = [
  "Passport",
  "Travel Tickets",
  "Phone Charger",
  "Toiletries",
  "Medications",
  "Travel Insurance",
  "Cash & Cards",
  "ID Proof",
  "Emergency Contacts",
];

const TravelChecklistPage = () => {
  const [items, setItems] = useState(
    basicItems.map((item) => ({ text: item, checked: false }))
  );
  const [customItem, setCustomItem] = useState("");
  const [selectedTripType, setSelectedTripType] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [warningText, setWarningText] = useState("");

  const toggleCheck = (index) => {
    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;
    setItems(newItems);
  };

  const handleAddItem = () => {
    const trimmed = customItem.trim();
    if (trimmed !== "" && !items.some((i) => i.text.toLowerCase() === trimmed.toLowerCase())) {
      setItems([...items, { text: trimmed, checked: false }]);
      setCustomItem("");
    }
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleTripTypeChange = (e) => {
    const type = e.target.value;
    setSelectedTripType(type);

    if (type && locationOptions[type]) {
      const suggested = locationOptions[type];
      const combined = [...basicItems, ...suggested];
      const uniqueItems = combined.filter(
        (item, index, self) => self.indexOf(item) === index
      );
      const newItems = uniqueItems.map((text) => ({ text, checked: false }));
      setItems(newItems);
    }
  };

  useEffect(() => {
    const unchecked = items.filter((item) => !item.checked);
    if (unchecked.length > 0) {
      const warning = unchecked.map((i) => i.text).join(", ");
      setWarningText(`⚠️ Don't forget: ${warning}`);
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000);
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAddItem();
  };

  const getItemIcon = (item) => {
    if (basicItems.includes(item)) return <FaStar className="icon pulse" />;
    if (item.toLowerCase().includes("beach")) return <FaUmbrellaBeach className="icon" />;
    if (item.toLowerCase().includes("mountain")) return <FaMountain className="icon" />;
    if (item.toLowerCase().includes("city")) return <FaCity className="icon" />;
    return <FaMapMarkerAlt className="icon" />;
  };

  return (
    <div className="checklist-container">
      <h2 className="checklist-title">🧳 Travel Checklist</h2>

      <div className="trip-type-select">
        <label>Select Trip Type:</label>
        <select value={selectedTripType} onChange={handleTripTypeChange}>
          <option value="">-- Choose a Trip Type --</option>
          {Object.keys(locationOptions).map((type, idx) => (
            <option key={idx} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="checklist-input">
        <input
          type="text"
          placeholder="Add custom item..."
          value={customItem}
          onChange={(e) => setCustomItem(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAddItem}>➕ Add</button>
      </div>

      {showWarning && (
        <div className="warning-box fade-in">
          {warningText}
        </div>
      )}

      <p className="note-info"><strong>Note:</strong> The items having ⭐ icon are important items to carry.</p>

      <ul className="checklist-items">
        {items.map((item, idx) => (
          <li key={idx} className={item.checked ? "checked" : ""}>
            <label style={{ fontWeight: basicItems.includes(item.text) ? "bold" : "normal" }}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleCheck(idx)}
              />
              {getItemIcon(item.text)} {item.text}
            </label>
            <button className="delete-btn" onClick={() => handleDeleteItem(idx)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TravelChecklistPage;
