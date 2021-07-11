import { useContext } from "react";
import { postType } from "../types/postTypes";

import { ContextPost } from "../context/PostsContext";

import PostOptionDropdown from "./PostOptionsDropdown";

type propType = {
	blogs: postType[];
};

const Blogs = ({ blogs }: propType) => {
	const { handleLike, hasLiked, isOwner, liked, not_liked } =
		useContext(ContextPost);

	return (
		<section className='text-gray-400 bg-gray-900 body-font overflow-hidden'>
			<div className='container px-5 py-24 mx-auto'>
				<div className='-my-8 divide-y-2 divide-gray-800'>
					{blogs?.map((post: postType) => (
						<div
							className='py-8 flex flex-wrap md:flex-nowrap'
							key={post.id}>
							<div className='md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col'>
								<span className='font-semibold title-font text-white'>
									Author:
									<a href={`/profile/${post.author.user_id}`}>
										{" "}
										{post.author.user_name}
									</a>
								</span>
								<span className='mt-1 text-gray-500 text-sm'>
									{post.published.split("T")[0]}{" "}
									{post.published.split("T")[1].split(".")[0]}
								</span>
							</div>
							<div className='md:flex-grow'>
								<div className='flex flex-row'>
									<h2 className='text-2xl font-medium text-white title-font mb-2'>
										{post.title}
									</h2>

									<div className='text-gray-500 ml-2 flex-1 text-right text-sm leading-7'>
										{isOwner(post.author.user_id) ? (
											<PostOptionDropdown />
										) : (
											<div></div>
										)}
									</div>
								</div>

								<p className='leading-relaxed overflow-ellipsis '>
									{post.content}
								</p>
								<div className='pt-3 flex'>
									<button onClick={() => handleLike(post.id)}>
										<span
											className={
												hasLiked(post.likes_usernames)
													? liked
													: not_liked
											}>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-6 w-6'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M5 15l7-7 7 7'
												/>
											</svg>
											{post.likes}
										</span>
									</button>
									<span className='text-gray-500 inline-flex items-center leading-none text-sm pr-3 py-1 border-gray-700 border-opacity-50'>
										<svg
											className='w-4 h-4 mr-1'
											stroke='currentColor'
											strokeWidth={2}
											fill='none'
											strokeLinecap='round'
											strokeLinejoin='round'
											viewBox='0 0 24 24'>
											<path d='M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z' />
										</svg>
										{post.nbr_of_comments}
									</span>

									<a
										className='text-indigo-400 inline-flex items-center py-1'
										href={`/${post.id}`}>
										View Post
										<svg
											className='w-4 h-4 ml-2'
											viewBox='0 0 24 24'
											stroke='currentColor'
											strokeWidth={2}
											fill='none'
											strokeLinecap='round'
											strokeLinejoin='round'>
											<path d='M5 12h14' />
											<path d='M12 5l7 7-7 7' />
										</svg>
									</a>
								</div>
								{/* emd */}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Blogs;
