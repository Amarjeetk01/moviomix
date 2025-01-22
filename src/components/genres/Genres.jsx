import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

const Genres = ({ data }) => {
    const { genres } = useSelector((state) => state.home);

    const genreList = data
        ?.filter((g) => genres[g]?.name) // Filter out undefined or missing genre names
        .map((g) => (
            <div key={g} className="genre">
                {genres[g]?.name}
            </div>
        ));

    return <div className="genres">{genreList}</div>;
};

export default Genres;
