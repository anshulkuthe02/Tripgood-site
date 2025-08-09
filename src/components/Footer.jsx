import React from "react";
import {
  Instagram,
  Facebook,
  Phone,
  Mail,
  Twitter,
  MessageCircleMore,
  Telegram,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Quick Links */}
        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li><a href="/flights">Flights</a></li>
            <li><a href="/hotels">Hotels</a></li>
            <li><a href="/cabs">Cabs</a></li>
            <li><a href="/rentals">Rentals</a></li>
            <li><a href="/places">Places</a></li>
            <li><a href="/weather">Weather</a></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div className="footer-section">
          <h4>Subscribe</h4>
          <p>Get travel tips & offers</p>
          <form className="subscribe-form">
            <input type="email" placeholder="Your Email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><Telegram size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Phone size={20} /></a> {/* WhatsApp alternative */}
            <a href="#"><MessageCircleMore size={20} /></a> {/* Discord alternative */}
            <a href="#"><Mail size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; 2025 TripGood | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
