import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hook/useFetch";
import { useNavigate } from "react-router-dom";


const Trending = () => {
    const navigate=useNavigate();
    const [endpoint, setEndpoint] = useState("day");

    const { data, loading } = useFetch(`/trending/movie/${endpoint}`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    };

    const more = () => {
        navigate(`/visit-treading/${endpoint}`);
      }

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span   className="carouselTitle ">Trending</span>
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} more={more} />
        </div>
    );
};

export default Trending;