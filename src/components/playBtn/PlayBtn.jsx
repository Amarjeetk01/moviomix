export const PlayIcon = () => {
    return (
        <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="80px"
    height="80px"
    viewBox="0 0 213.7 213.7"
    enableBackground="new 0 0 213.7 213.7"
    xmlSpace="preserve"
>
    <circle
        class="outer-circle"
        fill="none"
        stroke="#FF5733"
        stroke-width="8"
        cx="106.8"
        cy="106.8"
        r="103.3"
    ></circle>
    <circle
        class="inner-circle"
        fill="#FF5733"
        cx="106.8"
        cy="106.8"
        r="80"
    ></circle>
    <polygon
        class="play-icon"
        fill="#FFFFFF"
        points="80.5,60.5 143.5,106.8 80.5,153.1"
    >
        <animate
            attributeName="opacity"
            dur="0.5s"
            begin="mouseover"
            fill="freeze"
            from="1"
            to="0.7"
        />
        <animate
            attributeName="opacity"
            dur="0.5s"
            begin="mouseout"
            fill="freeze"
            from="0.7"
            to="1"
        />
    </polygon>
</svg>


    );
};