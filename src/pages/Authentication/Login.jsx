import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from "@/assets/images/flogo.png";
import { setPageTitle } from '@/redux/stores/general/Setup';
import imageOne from "@/assets/images/authBg/bgSix.png";
import TopBar from './TopBar';
import { EyeOff, Fingerprint } from 'lucide-react';
import Input from '../../components/Input';
import { router } from '../../helpers/router';



const LoginModal = () => {

    return(
        <div className="fixed flex flex-col justify-center items-center inset-0 min-h-screen bg-black/40">
            <div className="flex flex-col items-center bg-white rounded-xl p-8 min-w-96 min-h-80">
                <img src={logo} alt="logo" className="h-12 w-12 mt-6" />
                <p className="font-bold text-grey-700 pt-12 text-2xl">Login Successful</p>
                <p className="text-grey-700 pt-5 text-base">You have successfully logged in</p>
            </div>
        </div>
    )
}

const RegisterStep1 = () => {
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hasError, setHasError] = useState(false);
    const [showLoggedInModal, setLoggedInModal] = useState(false);


    useEffect(() => {
        dispatch(setPageTitle('Login'));
    });

    const onSubmit = () => {

        setDisabled(true)
        router.post('http://209.97.184.237:4000/api/users/login', { credential: email, password }, {
            onSuccess: (res) => {
                setLoggedInModal(true)
            },
            onError: (res) => {
                setHasError(true)
                setDisabled(false)
            }
        })
    }

    useEffect(() => {

        if(email.length > 0 && password.length > 0){
            setDisabled(false)
        }else{
            setDisabled(true)
        }

    },[email, password])


    return (
        <>
            
            <section className="">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
                    <div className="hidden lg:grid">
                        <img className="h-full w-full object-cover" src={imageOne} alt="" />
                    </div>
                    <div className="sm:px-8 px-4 pt-10 md:px-24">

                        <TopBar showSignUpLink={ false }/>
                        
                        <div className='form-section mt-16 flex flex-col items-center justify-center w-full'>

                            <div className='flex flex-col justify-center w-full md:min-w-[24rem] max-w-sm'>
                                <h1 className='text-3xl font-bold text-grey-700'>Welcome Back!</h1>
                                <h4 className='text-base text-grey-600 pt-3'>Welcome Back! Please enter your details</h4>
                                
                                <form className="mt-12 w-full max-h-screen overflow-auto px-1">
                                    <div className="grid grid-cols-1 gap-4">

                                        <div className="mb-5">
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-grey-700">Email Address / Phone Number</label>
                                            <Input id='email' placeholder='Enter email or Phone number' type='text' value={ email } onChange={ (val) => setEmail(val) }  className={`${ hasError ? "border-red-600" : "border-gray-300" }`}/>
                                            <p className={`${ hasError ? 'text-red-600' : 'text-grey-600'} text-xs pt-2`}>{ hasError ? 'An account with this credential was not found.' : 'Phone number must have country code. E.g. +234.'}</p>
                                        </div>

                                    </div>


                                    <div className="grid grid-cols-1 gap-4 mt-1">
                                        <div className="mb-5">
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-grey-700 ">Password</label>
                                            <div className='flex items-center gap-4'>
                                                <div className="relative w-full ">
                                                    <Input id='password' placeholder='Enter Password' type='password' value={ password } onChange={ (val) => setPassword(val) } />
                                                    <button className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white  ">
                                                        <EyeOff color='black' size={15} />
                                                    </button>
                                                </div>

                                                <div className='h-12 w-12 text-dark-green flex items-center justify-center shrink-0 rounded-full border border-dark-green/10 bg-light-green/30'>
                                                    <Fingerprint />
                                                </div>
                                            </div>
                                            <div className='flex pt-5 justify-between gap-4 items-center'>
                                                <div className='flex items-center space-x-2'>
                                                    <input id="remember" type="checkbox" name="remember" className='rounded text-dark-green  focus:ring-dark-green/10' />
                                                    <label htmlFor="remember" className='text-sm font-medium text-grey-700'>Remember for 30 days</label>
                                                </div>
                                                <p className='text-sm font-semibold text-dark-green'>Forgot password</p>
                                            </div>
                                        </div>

                                    </div>


                                    <div className="grid grid-cols-1 mb-5 gap-3">
                                        <button onClick={ onSubmit } disabled={ disabled }  className="disabled:bg-dark-green/40 bg-dark-green hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-dark-green/10 font-semibold rounded-lg text-base min-w-full sm:w-auto px-5 py-3 text-center text-white mt-8">Login</button>
                                    </div>

                                    <p className='text-grey-600 text-center pt-5'>Don’t have an account? <Link to={ '/register' }><span className='text-dark-green font-bold cursor-pointer'>Sign Up</span></Link></p>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            { showLoggedInModal &&  <LoginModal /> }
        </>
        
    );
};

export default RegisterStep1;
