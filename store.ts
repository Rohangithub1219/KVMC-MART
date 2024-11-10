import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productCartSlice, productSlice, productWhishListSlice } from "./src/store/productSlice";
import { productApiSlice } from "./src/store/apiquery/productApiSlice";
import { categoryApiSlice } from "./src/store/apiquery/categoryApiSlice";
import { authApiSlice } from "./src/store/apiquery/AuthApiSlice";
import { slideApiSlice } from "./src/store/apiquery/slideApiSlice";
import { usersApiSlice } from "./src/store/apiquery/usersApiSlice";
import { userSlice } from "./src/store/userSlice";
import { commandApiSlice } from "./src/store/apiquery/CommandApiSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { countSlice } from "./src/store/countSlice";

const rootReducer = combineReducers({
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
    [slideApiSlice.reducerPath]: slideApiSlice.reducer,
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    [commandApiSlice.reducerPath]: commandApiSlice.reducer,
    products: productSlice.reducer,
    productWishlist: productWhishListSlice.reducer,
    productCart: productCartSlice.reducer,
    user: userSlice.reducer,
    count : countSlice.reducer
});

const persistConfig = {

    key: 'root', // Unique key for your state

    storage,

    stateReconciler: autoMergeLevel2

};
const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
    persistConfig,
    rootReducer
  );

  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], 
            },
        }).concat(
            productApiSlice.middleware,
            categoryApiSlice.middleware,
            authApiSlice.middleware,
            slideApiSlice.middleware,
            usersApiSlice.middleware,
            commandApiSlice.middleware
        ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
