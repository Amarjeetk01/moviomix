import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import LoadMorePoster from "../../assets/load.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

import "./style.scss";

const Carousel = ({ data, loading, endpoint, title, more }) => {

    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    const skItem = () => {
        return (
            <div className="skeletonItem" key={`skeleton-${Math.random()}`}>
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    const rightMore = LoadMorePoster;

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRightNav arrow"
                    onClick={() => navigation("right")}
                />

                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                            const posterUrl = item.poster_path
                                ? `${url.poster}${item.poster_path}`
                                : PosterFallback;

                            return (
                                <div
                                    key={item.id}
                                    className="carouselItem"
                                    onClick={() =>
                                        navigate(`/${item.media_type || endpoint}/${item.id}`)
                                    }
                                >
                                    <div className="posterBlock">
                                        <Img src={posterUrl} alt={item.title || item.name || 'Poster'} />
                                        <CircleRating
                                            rating={item.vote_average?.toFixed(1) || 'N/A'}
                                        />
                                        <Genres
                                            data={item.genre_ids?.slice(0, 2) || []}
                                        />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">
                                            {item.title || item.name}
                                        </span>
                                        <span className="date">
                                            {dayjs(item.release_date || item.first_air_date).format(
                                                "MMM D, YYYY"
                                            )}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                        {data?.length > 0 && (
                            <div className="carouselItem" onClick={more}>
                                <div className="posterBlock">
                                    <Img src={rightMore} alt="Load More" />
                                </div>
                                <div className="textBlock">
                                    <span className="title">👆🏻Load More...</span>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {Array(5).fill(null).map((_, index) => skItem(index))}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Carousel;
