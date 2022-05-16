import { combineReducers, createStore } from "redux";

import ordersReducer from "./reducers/orders/ordersReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  orders: ordersReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());