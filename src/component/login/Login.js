import { FiLock, FiMail } from 'react-icons/fi';
import {useState } from 'react';
//internal  import
import Error from '@component/form/Error';
import useLoginSubmit from '@hooks/useLoginSubmit';
import InputArea from '@component/form/InputArea';

import Loading from '@component/preloader/Loading';

const Login = ({ setShowResetPassword, setModalOpen }) => {
  const { handleSubmit, submitHandler, register, errors, loading } =
    useLoginSubmit(setModalOpen);

    const submitLogin = async (event) => 
    {
      
      event.preventDefault();

      
      var data = {};

      var password = event.target.password.value;
      var registerEmail = event.target.registerEmail.value;


      if(password.length > 0 &&  registerEmail.length > 0)
      {
        data["registerEmail"] = registerEmail;
        data["password"] = password;
      
      var companyId = 0;
      var paramPath = '';
      var targetPage = '';
      var catalogName = '';
      if(sessionStorage.getItem('companyId'))
      {
        companyId = sessionStorage.getItem('companyId'); 
        //alert("CompanyId = " + companyId);
          
      }
      /*if(sessionStorage.getItem('catalogName'))
      {
        paramPath = '/catalog/' + sessionStorage.getItem('catalogName'); 
        //alert("catalogName = " + paramPath);
          
      }*/
      if(sessionStorage.getItem('dataPath'))
      {
        paramPath = sessionStorage.getItem('dataPath'); 
        //alert("catalogName = " + paramPath);
          
      }
      if(sessionStorage.getItem('targetPage'))
      {
        targetPage = sessionStorage.getItem('targetPage');
      }
      if(sessionStorage.getItem('catalogName'))
      {
        catalogName = sessionStorage.getItem('catalogName');
      }
      
      data["targetPage"] = targetPage;
      data["companyId"] = companyId;
      data["paramPath"] = paramPath;
      data["catalogName"] = catalogName;

      
      

      //alert("Login Handle")
      submitHandler(data)

      //setLoginLoading(false);
      }
    }

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold font-serif">เข้าสู่ระบบ</h2>
        <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
          เข้าสู่ระบบด้วย Email และรหัสผ่าน
        </p>
      </div>
        {
          loading ? (
            <Loading loading={loading} />
          )
          :
          (
            <form
              //onSubmit={handleSubmit(submitHandler)}
              onSubmit={submitLogin}
              className="flex flex-col justify-center"
            >
              <div className="grid grid-cols-1 gap-5">
                <div className="form-group">
                  <InputArea
                    register={register}
                    defaultValue=""
                    label="Email"
                    name="registerEmail"
                    type="email"
                    placeholder="Email"
                    Icon={FiMail}
                  />
                  <Error errorName={errors.registerEmail} />
                </div>
                <div className="form-group">
                  <InputArea
                    register={register}
                    defaultValue=""
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    Icon={FiLock}
                  />

                  <Error errorName={errors.password} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex ms-auto">
                    <button
                      type="button"
                      onClick={() => setShowResetPassword(true)}
                      className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
                    >
                      ลืมรหัสผ่าน?
                    </button>
                  </div>
                </div>
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full text-center py-3 rounded bg-cyan-500 text-white hover:bg-cyan-600 transition-all focus:outline-none my-1"
                >
                  เข้าสู่ระบบ
                </button>
              </div>
            </form>
          )
        }
      
    </>
  );
};

export default Login;
