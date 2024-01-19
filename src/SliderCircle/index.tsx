
import { useState } from 'react';
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

  const getPosition = (idx: number, length: number, diff: number) => {
    const step = Math.PI * 2 / length;
    return { x: Math.cos(idx * step + diff) * 250, y: Math.sin(idx * step + diff) * 250 }
  }

  return <>
    <div className="sliderCircle">
      <div className="sliderCircle_body">

      </div>
      {
        [0, 1, 2, 3].map((elem, idx, arr) => (
          <Dot key={idx}
            data={{ label: elem }}
            disable={selectedIdx !== idx}
            position={getPosition(idx, arr.length, -Math.PI / arr.length)}
            onClick={() => setSelectedIdx(idx)}
          />
        ))
      }
    </div>
  </>
}

export default SliderCircle