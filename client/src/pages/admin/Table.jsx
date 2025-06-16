import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/Appcontext";
import toast from "react-hot-toast";

const Table = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog;
  const blogDate = new Date(createdAt);

  const { axios } = useAppContext();

  const deleteBlogs = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirm) {
      return;
    }
    try {
      const { data } = await axios.post(`/api/blog/delete`, {id:blog._id});

      if (data.success) {
        toast.success(data.message);

        await fetchBlogs();
      } 
      else {
        toast.error("Something went wrong !");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/togglepublish", {
        id: blog._id,
      });

      if (data.success) {
        toast.success(data.response);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <tr className="border-y broder-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{blogDate.toDateString()}</td>

      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`${
            blog.isPublished ? "text-green-800" : "text-orange-700"
          }`}
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>

      <td className="px-2 py-4 flex text-xs gap-3">
        <button
          onClick={togglePublish}
          className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
        >
          {blog.isPublished ? "unPublished" : "Published"}
        </button>

        <img
          onClick={deleteBlogs}
          src={assets.cross_icon}
          className="w-8 hover:scale-110 transition-all cursor-pointer"
          alt=""
        />
      </td>
    </tr>
  );
};

export default Table;
