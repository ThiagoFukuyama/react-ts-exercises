import { useState, MouseEvent, CSSProperties } from "react"
import "./App.css"

type Circle = {
   id: string
   x: number
   y: number
   size: number
   color: string
}

function App() {
   const [circles, setCircles] = useState<Circle[]>([])
   const [removedCircles, setRemovedCircles] = useState<Circle[]>([])
   const [circleSize, setCircleSize] = useState(20)
   const [circleColor, setCircleColor] = useState("#0000ff")

   function createCircle(e: MouseEvent<HTMLElement>) {
      setCircles((prevCircles) => [
         ...prevCircles,
         {
            id: crypto.randomUUID(),
            x: e.clientX,
            y: e.clientY,
            size: circleSize,
            color: circleColor,
         },
      ])
      setRemovedCircles([])
   }

   function undoCircle(e: MouseEvent<HTMLButtonElement>) {
      const newCircles = [...circles]
      const removedCircle = newCircles.pop()
      if (!removedCircle) return
      setCircles(newCircles)
      setRemovedCircles([...removedCircles, removedCircle])
   }

   function redoCircle(e: MouseEvent<HTMLButtonElement>) {
      const newRemovedCircles = [...removedCircles]
      const newCircle = newRemovedCircles.pop()
      if (!newCircle) return
      setRemovedCircles(newRemovedCircles)
      setCircles([...circles, newCircle])
   }

   function clearCanvas(e: MouseEvent<HTMLButtonElement>) {
      setCircles([])
      setRemovedCircles([])
   }

   return (
      <main>
         <div className="actions">
            <div>
               <button onClick={undoCircle}>&#8592;</button>
               <button onClick={redoCircle}>&#8594;</button>
            </div>
            <button onClick={clearCanvas}>Clear</button>
            <label htmlFor="size">Size</label>
            <input
               onChange={(e) => setCircleSize(e.target.valueAsNumber)}
               id="size"
               name="size"
               type="number"
               min={1}
               defaultValue={20}
            />
            <label htmlFor="color">Color</label>
            <input
               onChange={(e) => setCircleColor(e.target.value)}
               id="color"
               name="color"
               type="color"
               defaultValue={"#0000ff"}
            />
         </div>

         <div onClick={createCircle} className="canvas">
            {circles.map((circle) => (
               <div
                  key={circle.id}
                  className="circle"
                  style={
                     {
                        left: circle.x,
                        top: circle.y,
                        "--size": `${circle.size}px`,
                        "--color": circle.color,
                     } as CSSProperties
                  }
               ></div>
            ))}
         </div>
      </main>
   )
}

export default App
