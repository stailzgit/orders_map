import { OrdersAction } from "./types";

export const ordersActionCreators = {
  setLoadingPoint: (orderId, pointId) => ({
    type: OrdersAction.SET_LOADING_POINT,
    payload: { orderId, pointId },
  }),
  setUnLoadingPoint: (orderId, pointId) => ({
    type: OrdersAction.SET_UNLOADING_POINT,
    payload: { orderId, pointId },
  }),
  setCurrentOrder: (orderId) => ({
    type: OrdersAction.SET_CURRENT_ORDER,
    payload: { orderId },
  }),
};