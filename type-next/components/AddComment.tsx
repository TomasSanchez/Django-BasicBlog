import { useState } from "react";

const AddComment = () => {
	const [comment, setComment] = useState("");

	const handleSubmit: any = () => {
		console.log(comment);
		// TODO Post comment to django
	};

	return (
		<div className='py-4'>
			<form method='POST' onSubmit={handleSubmit}>
				<input
					className='w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
					type='text'
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder='Add your comment'
				/>
				<button className='flex mx-auto mt-4 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
					Button
				</button>
			</form>
		</div>
	);
};

export default AddComment;
