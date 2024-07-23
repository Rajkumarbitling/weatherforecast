import { createSlice } from '@reduxjs/toolkit';

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    city: 'Mumbai',
    weatherData: null,
    loading: false,
    error: null,
  },
  reducers: {
    updateCity: (state, action) => {
      state.city = action.payload;
    },
    fetchWeatherRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherSuccess: (state, action) => {
      state.loading = false;
      state.weatherData = action.payload;
    },
    fetchWeatherFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  updateCity,
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} = weatherSlice.actions;

export default weatherSlice.reducer;