import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import './styles.css';
import 'swiper/css';
import { useEffect } from 'react';

const data = [
  {
    title: "2015",
    description: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"
  },
  {
    title: "2015",
    description: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"
  },
  {
    title: "2015",
    description: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"
  }
]
function Scrollbar() {
  useEffect(() => {
    new Swiper('.swiper', {
      // configure Swiper to use modules
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        currentClass: "swiper-pagination"
      },
      slidesPerView: 3
    });
  }, [])
  data;

  return <>
    <div className="swiper">
      <div className="swiper-wrapper">

        <div className="swiper-slide">Slide 1</div>
        <div className="swiper-slide">Slide 2</div>
        <div className="swiper-slide">Slide 3</div>

        <div className="swiper-slide">Slide 11</div>
        <div className="swiper-slide">Slide 22</div>
        <div className="swiper-slide">Slide 33</div>
      </div>

      <div className="swiper-button swiper-button-prev"></div>
      <div className="swiper-button swiper-button-next"></div>
      {/* 
      <div className="swiper-info">
        <div>06/06</div>
        <div className="swiper-buttons">
          <div className="swiper-button swiper-button-prev"></div>
          <div className="swiper-button swiper-button-next"></div>
        </div>
      </div>

      <div className="swiper-pagination">. . .</div>



      <div className="swiper-scrollbar">

      </div> */}
    </div>
  </>
}

export default Scrollbar