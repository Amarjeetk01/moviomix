import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.scss"
import { fetchDataFromApi } from "../../../utilits/Api";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../../components/movieCard/movieCard";

import Spinner from "../../../components/spinner/Spinner";
import PageNotFound from "../../404/PageNotFound";
import { useParams } from "react-router-dom";


const VisitTreading = () => {
    const { endpoint } = useParams();

  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const fetchInitialData = async () => {
    setLoading(true);
    const res = await fetchDataFromApi(`/trending/movie/${endpoint}`);
    setData(res);
    setPageNum((prev) => prev + 1);
    setLoading(false);
  };

  const fetchNextPageData = async () => {
    const res = await fetchDataFromApi(`/trending/movie/${endpoint}?page=${pageNum}`);
    if (data?.results) {
      setData((prevData) => ({
        ...prevData,
        results: [...prevData.results, ...res.results],
      }));
    } else {
      setData(res);
    }
    setPageNum((prev) => prev + 1);
  };

  useEffect(() => {
    setData(null);
    setPageNum(1);
    // setNext(next);
    fetchInitialData();
  }, []);
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className="visitPage">
      <ContentWrapper>
        <div className="pageTitle">
        <span>
            {`Explore ${capitalizeFirstLetter(endpoint)} Treading Movies`}
        </span>
        </div>
        {loading && <Spinner />}
        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item) => {
                  if (item.media_type === "person") return null;
                  return (
                    <MovieCard
                      key={item.id} 
                      data={item}
                      mediaType={endpoint}
                    />
                  );
                })}
              </InfiniteScroll>
            ) : (
              <PageNotFound />
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default VisitTreading ;
