import React from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

const ActorSlider = ({ cast }) => {
  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {cast.map((actor) => (
        <SwiperSlide key={actor.id}>
          <div className="flex flex-col items-center">
            {actor.profile_path ? (
              <img
                className="w-24 h-36 object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`}
                alt={actor.name}
              />
            ) : (
              <div className="w-24 h-36 bg-gray-400 rounded-md flex justify-center items-center text-gray-600">
                No Image
              </div>
            )}
            <p className="text-center mt-1">{actor.name}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ActorSlider;
