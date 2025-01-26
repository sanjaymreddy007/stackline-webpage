import { configureStore } from '@reduxjs/toolkit';
import salesReducer from '../features/salesSlice';

const store = configureStore({
    reducer: {
        sales: salesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
