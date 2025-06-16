import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/Appcontext";
import toast from "react-hot-toast";

const CommentTable = ({ comment, fetchComment }) => {
  const { blog, createdAt, _id } = comment;
  const blogDate = new Date(createdAt);

  const { axios } = useAppContext();

  const approvedComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/approved-comment", {
        id: _id,
      });
      data.success ? toast.success(data.response) : toast.error(data.response);
      fetchComment();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async () => {
    try {
      const confirm = window.confirm("Are you sure to delete this comment?");

      if (!confirm) {
        return;
      }
      const { data } = await axios.post("/api/admin/delete-comment", {
        id: _id,
      });

      data.success ? toast.success(data.response) : toast.error(data.response);
      fetchComment();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <tr className="order-y border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog</b> : {blog.title}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b> : {comment.name}
        <br />
        <b className="font-medium text-gray-600">Comment</b> : {comment.content}
      </td>

      <td className="px-6 py-4 max-sm:hidden">
        {blogDate.toLocaleDateString()}
      </td>

      <td className="px-6 py-4 max-sm:hidden">
        <div className="inline-flex items-center gap-4">
          {!comment.isApproved ? (
            <img
              onClick={approvedComment}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
              src={assets.tick_icon}
              alt=""
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1 ">
              Approved
            </p>
          )}

          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            className="w-5 hover:scale-110 transition-all cursor-pointer"
            alt=""
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTable;
