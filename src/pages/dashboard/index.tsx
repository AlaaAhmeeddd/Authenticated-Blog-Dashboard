import PostCard from "../../components/Posts/PostCard";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import useDashboard from "./useDashboard";

export default function Dashboard() {
  const { data, isError, isLoading } = useDashboard();
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Posts</h1>
        <button className="flex gap-1 items-center text-white bg-[#5D5FEF] rounded-full px-3 py-2 cursor-pointer hover:bg-[#5556C3] duration-300">
          <IoMdAdd />
          <Link to={"/new-post"}>Create post</Link>
        </button>
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
      {data?.length === 0 ? (
        <p className="text-green-500 font-semibold text-2xl my-8">
          There is no available posts.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-3 my-12">
          {data?.map((post) => (
            <PostCard key={post.id} post={post} isDashboard={true} />
          ))}
        </div>
      )}
    </div>
  );
}
