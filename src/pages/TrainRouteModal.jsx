// src/pages/TrainRouteModal.jsx
import React from "react";
import "../pages/TrainPage.css";

const TrainRouteModal = ({ train, onClose }) => {
  if (!train) return null;

  return (
    <div className="modal-overlay">
      <div className="modal animated-fade-in">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2 className="text-xl font-semibold mb-4">
          {train.train_name} ({train.train_no})
        </h2>

        <div className="schedule-list">
          {train.schedule.map((stop, idx) => (
            <div className="stop-card" key={idx}>
              <div className="stop-header">
                <div className="station-name">
                  {stop.station_name} <span className="code">({stop.station_code})</span>
                </div>
              </div>

              <div className="stop-details">
                <div>
                  <strong>Arrival:</strong>{" "}
                  {stop.arrival_time === "SOURCE" ? "Source" : stop.arrival_time}
                </div>
                <div>
                  <strong>Departure:</strong>{" "}
                  {stop.departure_time === "DEST" ? "Destination" : stop.departure_time}
                </div>
                <div>
                  <strong>Day:</strong> {stop.day}
                </div>
                <div>
                  <strong>Distance:</strong> {stop.distance} km
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainRouteModal;
