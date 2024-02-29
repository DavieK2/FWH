import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/redux/stores/general/Setup';
import imageThree from "@/assets/images/authBg/bgThree.png";
import userImage from "@/assets/images/default/user.png";
import fingerPrint01 from "@/assets/images/default/fingerprint-01.png";
import fingerPrint02 from "@/assets/images/default/fingerprint-02.png";
import fingerPrint03 from "@/assets/images/default/fingerprint-03.png";
import fingerPrint04 from "@/assets/images/default/fingerprint-04.png";
import TopBar from './TopBar';
import Timeline from './Timeline';
import TimelineMobile from './TimelineMobile';

const RegisterStep3 = ( { timeline, onSubmitButton, onBackButton }) => {
    const dispatch = useDispatch();
    const [defaultImage, setDefaultImage] = useState(userImage)
    const [disabled, setDisabled] = useState(true);
    const [skipBiometrics, setSkipBiometrics] = useState(false);

    useEffect(() => {
        dispatch(setPageTitle('Register Biometric'));
    });

    const onSubmit = (values) => {
      
        if( ! disabled ){
            onSubmitButton()
        }

    }

    useEffect(() => {

        if( skipBiometrics ){
            setDisabled(false)
        }else{
            setDisabled(true);
        }

    },[skipBiometrics]);

    return (
        <>

            <section className="">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
                    <div className="hidden lg:grid">
                        <img className="h-full w-full object-cover" src={imageThree} alt="" />
                    </div>
                    <div className="lg:px-8 px-3 pt-10 md:px-24">

                        <TopBar />

                        <div className='form-section mt-16 flex flex-col md:flex-row gap-20'>
                            <div className='timeline '>
                                <Timeline step={timeline} />
                                <TimelineMobile step={timeline} />
                            </div>


                            <div className='max-w-sm '>
                                <h1 className='text-3xl font-bold  text-grey-700 px-1'> Create Account</h1>
                                <h4 className='text-lg text-grey-700 pt-2 font-medium px-1'>Security - Setup Fingerprint (Optional)</h4>
                                <form className="mt-6 w-[28em] max-h-screen overflow-auto px-1">

                                    <div className="grid grid-cols-1 gap-4">

                                        <div className="mb-5">
                                            <label htmlFor="profilePic" className="block mb-2 text-sm font-medium text-grey-700">Capture Finger Print <i>(Your L-R Index Fingers)</i></label>
                                            <div className='flex gap-8'>
                                                <div className='flex flex-col items-center space-y-2'>
                                                    <img src={fingerPrint01} className='h-14 w-14  rounded-full border bg-light-green border-dark-green/5 p-3' />
                                                    <p className='text-sm min-w-max max-w-min text-grey-700'>Left Thumb</p>
                                                </div>
                                                <div className='flex flex-col items-center space-y-2'>
                                                    <img src={fingerPrint02} className='h-14 w-14  rounded-full border bg-light-green border-dark-green/5 p-3' />
                                                    <p className='text-sm min-w-max max-w-min text-grey-700'>Left Index</p>
                                                </div>
                                                <div className='flex flex-col items-center space-y-2'>
                                                    <img src={fingerPrint03} className='h-14 w-14  rounded-full border bg-light-green border-dark-green/5 p-3' />
                                                    <p className='text-sm min-w-max max-w-min text-grey-700'>Right Thumb</p>
                                                </div>
                                                <div className='flex flex-col items-center space-y-2'>
                                                    <img src={fingerPrint04} className='h-14 w-14  rounded-full border bg-light-green border-dark-green/5 p-3' />
                                                    <p className='text-sm min-w-max max-w-min text-grey-700'>Right Index</p>
                                                </div>
                                            </div>

                                            {/* <div className='mt-3'>
                                                <p className='flex gap-2 mt-2 text-green-600'><CheckCircle2 className=' rounded-xl' color='green' />Biometric Successful</p>
                                            </div> */}
                                            <div className='mt-3'>
                                                <div className="flex items-center gap-2 cursor-pointer float-end border-2 text-black bg-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
                                                    <input type='checkbox' className='rounded border border-gray-300 text-dark-green focus:ring-dark-green checked:border-dark-green checked:active:bg-dark-green' onChange={ (e) => e.target.checked ? setSkipBiometrics(true) : setSkipBiometrics(false) }/>
                                                    <span> Skip for now</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>

                                    <div className="grid grid-cols-2 mb-5 gap-3">
                                        <button onClick={ onBackButton } type="button" className="text-grey-700 font-semibold disabled:border-gray-300 disabled:text-gray-300 border bg-white focus:ring-4 focus:outline-none focus:ring-gray-50 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Back</button>
                                        <button
                                        disabled={ disabled }
                                        onClick={ onSubmit }
                                        className="text-white disabled:bg-dark-green/40 bg-dark-green hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-dark-green/10 font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                                        >
                                        Continue
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default RegisterStep3;
