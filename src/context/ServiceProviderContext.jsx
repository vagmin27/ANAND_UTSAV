import React, { createContext, useState, useContext } from "react";

// Create context
const ServiceProviderContext = createContext();

// Hook for easy access
export const useServiceProvider = () => useContext(ServiceProviderContext);

// Provider component
export const ServiceProviderProvider = ({ children }) => {
  const [services, setServices] = useState([]);

  const addService = (service) => {
    setServices((prev) => [service, ...prev]);
  };

  const deleteService = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <ServiceProviderContext.Provider value={{ services, addService, deleteService }}>
      {children}
    </ServiceProviderContext.Provider>
  );
};
