import { useState } from "react"
import "./styles.scss"
import SliderCircle from "../../components/SliderCircle"
import Scrollbar from "../../components/Scrollbar"

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
  const currentData = data[selectedIdx];

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
        <div className="header text__color_fuxia">{currentData.startDate}</div>

        <div className="header text__color_iris">{currentData.finishDate}</div>
      </div>

      <SliderCircle data={data} onChangeSlide={setSelectedIdx}/>

      <Scrollbar data={currentData.events} />
    </main>
  </div>
  : null
}

export default HomePage