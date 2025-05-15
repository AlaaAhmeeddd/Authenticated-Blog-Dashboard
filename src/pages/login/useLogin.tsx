import { useState } from 'react'
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';

export default function useLogin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state : RootState) => state.auth)
  
  const handleChangeData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  } 
  
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(loginStart())
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      dispatch(loginSuccess(userCredential.user))
      localStorage.setItem('person', JSON.stringify(userCredential.user))
      navigate("/dashboard")
    } catch (err) {
      if (err instanceof Error) {
        dispatch(loginFailure(err.message))
      } else {
        dispatch(loginFailure('An unknown error occurred'))
      }
    }
  };
  return {
    formData,
    handleChangeData,
    handleSubmit,
    loading,
    error
  }
}

