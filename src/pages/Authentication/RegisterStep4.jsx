import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/redux/stores/general/Setup';
import imageFour from "@/assets/images/authBg/bgFour.png";
import TopBar from './TopBar';
import Timeline from './Timeline';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { Plus, UploadCloud } from "lucide-react";
import TimelineMobile from './TimelineMobile';

const RegisterStep4 = ({ timeline, updateFields, onBackButton }) => {

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [disabled, setDisabled] = useState(true);    
    const [farms, addFarm] = useState([{ crops: [{}] }]);    


    const crops = [
        { placeholder: "Beans", value: "fwc-do3o3xlz" },
        { placeholder: "Rice", value: "fwc-do3o3xlt" }
    ];

    const months = [
        { placeholder: "January", value: "January" },
        { placeholder: "February", value: "February" },
        { placeholder: "March", value: "March" },
        { placeholder: "April", value: "April" },
        { placeholder: "May", value: "May" },
        { placeholder: "June", value: "June" },
        { placeholder: "July", value: "July" },
        { placeholder: "August", value: "August" },
        { placeholder: "September", value: "September" },
        { placeholder: "October", value: "October" },
        { placeholder: "November", value: "November" },
        { placeholder: "December", value: "December" },
    ];


    useEffect(() => {
        dispatch(setPageTitle('Register Farm'));
    });

    const updateFormData = (key, value = null) => {

        setFormData((prevData) => {

              prevData[key] = {
                isFilled: (value?.length) > 0 ? true : false,
              };
            
            const newData = { ...prevData };
      
            return newData;

          });
    
    }

    const hasErrors = (value) => {
    
        return ( 
                formData[value]?.isFilled === false &&
                showErrors
            ) || ((! formData[value]?.isFilled ) && showErrors)
    }
    
    const hasError = (value) => {
    
        return ( formData[value]?.isFilled === false ) || ( (! formData[value]?.isFilled ) )
    }

    const update = (index, key, value) => {
    
        updateFormData(key, value);

        addFarm((prevData) => {

            prevData[index][key] = value
      
            return prevData;
        });        
    };

    const addCrops = ( index, cropIndex, key, val ) => {

        updateFormData(key, val);

        addFarm((prevData) => {

            prevData[index]['crops'][cropIndex][key] = val

            return prevData;
        });
    }

    const onSubmit = (e) => {

        e.preventDefault();
        setShowErrors(true);


        if( ! disabled ){

            updateFields("farmDetails", "", farms)
        }
        
    }


    useEffect(() => {

        if( hasError('name') || hasError('address') || hasError('cropId') || hasError('long') || hasError('lat') || hasError('farmSeasonStart') || hasError('farmSeasonEnd') ){
            setDisabled(true)
        }else{
            setDisabled(false)
        }

    }, [formData])
    
    return (
        <>

            <section className="">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
                    <div className="hidden lg:grid">
                        <img className="h-full w-full object-cover" src={imageFour} alt="" />
                    </div>
                    <div className="lg:px-8 px-3 pt-10 md:px-24">

                        <TopBar />

                        <div className='form-section mt-16 flex flex-col md:flex-row gap-20'>
                            <div className='timeline '>
                                <Timeline step={timeline} />
                                <TimelineMobile step={timeline} />
                            </div>


                            <div className='max-w-md  min-w-md'>
                                <h1 className='font-bold text-3xl text-grey-700 px-1'> Create Account</h1>
                                <h4 className='text-lg text-grey-700 pt-2 font-medium px-1'>Farm Registration</h4>

                                <form className="mt-6 w-[28em] max-h-screen overflow-y-auto px-1">

                                    <div className="grid grid-cols-1 gap-4">

                                        <div className="mb-5">
                                            <label htmlFor="farm_name" className="block mb-2 text-sm font-medium text-grey-700">Farm name*</label>
                                            <Input
                                                id="farm_name"
                                                placeholder="Enter farm name"
                                                onChange={ (value) => update( 0, "name",value ) }
                                                className={`${
                                                    hasErrors('name')
                                                    ? "border-red-600"
                                                    : "border-gray-300"
                                                }`}
                                            />
                                        </div>

                                    </div>

                                     <div className="grid grid-cols-1 gap-4">

                                        <div className="mb-5">
                                            <label htmlFor="farm_address" className="block mb-2 text-sm font-medium text-grey-700">Farm Address*</label>
                                            <Input
                                                id="farm_address"
                                                placeholder="Enter farm address"
                                                onChange={ (value) => update( 0, "address", value ) }
                                                className={`${
                                                    hasErrors('address')
                                                    ? "border-red-600"
                                                    : "border-gray-300"
                                                }`}
                                            />
                                        </div>

                                    </div>
                                    <div className="grid grid-cols-1 gap-4">

                                        <div className="mb-5">
                                            <label htmlFor="farm_location" className="block mb-2 text-sm font-medium text-grey-700">Farm Coordinates <span className='italic'>(Optional)</span></label>
                                            <div className='flex gap-3'>
                                                <Input
                                                    id="farm_name"
                                                    placeholder="Longitude"
                                                    onChange={ (value) => update( 0, "long", value ) }
                                                    className={`${
                                                        hasErrors('long')
                                                        ? "border-red-600"
                                                        : "border-gray-300"
                                                    }`}
                                                />
                                                <Input
                                                    id="farm_name"
                                                    placeholder="Latitude"
                                                    onChange={ (value) => update( 0, "lat", value ) }
                                                    className={`${
                                                        hasErrors('lat')
                                                        ? "border-red-600"
                                                        : "border-gray-300"
                                                    }`}
                                                />
                                            </div>
                                            <p className='text-xs text-gray-500 pt-2'>Ex: Longitude: 8.6753° E. Latitude: 9.0820° N</p>
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <div className='md-5'>
                                            <p className='text-lg text-grey-700 font-medium'>Crops Cultivated and planting season</p>
                                            <div className='p-4 bg-gray-50 rounded-lg mt-2'>

                                                <div className="grid grid-cols-1 gap-4">

                                                    <div className="mb-5">
                                                        <label htmlFor="site" className="block mb-2 text-sm font-medium text-grey-700">What crop do you cultivate on this  farm?</label>
                                                        <Select
                                                            placeholder="Select crop"
                                                            selectOptions={crops}
                                                            onSelected={(value) =>  addCrops( 0, 0, 'cropId', value.value )}
                                                            className={`${
                                                                hasErrors('cropId')
                                                                ? "border-red-600"
                                                                : "border-gray-300"
                                                            }`}
                                                    />
                                                    </div>

                                                </div>

                                                <div className="grid grid-cols-2 gap-4">

                                                    <div className="mb-5">
                                                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-grey-700">Start Month</label>
                                                        <Select
                                                            placeholder="Select month"
                                                            selectOptions={months}
                                                            onSelected={(value) =>  addCrops( 0, 0, 'farmSeasonStart', value.value )}
                                                            className={`${
                                                                hasErrors('farmSeasonStart')
                                                                ? "border-red-600"
                                                                : "border-gray-300"
                                                            }`}
                                                    />
                                                    </div>
                                                    <div className="mb-5">
                                                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-grey-700">End Month</label>
                                                        <Select
                                                            placeholder="Select month"
                                                            selectOptions={months}
                                                            onSelected={(value) =>  addCrops( 0, 0, 'farmSeasonEnd', value.value )}
                                                            className={`${
                                                                hasErrors('farmSeasonEnd')
                                                                ? "border-red-600"
                                                                : "border-gray-300"
                                                            }`}
                                                    />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className='mb-5'>
                                            <button type='button'  className="flex items-center gap-1 bg-light-green text-dark-green/80 focus:ring-0 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto p-2 text-center ">
                                               <Plus />
                                               <span>Add another crop</span>
                                            </button>
                                        </div>
                                    </div>


                                    <div className="grid grid-cols-1 gap-4">

                                        <label htmlFor="file" className="mb-5 cursor-pointer">
                                            <p className="block mb-2 text-sm font-medium text-grey-700">Upload Farm Documents</p>
                                            <input type="file" id="file" className="hidden" />
                                            <div className='w-full flex flex-col items-center p-6 border border-gray-200 rounded-lg'>
                                                <div className='border border-gray-200 rounded-lg p-2'>
                                                    <UploadCloud size="18" color='#475467' />
                                                </div>
                                                <p  className='pt-5 text-sm text-grey-600'><span className='text-dark-green font-medium text-sm'>Click to upload</span> or drag and drop</p>
                                                <p className='text-grey-600 text-sm pt-3'>PNG, JPG or PDF (max. 10MB)</p>
                                            </div>
                                        </label>

                                    </div>




                                    <div className="grid grid-cols-2 mb-5 gap-3">
                                        <button onClick={ onBackButton } type="button" className="text-grey-700 font-semibold disabled:border-gray-300 disabled:text-gray-300 border bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Back</button>
                                        <button
                                        disabled={ disabled }
                                        onClick={ onSubmit }
                                        className="text-white disabled:bg-dark-green/40 bg-dark-green hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-dark-green/10 font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                                        >
                                        Add Farm
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

export default RegisterStep4;
