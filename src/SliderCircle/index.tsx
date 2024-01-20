
import { useRef, useState } from 'react';
import classNames from 'classnames';
import './styles.css';

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

function SliderCircle() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  let ref = useRef(null);

  const getPosition = (idx: number, length: number, diff: number) => {
    const step = Math.PI * 2 / length;
    return { x: Math.cos((idx - (selectedIdx || 0)) * step + diff) * 250, y: Math.sin((idx - (selectedIdx || 0)) * step + diff) * 250 }
  }

  const handleChangeSlide = (idx: number, length: number) => {
    const step = 360 / length;

    const left = length - idx + selectedIdx;
    const right = selectedIdx - idx;
    const dir = Math.abs(left) <= Math.abs(right) ? left : right;

    const transformStart = selectedIdx * step;
    const transformEnd = dir * step;

    console.log(selectedIdx, left, right, idx, dir, transformStart, transformEnd)
    console.log(ref)

    if (!ref.current) return;

    const target = ref.current as HTMLElement;
    setSelectedIdx(-1);

    let animation = target.animate([
      { transform: `rotate(${0}deg)` },
      { transform: `rotate(${transformEnd}deg)` }
    ], 600 * Math.abs(dir));

    animation?.addEventListener('finish', () => {
      target.style.transform = `rotate(${0}deg)`;
      setSelectedIdx(idx);
    });
  }


  return <div className="sliderCircle" ref={ref}>
    <div className="sliderCircle_body"></div>

    {
      [0, 1, 2, 3, 4].map((elem, idx, arr) => (
        <Dot key={idx}
          data={{ label: elem }}
          disable={selectedIdx !== idx}
          position={getPosition(idx, arr.length, -Math.PI / 2 + Math.PI / arr.length)}
          onClick={() => {

            handleChangeSlide(idx, arr.length);
          }}
        />
      ))
    }
  </div>
}

export default SliderCircle