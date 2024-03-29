import countReducer from "../components/Count/store";
import combineReducers from "./combine-reducers";
import { Reducer } from "./types";

export const createStore = <T extends Reducer>(
  reducer: T
): {
  subscribe: (listener: Function) => void;
  dispatch: (action: Parameters<T>[1]) => void;
  getState: () => Parameters<T>[0];
  unsubscribe: (listener: Function) => void;
} => {
  let state = reducer({}, {});
  let listeners: Function[] = [];

  const subscribe = (listener: Function) => {
    listeners.push(listener);
  };

  const unsubscribe = (listener: Function) => {
    listeners = listeners.filter((l) => l !== listener);
  };

  let dispatch = (action: Parameters<T>[1]) => {
    state = reducer(state, action);
    console.log({ action, state });
    listeners.forEach((listener) => {
      listener();
    });
  };

  const getState = () => state;

  return { dispatch, subscribe, getState, unsubscribe };
};

const store = createStore(combineReducers({ count: countReducer }));

export default store;
