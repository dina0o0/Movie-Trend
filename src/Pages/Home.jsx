import React, { useEffect, useState } from "react";
import axios from "axios";
import MediaItems from "./MediaItems";
import "../Styles/Home.scss";
import "swiper/css/effect-fade";
import Slide1 from "../Assets/Image/1.jpg";
import Slide2 from "../Assets/Image/2.jpg";
import Slide3 from "../Assets/Image/3.jpg";
import Slide4 from "../Assets/Image/4.jpg";
import Slide5 from "../Assets/Image/5.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/mousewheel';
import { Autoplay, EffectFade, Pagination, Navigation, Mousewheel, Keyboard } from "swiper/modules";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [people, setPeople] = useState([]);

  // const [selectedOption, setSelectedOption] = useState(
  //   localStorage.getItem('selectedOption') || 'الخيار الأول'
  // );

  // const handleSelectChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  // useEffect(() => {
  //   localStorage.setItem('selectedOption', selectedOption);
  // }, [selectedOption]);

  async function getTrending(mediaItem, callBack) {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaItem}/week?api_key=f597813c136fdbe4ff8e3e2976da14ad`
    );
    callBack(data.results);
    console.log(data.results);
  }
  useEffect(() => {
    getTrending("movie", setMovies);
    getTrending("tv", setTv);
    getTrending("person", setPeople);
  }, []);

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  return (
    <>
      {/* <div>
        <label htmlFor="options">اختر شيئًا:</label>
        <select id="options" value={selectedOption} onChange={handleSelectChange}>
          <option value="الخيار الأول">الخيار الأول</option>
          <option value="الخيار الثاني">الخيار الثاني</option>
          <option value="الخيار الثالث">الخيار الثالث</option>
        </select>
      </div> */}

      <Swiper
        centeredSlides={true}
        effect={"fade"}
        loop={true}
        mousewheel={{ enabled: true }}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        loading="lazy"
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={pagination}
        navigation={true}
        scrollbar={{ draggable: true }}
        grabCursor={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide className="group-swiper">
          <div className="text-swiper">
            <h1>
              jumanji: welcome to the <span>jungle</span>
            </h1>
            <p>from feb 16</p>
            <p>
              This movie is one of the best anime films I have ever seen.
            </p>
          </div>
          <img src={Slide1} alt="" />
        </SwiperSlide>

        <SwiperSlide className="group-swiper">
          <div className="text-swiper">
            <h1>
              kubo and the two <span>strings</span>
            </h1>
            <p>from feb 15</p>
            <p>
              This movie is one of the best anime films I have ever seen.
            </p>
          </div>
          <img src={Slide2} alt="" />
        </SwiperSlide>

        <SwiperSlide className="group-swiper">
          <div className="text-swiper">
            <h1>
              the hurricane <span>heist</span>
            </h1>
            <p>from apr 29</p>
            <p>
              This movie is one of the best anime films I have ever seen.
            </p>
          </div>
          <img src={Slide3} alt="" />
        </SwiperSlide>

        <SwiperSlide className="group-swiper">
          <div className="text-swiper">
            <h1>
              death <span>wish</span>
            </h1>
            <p>from apr 23</p>
            <p>
              This movie is one of the best anime films I have ever seen.
            </p>
          </div>
          <img src={Slide4} alt="" />
        </SwiperSlide>

        <SwiperSlide className="group-swiper">
          <div className="text-swiper ">
            <h1>
              <span>supersonic</span>
            </h1>
            <p>from apr 09</p>
            <p>
              This movie is one of the best anime films I have ever seen.
            </p>
          </div>
          <img src={Slide5} alt="" />
        </SwiperSlide>
      </Swiper>

      <h2>movies</h2>
      <Swiper
        slidesPerView={6}
        navigation={true}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        loading="lazy"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation, Keyboard]}
        className="mySwiper"
      >
        {movies.slice(0, 15).map((item, index) => (
          <SwiperSlide>
            <MediaItems key={index} item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <h2>t.v show</h2>
      <Swiper
        slidesPerView={6}
        navigation={true}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        loading="lazy"
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation, Keyboard]}
        className="mySwiper"
      >
        {tv.slice(0, 15).map((item, index) => (
          <SwiperSlide>
            <MediaItems key={index} item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <h2>celebrities</h2>
      <Swiper
        slidesPerView={6}
        navigation={true}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        loading="lazy"
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation, Keyboard]}
        className="mySwiper Celebrities."
      >
        {people.slice(0, 15).map((item, index) => (
          <SwiperSlide>
            <MediaItems key={index} item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}