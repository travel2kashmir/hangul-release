import { configureStore } from '@reduxjs/toolkit'; //redux function to create store
import bookingReducer from './hangulSlice'; //reducers to work (data and func,factory ka link)
import { createWrapper } from 'next-redux-wrapper'; //wrapping class for persist
import { persistReducer, persistStore } from 'redux-persist'; //simple reducer ,simple store persist
import storage from 'redux-persist/lib/storage'; //local storage instance

const persistConfig = {
    key: 'root', //what is key of storage in local storage
    storage, // which storage we are talking about 
};

const persistedReducer = persistReducer(persistConfig, bookingReducer); //to convert normal reducer to persist reducer

const makeStore = () => {
    const store = configureStore({ reducer: persistedReducer }); //we are making normal redux store
    store.__persistor = persistStore(store); //changing to persist store , __anyname is adding proto to object
    return store;
};
export const wrapper = createWrapper(makeStore);