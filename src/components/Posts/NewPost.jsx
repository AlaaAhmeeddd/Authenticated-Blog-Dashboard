import React, { useState } from 'react';
import Container from '../Container';
import Input from '../Input';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import { useMutation } from '@tanstack/react-query';
import { addPost, queryClient } from '../../utils/http';
import { v4 as uuidv4 } from 'uuid';

export default function NewPost() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth);
  const [postInfo, setPostInfo] = useState({
    headline: "",
    description: "",
    imageUrl: ""
  });
  const [errors, setErrors] = useState({
    headline: "",
    description: "",
    isAuth: "",
    imageUrl: ""
  });

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: addPost,
    mutationKey: ['posts'],
    onSuccess: () => {
      queryClient.invalidateQueries()
      navigate('/dashboard')
    }
  });

  const handlePostInfo = (e) => {
    const { name, value } = e.target;
    console.log(name)
    setPostInfo({
      ...postInfo,
      [name]: value
    });

    let newErrors = { ...errors };

    switch (name) {
      case 'headline':
        newErrors.headline = value.trim() === "" ? "Headline is required" : "";
        break;
      case 'description':
        newErrors.description = value.trim() === "" ? "Description is required" : "";
        break;
      case 'imageUrl':
        newErrors.imageUrl = value.trim() === "" ? "Image is required" : "";
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handlePublish = (e) => {
    e.preventDefault();

    let newErrors = { ...errors };

    if (!user?.email) {
      newErrors.isAuth = "You can't create post without login!!";
    } else {
      newErrors.isAuth = "";
    }

    if (!postInfo.headline) {
      newErrors.headline = "The headline is required!!";
    }

    if (!postInfo.description) {
      newErrors.description = "The description is required!!";
    }

    if (!postInfo.imageUrl) {
      newErrors.imageUrl = "The Image is required!!";
    }

    setErrors(newErrors);
    if (!newErrors.isAuth && !newErrors.headline && !newErrors.description && !newErrors.imageUrl) {
      const date = new Date();
      const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
      });
      const post = {
        ...postInfo,
        userEmail: user?.email,
        date: formattedDate,
        id: uuidv4(),
      };
      
      mutate(post);
    }
  };
  
  console.log(postInfo)

  return (
    <Container>
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
            rows="6"
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
          disabled={isLoading}
        >
          {isLoading ? "Publishing..." : "Publish"}
        </button>
        {isError && <p className='text-red-500 font-semibold my-2'>Error: {error.message}</p>}
      </form>
    </Container>
  );
}
