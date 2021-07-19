/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ContextAuth } from "../context/AuthContext";
import { ContextPost } from "../context/PostsContext";
import axiosInstance from "../context/AxiosConfig";

type propType = {
	open: boolean;
	setOpen: (value: boolean) => void;
};

const AddPostModal = ({ open, setOpen }: propType) => {
	const [post, setPost] = useState({ title: "", content: "" });
	const cancelButtonRef = useRef(null);
	const { isLogedIn, csrfToken } = useContext(ContextAuth);
	const { get_posts } = useContext(ContextPost);

	const handleSubmit = async () => {
		if (!isLogedIn) {
			alert("not loged");
		} else {
			const response = await axiosInstance("/api/blog/create", {
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": csrfToken!,
				},
				method: "POST",
				withCredentials: true,
				data: JSON.stringify(post),
			});

			if (response.status === 201) {
				setOpen(false);
				alert("success");
				get_posts();
			}
		}
	};

	return (
		<>
			<Transition.Root show={open} as={Fragment}>
				<Dialog
					as='div'
					static
					className='fixed z-10 inset-0 overflow-y-auto'
					initialFocus={cancelButtonRef}
					open={open}
					onClose={setOpen}>
					<div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'>
							<Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className='hidden sm:inline-block sm:align-middle sm:h-screen'
							aria-hidden='true'>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
							enterTo='opacity-100 translate-y-0 sm:scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 translate-y-0 sm:scale-100'
							leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
							<div className='inline-block align-top rounded-lg text-left overflow-hidden bg-gray-800 shadow-xl transform transition-all sm:my-8 sm:align-top sm:max-w-lg sm:w-full'>
								<div className=' px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
									<div className='container px-5 py-24 mx-auto'>
										<div className='flex flex-col text-center w-full mb-12'>
											<h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-white'>
												Share your thoughts{" "}
											</h1>
										</div>
										<p
											hidden={isLogedIn}
											className=' text-red-700 title-font mb-4'>
											Please{" "}
											<a
												className='underline text-red-500'
												href='/login'>
												Log in
											</a>{" "}
											to make posts!
										</p>
										<div className=' mx-auto'>
											<div className='flex flex-wrap -m-2'>
												<div className='p-2 w-full'>
													<div className='relative'>
														<label
															htmlFor='name'
															className='leading-7 text-sm text-gray-400'>
															Title
														</label>
														<input
															disabled={
																!isLogedIn
															}
															type='text'
															id='name'
															value={post.title}
															onChange={(e) =>
																setPost({
																	...post,
																	title: e
																		.target
																		.value,
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
															htmlFor='text'
															className='leading-7 text-sm text-gray-400'>
															Content
														</label>
														<textarea
															disabled={
																!isLogedIn
															}
															id='text'
															value={post.content}
															onChange={(e) =>
																setPost({
																	...post,
																	content:
																		e.target
																			.value,
																})
															}
															name='text'
															className='w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out'
														/>
													</div>
												</div>
												<div className='p-2 w-full'>
													<button
														disabled={!isLogedIn}
														onClick={handleSubmit}
														className='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
														Post
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};
export default AddPostModal;
