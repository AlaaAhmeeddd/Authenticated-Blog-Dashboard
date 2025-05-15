import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import PostCard from "../../components/Posts/PostCard";
import usePosts from "./usePosts";
import { RootState } from "@/store";

export default function Posts() {
  const { data, isError, isLoading } = usePosts();
  const { user } = useSelector((state: RootState) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const totalPages = data ? Math.ceil(data.length / postsPerPage) : 1;
  const currentPosts = data
    ? data.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
    : [];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">All Posts</h1>
        {user?.email && (
          <button className="flex gap-1 items-center text-white bg-[#5D5FEF] rounded-full px-3 py-2 cursor-pointer hover:bg-[#5556C3] duration-300">
            <IoMdAdd />
            <Link to={"/new-post"}>Create post</Link>
          </button>
        )}
      </div>
      {isError && (
        <p className="text-red-500 font-semibold text-center text-3xl my-5">
          Failed to get all posts! try again later.
        </p>
      )}
      {isLoading && (
        <p className="text-green-500 font-semibold text-center text-3xl my-5">
          Loading...
        </p>
      )}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 py-10">
        {currentPosts.length === 0 ? (
          <p className="text-green-500 font-semibold text-center text-xl">
            There are no available posts.
          </p>
        ) : (
          currentPosts?.map((postInfo) => (
            <PostCard key={postInfo.id} post={postInfo} isDashboard={false} />
          ))
        )}
      </div>
      <div className="flex justify-center mt-5">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 mx-1 rounded-full ${
              currentPage === index + 1
                ? "bg-blue-500 cursor-pointer text-white"
                : "cursor-pointer bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
