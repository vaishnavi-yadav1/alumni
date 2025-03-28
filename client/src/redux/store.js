import { combineReducers, configureStore } from '@reduxjs/toolkit'
import alumniReducer from './alumni/alumniSlice';
import {persistReducer,persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { version } from 'mongoose';


const rootReducer = combineReducers({alumni:alumniReducer})

const persistConfig={
  key:'root',
  storage,
  version:1,
};

const persistedReducer=persistReducer(persistConfig,rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:false,
    }),
});

export const persistor=persistStore(store);