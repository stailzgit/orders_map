import { OrdersAction } from "./types";

import { orders, points } from "./data";
import { createSelector } from "reselect";
import { toLatLng } from "../../../utils/toLatLng";

const initialState = {
  points: points,
  orders: orders,
  currentOrderId: "1",
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case OrdersAction.SET_LOADING_POINT: {
      const { pointId } = action.payload;
      return {
        ...state,
        orders: state.orders?.map((order) =>
          order.id === state.currentOrderId
            ? { ...order, loading: pointId }
            : order
        ),
      };
    }

    case OrdersAction.SET_UNLOADING_POINT: {
      const { pointId } = action.payload;
      return {
        ...state,
        orders: state.orders?.map((order) =>
          order.id === state.currentOrderId
            ? { ...order, unLoading: pointId }
            : order
        ),
      };
    }

    case OrdersAction.SET_CURRENT_ORDER:
      return { ...state, currentOrderId: action.payload.orderId };

    default:
      return state;
  }
}

//Selectors

const selectPoints = ({ points }) => points;
const selectOrders = ({ orders }) => orders;
const selectCurrentOrderId = ({ currentOrderId }) => currentOrderId;

//Достать id точек погрузки и разгрузки из массива заказов
const currentOrderPoints = createSelector(
  selectCurrentOrderId,
  selectOrders,
  (id, orders) => {
    const { loading, unLoading } = orders?.filter(
      (order) => order.id === id
    )[0];
    return [loading, unLoading];
  }
);

//Сформировать точки выбранного пути
export const selectCurrentWayPoints = createSelector(
  currentOrderPoints,
  selectPoints,
  (currentPoints, points) => {
    const currentWay = currentPoints.map(
      (id) => points?.filter((point) => point.id === id)[0]
    );
    return toLatLng(currentWay);
  }
);
