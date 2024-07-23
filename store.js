import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
          weather: weatherReducer,
        },
      });
  }