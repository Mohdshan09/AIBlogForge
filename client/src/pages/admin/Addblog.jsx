import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/Appcontext";
import toast from "react-hot-toast";
import { parse } from "marked";

const Addblog = () => {
  const { axios } = useAppContext();
  const [isAdding, setisAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setisPublished] = useState(false);

  const editoreRef = useRef(null);
  const quilleRef = useRef(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setisAdding(true);
      const blog = {
        title,
        subtitle,
        description: quilleRef.current.root.innerHTML,
        category,
        isPublished,
      };
      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData);
      if (data.success) {
        toast.success(data.response);
        setImage(false);
        setTitle(false);
        quilleRef.current.root.innerHTML = "";
        setCategory("Startup");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setisAdding(false);
    }
  };

  useEffect(() => {
    //initiate quill
    if (!quilleRef.current && editoreRef.current) {
      quilleRef.current = new Quill(editoreRef.current, { theme: "snow" });
    }
  }, []);

  const GenerateAI = async () => {
    if (!title) return toast.error("Please enter a title");

    try {
      setLoading(true);
      const { data } = await axios.post("/api/blog/generate", {
        prompt: title,
      });
      if (data.success) {
        quilleRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded  ">
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img
            className="mt-2 h-16 rounded cursor-pointer"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt=""
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
            className=""
          />
        </label>

        <p className="mt-4">Blog Title</p>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          value={title}
          placeholder="Type here"
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />

        <p className="mt-4">Sub title</p>
        <input
          onChange={(e) => setSubtitle(e.target.value)}
          type="text"
          value={subtitle}
          placeholder="Type here"
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />

        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editoreRef}></div>
          {loading && (
            <div className="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2">
              <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
            </div>
          )}
          <button
            disabled={loading}
            onClick={GenerateAI}
            type="button"
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer "
          >
            Generate with AI
          </button>
        </div>

        <p className="mt-4 ">Blog Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
          name="category"
        >
          <option value="">Select Category</option>
          {blogCategories.map((item, idx) => {
            return (
              <option key={idx} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            onChange={(e) => setisPublished(e.target.checked)}
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer"
          />
        </div>

        <button
          disabled={isAdding}
          type="submit"
          className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default Addblog;
