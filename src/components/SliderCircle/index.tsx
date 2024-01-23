
import { useRef, useState } from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper as TSwiper } from 'swiper/types';

import { EventsCategory } from '../../pages/HomePage';
import './styles.scss';

type DotProps = {
  data: { label: string | number };
  position: { x: number, y: number };
  disable: boolean;
  onClick: () => void;
}

function Dot({ position, data, disable, onClick }: DotProps) {
  const transform = `translate(${position.x || 0}px, ${position.y}px)`;

  return <div className={classNames("sliderCircle_dot", { "sliderCircle_dot_disable": disable })}
    style={{ transform }}
    onClick={onClick}
  >
    <span>{data.label}</span>
  </div>
}

type SliderCircleProps = {
  data: EventsCategory[],
  onChangeSlide?: (idx: number) => void;
}

function SliderCircle({ data, onChangeSlide }: SliderCircleProps) {
  const [swiperDotRef, setSwiperDotRef] = useState(null as unknown as TSwiper);
  const [swiperRef, setSwiperRef] = useState(null as unknown as TSwiper);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [targetIdx, setTargetIdx] = useState(0);
  let ref = useRef(null);

  const getPosition = (idx: number, length: number, diff: number) => {
    const step = Math.PI * 2 / length;
    return { x: Math.cos((idx - (selectedIdx || 0)) * step + diff) * 525 * 0.5, y: Math.sin((idx - (selectedIdx || 0)) * step + diff) * 525 * 0.5 }
  }

  const slideTo = (index: number) => {
    swiperRef.slideTo(index, 0);
  };

  const handleChangeSlide = (idx: number, length: number, noChangePagination?: boolean) => {
    const step = 360 / length;
    const left = length - idx + selectedIdx;
    const right = selectedIdx - idx;
    const dir = Math.abs(left) <= Math.abs(right) ? left : right;
    const transformEnd = dir * step;

    if (!ref.current) return;

    const target = ref.current as HTMLElement;

    let animation = target.animate([
      { transform: `rotate(${0}deg)` },
      { transform: `rotate(${transformEnd}deg)` }
    ], 600 * Math.abs(dir));

    setTargetIdx(idx);

    animation?.addEventListener('finish', () => {
      target.style.transform = `rotate(${0}deg)`;
      setSelectedIdx(idx);
      if (!noChangePagination) slideTo(idx);
      swiperDotRef.slideTo(idx, 0);
      onChangeSlide?.(idx)
    });
  }

  return <>
    <div className="sliderCircle" ref={ref}>
      <div className="sliderCircle_body"></div>

      {
        data.map((__, idx, arr) => (
          <Dot key={idx}
            data={{ label: idx + 1 }}
            disable={targetIdx !== idx}
            position={getPosition(idx, arr.length, -Math.PI / 2 + Math.PI / arr.length)}
            onClick={() => { handleChangeSlide(idx, arr.length); }}
          />
        ))
      }
    </div>

    <Swiper
      navigation={true}
      modules={[Navigation, Pagination]}
      className="categoriessSwiper"
      onSwiper={setSwiperRef}
      onNavigationPrev={() => handleChangeSlide(selectedIdx - 1, data.length, true)}
      onNavigationNext={() => handleChangeSlide(selectedIdx + 1, data.length, true)}
      pagination={{
        type: 'fraction',
        currentClass: "categoriessSwiper-pagination",
        formatFractionCurrent: (e) => e < 10 ? "0" + e : e,
        formatFractionTotal: (e) => e < 10 ? "0" + e : e,
        renderFraction: (currentClass, totalClass) => (`<div>
          <span class="${currentClass}"></span>/
          <span class="${totalClass}"></span>
        </div>`),
      }}
    >
      {data.map((__, idx) => <SwiperSlide key={idx} />)}
    </Swiper>

    <Swiper
      modules={[Pagination]}
      onSwiper={setSwiperDotRef}
      className="categoriessSwiperDots"
      pagination={{ type: 'bullets', currentClass: "categoriessSwiperDots-pagination", }}
    >
      {data.map((__, idx) => <SwiperSlide key={idx + "_s"} />)}
    </Swiper>
  </>
}

export default SliderCircle