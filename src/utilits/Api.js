import axios from "axios"

const BASE_URL = "https://api.themoviedb.org/3";
// const TOKEN = process.env.REACT_APP_TMBD_TOKEN;
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDBmYzA4NDU2MjFlZTQ1MmY0NWZkNTVkYTNlM2M3MSIsInN1YiI6IjY0ZGI1Yjk2ZjQ5NWVlMDI5MGU1YTRmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tOm0LKITnUPhmwpAelOFRxVJ-zwCRkFVwg6p4RfWmJI";


const headers = {
  Authorization: "Bearer " + TOKEN,
};

 export  const fetchDataFromApi=async (url, params)=>{
    try{
        const {data}=await axios.get(BASE_URL + url,{
            headers,
            params
        })
        return data;
    } catch(err){
        return err;
    }
 }