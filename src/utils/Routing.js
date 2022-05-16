import { useEffect } from "react";
//Leaflet
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine";
//Hooks
import { useMap } from "react-leaflet";
import { useSelector } from "react-redux";
//Utils
import { selectCurrentWayPoints } from "../store/reducers/orders/ordersReducer";

const updateRouting = (map, way) => {
  if (!map) return;

  const routingControl = L.Routing.control({
    waypoints: way,
    routeWhileDragging: true,
    show: false,
    fitSelectedRoutes: true,
    createMarker: function(i, waypoint, n) {
      const marker = L.marker(waypoint.latLng, {
        draggable: true,
        bounceOnAdd: false,
        icon: L.icon({
          iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          iconSize: [30],
        }),
      });
      return marker;
    },
  }).addTo(map);

  return routingControl;
};

export default function Routing() {
  const map = useMap();
  const way = useSelector((state) => selectCurrentWayPoints(state.orders));

  useEffect(() => {
    const routingControl = updateRouting(map, way);
    return () => map.removeControl(routingControl);
  }, [map, way]);

  return null;
}