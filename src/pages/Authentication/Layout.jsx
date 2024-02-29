import {  useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import imageOne from "@/assets/images/authBg/bgOne.png";
import userImage from "@/assets/images/default/user.png";
import { ChevronLeft, CircleDot, CheckCircle2, EyeOff } from 'lucide-react';

const AuthLayout = ({props}) => {
    const dispatch = useDispatch();
    const [timeline, setTimeline] = useState(0)
    const [defaultImage, setDefaultImage] = useState(userImage)


    return (
        <>
            <section className="">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
                    <div className="hidden lg:grid">
                        <img className="h-full w-full object-cover" src={imageOne} alt="" />
                    </div>
                    <div className="px-8 pt-10 md:px-24">


                        <div className='flex justify-between'>
                            <Link to={'/'} className='flex gap-2'>
                                <ChevronLeft color="black" size={17} />
                                <span>Back home</span>
                            </Link>
                            <div className='flex gap-2'>
                                <span>Already have an account?</span>
                                <Link to={'/login'}> Login</Link>
                            </div>
                        </div>
                        <div className='form-section mt-16 flex gap-20'>
                            <div className='timeline '>

                                <ol className="relative border-s border-green-700 ">
                                    <li className="mb-14 ms-6 h-16 ">
                                        <span className={`absolute flex items-center justify-center w-6 h-6 bg-green-100 rounded-full -start-3  ring-4 ring-white `} >
                                            {timeline > 0 ? <CheckCircle2 /> : <CircleDot color={`${timeline == 1 ? 'green' : 'gray'}`} />}
                                        </span>
                                    </li>
                                    <li className="mb-14 ms-6 h-16">
                                        <span className="absolute flex items-center justify-center w-6 h-6 bg-green-100 rounded-full -start-3  ring-4 ring-white ">
                                            {timeline > 1 ? <CheckCircle2 /> : <CircleDot color={`${timeline == 2 ? 'green' : 'gray'}`} />}
                                        </span>

                                    </li>
                                    <li className="mb-14  h-16">
                                        <span className="absolute flex items-center justify-center w-6 h-6 bg-green-100 rounded-full -start-3  ring-4 ring-white ">
                                            {timeline > 2 ? <CheckCircle2 /> : <CircleDot color={`${timeline == 3 ? 'green' : 'gray'}`} />}
                                        </span>
                                    </li>

                                    <li className="mb-14  h-3">
                                        <span className="absolute flex items-center justify-center w-6 h-6 bg-green-100 rounded-full -start-3  ring-4 ring-white ">
                                            {timeline > 3 ? <CheckCircle2 /> : <CircleDot color={`${timeline == 4 ? 'green' : 'gray'}`} />}
                                        </span>
                                    </li>
                                </ol>


                            </div>
                            <div className='max-w-sm '>
                                <h1 className='text-3xl font-bold'> Create Account</h1>
                                <h4 className='text-lg'>Personal Information</h4>
                                <form className="mt-6">

                                    <div className="grid grid-cols-2 gap-4">

                                        <div className="mb-5">
                                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">First Name*</label>
                                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  " placeholder="Enter First Name" required />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">Last Name*</label>
                                            <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  " placeholder="Enter Last Name" required />
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 gap-4">

                                        <div className="mb-5">
                                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Phone Number*</label>
                                            <div className='flex gap-2'>
                                                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-20 p-2.5 ">
                                                    <option selected value="NG">NGN</option>
                                                    <option value="US">USD</option>
                                                    <option value="CA">CAD</option>
                                                </select>
                                                <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  " placeholder="+234 000 000 000" required />
                                            </div>
                                        </div>

                                    </div>
                                    

                                    <div className="grid grid-cols-1 gap-4">

                                        <div className="mb-5">
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email Address <i>(optional)</i></label>
                                            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  " placeholder="Enter Email Address" required />
                                        </div>

                                    </div>


                                    <div className="grid grid-cols-2 gap-4">

                                        <div className="mb-5">
                                            <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900">Age*</label>
                                            <select id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 ">
                                                <option selected value="NG">18-23</option>
                                                <option value="US">24-28</option>
                                                <option value="CA">27-32</option>
                                            </select>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">Choose Gender*</label>
                                            <div className="flex">
                                                <div className="flex items-center me-4 align-middle ">
                                                    <input id="genderMale" type="radio" value="male" name="gender" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500  focus:ring-2 "/>
                                                        <label for="genderMale" className="ms-2 text-sm font-medium text-gray-900 ">Male</label>
                                                </div>
                                                <div className="flex items-center me-4 align-middle">
                                                    <input id="genderFemale" type="radio" value="female" name="gender" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500  focus:ring-2 "/>
                                                        <label for="genderFemale" className="ms-2 text-sm font-medium text-gray-900 ">Female</label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                    <div className="grid grid-cols-1 gap-4">

                                        <div className="mb-5">
                                            <label htmlFor="residentialAddress" className="block mb-2 text-sm font-medium text-gray-900">Residential Address*</label>
                                            <input type="text" id="residentialAddress" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  " placeholder="Ex: No 21 Agaro road, Abeokuta" required />
                                        </div>

                                    </div>


                                    <div className="grid grid-cols-1 gap-4">

                                        <div className="mb-5">
                                            <label htmlFor="site" className="block mb-2 text-sm font-medium text-gray-900">Site*</label>
                                            <select id="site" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 ">
                                                <option selected value="NG">18-23</option>
                                                <option value="US">24-28</option>
                                                <option value="CA">27-32</option>
                                            </select>
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 gap-4">

                                        <div className="mb-5">
                                            <label htmlFor="idType" className="block mb-2 text-sm font-medium text-gray-900">ID Type*</label>
                                            <select id="idType" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 ">
                                                <option selected value="NG">18-23</option>
                                                <option value="US">24-28</option>
                                                <option value="CA">27-32</option>
                                            </select>
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 gap-4">

                                        <div className="mb-5">
                                            <label htmlFor="idNumber" className="block mb-2 text-sm font-medium text-gray-900">ID Number*</label>
                                            <input type="text" id="idNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  " placeholder="Enter ID Number" required />
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="mb-5">
                                            <label htmlFor="idDocument" className="block mb-2 text-sm font-medium text-gray-900">Upload ID document </label>
                                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none h-14 p-3" id="idDocument" type="file" />
                                        </div>
                                    </div>


                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="mb-5">
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Create Password</label>
                                            <div className="relative w-full">
                                                <input type="password" id="password" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-green-500 focus:border-green-500" placeholder="*********" required />
                                                <button className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white  ">
                                                    <EyeOff color='black' size={15}/>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mb-5">
                                            <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password</label>
                                            <div className="relative w-full">
                                                <input type="password" id="confirm_password" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-green-500 focus:border-green-500" placeholder="*********" required />
                                                <button className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white  ">
                                                    <EyeOff color='black' size={15}/>
                                                </button>
                                            </div>
                                            <div className='mt-3'>
                                                <p className='flex gap-2 mt-2'><CheckCircle2 className='bg-gray-400 rounded-xl' color='gray' />Must be at least 8 characters</p>
                                                <p className='flex gap-2 mt-2'><CheckCircle2 className='bg-gray-400 rounded-xl' color='gray' />Must contain one special characters</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">

                                        <div className="mb-5">
                                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Upload Profile Picture <i>(optional)</i></label>
                                            <div className='flex gap-2'>
                                                <img src={defaultImage} className='h-14 w-14  rounded-2xl  bg-gray-200 p-3' />
                                                <input type="file" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  " placeholder="+234 000 000 000" required />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="flex flex-row-reverse mb-5">
                                        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
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

export default AuthLayout;
