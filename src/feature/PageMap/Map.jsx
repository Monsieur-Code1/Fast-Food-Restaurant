import React, { useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// أيقونات
const redIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const blueIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Map() {
  const defaultLocation = [29.993715, 31.119722]; // موقع المطعم

  const [customerData, setCustomerData] = useState(null); // بيانات العميل
  const [distanceKm, setDistanceKm] = useState(null); // المسافة المباشرة
  const [routingControl, setRoutingControl] = useState(null); // التحكم في المسار

  // حساب المسافة المباشرة بالكيلومتر
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

  // تحديد موقع العميل عند الضغط على الخريطة
  function LocationPicker() {
    const map = useMapEvents({
      click: async (e) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        // Geocoding عكسي للحصول على تفاصيل العنوان
        const response = await fetch(`
          https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        const address = data.address || {};

        // استخراج البيانات المطلوبة بدقة
        const storedData = {
          country: address.country || '',
          province: address.state || address.county || '',
          city: address.city || address.town || address.village || '',
          district: address.suburb || address.neighbourhood || address.quarter || '',
          street: address.road || address.pedestrian || address.footway || '',
          lat,
          lng,
        };

        setCustomerData(storedData);

        // حساب المسافة المباشرة
        const dist = calculateDistance(lat, lng, defaultLocation[0], defaultLocation[1]);
        setDistanceKm(dist.toFixed(2));

        // طباعة البيانات في console
        console.log('بيانات العميل:', storedData);
        console.log('المسافة المباشرة بالكيلومتر:', dist.toFixed(2), 'km');

        // إزالة أي مسار سابق
        if (routingControl) routingControl.remove();

        // إنشاء المسار على الطرق بين المطعم والعميل
        const control = L.Routing.control({
          waypoints: [
            L.latLng(defaultLocation[0], defaultLocation[1]),
            L.latLng(lat, lng),
          ],
          lineOptions: { styles: [{ color: 'blue', weight: 4 }] },
          show: false,
          addWaypoints: false,
          routeWhileDragging: false,
          createMarker: function(i, wp, nWps) {
            if (i === 0) return L.marker(wp.latLng, { icon: redIcon }); // المطعم
            if (i === nWps - 1) return L.marker(wp.latLng, { icon: blueIcon }); // العميل
            return null;
          },
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

      {/* Marker ثابت للمطعم */}
      <Marker position={defaultLocation} icon={redIcon} />

      {/* Marker للعميل */}
      {customerData && <Marker position={[customerData.lat, customerData.lng]} icon={blueIcon} />}
    </MapContainer>
  );
}