import { cn } from '../helpers/util';
import { Check, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';


const DropDown = ({ showDropdown = false, dropDownOptions = [], children, selectedValue = '', onSelected }) => {

    if( ! showDropdown || (dropDownOptions.length === 0  && ! children )){
        return null
    }

    return (
        <>
            <div className="absolute inset-0 flex flex-col items-start p-2 w-full min-h-max max-h-80 shadow-lg shadow-gray-200/50 bg-white border rounded-lg mt-14 z-50">
                <div className="flex flex-col h-full w-full overflow-y-auto">
                
                    { children ? children :  dropDownOptions.map( (option) => {

                                                                        return  <div key={ option.value } onClick={ () => onSelected({ placeholder: option.placeholder, value: option.value }) } className="flex items-center justify-between text-left text-sm text-gray-700 rounded p-2 hover:bg-gray-50 transition break-normal">
                                                                                    <span>{ option.placeholder }</span>
                                                                                    { (selectedValue === option.value)  ?  <Check size="18" color='#0D8A6A'  /> : '' }
                                                                                </div>
                                                                        } )
                    }
                </div>
            </div>
        </>
    )
}

const DropDownIcon = ( { isSelected = false, showDropdown = false } ) => {

    // if( isSelected ){

    //     return( 
    //         <>
    //              <div className="isolate">
    //                <X size="18" color='#F04438'  />
    //             </div>
    //         </>
    //     )
    // }

    if( showDropdown ){

        return( 
            <>
                 <div className="isolate">
                   <ChevronUp  size="20"  />
                </div>
            </>
        )

    }else{

        return( 
            <>
                 <div className="isolate">
                   <ChevronDown size="20"   />
                </div>
            </>
        )
    }
}

const Select = ({ placeholder = '', selectOptions = [],  children, value = '', hasImage = false, onSelected, className = '' }) => {

    const [isDropDownVisible, toggleDropDown] = useState(false)
    const [isSelected, selectItem] = useState(false)
    const [selectedPlaceholder, setPlaceholder] = useState(placeholder)
    const [selectedValue, setSelectedValue] = useState(value)
    const selectRef = useRef()
    
    function onOptionSelected(option) {
    

        onSelected({value: option.value})
        setSelectedValue(option.value)
        setPlaceholder(option.placeholder)
        selectItem(true)

        selectRef.current?.blur()
    }

    const onClick = () => {
        
        toggleDropDown( ! isDropDownVisible );

        if( (document.activeElement == selectRef.current) && isDropDownVisible ){
           
           selectRef.current?.blur()
        }
    }

    return (
       
            <div className="space-y-3 w-full">
                <button ref={ selectRef } onClick={  onClick } onBlur={ () => toggleDropDown(false) }  type='button' name="" className={ cn('cursor-pointer relative flex flex-col w-full rounded-lg border p-2.5 border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-4 focus:ring-dark-green/10 focus:border-light-green-300 placeholder:text-gray-400 text-sm sm:leading-6', className) }>
                    <div className="flex grow-0 items-center justify-between space-x-2 w-full">
                        { ! hasImage ?   
                            <option className={ `text-left overflow-hidden ${ isSelected ? 'text-grey-700' : 'text-gray-500' }`} >{ selectedPlaceholder }</option> : 
                            <img src={ placeholder } />
                        }
                       
                        <DropDownIcon isSelected={ isSelected } showDropdown={ isDropDownVisible } />
                    </div>
                
                    <DropDown showDropdown={ isDropDownVisible } children={ children } dropDownOptions={ selectOptions } selectedValue={ selectedValue } onSelected={ (option) => onOptionSelected(option) } />
                   
                </button>  
            </div>
       
    )
}

export default Select