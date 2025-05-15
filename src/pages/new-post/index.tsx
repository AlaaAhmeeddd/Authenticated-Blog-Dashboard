import Input from '../../components/Input';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import useNewPost from './useNewPost';

export default function NewPost() {
  
  const { postInfo, errors, handlePostInfo, handlePublish, isPending, isError, error } = useNewPost()
  return (
    <div className='container mx-auto'>
      <form className='bg-white p-6 rounded-xl'>
        <h1 className='text-3xl font-bold mb-6'>Create your post</h1>
        {errors.isAuth &&
          <div className='flex flex-col gap-2 items-center'>
            <p className='text-red-500 font-semibold my-2'>
              {errors.isAuth}
            </p>
            <Link to={'/login'} className='flex items-center gap-2 font-semibold group'>
              <span className='text-lg'>Click here to Login</span>
              <FaArrowRightLong className='relative group-hover:left-1.5 left-0 duration-300' />
            </Link>
          </div>
        }
        <Input
          labelTitle={'Post headline'}
          inputName={'headline'}
          inputType='text'
          inputValue={postInfo.headline}
          onChange={handlePostInfo}
        />
        {errors.headline && !errors.isAuth && <p className='text-red-500 font-semibold my-2'>{errors.headline}</p>}
        <div className='flex flex-col gap-3'>
          <label htmlFor='description' className='text-slate-600 font-semibold'>Description</label>
          <textarea
            name='description'
            className='border rounded-lg border-slate-300 p-2'
            rows={6}
            value={postInfo.description}
            onChange={handlePostInfo}
          />
        </div>
        {errors.description && !errors.isAuth && <p className='text-red-500 font-semibold my-2'>{errors.description}</p>}
        <Input
          labelTitle={'Image URL'}
          inputName={'imageUrl'}
          inputType='text'
          inputValue={postInfo.imageUrl}
          onChange={handlePostInfo}
        />
        {errors.imageUrl && !errors.isAuth && <p className='text-red-500 font-semibold my-2'>{errors.imageUrl}</p>}

        <button
          className='text-white bg-[#5D5FEF] rounded-full w-full mt-8 px-3 py-2 cursor-pointer hover:bg-[#5556C3] duration-300'
          onClick={handlePublish}
          disabled={isPending}
        >
          {isPending ? "Publishing..." : "Publish"}
        </button>
        {isError && <p className='text-red-500 font-semibold my-2'>Error: {error!.message}</p>}
      </form>
    </div>
  );
}
