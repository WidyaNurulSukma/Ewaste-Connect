import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function MapComponent() {
  useEffect(() => {
    // Inisialisasi peta
    const map = L.map('map').setView([-6.2, 106.8], 13); // Jakarta

    // Tambahkan tile layer dari OSM
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Tambahkan marker
    L.marker([-6.2, 106.8]).addTo(map)
      .bindPopup('Jakarta, Indonesia')
      .openPopup();
  }, []);

  return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
}

export default MapComponent;
