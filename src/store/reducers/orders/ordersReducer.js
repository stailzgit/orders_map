import { OrdersAction } from "./types";

import { orders, points } from "./data";

const initialState = {
  points: points,
  orders: orders,
  currentOrderId: "1",
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case OrdersAction.SET_LOADING_POINT:
      {
        const { orderId, pointId } = action.payload;
        return {
          ...state,
          orders: state.orders.map((order) =>
            order.id === orderId ? {...order, loading: pointId } : order
          ),
        };
      }

    case OrdersAction.SET_UNLOADING_POINT:
      {
        const { orderId, pointId } = action.payload;
        return {
          ...state,
          orders: state.orders.map((order) =>
            order.id === orderId ? {...order, unLoading: pointId } : order
          ),
        };
      }

    case OrdersAction.SET_CURRENT_ORDER:
      return {...state, currentOrderId: action.payload };

    default:
      return state;
  }
}