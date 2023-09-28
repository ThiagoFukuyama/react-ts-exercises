import { useState } from "react"

type ButtonState = "SELECTED" | "WRONG" | "DEFAULT"

type Option = {
   value: string
   state: ButtonState
}

type CountryCapitalGameProps = {
   data: Record<string, string>
}

function shuffle() {
   return Math.random() - 0.5
}

const buttonClasses: Record<ButtonState, string> = {
   SELECTED: "selected",
   WRONG: "wrong",
   DEFAULT: "",
}

function getButtonClass(state: ButtonState) {
   return buttonClasses[state] ?? ""
}

export default function CountryCapitalGame({ data }: CountryCapitalGameProps) {
   const [options, setOptions] = useState<Option[]>(
      [...Object.keys(data), ...Object.values(data)]
         .sort(shuffle)
         .map((value) => ({
            value,
            state: "DEFAULT",
         }))
   )
   const [selectedOption, setSelectedOption] = useState<Option | null>(null)
   const isGameOver = options.length === 0

   if (isGameOver) return <div>Parabéns!</div>

   function handleButtonClick(option: Option) {
      if (!selectedOption) {
         setSelectedOption(option)
         setOptions((prev) =>
            prev.map((opt) => ({
               ...opt,
               state: opt === option ? "SELECTED" : "DEFAULT",
            }))
         )
         return
      }

      if (
         selectedOption.value === data[option.value] ||
         option.value === data[selectedOption.value]
      ) {
         setOptions((prev) =>
            prev.filter((opt) => {
               return !(
                  opt.value === selectedOption.value ||
                  opt.value === option.value
               )
            })
         )
      } else {
         setOptions((prev) =>
            prev.map((opt) => {
               return {
                  ...opt,
                  state:
                     opt.value === selectedOption.value ||
                     opt.value === option.value
                        ? "WRONG"
                        : opt.state,
               }
            })
         )
      }
      setSelectedOption(null)
   }

   return (
      <div>
         {options.map((option) => (
            <button
               key={option.value}
               className={getButtonClass(option.state)}
               onClick={() => handleButtonClick(option)}
            >
               {option.value}
            </button>
         ))}
      </div>
   )
}
