import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IoTrashSharp } from 'react-icons/io5';
import { deletePost } from '../../utils/http';
import Modal from '../Modal';
import { PostType } from '@/type';

interface CardType {
  post: PostType;
  isDashboard: boolean;
}

export default function PostCard({ post, isDashboard } : CardType) {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const { mutate } = useMutation({
    mutationFn: deletePost,
    mutationKey: ['posts'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  function handleDelete(id: string) {
    mutate(id);
  }

  const handleEdit = () => {
    setShowModal(true);
  };

  return (
    <div className='bg-white rounded-xl overflow-hidden relative h-full flex flex-col justify-between'>
      {showModal && <Modal post={post} setShowModal={setShowModal} />}
      <img src={post.imageUrl} className='w-full h-[220px]' />
      <div className='p-5 relative flex-grow'>
        <div className="flex justify-between items-center">
          <h1 className='text-xl font-semibold mb-1'>{post.headline}</h1>
          {isDashboard && (
            <IoTrashSharp
              onClick={() => handleDelete(post.id!)}
              className="text-red-500 hover:text-red-700 duration-300 cursor-pointer text-xl"
            />
          )}
        </div>
        <p>{post.description}</p>
      </div>
      <div className='relative bottom-0 p-5 mt-auto'>
        <p className="text-sm">
          Published at: <span className='text-gray-500'>{post.date}</span>
        </p>
        {isDashboard && (
          <button className='cursor-pointer w-full p-1 rounded-lg mt-4 font-semibold bg-zinc-300' onClick={handleEdit}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
