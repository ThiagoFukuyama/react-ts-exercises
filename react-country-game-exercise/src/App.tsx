import CountryCapitalGame from "./components/CountryCapitalGame"

const countryCapitalGameData = {
   Brasil: "Brasilia",
   "Estados Unidos": "Washington, D.C.",
   Alemanha: "Berlim",
}

function App() {
   return (
      <>
         <CountryCapitalGame data={countryCapitalGameData} />
      </>
   )
}

export default App
