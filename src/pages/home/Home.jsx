 import React from 'react'
import "./style.scss"
import HeroBanner from './heroBanner/HeroBanner'
import Treading from './treanding/Treading'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'
import Upcoming from './upComing/UPcoming'

const Home = () => {
  return (
    <div className='homePage'>
      <HeroBanner></HeroBanner>
      <Treading></Treading>
      <Upcoming></Upcoming>
      <Popular></Popular>
      <TopRated></TopRated>
    </div>
  )
}

export default Home