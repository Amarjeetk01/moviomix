import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hook/useFetch'
import Carousel from '../../../components/carousel/Carousel'
import { useNavigate } from 'react-router-dom';
import { useMove } from '../../../components/MoveContext'

const Popular = () => {
    const navigate=useNavigate();
    const { move, setMove } = useMove();
    const [endpoint,setEndpoint]=useState("movie");
    const {data,loading}=useFetch(`/${endpoint}/popular`)
    const onTabChange=(tab)=>{
        setEndpoint(tab==="Movies"?"movie":"tv");
    }
    // console.log("popular move: "+move);
     
    const more = () => {
      setMove("popular");
      // console.log("popular move :"+move);
    navigate(`/${endpoint}/visit/${move}`);
    }
  return (
    <div className="carouselSection">
        <ContentWrapper>
        <span className="carouselTitle">Popular</span>
            
        <SwitchTabs data={["Movies","TV"]} onTabChange={onTabChange}></SwitchTabs>
        </ContentWrapper>
        
        <Carousel data={data?.results} loading={loading } endpoint={endpoint} more={more} />
    </div>
  )
}

export default Popular;