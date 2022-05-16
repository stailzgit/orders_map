import { useEffect, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Routing from "../utils/Routing";

const center = {
  lat: 51.505,
  lng: -0.09,
};

export const MapComponent = ({ sizeTable }) => {
  const mapRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      mapRef.current.invalidateSize();
    });
  }, [sizeTable]);

  return (
    <MapContainer ref={mapRef} center={center} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Routing />
    </MapContainer>
  );
};
