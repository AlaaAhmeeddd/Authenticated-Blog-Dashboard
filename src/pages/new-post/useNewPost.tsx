import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addPost, queryClient } from '../../utils/http';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';

export default function useNewPost() {
  const navigate = useNavigate()
  const { user } = useSelector((state : RootState) => state.auth);
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

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addPost,
    mutationKey: ['posts'],
    onSuccess: () => {
      queryClient.invalidateQueries()
      navigate('/dashboard')
    }
  });

  const handlePostInfo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handlePublish = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  return{
    postInfo,
    errors,
    handlePostInfo,
    handlePublish,
    isPending,
    isError,
    error
  }
}
