import { Icon } from "leaflet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Popup, TileLayer, Marker, useMap } from "react-leaflet";
import Routing from "../utils/Routing";

export const icon = new Icon({
  iconUrl: "/static/help.svg",
  iconSize: [45, 45],
});

const center = {
  lat: 51.505,
  lng: -0.09,
};

function DraggableMarker() {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const map = useMap();

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, [100]);
  });

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={icon}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}

export const MapComponent = ({ way, sizeTable }) => {
  const mapRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      mapRef.current.invalidateSize();
    }, [100]);
  }, [sizeTable]);

  return (
    <MapContainer ref={mapRef} center={center} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <DraggableMarker /> */}
      <Routing way={way} />
    </MapContainer>
  );
};
