import React, { useEffect, useState } from 'react';
import "./style.scss";
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hook/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

function HeroBanner() {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data, loading } = useFetch("/movie/upcoming");
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    if (data?.results?.length > 0) {
      const bg = url.backdrop + data.results[Math.floor(Math.random() * 20)]?.backdrop_path;
      setBackground(bg);
    }
  }, [data, url]); // Added `url` as a dependency

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const handleSearchClick = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="heroBanner">
      {!loading && background && (
        <div className="backdrop-img">
          <Img src={background} alt="Background" />
        </div>
      )}
      <div className="opacity_layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">Embark on a Journey of Discovery: Unveil Countless Movies, TV Shows, and Fascinating Personalities. Start Exploring Today</span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for movie or TV show...."
              onKeyUp={searchQueryHandler}
              onChange={handleInputChange}
              value={query}
            />
            <button onClick={handleSearchClick}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default HeroBanner;
