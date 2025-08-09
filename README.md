# TripGood 🌴✈️

A comprehensive travel companion app offering seamless booking experiences for all your travel needs. Built with React and modern web technologies for a smooth, responsive user experience.

## 🚀 Features

### Core Travel Services
- **✈️ Flight Booking** - Search and book flights with real-time airport suggestions
- **🏨 Hotel Reservations** - Find and book accommodations worldwide with detailed filters
- **🚆 Train Services** - Railway booking with PNR status tracking and live schedules
- **🚕 Taxi Services** - Real-time cab booking with driver tracking and live maps
- **🚲 Bike Rentals** - Find and rent bikes with interactive location maps

### Location & Navigation
- **📍 Interactive Maps** - Full-screen map experiences with Leaflet integration
- **🗺️ Location Services** - Explore destinations and find nearby services
- **📍 Current Location Tracking** - GPS-based location detection with red markers

### Emergency & Utilities
- **🚨 Emergency Services** - Quick access to police stations, hospitals, and emergency contacts
- **💱 Currency Converter** - Real-time currency conversion for international travel
- **🌤️ Weather Forecast** - Location-based weather information
- **🔤 Language Translator** - Multi-language translation support
- **👩‍⚕️ Women Safety** - Dedicated safety features and emergency contacts

## 🛠️ Tech Stack

- **Frontend**: React 18.3.1, Vite 6.0.1
- **Styling**: Tailwind CSS with Glass Morphism Effects
- **Routing**: React Router DOM v7
- **Maps**: Leaflet Maps with fullscreen support
- **Icons**: Lucide React
- **State Management**: React Context API
- **APIs**: Comprehensive Mock API System
- **Authentication**: Supabase integration

## 🎨 Design Features

- **Glass Morphism UI** - Modern translucent design with backdrop blur effects
- **Responsive Layout** - Optimized for mobile, tablet, and desktop
- **Smooth Animations** - Beautiful transitions and hover effects
- **Infinite Scrolling Brand Header** - Elegant animated branding
- **Interactive Maps** - Full-screen map experiences with smooth controls
- **Dark/Light Mode Support** - Adaptive UI themes

## 📱 Responsive Design

- **Mobile**: 2 cards per row for optimal touch interaction
- **Tablet**: 3-4 cards per row for balanced viewing
- **Desktop**: Full 7-card layout for maximum functionality
- **Large Screens**: Enhanced spacing and typography

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anshulkuthe02/Tripgood-site.git
   cd Tripgood-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📂 Project Structure

```
TripGood/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Auth/           # Authentication components
│   │   ├── Shared/         # Shared UI components
│   │   ├── BikeRentalsMap.jsx
│   │   ├── CabMap.jsx
│   │   ├── HeroSection.jsx
│   │   └── ...
│   ├── pages/              # Main application pages
│   │   ├── MoreOptions/    # Additional utility pages
│   │   ├── FlightPage.jsx
│   │   ├── HotelPage.jsx
│   │   └── ...
│   ├── api/                # Mock API services
│   ├── data/               # Static data files
│   ├── context/            # React context providers
│   ├── routes/             # Application routing
│   └── main.jsx            # Application entry point
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
└── README.md              # Project documentation
```

## 🔧 Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build optimized production bundle
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint for code quality checks

## 🌟 Key Components

### Interactive Maps
- **BikeRentalsMap**: Interactive bike rental locations with user location tracking
- **CabMap**: Real-time taxi booking with driver locations
- **Emergency Maps**: Police stations and hospitals with routing

### Travel Services
- **Flight Booking**: Complete flight search and booking system
- **Hotel Reservations**: Advanced hotel filtering and booking
- **Train Services**: PNR tracking and schedule management

### Utility Features
- **Currency Converter**: Real-time exchange rates
- **Weather Service**: Location-based weather forecasts
- **Translation**: Multi-language support

## 🔒 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_NAME=TripGood
```

## 🌐 Live Demo

**Repository**: [GitHub - Tripgood-site](https://github.com/anshulkuthe02/Tripgood-site)

*Live deployment coming soon on Vercel/Netlify*

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Anshul Kuthe**
- GitHub: [@anshulkuthe02](https://github.com/anshulkuthe02)
- Email: anshulkuthe02@gmail.com

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the lightning-fast build tool
- Tailwind CSS for the utility-first styling
- Leaflet for interactive maps
- Lucide React for beautiful icons

---

**Built with ❤️ for seamless travel experiences**

⭐ **Star this repository if you found it helpful!**

## 📊 Features Overview

| Feature | Status | Description |
|---------|--------|-------------|
| Flight Booking | ✅ Complete | Search flights with airport suggestions |
| Hotel Reservations | ✅ Complete | Find and book hotels worldwide |
| Train Services | ✅ Complete | PNR tracking and schedules |
| Taxi Booking | ✅ Complete | Real-time cab booking with maps |
| Bike Rentals | ✅ Complete | Interactive bike rental maps |
| Emergency Services | ✅ Complete | Police, hospitals, women safety |
| Currency Converter | ✅ Complete | Real-time exchange rates |
| Weather Service | ✅ Complete | Location-based forecasts |
| Translation | ✅ Complete | Multi-language support |
| Authentication | ✅ Complete | Supabase integration |

## 🔮 Future Enhancements

- [ ] Real API integrations
- [ ] Payment gateway integration
- [ ] Push notifications
- [ ] Offline support
- [ ] Mobile app version
- [ ] Advanced analytics
- [ ] Social media integration
- [ ] Booking history and management
