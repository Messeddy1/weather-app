import { createSlice } from "@reduxjs/toolkit"

const initialState={
    name:undefined,
    wind:{
        speed:undefined
    },
    weather:{
        icon:undefined,
    },
    sys:{
        country:undefined,
        sunrise:undefined
    },
    main:{
        feels_like:undefined,
        temp_max:undefined
    },
    clouds:undefined,
    isLoaded:false
}
export const WeatherSlice = createSlice({
    name:'weather',
    initialState,
    reducers:{
        setdata:(state,action)=>{
            const {name,wind,weather,sys,main,clouds}=action.payload
            state.clouds = clouds
            state.name = name
            state.wind = wind
            state.weather = weather[0]
            state.sys = sys
            state.main = main
            state.isLoaded = true
        },
        resetdata:(state)=>{
            state.isLoaded = false
        }
    }
})

export const{setdata,resetdata}=WeatherSlice.actions
export default WeatherSlice.reducer