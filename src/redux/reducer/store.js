import { legacy_createStore as createStore } from "redux";
import reducer from "./reduser";

let store = createStore(reducer);
export default store;