import { useEffect, useState } from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {fetchDataFromApi} from "./utilits/Api"
import { useSelector, useDispatch } from 'react-redux'
import {getApiConfiguration, getGenres} from "./store/homeSlice"
import Footer from './components/footer/Footer'
import Header from './components/header/Header';
import PageNotFound from './pages/404/PageNotFound'
import Home from './pages/home/Home'
import  Deatails  from './pages/details/Deatails'
import SearchResult from './pages/searchResult/SearchResult'
import Explore from './pages/explore/Explore'

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  },[])
  const fetchApiConfig = async () => {
    try {
      const response = await fetchDataFromApi("/configuration");
      // console.log(response);
      
      const url = {
        backdrop: response.images.secure_base_url + "original",
        poster: response.images.secure_base_url + "original",
        profile: response.images.secure_base_url + "original"
      };
      
      dispatch(getApiConfiguration(url));
    } catch (err) {
      console.log(err);
    }
  }

  const genresCall=async ()=>{
    let promises=[]
    let endPoint=["tv","movie"]
    let allGeneres={}
    endPoint.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
      
    })
    const data =await Promise.all(promises);
    data.map(({genres})=>{
      return genres.map((item)=>(allGeneres[item.id]=item))
    })

    dispatch(getGenres(allGeneres));
  }

  return (
    <>
      
      <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/:mediaType/:id" element={<Deatails/>}/>
      <Route path="/search/:query" element={<SearchResult/>}/>
      <Route path="/explore/:mediaType" element={<Explore/>}/>
      <Route path="*" element={<PageNotFound/>}/>
      </Routes>
       <Footer></Footer>
      </BrowserRouter>
      
     
    </>
  )
}

export default App
