import Input from '../../components/Input';
import useSignup from './useSignup';

export default function Signup() {
    const { formData, handleFormData, handleSubmit, error, loading, inputErrors } = useSignup()
    return (
        <div className="container mx-auto flex items-center justify-center">
            <div className='md:w-2/3 w-full bg-white rounded-xl p-6'>
                <h1 className='text-3xl font-bold'>Sign Up</h1>
                <p className='font-semibold text-[#7B91B0] mt-2'>Please enter your email and password to create your new account.</p>
                <form className='mt-8'>
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
                    <Input
                        labelTitle={'Your image'}
                        inputName={'imageUrl'}
                        inputValue={formData.imageUrl}
                        inputType='text'
                        onChange={handleFormData}
                    />
                    {inputErrors.imageUrl && <p className='text-red-500'>{inputErrors.imageUrl}</p>}
                    {error && <p className='text-red-500'>{error}</p>}
                    <button
                        className='text-white bg-[#5D5FEF] rounded-full w-full mt-8 px-3 py-2 cursor-pointer hover:bg-[#5556C3] duration-300'
                        onClick={handleSubmit}
                    >
                        {loading ? 'Loading...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
}
