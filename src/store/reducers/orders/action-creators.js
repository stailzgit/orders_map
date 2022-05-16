import { OrdersAction } from "./types";

export const ordersActionCreators = {
  setLoadingPoint: (pointId) => ({
    type: OrdersAction.SET_LOADING_POINT,
    payload: { pointId },
  }),

  setUnLoadingPoint: (pointId) => ({
    type: OrdersAction.SET_UNLOADING_POINT,
    payload: { pointId },
  }),

  setCurrentOrder: (orderId) => ({
    type: OrdersAction.SET_CURRENT_ORDER,
    payload: { orderId },
  }),
};