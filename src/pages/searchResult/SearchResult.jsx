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
const SearchResult = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    const fetchInitialData = async () => {

        setLoading(true);
        const res= await fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`);
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
        
    };

    const fetchNextPageData = async () => {
      const res= await fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`);
      if (data?.results) {
        setData({
            ...data,
            results: [...data?.results, ...res.results],
        });
      } else {
        setData(res);
      }
    setPageNum((prev) => prev + 1);
    };

    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
    }, [query]);

    return (
        <div className="searchResultsPage">
            {loading && <Spinner />}
            {!loading && (
                <ContentWrapper>
                    {data?.results?.length > 0 ? (
                        <>
                            <div className="pageTitle">
                                {`Search ${
                                    data?.total_results > 1
                                        ? "results"
                                        : "result"
                                } of '${query}'`}
                            </div>
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            fromSearch={true}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                      <PageNotFound/>
                        
                        
                    )}
                </ContentWrapper>
            )}
        </div>
    );
};

export default SearchResult;