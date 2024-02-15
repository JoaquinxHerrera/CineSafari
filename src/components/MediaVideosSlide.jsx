import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { SwiperSlide } from "swiper/react";
import { getMovieVideos } from "../Request";


import NavigationSwiper from "./NavigationSwiper";

const MediaVideo = ({ videos }) => {
  const iframeRef = useRef();

  useEffect(() => {
    console.log("ifram");
    const height = iframeRef.current.offsetWidth * 9 / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, [videos]);

  return (
    <>
      {videos.map((video, index) => (
        <SwiperSlide key={index}>
          <MediaVideo video={video} />
          <p>{video.name}</p>
          <p>{video.type}</p>
        </SwiperSlide>
      ))}
    </>
  );
};

const MediaVideosSlide = ({ videos }) => {
  console.log({ videos });
  return (
    <>
      {videos.map((video, index) => (
        <SwiperSlide key={index}>
          <MediaVideo video={video} />
        </SwiperSlide>
      ))}
    </>
  );
};

export default MediaVideosSlide;