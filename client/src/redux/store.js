import { configureStore } from '@reduxjs/toolkit';
import alumniReducer from './user/alumniSlice.js';

export const store = configureStore({
    reducer: { alumni: alumniReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});
