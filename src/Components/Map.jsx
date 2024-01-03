import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";

import Button from "./Button";
import useCities from "../hooks/useCities";
import styles from "./Map.module.css";
import useGeoLocation from "../hooks/useGeoLocation";
import useUrlPosition from "../hooks/useUrlPosition";

export default function Map() {
  const { cities } = useCities();
  const { isLoading, location, getLocation } = useGeoLocation();
  const [mapLat, mapLng] = useUrlPosition();
  const [mapPositions, setMapPositions] = useState([15.9, 120.32]);

  useEffect(() => {
    if ((mapLng, mapLat)) setMapPositions([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (location) setMapPositions([location.lat, location.lng]);
  }, [location]);

  return (
    <div className={styles.mapContainer}>
      <Button type="btnPosition" clickFunction={getLocation} label="">
        {isLoading ? "Loading...." : "Get My Location"}
      </Button>
      <MapContainer
        center={mapPositions}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> {city.cityName}
            </Popup>
          </Marker>
        ))}

        <ChangePostion position={mapPositions} />
        <MapDetection />
      </MapContainer>
    </div>
  );
}

function ChangePostion({ position }) {
  const coordinateChange = useMap();
  coordinateChange.setView(position);
  return null;
}

function MapDetection() {
  const isNavigate = useNavigate();

  useMapEvent({
    click: (e) => isNavigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
