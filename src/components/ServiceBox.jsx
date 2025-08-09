// ServiceBox.jsx
import React from "react";
import { PlaneIcon, MapPinIcon, HotelIcon, HomeIcon, TrainFrontIcon, CarFrontIcon } from "lucide-react";

const services = [
  {
    icon: <PlaneIcon size={24} />,
  },
  {
    icon: <TrainFrontIcon size={24} />,
  },
  {
    icon: <HotelIcon size={24} />,
  },
  {
    icon: <CarFrontIcon size={24} />,
  },
  {
    icon: <HomeIcon size={24} />,
  },
  {
    icon: <MapPinIcon size={24} />,
  },
];

const ServiceBox = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {services.map((service, index) => (
        <div key={index} className="p-4 border rounded-lg shadow-md">
          <div className="text-primary mb-2">{service.icon}</div>
          <h3 className="text-lg font-semibold">{service.title}</h3>
          <p className="text-sm text-gray-600">{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceBox;