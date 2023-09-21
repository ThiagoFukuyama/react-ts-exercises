import Entry from "./components/Entry"
import entries from "./entries"
import "./App.css"

function App() {
   return (
      <div className="entries">
         {entries.children.map((entry) => (
            <Entry key={entry.id} entry={entry} />
         ))}
      </div>
   )
}

export default App
