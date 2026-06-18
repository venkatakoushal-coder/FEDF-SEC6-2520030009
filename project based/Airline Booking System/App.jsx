import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchResults from "./pages/SearchResults";
import SeatSelection from "./pages/SeatSelection";
import BookingSummary from "./pages/BookingSummary";
import Payment from "./pages/Payment";
import ETicket from "./pages/ETicket";
import BookingHistory from "./pages/BookingHistory";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <Notification />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/results" element={<SearchResults />} />
          <Route path="/seats" element={<SeatSelection />} />
          <Route path="/summary" element={<BookingSummary />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/ticket" element={<ETicket />} />
          <Route path="/history" element={<BookingHistory />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  );
}
