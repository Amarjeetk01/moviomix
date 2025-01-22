import React from 'react'
import "./style.scss"
import { useParams } from 'react-router-dom';

import DetailsBanner from '../home/detailBanner/DetailsBanner'
import useFetch from '../../hook/useFetch';
import Similar from './similar/Similar';
import Recommendations from './recommendation/Recommendation';
import Cast from './cast/Cast';

const Details = () => {
  const {mediaType,id}=useParams();
  const {data}=useFetch(`/${mediaType}/${id}/videos`);
  
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  return (
    <div>
    {/* <DetailsBanner video={data?.results?.[0]}  crew={credits?.crew}></DetailsBanner> */}
    <DetailsBanner video={data?.results?.[Math.floor(Math.random() * data.results.length)]} crew={credits?.crew} />
    <Cast data={credits?.cast} loading={creditsLoading} />
    <Similar mediaType={mediaType} id={id} />
    <Recommendations mediaType={mediaType} id={id} />
    </div>
    
  )
};
export default Details;
