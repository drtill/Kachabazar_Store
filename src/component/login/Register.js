import { FiLock, FiMail, FiUser } from 'react-icons/fi';

import { useState } from 'react';
//internal import
import Error from '@component/form/Error';
import InputArea from '@component/form/InputArea';
import useLoginSubmit from '@hooks/useLoginSubmit';

const Register = ({ setShowResetPassword, setModalOpen }) => {
  const { handleSubmit, submitHandler, register, errors, loading } =
    useLoginSubmit(setModalOpen);

    const [errors_ConfirmPassword,setConfirmPasswordError] = useState({});
    const [errors_Password,setPasswordError] = useState({});

    const submitRegister = async (event) => 
    {
      event.preventDefault();
      var data = {};

      var password = event.target.password.value;
      var retypePassword = event.target.confirmPassword.value;
      if(password.length > 0 &&  retypePassword.length > 0)
      {
        if(password !== retypePassword)
        {
          var passwordError = {};
          passwordError['message'] = "กรุณาระบุ รหัสผ่าน ให้ตรงกับ ยืนยันรหัสผ่าน";
          //errors.password = "กรุณาระบุ รหัสผ่าน";
          setPasswordError(passwordError)

          var rePasswordError = {};
          rePasswordError['message'] = "กรุณาระบุ รหัสผ่าน ให้ตรงกับ ยืนยันรหัสผ่าน";
          //errors.password = "กรุณาระบุ รหัสผ่าน";
          setConfirmPasswordError(rePasswordError)
          
          
          return;
        }
      }
      else
      {
        //alert("0 data");
        if(password.length <= 0 && retypePassword.length <= 0)
        {
          var passwordError = {};
          passwordError['message'] = "กรุณาระบุ รหัสผ่าน"
          setPasswordError(passwordError)
          
          var rePasswordError = {};
          rePasswordError['message'] = "กรุณา ยืนยันรหัสผ่าน"
          setConfirmPasswordError(rePasswordError)
          
          return;
        }
        else if(password.length <= 0)
        {
          
          var passwordError = {};
          passwordError['message'] = "กรุณาระบุ รหัสผ่าน"
          //errors.password = "กรุณาระบุ รหัสผ่าน";
          
          setPasswordError(passwordError)
          return;
        }
        else if(retypePassword.length <= 0)
        {
          
          var rePasswordError = {};
          rePasswordError['message'] = "กรุณา ยืนยันรหัสผ่าน"
          //errors.password = "กรุณาระบุ รหัสผ่าน";
          
          setConfirmPasswordError(rePasswordError)
          return;
        }
      }

      
      data["name"] = event.target.name.value;
      data["email"] = event.target.email.value;
      data["password"] = event.target.password.value;
      var companyName = '';
      var companyId = 0;
      var locationEmail = '';

      if(sessionStorage.getItem('companyName'))
      {
        companyName = sessionStorage.getItem('companyName'); 
          
      }
      if(sessionStorage.getItem('companyId'))
      {
        companyId = sessionStorage.getItem('companyId'); 
        alert("CompanyId = " + companyId);
          
      }
      if(sessionStorage.getItem('locationEmail'))
      {
        locationEmail = sessionStorage.getItem('locationEmail'); 
          
      }
      data["companyId"] = companyId;
      data["companyName"] = companyName;
      data["locationEmail"] = locationEmail;

      

      alert("Handle")
      submitHandler(data)


    }
  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold font-serif">Signing Up</h2>
        <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
          Create an account with email
        </p>
      </div>
      <form
        // onSubmit={handleSubmit(submitHandler)}
        onSubmit={submitRegister}
        className="flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 gap-5">
          <div className="form-group">
            <InputArea
              register={register}
              label="Name"
              name="name"
              type="text"
              placeholder="Full Name"
              Icon={FiUser}
            />

            <Error errorName={errors.name} />
          </div>

          <div className="form-group">
            <InputArea
              register={register}
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              Icon={FiMail}
            />
            <Error errorName={errors.email} />
          </div>
          <div className="form-group">
            <InputArea
              register={register}
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              Icon={FiLock}
            />

            {/* <Error errorName={errors.password} /> */}
            <Error errorName={errors_Password} />
          </div>
          <div className="form-group">
            <InputArea
              register={register}
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              Icon={FiLock}
            />

            <Error errorName={errors_Password} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex ms-auto">
              <button
                type="button"
                onClick={() => setShowResetPassword(true)}
                className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
              >
                Forgot password?
              </button>
            </div>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full text-center py-3 rounded bg-cyan-500 text-white hover:bg-cyan-600 transition-all focus:outline-none my-1"
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
