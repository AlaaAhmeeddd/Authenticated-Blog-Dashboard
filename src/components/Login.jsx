import { useState } from 'react'
import Container from './Container'
import Input from './Input'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.auth)
  
  const handleChangeData = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  } 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart())
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      dispatch(loginSuccess(userCredential.user))
      navigate("/dashboard")
    } catch (err) {
      dispatch(loginFailure(err.message))
    }
  };

  return (
    <Container className="flex items-center justify-center">
      <div className='md:w-2/3 w-full bg-white rounded-xl p-6'>
        <h1 className='text-3xl font-bold'>Log In</h1>
        <p className='font-semibold text-[#7B91B0] mt-2'>Please enter your email and password to continue.</p>
        <form className='my-8'>
          <Input
            labelTitle={'Email Address'}
            inputName={'email'}
            inputValue={formData.email}
            inputType='email'
            onChange={handleChangeData}
          />
          <Input
            labelTitle={'Password'}
            inputName={'password'}
            inputValue={formData.password}
            inputType='password'
            onChange={handleChangeData}
          />
          {error && <p className='text-red-500'>{error}</p>}
          <button
            className='text-white bg-[#5D5FEF] rounded-full w-full mt-8 px-3 py-2 cursor-pointer hover:bg-[#5556C3] duration-300'
            onClick={handleSubmit}
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </div>
    </Container>
  )
}
