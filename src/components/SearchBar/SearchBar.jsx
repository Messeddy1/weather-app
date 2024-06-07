import {Button, Form} from "react-bootstrap";
import styles from  './SearchBar.module.scss'
import { Fragment,useEffect,useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { resetdata, setdata } from "../../redux/reducer";
import UseFetch from "../customFetch/UseFetch";
import PositionSvg from "../Svgs/PositionSvg";
export const SearchBar = () => {
    const dispatch = useDispatch()
    const [value,setValue]=useState(null);
    const wetherApi="ee851c63682fb66e808835b32634e03b";
    const api_Key='754960ac8e9a42d3a9259045e425506d';
    const [citeis,setCiteis]=useState([]);
    const [geolocation,setGeolocation]=useState(undefined);
    const [isCurrnatLocation,setIsCurrnatLocation]=useState(false);
    const [geo]=UseFetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=${api_Key}`);
    const getGeoLocation = ()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            setIsCurrnatLocation(true)
            setGeolocation({
                lon:position.coords.longitude,
                lat:position.coords.latitude,
            })
        })
    }
    useEffect(() => {
        getGeoLocation()
    }, []);
    useEffect(() => {
     getData()
    },[geolocation]);
   const handleChange =(e)=>{
    const {value}= e.currentTarget;
    setValue(value)
    if (geo !== undefined) {
 setCiteis(geo.map(data=>{
    const{lat,lon,city,country,formatted}=data;
    return {lat,lon,city,country,formatted}
  }))
    }
   }
   const getData=()=>{
    if (geolocation) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geolocation.lat}&units=metric&lon=${geolocation.lon}&appid=${wetherApi}`)
        .then(response => response.json())
        .then(json =>{
            const {name,wind,weather,sys,main,clouds}=json; 
            dispatch(setdata({name,wind,weather,sys,main,clouds}))})
    }
   }
const UsehandlchangeCiteis=(e,value)=>{
        if (value !==null) {
            const {lat,lon}=value;
            setIsCurrnatLocation(false)
        setGeolocation({
            lon,
            lat,
        })
         }
         else{
            dispatch(resetdata())
         }
    }
return (
        <Fragment>
            <Form>
                <Form.Group className={styles.searchContainer}>
                <Autocomplete 
               onChange={UsehandlchangeCiteis} className={styles.searchInput}
                getOptionLabel={(option)=>option.formatted}
                clearOnBlur={false}
                 renderInput={(params)=>
                    <TextField onChange={handleChange} {...params} label={'Enter your city ...'}/>}
                    options={citeis} />
                  <Button disabled={geolocation === undefined || isCurrnatLocation ===true} onClick={()=>{
                    getGeoLocation()
                }}> <PositionSvg/></Button>
                </Form.Group>
            </Form>
        </Fragment>
    )
}