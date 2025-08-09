import { createContext, useState } from 'react';

export const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  return (
    <NavigationContext.Provider value={{ direction, setDirection }}>
      {children}
    </NavigationContext.Provider>
  );
};
