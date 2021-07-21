import { useContext } from "react";
import { ContextPost } from "../context/PostsContext";
import { postType } from "../types/postTypes";

type propType = {
	post: postType;
	get_post: (id: string) => void;
	id: string;
};

const Post = ({ post, get_post, id }: propType) => {
	const { handleLike, hasLiked, liked, not_liked } = useContext(ContextPost);

	const handleLikeClick = async () => {
		await handleLike(post.id);
		get_post(id);
	};

	return (
		<div className='py-8 flex flex-wrap md:flex-nowrap'>
			<div className='md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col'>
				<span className='font-semibold title-font text-white'>
					<a href={`/profile/${post.author.user_id}`}>By: {post.author.user_name}</a>
				</span>
				<span className='mt-1 text-gray-500 text-sm'>
					{post.published.split("T")[0]} {post.published.split("T")[1].split(".")[0]}
				</span>
			</div>
			<div className='md:flex-grow'>
				<h2 className='text-2xl font-medium text-white title-font mb-2'>{post.title}</h2>
				<p className='leading-relaxed overflow-ellipsis '>{post.content}</p>
				<div className='py-4 flex'>
					<span className={hasLiked(post.likes_usernames) ? liked : not_liked}>
						<button onClick={handleLikeClick}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
							</svg>
						</button>
						{post.likes}
					</span>
					<span className='text-gray-500 inline-flex items-center leading-none text-sm'>
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
				</div>
			</div>
		</div>
	);
};

export default Post;
