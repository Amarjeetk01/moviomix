import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hook/useFetch'
import Carousel from '../../../components/carousel/Carousel'
import { useMove } from '../../../components/MoveContext'
import { useNavigate } from 'react-router-dom'



const Upcoming = () => {
  const [name,setName]=useState("upcoming");
    const [endpoint,setEndpoint]=useState("movie");
    const {data,loading}=useFetch(`/${endpoint}/${name}`)
    const onTabChange=(tab)=>{
        setEndpoint(tab==="Movies"?"movie":"tv");
        setName(tab==="Movies"?"upcoming":"airing_today");
    }
    const navigate=useNavigate();
    const {move,setMove}=useMove();
    const more = () => {
      setMove(name); 
      navigate(`/${endpoint}/visit/${move}`);
      }
  return (
    <div className="carouselSection">
        <ContentWrapper>
        <span   className="carouselTitle pointer-cursor">{name==="upcoming"?("New"):("Airing")}</span>
            
        <SwitchTabs data={["Movies","TV"]} onTabChange={onTabChange}></SwitchTabs>
        </ContentWrapper>
        
        <Carousel data={data?.results} loading={loading } endpoint={endpoint} more={more} />
    </div>
  )
}

export default Upcoming;