import HomePage from "./HomePage";
import "./styles.css";

const data = [
  {
    title: "Since",
    startDate: 2015,
    finishDate: 2022,
    events: [
      {
        date: "2015",
        description: "description_2015",
      },
      {
        date: "2016",
        description: "description_2016",
      },
      {
        date: "2017",
        description: "description_2017",
      },
      {
        date: "2018",
        description: "description_2018",
      },
      {
        date: "2019",
        description: "description_2019",
      },
      {
        date: "2022",
        description: "description_2022",
      },
    ]
  },
  {
    title: "Sport",
    startDate: 2005,
    finishDate: 2032,
    events: [
      {
        date: "2015",
        description: "description_2015",
      },
      {
        date: "2016",
        description: "description_2016",
      },
      {
        date: "2017",
        description: "description_2017",
      },
      {
        date: "2018",
        description: "description_2018",
      },
      {
        date: "2019",
        description: "description_2019",
      },
      {
        date: "2022",
        description: "description_2022",
      },
    ]
  },
  {
    title: "Politic",
    startDate: 1995,
    finishDate: 2072,
    events: [
      {
        date: "2005",
        description: "description_2015",
      },
      {
        date: "2006",
        description: "description_2016",
      },
      {
        date: "2007",
        description: "description_2017",
      },
      {
        date: "2008",
        description: "description_2018",
      },
      {
        date: "2009",
        description: "description_2019",
      },
      {
        date: "2002",
        description: "description_2022",
      },

      {
        date: "2015",
        description: "description_2015",
      },
      {
        date: "2016",
        description: "description_2016",
      },
      {
        date: "2017",
        description: "description_2017",
      },
      {
        date: "2018",
        description: "description_2018",
      },
      {
        date: "2019",
        description: "description_2019",
      },
      {
        date: "2022",
        description: "description_2022",
      },
    ]
  }
]

function App() {
  return <div className="app">
    <HomePage data={data} />
  </div>
}

export default App