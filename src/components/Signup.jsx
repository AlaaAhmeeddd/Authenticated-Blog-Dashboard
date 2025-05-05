import React, { useState } from 'react';
import Container from './Container';
import Input from './Input';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { signupStart, signupSuccess, signupFailure } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { addNewUser, queryClient } from '../utils/http';

export default function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userName: "",
    location: "",
    age: null,
    confirmedPassword: ""
  });
  const [inputErrors, setInputErrors] = useState({
    email: "",
    password: "",
    userName: "",
    location: "",
    age: "",
    passwordConfirmed: ""
  });
  const dispatch = useDispatch();

  const { mutate } = useMutation({
    mutationFn: addNewUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['users']})
    }
  })

  const { loading, error } = useSelector((state) => state.auth);

  const handleFormData = (e) => {
    const { name, value } = e.target;

    let errors = { ...inputErrors };

    switch (name) {
      case 'email':
        errors.email = value.trim() === "" ? "Email is required" : "";
        break;
      case 'password':
        errors.password = value.trim() === "" ? "Password is required" : "";
        break;
      case 'userName':
        errors.userName = value.trim() === "" ? "Username is required" : "";
        break;
      case 'location':
        errors.location = value.trim() === "" ? "Location is required" : "";
        break;
      case 'age':
        errors.age = value <= 0 ? "Age must be a positive number" : "";
        break;
      case 'confirmedPassword':
        errors.passwordConfirmed = value.trim() === "" ? "Password is required" : "";
        errors.passwordConfirmed = value !== formData.password ? "Passwords do not match" : "";
        break;
      default:
        break;
    }

    setInputErrors(errors);

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = { ...inputErrors };
    if (formData.userName.trim() === "") {
      errors.userName = "Username is required";
    }
    if (formData.email.trim() === "") {
      errors.email = "Email is required";
    }
    if (formData.password.trim() === "") {
      errors.password = "Password is required";
    }
    if (formData.location.trim() === "") {
      errors.location = "Location is required";
    }
    if (formData.age < 16) {
      errors.age = "Age must be a equal or greater than 16";
    }
    if (formData.confirmedPassword !== formData.password) {
      errors.passwordConfirmed = "Passwords do not match";
    } else if (formData.confirmedPassword.trim() === "") {
      errors.passwordConfirmed = "Confirmed Password is required";
    }
    setInputErrors(errors);

    if (Object.values(errors).some(error => error !== "")) {
      return;
    }
    dispatch(signupStart());
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      dispatch(signupSuccess(userCredential.user));
      mutate( formData )
      navigate('/dashboard')
    } catch (err) {
      dispatch(signupFailure(err.message));
    }
  };

  return (
    <Container className="flex items-center justify-center">
      <div className='md:w-2/3 w-full bg-white rounded-xl p-6'>
        <h1 className='text-3xl font-bold'>Sign Up</h1>
        <p className='font-semibold text-[#7B91B0] mt-2'>Please enter your email and password to create your new account.</p>
        <form className='mt-8' onSubmit={handleSubmit}>
          <Input
            labelTitle={'Username'}
            inputName={'userName'}
            inputValue={formData.userName}
            inputType='text'
            onChange={handleFormData}
          />
          {inputErrors.userName && <p className='text-red-500'>{inputErrors.userName}</p>}
          <Input
            labelTitle={'Email Address'}
            inputName={'email'}
            inputValue={formData.email}
            inputType='email'
            onChange={handleFormData}
          />
          {inputErrors.email && <p className='text-red-500'>{inputErrors.email}</p>}
          <Input
            labelTitle={'Password'}
            inputName={'password'}
            inputValue={formData.password}
            inputType='password'
            onChange={handleFormData}
          />
          {inputErrors.password && <p className='text-red-500'>{inputErrors.password}</p>}
          <Input
            labelTitle={'Confirm Password'}
            inputName={'confirmedPassword'}
            inputValue={formData.confirmedPassword}
            inputType='password'
            onChange={handleFormData}
          />
          {inputErrors.passwordConfirmed && <p className='text-red-500'>{inputErrors.passwordConfirmed}</p>}
          <Input
            labelTitle={'Location'}
            inputName={'location'}
            inputValue={formData.location}
            inputType='text'
            onChange={handleFormData}
          />
          {inputErrors.location && <p className='text-red-500'>{inputErrors.location}</p>}
          <Input
            labelTitle={'Age'}
            inputName={'age'}
            inputValue={formData.age}
            inputType='number'
            onChange={handleFormData}
          />
          {inputErrors.age && <p className='text-red-500'>{inputErrors.age}</p>}

          {error && <p className='text-red-500'>{error}</p>}
          <button
            className='text-white bg-[#5D5FEF] rounded-full w-full mt-8 px-3 py-2 cursor-pointer hover:bg-[#5556C3] duration-300'
            type='submit'
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </div>
    </Container>
  );
}
