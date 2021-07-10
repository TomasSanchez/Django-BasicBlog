import { useContext, useState } from "react";
import Modal from "../components/Modal";
import { ContextAuth } from "../context/AuthContext";
import { ContextPost } from "../context/PostsContext";

const Create = () => {
	const [post, setPost] = useState({ title: "", content: "" });
	const { isLogedIn, csrfToken } = useContext(ContextAuth);
	const { get_posts } = useContext(ContextPost);
	const [open, setOpen] = useState(false);

	const handleSubmit = async () => {
		if (!isLogedIn) {
			setOpen(true);
		} else {
			const response = await fetch("http://localhost:8000/api/create", {
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": csrfToken,
				},
				method: "POST",
				credentials: "include",
				body: JSON.stringify(post),
			});
			const jsres = await response.json();
			if (response.ok) {
				// get_posts();
				alert("success");
			}
		}
	};
	return (
		<div>
			<Modal
				open={open}
				setOpen={setOpen}
				message={"You need to be logged in in order to post"}
				title={"Currently not logged in"}
				danger={true}
			/>
			<section className='text-gray-400 bg-gray-900 body-font relative'>
				{/* s cont */}
				<div className='container px-5 py-24 mx-auto'>
					<div className='flex flex-col text-center w-full mb-12'>
						<h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-white'>
							Share your thoughts{" "}
						</h1>
					</div>
					<div className='lg:w-1/2 md:w-2/3 mx-auto'>
						<div className='flex flex-wrap -m-2'>
							<div className='p-2 w-full'>
								<div className='relative'>
									<label
										htmlFor='name'
										className='leading-7 text-sm text-gray-400'>
										Title
									</label>
									<input
										type='text'
										id='name'
										value={post.title}
										onChange={(e) =>
											setPost({
												...post,
												title: e.target.value,
											})
										}
										name='name'
										className='w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
									/>
								</div>
							</div>

							<div className='p-2 w-full'>
								<div className='relative'>
									<label
										htmlFor='message'
										className='leading-7 text-sm text-gray-400'>
										Content
									</label>
									<textarea
										id='message'
										value={post.content}
										onChange={(e) =>
											setPost({
												...post,
												content: e.target.value,
											})
										}
										name='message'
										className='w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out'
										defaultValue={""}
									/>
								</div>
							</div>
							<div className='p-2 w-full'>
								<button
									onClick={handleSubmit}
									className='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
									Button
								</button>
							</div>
						</div>
					</div>
				</div>
				{/* end c */}
			</section>
		</div>
	);
};

export default Create;
