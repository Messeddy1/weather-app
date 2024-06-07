import { configureStore } from "@reduxjs/toolkit";
import WeatherSlice from "./reducer";

export const Store = configureStore({
    reducer: {
        
        weather:WeatherSlice
    }
})