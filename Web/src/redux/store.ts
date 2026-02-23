import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counter, { CounterState } from "./slices/counter";

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
	counter,
});

const setupStore = (preloadedState: { counter: CounterState }) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
};

export default setupStore;
