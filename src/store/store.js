import {
  applyMiddleware,
  configureStore,
  combineReducers,
  createStore,
} from "redux";
import ordersReducer from "./reducers/orders/ordersReducer";

const rootReducer = combineReducers({
  orders: ordersReducer,
});

export const store = createStore(rootReducer);