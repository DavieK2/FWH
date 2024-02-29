import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPageTitle } from "@/redux/stores/general/Setup";
import imageOne from "@/assets/images/authBg/bgOne.png";
import userImage from "@/assets/images/default/user.png";
import TopBar from "./TopBar";
import Timeline from "./Timeline";
import { CheckCircle2, EyeOff } from "lucide-react";
import Input from "@/components/Input";
import Select from "@/components/Select";
import CountryDropDown from "@/components/CountryDropDown";
import FormDataContext from "../../helpers/FormDataContext";
import TimelineMobile from "./TimelineMobile";


const RegisterStep1 = ({ timeline, updateFields, onSubmitButton }) => {
  const ages = [
    { placeholder: "18 - 25", value: "18 - 25" },
    { placeholder: "26 - 35", value: "26 - 35" },
    { placeholder: "36 - 45", value: "36 - 45" },
    { placeholder: "46 - 55", value: "46 - 55" },
    { placeholder: "56 - 65", value: "56 - 65" },
    { placeholder: "66 - 75", value: "66 - 75" },
    { placeholder: "76 - 85", value: "76 - 85" },
    { placeholder: "85 - 100", value: "85 - 100" },
  ];

  const sites = [
    { placeholder: "Ajegunle", value: "fws-rjcszynq" },
    { placeholder: "Ojota", value: "fws-rjcszynt" },
    { placeholder: "Iyanapaja", value: "fws-rjcszynqi" },
  ];

  const idTypes = [
    { placeholder: "National ID Card (NIN)", value: "National ID Card (NIN)" },
    { placeholder: "Voter's Card", value: "Voter's Card" },
    { placeholder: "International Passport", value: "International Passport" },
    { placeholder: "Driver's License", value: "Driver's License" },
  ];

  const formFields = useContext(FormDataContext);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [defaultImage, setDefaultImage] = useState(userImage);

  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [passwordMatch, isPasswordMatch] = useState(true);
  const [showErrors, setShowErrors] = useState(false);
  const [hasEightCharacters, setCharactersValidation] = useState(false);
  const [hasSpecialCharacter, setSpecialCharacterValidation] = useState(false);
  const [passwordHasZeroCharacters, setPasswordHasZeroCharacters] = useState(
    formFields.userDetails.password.length === 0
  );
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    dispatch(setPageTitle("Register"));
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

  const update = (step, key, value) => {
    
    updateFields(step, key, value);
    updateFormData(step, key)
    
  };

  const validatePassword = (value) => {

    const regex = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/;

    setPassword(value)
    setPasswordHasZeroCharacters(value === 0);
    updateFormData("password", "", value)

    if ( value.length >= 8 ) {
      setCharactersValidation(true);
    } else {
      setCharactersValidation(false);
    }

    if ( regex.test(value) ) {
      setSpecialCharacterValidation(true);
    } else {
      setSpecialCharacterValidation(false);
    }    
    
  };

  const validateConfirmPassword = (value) => {

    if( ( password != value ) ){
        isPasswordMatch(false)
    }else{
        isPasswordMatch(true)
    }

    setConfirmPassword(value)
    updateFormData("confirmPassword", "", value)
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

  const onSubmit = (e) => {

    e.preventDefault();
    setShowErrors(true);

    if( ! disabled ){
      
        onSubmitButton();
    }

  };


  useEffect(() => { 

    if( hasEightCharacters && hasSpecialCharacter ){
        updateFields("userDetails", "password", password)
    }else{
        updateFields("userDetails", "password", "")
    }
    

    if( ( hasError('firstName') || hasError('lastName') ||  hasError('ageGroup') || hasError('credential')  || hasError('resAddress') || hasError('gender') ||  hasError('siteId') || hasError('idType') ||  hasError('password') || hasError('confirmPassword') || ( ! passwordMatch ) )) {
        setDisabled(true)
    }else{
        setDisabled(false)
    }
    
   }, [hasSpecialCharacter, hasEightCharacters, password, formData])

  return (
    <>
      <section className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
          <div className="hidden lg:grid">
            <img className="h-full w-full object-cover" src={imageOne} alt="" />
          </div>
          <div className="lg:px-8 px-3 pt-10 md:px-24">
            <TopBar />

            <div className="form-section mt-16 flex flex-col md:flex-row gap-20">
              <div className="timeline">
                <Timeline step={timeline} />
                <TimelineMobile step={timeline} />
              </div>

              <div className="max-w-md">
                <div className="px-1">
                  <h1 className="text-3xl font-bold text-grey-700">
                    Create Account
                  </h1>
                  <h4 className="text-lg font-medium text-grey-700 pt-2">
                    Personal Information
                  </h4>
                </div>

                <form className="mt-6 w-[28em] max-h-screen overflow-auto no-scrollbar px-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="mb-5">
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-grey-700"
                      >
                        First Name*
                      </label>
                      <Input
                        id="first_name"
                        placeholder="Enter First Name"
                        value={formFields.userDetails.firstName}
                        onChange={(value) =>
                          update("userDetails", "firstName", value)
                        }
                        className={`${
                            hasErrors('firstName')
                            ? "border-red-600"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-grey-700"
                      >
                        Last Name*
                      </label>
                      <Input
                        id="last_name"
                        placeholder="Enter Last Name"
                        value={ formFields.userDetails.lastName }
                        onChange={(value) =>
                            update("userDetails", "lastName", value)
                        }
                        className={`${
                            hasErrors('lastName')
                            ? "border-red-600"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                  </div>

                  <div></div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="mb-5">
                      <label
                        htmlFor="phoneNumber"
                        className="block mb-2 text-sm font-medium text-grey-700"
                      >
                        Phone Number*
                      </label>

                      <CountryDropDown
                        phoneValue={formFields.userDetails.credential}
                        onPhoneInput={(value) =>
                            update("userDetails", "credential", value)
                        }
                        className={`${
                            hasErrors('credential')
                            ? "border-red-600"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="mb-5">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-grey-700"
                      >
                        Email Address <i>(optional)</i>
                      </label>
                      <Input
                        id="email"
                        placeholder="Enter Email Address"
                        value={formFields.userDetails.email}
                        onChange={(value) =>
                          update("userDetails", "email", value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="mb-5">
                      <label
                        htmlFor="age"
                        className="block mb-2 text-sm font-medium text-grey-700"
                      >
                        Age*
                      </label>
                      <Select
                        placeholder="Select Age"
                        selectOptions={ages}
                        onSelected={(value) => update("userDetails", "ageGroup", value.value)}
                        className={`${
                            hasErrors('ageGroup')
                            ? "border-red-600"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="gender"
                        className="block mb-2 text-sm font-medium text-grey-700"
                      >
                        Choose Gender*
                      </label>
                      <div className="flex">
                        <div className="flex items-center me-4 align-middle ">
                          <input
                            id="genderMale"
                            type="radio"
                            value="Male"
                            name="gender"
                            className="w-4 h-4 text-dark-green focus:ring-dark-green checked:border-dark-green checked:active:bg-dark-green border-gray-300"
                            onChange={ (e) => update("userDetails", "gender", e.target.value) }
                          />
                          <label
                            htmlFor="genderMale"
                            className="ms-2 text-sm font-medium text-grey-700"
                          >
                            Male
                          </label>
                        </div>
                        <div className="flex items-center me-4 align-middle">
                          <input
                            id="genderFemale"
                            type="radio"
                            value="Female"
                            name="gender"
                            className="w-4 h-4 text-dark-green focus:ring-dark-green checked:border-dark-green checked:active:bg-dark-green border-gray-300"
                            onChange={ (e) => update("userDetails", "gender", e.target.value) }
                          />
                          <label
                            htmlFor="genderFemale"
                            className="ms-2 text-sm font-medium text-grey-700"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="mb-5">
                      <label
                        htmlFor="residentialAddress"
                        className="block mb-2 text-sm font-medium text-grey-700"
                      >
                        Residential Address*
                      </label>
                      <Input
                        id="residentialAddress"
                        placeholder="Ex: No 21 Agaro road, Abeokuta"
                        value={formFields.userDetails.resAddress}
                        onChange={(value) =>
                          update("userDetails", "resAddress", value)
                        }
                        className={`${
                            hasErrors('resAddress')
                            ? "border-red-600"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="mb-5">
                      <label
                        htmlFor="site"
                        className="block mb-2 text-sm font-medium text-grey-700"
                      >
                        Site*
                      </label>
                      <Select
                        placeholder="Select Site"
                        selectOptions={sites}
                        onSelected={(value) =>
                          update("siteId", "", value.value)
                        }
                        className={`${
                            hasErrors('siteId')
                            ? "border-red-600"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="mb-5">
                      <label
                        htmlFor="idType"
                        className="block mb-2 text-sm font-medium text-grey-700"
                      >
                        ID Type*
                      </label>
                      <Select
                        placeholder="Select ID Type"
                        selectOptions={idTypes}
                        onSelected={(value) =>
                          update("idUpload", "idType", value.value)
                        }
                        className={`${
                            hasErrors('idType')
                            ? "border-red-600"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="mb-5">
                      <label
                        htmlFor="idNumber"
                        className="block mb-2 text-sm font-medium text-grey-700"
                      >
                        ID Number*
                      </label>
                      <Input
                        id="idNumber"
                        placeholder="Enter ID Number"
                        value={formFields.idUpload?.idNumber}
                        onChange={(value) => {
                            // update("userDetails", "idNumber", value)
                          }
                        }
                        // className={`${
                        //     hasErrors('idNumber')
                        //     ? "border-red-600"
                        //     : "border-gray-300"
                        // }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="mb-5">
                      <label
                        htmlFor="idDocument"
                        className="block mb-2 text-sm font-medium text-grey-700"
                      >
                        Upload ID document{" "}
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none h-14 p-3 placeholder-gray-500"
                        id="idDocument"
                        type="file"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1">
                    <div className="mb-5">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-grey-700"
                      >
                        Create Password
                      </label>
                      <div className="relative w-full">
                        <Input
                          id="password"
                          type="password"
                          placeholder="*********"
                        //   value={formFields.userDetails.password}
                          onChange={(value) => validatePassword(value)}
                          className={`${
                            hasErrors('password')
                            ? "border-red-600"
                            : "border-gray-300"
                        }`}
                          
                        />
                        <button className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white">
                          <EyeOff color="black" size={15} />
                        </button>
                      </div>
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="confirm_password"
                        className="block mb-2 text-sm font-medium text-grey-700"
                      >
                        Confirm Password
                      </label>
                      <div className="relative w-full">
                        <Input
                          id="confirm_password"
                          type="password"
                          placeholder="*********"
                        //   value={confirm_password}
                          onChange={ (value) => validateConfirmPassword(value) }
                          className={`${
                            hasErrors('confirmPassword')
                            ? "border-red-600"
                            : "border-gray-300"
                        }`}
                        />
                        <button className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white  ">
                          <EyeOff color="black" size={15} />
                        </button>
                      </div>
                      { ( ! passwordMatch )  && <p className="text-xs text-red-600 pt-1">Passwords does not match</p>}
                     
                      <div className="mt-4">
                        <p
                          className={`${
                            hasEightCharacters
                              ? "text-[#0D8A6A]"
                              : !hasEightCharacters && passwordHasZeroCharacters
                              ? "text-gray-500"
                              : "text-[#F04438]"
                          } flex gap-2 mt-2 items-center`}
                        >
                          <CheckCircle2
                            className=""
                            color={
                              hasEightCharacters
                                ? "#0D8A6A"
                                : !hasEightCharacters &&
                                  passwordHasZeroCharacters
                                ? "#D0D5DD"
                                : "#F04438"
                            }
                          />
                          Must be at least 8 characters
                        </p>
                        <p
                          className={`${
                            hasSpecialCharacter
                              ? "text-[#0D8A6A]"
                              : !hasSpecialCharacter &&
                                passwordHasZeroCharacters
                              ? "text-gray-500"
                              : "text-[#F04438]"
                          } flex gap-2 mt-2 items-center`}
                        >
                          <CheckCircle2
                            className=""
                            color={
                              hasSpecialCharacter
                                ? "#0D8A6A"
                                : !hasSpecialCharacter &&
                                  passwordHasZeroCharacters
                                ? "#D0D5DD"
                                : "#F04438"
                            }
                          />
                          Must contain one special characters
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="mb-5">
                      <span className="block mb-2 text-sm font-medium text-grey-700">
                        Upload Profile Picture <i>(optional)</i>
                      </span>
                      <div className="flex gap-5 pt-2 items-center">
                        <div className="bg-gray-100 h-14 w-14 rounded-full flex shrink-0 items-center justify-center border border-gray-200">
                          <svg
                            className="h-8 w-8"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M26.6667 28C26.6667 26.1392 26.6667 25.2089 26.4371 24.4518C25.92 22.7473 24.5861 21.4134 22.8816 20.8963C22.1245 20.6667 21.1941 20.6667 19.3334 20.6667H12.6667C10.806 20.6667 9.87558 20.6667 9.11852 20.8963C7.41398 21.4134 6.08009 22.7473 5.56303 24.4518C5.33337 25.2089 5.33337 26.1392 5.33337 28M22 10C22 13.3137 19.3138 16 16 16C12.6863 16 10 13.3137 10 10C10 6.68629 12.6863 4 16 4C19.3138 4 22 6.68629 22 10Z"
                              stroke="#475467"
                              strokeWidth="2.66667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>

                        <label
                          htmlFor="profilePic"
                          className="flex cursor-pointer items-center gap-3 px-4 border rounded-lg grow-0 h-10 text-grey-700 font-medium border-gray-300"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.5 12.5V13.5C17.5 14.9001 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9001 17.5 13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86502 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9001 2.5 13.5V12.5M14.1667 6.66667L10 2.5M10 2.5L5.83333 6.66667M10 2.5V12.5"
                              stroke="#344054"
                              strokeWidth="1.66667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>Upload Picture</span>
                        </label>
                        <input
                          style={{ display: "none" }}
                          type="file"
                          id="profilePic"
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark-green focus:border-dark-green block w-full p-2.5  "
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 mb-5 gap-3">
                    <button disabled
                      type="button"
                      className="text-grey-700 font-semibold disabled:border-gray-300 disabled:text-gray-300 border bg-white focus:ring-4 focus:outline-none focus:ring-gray-50 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                      Back
                    </button>
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

export default RegisterStep1;
