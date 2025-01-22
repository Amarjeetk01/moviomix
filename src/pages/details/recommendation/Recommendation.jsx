import React from 'react'

import useFetch from '../../../hook/useFetch'
import Carousel from '../../../components/carousel/Carousel'



const Recommendations = ({ mediaType, id }) => {

    const { data, loading } = useFetch(
        `/${mediaType}/${id}/recommendations`);
    const title="Recommendations";
  return (
    
    

    <Carousel data={data?.results} loading={loading } endpoint={mediaType} title={title}/>
        
    

  );
}

export default Recommendations;