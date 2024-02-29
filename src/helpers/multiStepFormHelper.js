import { useState } from "react";

export function multiStepForm (steps){

    const [currentStepIndex, setCurrentStepIndex] = useState(0)


    function next(){
        if( currentStepIndex >= steps.length ) return
        setCurrentStepIndex( (prev)  => prev + 1 )
    }

    function back(){
        if( currentStepIndex === 0 ) return
        setCurrentStepIndex( currentStepIndex - 1 )
    }
    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        next,
        back

    }
} 