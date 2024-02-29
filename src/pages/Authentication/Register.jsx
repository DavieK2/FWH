import { useEffect, useState } from "react";
import { multiStepForm } from "../../helpers/multiStepFormHelper";
import { Link, useNavigate } from 'react-router-dom';
import logo from "@/assets/images/flogo.png";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";
import RegisterStep4 from "./RegisterStep4";
import FormDataContext from "../../helpers/FormDataContext";
import { router } from "../../helpers/router";



const Modal = ({ createAccount, disabled = false, hasError = false, errorMessage = '' }) => {

    const [ isButtonDisabled, setButtonDisabled ] = useState(disabled);
    const [ isError, setIsError ] = useState(hasError);
    const [ error, setErrorMessage ] = useState(errorMessage);

    useEffect(() => {
        setButtonDisabled(disabled)
        setIsError(hasError)
        setErrorMessage(errorMessage)
    }, [disabled, hasError, errorMessage]);

    return(
        <div className="fixed flex flex-col justify-center items-center inset-0 min-h-screen bg-black/40">
            <div className="flex flex-col items-center bg-white rounded-xl p-8 min-w-96 min-h-80">
                <img src={logo} alt="logo" className="h-12 w-12" />
                <p className="font-bold text-grey-700 pt-8 text-lg">You have added 1 farm!</p>
                <p className="text-grey-700 pt-2 text-sm">Would you like to add another farm?</p>

                <div className="flex flex-col items-center space-y-2 mt-10">
                    <button disabled={ isButtonDisabled } onClick={ createAccount } className=" disabled:bg-dark-green/40 bg-dark-green hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-dark-green/10 font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center text-white">No, create my account</button>
                    <button type="button" className="text-grey-700 font-semibold disabled:border-gray-300 disabled:text-gray-300 border bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Yes, I have another farm</button>
                </div>
                { isError && <p className="text-xs text-red-600 mt-8 p-3 border border-red-300 bg-red-50 rounded-lg">{ error }</p>}
            </div>
        </div>
    )
}


const INITIAL_DATA = {

    "userDetails": {
        "firstName": "",
        "lastName": "",
        "credential": "",
        // "email": "",
        "password": "",
        "roleName": "Farmer",
        "gender": "",
        "resAddress": "",
        "ageGroup": "",
        "hasBankAccount": "",
        "hasSmartphone": "",
        "profilePic": {
            "url": "https://****"
        }
    },
    "idUpload": {
        "idType": "",
        "url": "https://****"
    },
    "siteId": "",
    // "bankDetails": {},
    "farmDetails": []
}

const Register = () => {

    const [formFields, setFormFields ] = useState(INITIAL_DATA)
    const [hasCompleted, setCompleted ] = useState(false)
    const [buttonDisabled, setButtonDisabled ] = useState(false)
    const [ isError, setIsError ] = useState(false);
    const [ error, setErrorMessage ] = useState('');

    const navigate = useNavigate();

    const updateFormData = (step, key, value, shouldDelete = null ) => {

        setFormFields( (prevData) => {

            if( shouldDelete ){
                delete prevData[shouldDelete];
            }
            
            if( key.length === 0 ){
                prevData[step] = value;
            }
            else if( ! prevData[step] ){
                prevData[step] = {}
                prevData[step][key] = value;
            }
            else{
                prevData[step][key] = value;
            }
            return prevData
        })
    }

    const submit = (step, key, value) => {

        updateFormData(step, key, value)
        setCompleted(true)

    }

    const createAccount = () => {

        setButtonDisabled(true)

        router.post('http://209.97.184.237:4000/api/users/signup', formFields, {
            onSuccess : (res) => {
               
                // setButtonDisabled(false)
                let code = res.sms.replace(/[^0-9]/g, "")
                sessionStorage.setItem('credential', res.data.newUser.phone)
                sessionStorage.setItem('otp', code)

                navigate('/verification')
                
            },
            onError : (res) => {
                setButtonDisabled(false)
                setIsError(true)
                setErrorMessage(res.message ?? res.errorDetails)
                console.log(res)
            }
        })
    }

    const { step, next, back } = multiStepForm([
        <RegisterStep1 timeline={ 0 } updateFields={ (step, key, value) => updateFormData(step, key, value) } onSubmitButton={ () => next() }  />,
        <RegisterStep2 timeline={ 1 } updateFields={ (step, key, value, shouldDelete) => updateFormData(step, key, value, shouldDelete) } onSubmitButton={ () => next() } onBackButton={ () => back() }  />,
        <RegisterStep3 timeline={ 2 } onSubmitButton={ () => next() } onBackButton={ () => back() } />,
        <RegisterStep4 timeline={ 3 } updateFields={ (step, key, value) => submit(step, key, value ) } onBackButton={ () => back() }  />,
    ])

    return (
        
        <FormDataContext.Provider value={ formFields }>
            { step }
            { hasCompleted && <Modal hasError={ isError } errorMessage={ error } createAccount={ createAccount } disabled={ buttonDisabled } /> }
        </FormDataContext.Provider>
            
    )
};

export default Register;
