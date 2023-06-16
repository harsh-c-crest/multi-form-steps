// Store index to create redux store

import { createStore } from "redux";
import reducer from "../reducers/user";

const store = createStore(reducer);

export default store;
