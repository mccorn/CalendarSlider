import HomePage from "./HomePage";
import "./styles.scss";

const data = [
  {
    title: "Since",
    startDate: 2015,
    finishDate: 2022,
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
    ]
  },
  {
    title: "Sport",
    startDate: 2105,
    finishDate: 2032,
    events: [
      {
        date: "2105",
        description: "description_2105",
      },
      {
        date: "2106",
        description: "description_2106",
      },
      {
        date: "2107",
        description: "description_2107",
      },
      {
        date: "2108",
        description: "description_2108",
      },
      {
        date: "2109",
        description: "description_2109",
      },
    ]
  },
  {
    title: "Politic",
    startDate: 2205,
    finishDate: 2305,
    events: [
      {
        date: "2205",
        description: "description_2205",
      },
      {
        date: "2206",
        description: "description_2206",
      },
    ]
  },
  {
    title: "Since",
    startDate: 2015,
    finishDate: 2022,
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
    ]
  },
  {
    title: "Sport",
    startDate: 2105,
    finishDate: 2032,
    events: [
      {
        date: "2105",
        description: "description_2105",
      },
      {
        date: "2106",
        description: "description_2106",
      },
      {
        date: "2107",
        description: "description_2107",
      },
      {
        date: "2108",
        description: "description_2108",
      },
      {
        date: "2109",
        description: "description_2109",
      },
    ]
  },
  {
    title: "Politic",
    startDate: 2205,
    finishDate: 2305,
    events: [
      {
        date: "2205",
        description: "description_2205",
      },
      {
        date: "2206",
        description: "description_2206",
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