import Select from "./Select"
import countries from "./../helpers/countries"
import { useState } from "react"
import Input from "./Input"

  
let options = countries.flatMap((country) => [{ value : country.phoneCode, placeholder: `/country_flags/${country.countryCode}.svg` }])


const CountryDropDown = ({ phoneValue, onPhoneInput, className = '' }) => {

    const [placeholder, setPlaceholder] = useState("/country_flags/NG.svg");
    const [countryCode, setSelectedValue] = useState("234");

    const setSelectedOption = (option) => {
      
      setPlaceholder(option.placeholder);
      setSelectedValue(option.value);
      
    }

    const phoneInput = (phoneNo) => {

        if( phoneNo.length === 0){
          return onPhoneInput("");
        }
        onPhoneInput("+"+countryCode+phoneNo);
    }

    return (
      
        <div className="flex gap-4">
          <div className='w-44'>
                <Select hasImage={ true } placeholder={ placeholder } value={ countryCode } className={ className } >

                {   options.map( (option, index) => {

                    return( 

                          <div key={ index } onClick={ () => setSelectedOption(option) } className="flex items-center justify-between text-left text-sm text-gray-700 rounded p-2 hover:bg-gray-50 transition break-normal">
                              <div className='flex items-center gap-2 justify-between w-full'>
                                  <img src={ option.placeholder } />
                                  <span className="text-[10px]">+{ option.value }</span>
                              </div>
                          </div>

                      )
                    })
                }
                </Select>
          </div>
        
          <Input id="phoneNumber" type="number" placeholder="000 000 000" value={  phoneValue } onChange={ (value) => phoneInput(value) } className={ className } />
        </div>
      
    )
}

export default CountryDropDown