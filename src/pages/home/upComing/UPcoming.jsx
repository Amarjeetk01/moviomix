import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hook/useFetch'
import Carousel from '../../../components/carousel/Carousel'



const Upcoming = () => {
  const [name,setName]=useState("upcoming");
    const [endpoint,setEndpoint]=useState("movie");
    const {data,loading}=useFetch(`/${endpoint}/${name}`)
    const onTabChange=(tab)=>{
        setEndpoint(tab==="Movies"?"movie":"tv");
        setName(tab==="Movies"?"upcoming":"airing_today");
    }
  return (
    <div className="carouselSection">
        <ContentWrapper>
        <span className="carouselTitle">{name==="upcoming"?("New"):("Airing today")}</span>
            
        <SwitchTabs data={["Movies","TV"]} onTabChange={onTabChange}></SwitchTabs>
        </ContentWrapper>
        
        <Carousel data={data?.results} loading={loading } endpoint={endpoint}/>
    </div>
  )
}

export default Upcoming;