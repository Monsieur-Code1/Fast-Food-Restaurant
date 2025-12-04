import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

// Icons
const redIcon = L.icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const blueIcon = L.icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Map() {
  const defaultLocation = [29.993715, 31.119722]; // Restaurant location
  const [customerData, setCustomerData] = useState(null); // كل بيانات العميل
  const [distanceKm, setDistanceKm] = useState(null); // المسافة المباشرة
  const [routingControl, setRoutingControl] = useState(null);

  // حساب المسافة المباشرة
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  function LocationPicker() {
    const map = useMapEvents({
      click: async (e) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        // جلب بيانات الموقع من Nominatim
        const response = await fetch(`
          https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}
        `);
        const data = await response.json();
        const address = data.address || {};

        // حفظ كل بيانات العميل في متغير واحد
        const storedData = {
          country: address.country || '',
          province: address.state || address.county || '',
          city: address.city || address.town || address.village || '',
          district: address.suburb || address.neighbourhood || '',
          street: address.road || address.pedestrian || address.footway || '',
          lat,
          lng,
        };
        setCustomerData(storedData);

        // حساب المسافة المباشرة
        const dist = calculateDistance(
          lat,
          lng,
          defaultLocation[0],
          defaultLocation[1],
        );
        setDistanceKm(dist.toFixed(2));

        // Destructuring لسهولة الوصول لكل عنصر
        const {
          country,
          province,
          city,
          district,
          street,
          lat: userLat,
          lng: userLng,
        } = storedData;

        console.log('📌 بيانات العميل (destructured):');
        console.log('دولة:', country);
        console.log('محافظة:', province);
        console.log('مدينة:', city);
        console.log('حي/قرية:', district);
        console.log('شارع:', street);
        console.log('خط العرض (Lat):', userLat);
        console.log('خط الطول (Lng):', userLng);
        console.log('📏 المسافة المباشرة بالكيلومتر:', dist.toFixed(2), 'KM');

        // حذف أي خطوط قديمة
        map.eachLayer((layer) => {
          if (layer instanceof L.Polyline && !(layer instanceof L.Marker)) {
            map.removeLayer(layer);
          }
        });

        // 1️⃣ احذف الـ routing control القديم
        if (routingControl) routingControl.remove();

        // 2️⃣ احذف جميع الخطوط القديمة (Polyline)
        map.eachLayer((layer) => {
          if (layer instanceof L.Polyline && !(layer instanceof L.Marker)) {
            map.removeLayer(layer);
          }
        });

        // 3️⃣ احذف عناصر التحكم على اليمين
        document
          .querySelectorAll('.leaflet-routing-container')
          .forEach((el) => el.remove());

        // مسار جديد
        const control = L.Routing.control({
          waypoints: [
            L.latLng(defaultLocation[0], defaultLocation[1]),
            L.latLng(lat, lng),
          ],
          lineOptions: { styles: [{ color: 'blue', weight: 4 }] },
          addWaypoints: false,
          routeWhileDragging: false,
          show: false,
          createMarker: () => null,
          createInstructionMarker: () => null,
        }).addTo(map);

        setRoutingControl(control);
      },
    });

    return null;
  }

  return (
    <MapContainer
      center={defaultLocation}
      zoom={13}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <LocationPicker />

      {/* Restaurant marker */}
      <Marker position={defaultLocation} icon={redIcon} />

      {/* Customer marker */}
      {customerData && (
        <Marker
          position={[customerData.lat, customerData.lng]}
          icon={blueIcon}
        />
      )}
    </MapContainer>
  );
}
