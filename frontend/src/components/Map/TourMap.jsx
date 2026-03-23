import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Leaflet default icons React-la sariyaa load aagaadhu, so direct links kudukrom
const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const TourMap = ({ lat, lng, city }) => {
  // Database-la lat/lng illana default-ah Chennai location
  const position = [lat || 13.0827, lng || 80.2707];

  const handleGetRoute = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        
        // Google Maps Route URL - Unique Touch logic
        const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${position[0]},${position[1]}&travelmode=driving`;
        window.open(url, '_blank');
      }, () => {
        alert("Location access deny pannitinga. Settings-la enable pannunga!");
      });
    } else {
      alert("Unga browser geolocation support pannala.");
    }
  };

  return (
    <div className='mt-4'>
      <h5 className='mb-3 fw-bold'>Location on Map <i className="ri-map-pin-2-line text-danger"></i></h5>
      <div style={{ height: '300px', width: '100%', borderRadius: '15px', overflow: 'hidden', border: '1px solid #ddd' }}>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <Marker position={position} icon={customIcon}>
            <Popup>{city} - Destination Spot</Popup>
          </Marker>
        </MapContainer>
      </div>
      
      {/* ROUTE BUTTON */}
      <button 
        onClick={handleGetRoute}
        className='btn mt-3 w-100 d-flex align-items-center justify-content-center gap-2'
        style={{background:'#0b2727', color:'#fff', padding:'10px', borderRadius:'10px', fontWeight:'600'}}
      >
        <i className="ri-direction-line"></i> Get Route from My Location
      </button>
    </div>
  );
};

export default TourMap;