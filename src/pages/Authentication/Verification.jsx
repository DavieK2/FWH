import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle } from '@/redux/stores/general/Setup';
import imageThree from "@/assets/images/authBg/bgFive.png";
import TopBar from './TopBar';
import OTPInput from '../../components/OTP';
import { AlertCircle } from 'lucide-react'
import { router } from '../../helpers/router';

const Verification = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(true);
    const [otp, setOTPCode] = useState(sessionStorage.getItem('otp') ?? "");
    const [phone] = useState(sessionStorage.getItem('credential'));

    useEffect(() => {

        if( ! sessionStorage.getItem('credential') ){
            return navigate('/login');
        }
        
        dispatch(setPageTitle('Verify Account'));
    });

    const onSubmit = () => {
      
        setDisabled(true);

        router.put('http://209.97.184.237:4000/api/users/verify_account', { credential: sessionStorage.getItem('credential'), code: otp }, {
            onSuccess : (res) => {

                navigate('/login');
            },
            onError : (res) => {
                console.log(res);
                setDisabled(false);
            }
        })

    }


    useEffect(() => {

        if(otp.length < 5){
            setDisabled(true)
        }else{
            setDisabled(false)
        }
    }, [otp])

    return (
        <>

            <section className="">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
                    <div className="hidden lg:grid">
                        <img className="h-full w-full object-cover" src={imageThree} alt="" />
                    </div>
                    <div className="lg:px-8 px-3 pt-10 md:px-24 w-full">

                        <TopBar />

                        <div className='flex flex-col items-center justify-center w-full p-4 mt-24'>
                           <div className='flex flex-col items-center justify-center max-w-xs'>
                                <div className='h-14 w-14 rounded-xl border flex items-center justify-center'> <AlertCircle size={28} /> </div>
                                <p className='font-bold text-3xl text-gray-900 mt-6'>Verification Required</p>
                                <p className='text-grey-600 text-base text-center pt-3'>A 5 digit verification code has been sent to <span className='font-semibold text-grey-700'>{ phone }</span></p>

                                <p className='pt-12 font-bold text-base text-grey-700'>Enter verification code</p>

                                <OTPInput otp={ otp } onOTPCompleted={ (otp) => setOTPCode(otp) } />

                                <button onClick={ onSubmit } disabled={ disabled }  className="disabled:bg-dark-green/40 bg-dark-green hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-dark-green/10 font-semibold rounded-lg text-base min-w-full sm:w-auto px-5 py-3 text-center text-white mt-8">Continue</button>

                                <p className='text-grey-600 pt-8'>Didn't receive the code? <span className='text-gray-400 font-semibold'>Click to resend</span></p> 
                           </div>
                        </div>
                        

                    </div>
                </div>
            </section>
        </>
    );
};

export default Verification;
