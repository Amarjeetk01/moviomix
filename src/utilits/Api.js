import axios from "axios"

const BASE_URL = "https://api.themoviedb.org/3";
// const TOKEN = process.env.REACT_APP_TMBD_TOKEN;
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzNiNjE1NWNhMDQzNWZmMjhmOGIyMTUwYmI0ZDc5OCIsIm5iZiI6MTczNzU2NjMyNi41ODYsInN1YiI6IjY3OTEyODc2YmU5YTlhYTc4Mjc3NjIxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R9h9KVGOQSisJJVyS4FxUtPt3341rVxSBQeZFKtoZNE";
const headers = {
  Authorization: "Bearer " + TOKEN,
};
 export  const fetchDataFromApi=async (url, params)=>{
    try{
        const {data}=await axios.get(BASE_URL + url,{
            headers,
            params: {
        
        })
        return data;
    } catch(err){
        return err;
    }
 }
