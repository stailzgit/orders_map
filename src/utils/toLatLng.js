import L from "leaflet";

export const toLatLng = (way) => {
  return way.map(({ point }) => L.latLng(...point));
};