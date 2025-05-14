import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient, updatePost } from "../utils/http";
import Input from "./Input";
import { PostType } from "@/type";

interface modalType {
    post: PostType,
    setShowModal: (show: boolean) => void;
}

export default function Modal({ post, setShowModal } : modalType) {
    const [postInfo, setPostInfo] = useState(post);
    const [errors, setErrors] = useState({
        headline: "",
        description: "",
        imageUrl: ""
    });

    const handlePostInfo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
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

    const handleEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        let newErrors = { ...errors };
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
        if (!newErrors.headline && !newErrors.description && !newErrors.imageUrl) {
            mutate({ postId: postInfo.id, updatedData: postInfo });
        }
    };

    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: ({ postId, updatedData }) => updatePost(postId, updatedData),
        mutationKey: ['posts'],
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
            setShowModal(false);
        }
    });

    return (
        <div>
            <div className="z-[1000] w-full h-full top-0 bottom-0 left-0 right-0 fixed bg-black/50" />
            <div className="z-[1000] md:w-[50%] w-full bg-white rounded-xl fixed top-[50%] -translate-x-[50%] left-[50%] -translate-y-[50%] p-3">
                <span className="absolute right-6 text-2xl text-red-500 font-bold cursor-pointer" onClick={() => setShowModal(false)}>
                    X
                </span>
                <form>
                    <Input
                        labelTitle={'Post headline'}
                        inputName={'headline'}
                        inputType='text'
                        inputValue={postInfo.headline}
                        onChange={handlePostInfo}
                    />
                    {errors.headline && <p className='text-red-500 font-semibold my-2'>{errors.headline}</p>}
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
                    {errors.description && <p className='text-red-500 font-semibold my-2'>{errors.description}</p>}
                    <Input
                        labelTitle={'Your image'}
                        inputName={'imageUrl'}
                        inputValue={postInfo.imageUrl}
                        inputType='text'
                        onChange={handlePostInfo}
                    />
                    {errors.imageUrl && <p className='text-red-500 font-semibold my-2'>{errors.imageUrl}</p>}
                    <button
                        className='text-white bg-[#5D5FEF] rounded-full w-full mt-8 px-3 py-2 cursor-pointer hover:bg-[#5556C3] duration-300'
                        onClick={handleEdit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Publishing..." : "Publish"}
                    </button>
                    {isError && <p className='text-red-500 font-semibold my-2'>Error: {error.message}</p>}
                </form>
            </div>
        </div>
    );
}
