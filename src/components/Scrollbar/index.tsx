import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Navigation } from 'swiper/modules';

import 'swiper/css';
import { TEvent } from '../../pages/HomePage';
import "./styles.scss";
import { useState } from 'react';

type ScrollbarProps = {
  data: TEvent[]
}

function Scrollbar({ data }: ScrollbarProps) {
  const [slidesCount, setSlidesCount] = useState(1.5);

  window.onresize = () => {
    if (window.innerWidth < 900 && slidesCount !== 1.5) setSlidesCount(1.5);
    if (window.innerWidth >= 900 && slidesCount !== 3) setSlidesCount(3);
  }
  return <>
    <Swiper navigation={true}
      modules={[Navigation, EffectCreative]}
      className="eventsSwiper"
      slidesPerView={slidesCount}
      spaceBetween={80}
    >
      {
        data.map((elem, idx) => <SwiperSlide key={idx}>
          <h4 className="text_color_blue">{elem.date}</h4>
          <div>{elem.description}</div>
        </SwiperSlide>)
      }
    </Swiper>
  </>
}

export default Scrollbar