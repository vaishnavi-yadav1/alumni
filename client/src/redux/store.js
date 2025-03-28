import { configureStore } from '@reduxjs/toolkit'
import alumniReducer from './alumni/alumniSlice';

export const store = configureStore({
  reducer: {alumni : alumniReducer},
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:false,
    }),
});