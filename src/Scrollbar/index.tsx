import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import { TEvent } from '../HomePage';
import "./styles.css";

type ScrollbarProps = {
  data: TEvent[]
}

function Scrollbar({data}: ScrollbarProps) {
  console.log(data)
  return <>
    <Swiper navigation={true} 
    modules={[Navigation]} 
    className="eventsSwiper" 
    slidesPerView={3}  
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