import { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPageTitle } from '@/redux/stores/general/Setup';
import imageTwo from "@/assets/images/authBg/bgTwo.png";
import TopBar from './TopBar';
import Timeline from './Timeline';
import FormDataContext from '../../helpers/FormDataContext';
import Select from '../../components/Select';
import Input from '../../components/Input';
import TimelineMobile from './TimelineMobile';


const RegisterStep2 = ({ timeline, updateFields, onSubmitButton, onBackButton }) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formFields = useContext(FormDataContext);
    const [formData, setFormData] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [hasBankAccount, setHasBankAccount] = useState(false);
    const [disabled, setDisabled] = useState(true);
    
    const banks = [
        { placeholder: "Guaranty Trust Bank", value: "Guaranty Trust Bank" },
        { placeholder: "WEMA Bank", value: "WEMA Bank" },
      ];

    useEffect(() => {
        dispatch(setPageTitle('Register Bank Details'));
    });

    const updateFormData = (step, key, value = null) => {

        setFormData((prevData) => {
            if (key.length === 0) {
              prevData[step] = {
                isFilled: (formFields[step]?.length) ?? (value?.length) > 0 ? true : false,
              };
            } else {
              prevData[key] = {
                isFilled: (formFields[step][key]?.length) ?? (value?.length) > 0 ? true : false,
              };
            }
      
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

    const update = (step, key, value, shouldDelete = null) => {
    
        updateFields(step, key, value, shouldDelete);
        updateFormData(step, key)
        
    };

    const updateHasBankAccount = (value) => {

        if( value === 'true'){
            setHasBankAccount(true)
            update('userDetails', 'hasBankAccount', value)
        }else{
            setHasBankAccount(false)
            update('userDetails', 'hasBankAccount', value, 'bankDetails')
        }
    }

    const onSubmit = (e) => {

        e.preventDefault();
        setShowErrors(true);


        if( ! disabled ){
            onSubmitButton();
        }
        
    }


    useEffect(() => { 

    
        if( ( hasError('hasSmartphone') || hasError('hasBankAccount') ||  ( hasBankAccount && hasError('bankName') ) || ( hasBankAccount && hasError('accountNumber') ) ) ) {
            setDisabled(true)
        }else{
            setDisabled(false)
        }
        
       }, [hasBankAccount, formData])
    return (
        <>

            <section className="">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
                    <div className="hidden lg:grid">
                        <img className="h-full w-full object-cover" src={imageTwo} alt="" />
                    </div>
                    <div className="lg:px-8 px-3 pt-10 md:px-24">

                        <TopBar />

                        <div className='form-section mt-16 flex flex-col md:flex-row gap-20'>
                            <div className='timeline '>

                                <Timeline step={timeline} />
                                <TimelineMobile step={timeline} />
                            </div>


                            <div className='max-w-sm '>
                                <h1 className='text-3xl font-bold  text-grey-700'> Create Account</h1>
                                <h4 className='text-lg  text-grey-700 pt-2 font-medium'>Bank Details</h4>
                                <form className="mt-6 w-[28em] max-h-screen overflow-auto px-1">

                                    <div className="grid grid-cols-1 gap-4">

                                        <div className="mb-5 ">
                                            <label htmlFor="hasSmartphone" className="block mb-2 text-sm font-medium text-grey-700">Do you have a smartphone?</label>
                                            <div className="flex">
                                                <div className="flex items-center me-4 align-middle ">
                                                    <input id="yes" type="radio" value="true" name="hasSmartphone"  className="w-4 h-4 text-dark-green focus:ring-dark-green checked:border-dark-green checked:active:bg-dark-green border-gray-300" onChange={ (e) => update('userDetails', 'hasSmartphone', e.target.value) } />
                                                    <label htmlFor="yes" className="ms-2 text-sm font-medium  text-grey-700">Yes</label>
                                                </div>
                                                <div className="flex items-center me-4 align-middle">
                                                    <input id="no" type="radio" value="false" name="hasSmartphone" className="w-4 h-4 text-dark-green focus:ring-dark-green checked:border-dark-green checked:active:bg-dark-green border-gray-300" onChange={ (e) => update('userDetails', 'hasSmartphone', e.target.value) }  />
                                                    <label htmlFor="no" className="ms-2 text-sm font-medium  text-grey-700 ">No</label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 gap-4">

                                        <div className="mb-5">
                                            <label htmlFor="hasBank" className="block mb-2 text-sm font-medium  text-grey-700">Do you have a Bank Account?</label>
                                            <div className="flex">
                                                <div className="flex items-center me-4 align-middle ">
                                                    <input id="yes" type="radio" value="true" name="hasBank" className="w-4 h-4 text-dark-green focus:ring-dark-green checked:border-dark-green checked:active:bg-dark-green border-gray-300" onChange={ (e) => updateHasBankAccount(e.target.value) } />
                                                    <label htmlFor="yes" className="ms-2 text-sm font-medium  text-grey-700">Yes</label>
                                                </div>
                                                <div className="flex items-center me-4 align-middle">
                                                    <input id="no" type="radio" value="false" name="hasBank"  className="w-4 h-4 text-dark-green focus:ring-dark-green checked:border-dark-green checked:active:bg-dark-green border-gray-300" onChange={ (e) => updateHasBankAccount(e.target.value) } />
                                                    <label htmlFor="no" className="ms-2 text-sm font-medium  text-grey-700">No</label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>



                                    { hasBankAccount && 

                                        <>
                                            <div className="grid grid-cols-1 gap-4">

                                                <div className="mb-5">
                                                    <label htmlFor="age" className="block mb-2 text-sm font-medium  text-grey-700">Bank Name*</label>
                                                    <Select
                                                        placeholder="Select Bank"
                                                        selectOptions={ banks }
                                                        onSelected={(value) =>
                                                            update("bankDetails", "bankName", value.value)
                                                        }
                                                        className={`${
                                                            hasErrors('bankName')
                                                            ? "border-red-600"
                                                            : "border-gray-300"
                                                        }`}
                                                    />
                                                </div>

                                            </div>

                                            <div className="grid grid-cols-1 gap-4">

                                                <div className="mb-5">
                                                    <label htmlFor="bankNumber" className="block mb-2 text-sm font-medium  text-grey-700">Personal Bank Account Number*</label>
                                                    <Input
                                                        id="bankNumber"
                                                        placeholder="Enter Personal Account Number"
                                                        value={formFields?.bankDetails?.accountNumber}
                                                        onChange={(value) =>
                                                            update("bankDetails", "accountNumber", value)
                                                        }
                                                        className={`${
                                                            hasErrors('accountNumber')
                                                            ? "border-red-600"
                                                            : "border-gray-300"
                                                        }`}
                                                    />
                                                </div>
                                            </div>

                                        </>
                                    
                                    }
                                   
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

export default RegisterStep2;
