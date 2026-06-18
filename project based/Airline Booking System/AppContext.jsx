import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("skybook_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("skybook_bookings");
    return saved ? JSON.parse(saved) : [];
  });
  const [notification, setNotification] = useState(null);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("skybook_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("skybook_user");
  };

  const addBooking = (booking) => {
    const updated = [...bookings, booking];
    setBookings(updated);
    localStorage.setItem("skybook_bookings", JSON.stringify(updated));
  };

  const showNotification = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <AppContext.Provider value={{
      user, login, logout,
      selectedFlight, setSelectedFlight,
      selectedSeat, setSelectedSeat,
      bookings, addBooking,
      notification, showNotification
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
