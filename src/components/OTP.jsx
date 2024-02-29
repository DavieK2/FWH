import { useEffect, useState } from 'react';

const OTPInput = ({ otp = '12345', onOTPCompleted }) => {

    const code = otp.split('')

    const [otpCode, setOTPCode] = useState(code);

    useEffect(() => {

        const OTPinputs = document.querySelectorAll('.otp')
        
        window.onload = ()=> OTPinputs[0].focus()
        
        
        OTPinputs.forEach((input) => {

            if( input.value ){
                input.removeAttribute('disabled')
            }

            input.addEventListener('input', () => {

                const currentInput = input
                const nextInput = currentInput.nextElementSibling
        
                if( currentInput.value.length > 1 && currentInput.value.length == 2 ){
                    currentInput.value = ""
                }
        
        
                if( nextInput !== null && nextInput.hasAttribute('disabled') && currentInput.value !== "" ){
                    nextInput.removeAttribute('disabled')
                    nextInput.focus()
                }
        
                if( ! OTPinputs[4].disabled && OTPinputs[4].value !== "" ){
                    
                    onOTPCompleted(OTPinputs[0]+OTPinputs[1]+OTPinputs[2]+OTPinputs[3]+OTPinputs[4])
                }else{
                    onOTPCompleted("")
                }
            })
        
            input.addEventListener('keyup', (e)=>{
                if( e.key == "Backspace" ){
                    if(input.previousElementSibling != null){
                        e.target.value = ""
                        e.target.setAttribute("disabled", true)
                        input.previousElementSibling.focus()
                    }
                }
            })
        })

    },[]);


    return (

        <div className='grid grid-cols-5 gap-3 mt-5 min-w-full' >

            <input type="text" className='h-14 w-14 rounded-lg border border-gray-300 otp text-center focus:outline-none focus:ring-4 focus:ring-dark-green/10 focus:border-light-green-300' defaultValue={ otpCode[0]} />
            <input type="text" className='h-14 w-14 rounded-lg border border-gray-300 otp text-center focus:outline-none focus:ring-4 focus:ring-dark-green/10 focus:border-light-green-300' defaultValue={ otpCode[1]} disabled />
            <input type="text" className='h-14 w-14 rounded-lg border border-gray-300 otp text-center focus:outline-none focus:ring-4 focus:ring-dark-green/10 focus:border-light-green-300' defaultValue={ otpCode[2]} disabled />
            <input type="text" className='h-14 w-14 rounded-lg border border-gray-300 otp text-center focus:outline-none focus:ring-4 focus:ring-dark-green/10 focus:border-light-green-300' defaultValue={ otpCode[3]} disabled />
            <input type="text" className='h-14 w-14 rounded-lg border border-gray-300 otp text-center focus:outline-none focus:ring-4 focus:ring-dark-green/10 focus:border-light-green-300' defaultValue={ otpCode[4]} disabled />
        
        </div>
    )
}

export default OTPInput