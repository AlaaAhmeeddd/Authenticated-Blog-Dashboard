import React from 'react'
import Container from './Container'
import Input from './Input'

export default function Signup() {
  return (
    <Container>
      <div className='md:w-2/3 w-full bg-white rounded-xl p-6 relative left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]'>
        <h1 className='text-3xl font-bold'>Sign Up</h1>
        <p className='font-semibold text-[#7B91B0] mt-2'>Please enter your email and password to create your new account.</p>
        <form className='my-8'>
          <Input labelTitle={'Email Address'} inputName={'email'} />
          <Input labelTitle={'Password'} inputName={'password'} />
          <button className='text-white bg-[#5D5FEF] rounded-full w-full mt-8 px-3 py-2 cursor-pointer hover:bg-[#5556C3] duration-300'>
            Submit
          </button>
        </form>
      </div>
    </Container>
  )
}
