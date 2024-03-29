import { SyntheticEvent } from "react";
import { useContext, useState } from "react";
import { ContextAuth } from "../context/AuthContext";
import axiosInstance from "../context/AxiosConfig";

type propType = {
	post_id: string;
	get_comments: (value: string) => void;
};

const AddComment = ({ post_id, get_comments }: propType) => {
	const [error, setError] = useState<string>("");
	const [comment, setComment] = useState<string>("");
	const [notLogedInError, setNotLogedInError] = useState<string>("");
	const { isLogedIn, csrfToken } = useContext(ContextAuth);

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		if (!isLogedIn) {
			setNotLogedInError("You need to be logged in order to comment");
		} else if (comment.length < 200) {
			alert("max characters reached");
		} else {
			try {
				const response = await axiosInstance(`/api/blog/${post_id}/comment/create`, {
					headers: {
						"Content-Type": "application/json",
						"X-CSRFToken": csrfToken!,
					},
					method: "POST",
					withCredentials: true,
					data: JSON.stringify({ content: comment }),
				});
				if (response.status === 201) {
					console.log("comment created succesfully");
					// ADD modal to comment created
					setComment("");
					get_comments(post_id);
				} else {
					setError("Could not post comment, please try again");
					throw new Error(error);
				}
			} catch (err) {
				console.error(err);
			}
		}
	};

	return (
		<div className='py-4'>
			<div className='text-red-300 pb-2'>{notLogedInError}</div>

			<div className='flex lg:w-4/5 w-full sm:flex-row flex-col sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4'>
				<div className='relative sm:mb-0 flex-grow w-full '>
					<input
						type='text'
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder='Add your comment'
						className='w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
						maxLength={150}
					/>
				</div>
				<div className='text-gray-400'>Characters left: {150 - comment.length}</div>
				<button
					onClick={handleSubmit}
					className='text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg flex-initial'>
					Add
				</button>
			</div>
		</div>
	);
};

export default AddComment;
