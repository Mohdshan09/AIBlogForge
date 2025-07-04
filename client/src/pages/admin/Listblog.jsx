import React, { useEffect, useState } from "react";
import { blog_data } from "../../assets/assets";
import Table from "./Table";
import { useAppContext } from "../../context/Appcontext";

const Listblog = () => {
  const [blogData, setblogData] = useState([]);
  const { axios } = useAppContext();

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/admin/blogs");
      if (data.success) {
        setblogData(data.response);
      } else {
        toast.error("blog not found !");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 ">
      <h1 className="">All Blogs</h1>

      <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 text-left uppercase">
            <tr>
              <th scope="col" className="px-2 py-4 xl:p-6">
                #
              </th>
              <th scope="col" className="px-2 py-4">
                Blog Title
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Status
              </th>
              <th scope="col" className="px-2 py-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {blogData.map((blog, idx) => (
              <Table
                key={blog._id}
                blog={blog}
                fetchBlogs={fetchBlogs}
                index={idx + 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Listblog;
