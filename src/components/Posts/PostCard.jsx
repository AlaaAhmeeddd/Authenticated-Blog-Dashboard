import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IoTrashSharp } from 'react-icons/io5';
import { deletePost } from '../../utils/http';
import Modal from '../Modal';

export default function PostCard({ post, isDashboard }) {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false)
  const { mutate } = useMutation({
    mutationFn: deletePost,
    mutationKey: ['posts'],
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
    },
  });
  
  function handleDelete(id) {
    mutate(id);
  }

  const handleEdit = () => {
    setShowModal(true)
  }

  return (
    <div className='bg-white rounded-xl p-5'>
      {showModal && <Modal post={post} setShowModal={setShowModal} />}
      <div className="flex justify-between items-center">
        <h1 className='text-xl font-semibold mb-1'>{post.headline}</h1>
        {isDashboard && (
          <IoTrashSharp
            onClick={() => handleDelete(post.id)}
            className="text-red-500 hover:text-red-700 duration-300 cursor-pointer text-xl"
          />
        )}
      </div>
      <p>{post.description}</p>
      <p className="mt-5 text-sm">
        Published at: <span className='text-gray-500'>{post.date}</span>
      </p>
      {isDashboard && (
        <button className='cursor-pointer w-full p-1 rounded-lg mt-4 font-semibold bg-zinc-300' onClick={handleEdit}>
          Edit
        </button>
      )}
    </div>
  );
}
