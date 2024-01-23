
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper as TSwiper } from 'swiper/types';

import { EventsCategory } from '../../pages/HomePage';
import './styles.scss';
import { CSSTransition } from 'react-transition-group';

type DotProps = {
  data: { label: string | number, title: string | number };
  position: { x: number, y: number };
  disable: boolean;
  showTitle: boolean;
  onClick: () => void;
}

const Dot = forwardRef(function ({ position, data, disable, showTitle, onClick }: DotProps, ref) {
  const transform = `translate(${position.x || 0}px, ${position.y || 0}px)`;
  const nodeRef = useRef(null);

  return <div className={classNames("sliderCircle_dot", { "sliderCircle_dot_disable": disable })}
    style={{ transform }}
    onClick={onClick}
  >
    <CSSTransition
      in={showTitle}
      timeout={{ enter: 400, exit: 0 }}
      classNames="sliderCircle_dot_label sliderCircle_dot_label"
      unmountOnExit
      appear
      nodeRef={nodeRef}
    >
      <div ref={nodeRef}>{data.title}</div>
    </CSSTransition>
    <span ref={ref as ForwardedRef<HTMLElement>}>{data.label}</span>
  </div>
})

type SliderCircleProps = {
  data: EventsCategory[],
  onChangeSlide?: (idx: number) => void;
  onStartChangeSlide?: (idx: number) => void;
}

function SliderCircle({ data, onChangeSlide, onStartChangeSlide }: SliderCircleProps) {
  const [swiperDotRef, setSwiperDotRef] = useState(null as unknown as TSwiper);
  const [swiperRef, setSwiperRef] = useState(null as unknown as TSwiper);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [targetIdx, setTargetIdx] = useState(0);
  let ref = useRef(null);
  const dotsRefs: any[] = [];

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
    const animTime = 600 * Math.abs(dir);

    if (!ref.current) return;

    const target = ref.current as HTMLElement;

    let animation = target.animate([
      { transform: `rotate(0deg)` },
      { transform: `rotate(${transformEnd}deg)` }
    ], animTime);

    setTargetIdx(idx);
    onStartChangeSlide?.(idx);

    animation?.addEventListener('finish', () => {
      target.style.transform = `rotate(0deg)`;
      setSelectedIdx(idx);
      if (!noChangePagination) slideTo(idx);
      swiperDotRef.slideTo(idx, 0);
      onChangeSlide?.(idx)
    });

    const dot = dotsRefs[idx];
    dot.ref.current.animate([
      { transform: `rotate(0deg)` },
      { transform: `rotate(${-transformEnd}deg)` }
    ], animTime);
  }

  return <>
    <div className="sliderCircle" ref={ref}>
      <div className="sliderCircle_body"></div>

      {
        data.map((item, idx, arr) => (
          dotsRefs[idx] = <Dot key={idx}
            data={{ label: idx + 1, title: item.title }}
            disable={targetIdx !== idx}
            showTitle={targetIdx === idx && targetIdx === selectedIdx}
            position={getPosition(idx, arr.length, -Math.PI / 2 + Math.PI / arr.length)}
            onClick={() => { handleChangeSlide(idx, arr.length); }}
            ref={useRef()}
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