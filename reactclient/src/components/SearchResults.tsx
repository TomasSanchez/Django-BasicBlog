import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { postType } from "../types/postTypes";
import { userType } from "../types/userTypes";

type searchResultsType = {
	posts: postType[];
	users: userType[];
};

type propType = {
	open: boolean;
	setOpen: (value: boolean) => void;
	responseData: searchResultsType;
};

const SearchResults = ({ open, setOpen, responseData }: propType) => {
	const cancelButtonRef = useRef(null);

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
						<span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
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
							<div className='inline-block align-top rounded-lg h-96 text-left bg-gray-800 shadow-xl transform transition-all sm:my-8 sm:align-top sm:max-w-lg sm:w-full'>
								<div className='absolute top-1 right-1'>
									<button
										type='button'
										className='inline-flex justify-center px-2 py-1 text-sm font-medium text-gray-200 bg-gray-900 border border-transparent rounded hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
										onClick={() => setOpen(false)}>
										X
									</button>
								</div>
								<div className=' px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-row justify-start'>
									<div className='flex text-white text-left flex-col w-1/2'>
										<h1 className='text-gray-400'>Posts:</h1>
										<div className='w-11/12 mx-auto overflow-y-auto h-80'>
											{responseData.posts.length > 0 ? (
												responseData.posts.map((post) => (
													<div
														key={post.id}
														className='p-1 border-b border-gray-700 hover:bg-gray-700'>
														<a href={`/${post.id}`}>
															<div className='flex py-2 text-md'>
																{" "}
																<h2>{post.title}</h2>
															</div>
															<div className='text-gray-400 text-sm'>
																{post.published.split("T")[0]}{" "}
																{post.published.split("T")[1].split(":")[0]} hrs
															</div>
														</a>
													</div>
												))
											) : (
												<div className='text-gray-300'>No posts matched your search</div>
											)}
										</div>
									</div>
									<div className='flex text-white text-left flex-col w-1/2'>
										<h1 className='text-gray-400 '>Users:</h1>
										<div className='w-11/12 mx-auto overflow-y-auto h-80'>
											{responseData.users.map((user) => (
												<div
													key={user.id}
													className='p-1 border-b border-gray-700 hover:bg-gray-700 '>
													<a href={`/profile/${user.id}`}>
														<div className='flex text-md'>
															{user.first_name + " " + user.last_name}
														</div>
														<div className='text-sm text-gray-400'>
															{" "}
															<div>@{user.user_name}</div>
														</div>
													</a>
												</div>
											))}
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

export default SearchResults;
