import { combineReducers, configureStore } from "@reduxjs/toolkit";

import counter from "./slices/counter";
import { rickAndMortyApi } from "./services/rickAndMortyApi";
import snackbar from "./slices/snackbar";

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
	snackbar,
	counter,
	[rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
});

const setupStore = (preloadedState: any) => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware: () => string | any[]) => getDefaultMiddleware().concat(rickAndMortyApi.middleware),
		preloadedState,
	});
};

export default setupStore;
