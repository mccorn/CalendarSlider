import { useEffect, useRef, useState } from "react"
import "./styles.scss"
import SliderCircle from "../../components/SliderCircle"
import Scrollbar from "../../components/Scrollbar"
import { CSSTransition } from "react-transition-group"

export type TEvent = {
  date: string,
  description: string,
}

export type EventsCategory = {
  title: string,
  startDate: number,
  finishDate: number,
  events: TEvent[],
}

type HomePageProps = {
  data: EventsCategory[]
}

function HomePage({ data }: HomePageProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [targetIdx, setTargetIdx] = useState(0);
  const currentData = data[selectedIdx];

  const [startDate, setStartDate] = useState(currentData.startDate);
  const [finishDate, setFinishDate] = useState(currentData.finishDate);

  const startDateRef = useRef(null);
  const finishDateRef = useRef(null);
  const scrollbarRef = useRef(null);

  let interval: NodeJS.Timeout;

  useEffect(() => {
    if (targetIdx == selectedIdx) return;

    if (interval) clearInterval(interval);

    let value = data[selectedIdx].startDate;
    let newValue = data[targetIdx].startDate;
    let dir = newValue > value ? 1 : -1;

    let value2 = data[selectedIdx].finishDate;
    let newValue2 = data[targetIdx].finishDate;
    let dir2 = newValue > value ? 1 : -1;

    interval = setInterval(() => {
      if (value === newValue) {
        clearInterval(interval);
        setStartDate(newValue);
        setFinishDate(newValue2);
        return;
      }

      if (startDateRef.current) {
        (startDateRef.current as HTMLElement).innerHTML = (value += dir).toString();
      }

      if (finishDateRef.current) {
        (finishDateRef.current as HTMLElement).innerHTML = (value2 += dir2).toString();
      }
    }, 600 / Math.abs(newValue - value))

    return () => { if (interval) clearInterval(interval); }
  }, [targetIdx])


  return currentData ? <div className="page homePage">
    <main className="">
      <div className="backgroundLines">
        <div className="line line_vertical"></div>
        <div className="line line_vertical"></div>
        <div className="line line_vertical"></div>

        <div className="line line_horizontal"></div>
      </div>
      <div className="homePage_header">
        <h1>Исторические даты</h1>
      </div>

      <div className="flex flex_around">
        <div className="header text__color_fuxia" ref={startDateRef}>{startDate}</div>

        <div className="header text__color_iris" ref={finishDateRef}>{finishDate}</div>
      </div>

      <SliderCircle data={data} onChangeSlide={setSelectedIdx} onStartChangeSlide={setTargetIdx} />

      <CSSTransition
        in={selectedIdx === targetIdx}
        timeout={{ enter: 600, exit: 300 }}
        classNames="scrollbar scrollbar"
        unmountOnExit
        appear
        nodeRef={scrollbarRef}
      >
        <div ref={scrollbarRef}>
          <Scrollbar data={currentData.events} />
        </div>
      </CSSTransition>
    </main>
  </div>
    : null
}

export default HomePage