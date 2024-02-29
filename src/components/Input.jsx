import { useState } from "react"
import { cn } from "../helpers/util"


const Input = ({ className = '', id = '', placeholder = '', type = 'text', value = '', onChange }) => {

    const[inputValue, setInputValue] = useState(value);

    const updateInputValue = (value) => {
        setInputValue(value);
        onChange(value)
    }
    return (
        <>
         <input onChange={ (e) => updateInputValue( e.target.value ) } type={ type } id={ id } className={ `${ cn("border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-4 focus:ring-dark-green/10 focus:border-light-green-300 block w-full p-2.5", className) }` } placeholder={ placeholder } value={ inputValue }  />
        </>
    )
}

export default Input