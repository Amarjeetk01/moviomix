import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../utilits/Api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/movieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";
import PageNotFound from "../404/PageNotFound";

const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { mediaType } = useParams();

  const fetchInitialData = async () => {
    setLoading(true);
    const res = await fetchDataFromApi(`/discover/${mediaType}`);
    setData(res);
    setPageNum((prev) => prev + 1);
    setLoading(false);
  };

  const fetchNextPageData = async () => {
    const res = await fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`);
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
    fetchInitialData();
  }, [mediaType]); 

  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageTitle">
          {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
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
                      mediaType={mediaType}
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

export default Explore;
