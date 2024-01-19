// import Scrollbar from "./Scrollbar"
import SliderCircle from "./SliderCircle";
import "./styles.css";


function App() {
  return <div className="page homePage">
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
        <div className="header text__color_fuxia">2015</div>

        <div className="header text__color_iris">2022</div>
      </div>

      <SliderCircle />


      {/* <Scrollbar /> */}
    </main>
  </div>
}

export default App