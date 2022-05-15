// import L from "leaflet";
// import { createControlComponent } from "@react-leaflet/core";
// import "leaflet-routing-machine";

// const createRoutineMachineLayer = ({ way }) => {
//   const instance = L.Routing.control({
//     waypoints: [L.latLng(...way.a), L.latLng(...way.b)],
//     lineOptions: {
//       styles: [{ color: "red", weight: 5 }],
//     },
//     show: false,
//     addWaypoints: false,
//     routeWhileDragging: true,
//     draggableWaypoints: true,
//     fitSelectedRoutes: true,
//     showAlternatives: false,
//     createMarker: function (i, waypoint, n) {
//       const marker = L.marker(waypoint.latLng, {
//         draggable: true,
//         bounceOnAdd: false,
//         icon: L.icon({
//           iconUrl: '/public/static/',
//           iconSize: [38, 95],
//           iconAnchor: [22, 94],
//           popupAnchor: [-3, -76],
//           shadowUrl: './assets/global/img/marker-shadow.png',
//           shadowSize: [68, 95],
//           shadowAnchor: [22, 94]
//         })
//       });
//       return marker;
//     }
//   });

//   return instance;
// };

// const RoutingMachine = createControlComponent(createRoutineMachineLayer);

// export default RoutingMachine;

import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine";

L.Marker.prototype.options.icon = L.icon({
  // iconUrl: "/public/static/help.svg",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

const toLatLng = (way) => {
  return way.map((point) => L.latLng(point.lat, point.lng));
};

export default function Routing({ way }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: toLatLng(way),
      // waypoints: [L.latLng(...way.a), L.latLng(...way.b)],
      routeWhileDragging: true,
      show: false,
      fitSelectedRoutes: true,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, way]);

  return null;
}