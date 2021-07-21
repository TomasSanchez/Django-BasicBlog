import { useContext } from "react";
import { ContextAuth } from "../context/AuthContext";
import axiosInstance from "../context/AxiosConfig";
import { commentType } from "../types/commentTypes";
import { likes_usernamesTypes } from "../types/commentTypes";
import AddComment from "./AddComment";
import PostOptionDropdown from "./PostOptionsDropdown";

type propType = {
	comments: commentType[] | undefined;
	post_id: string;
	get_comments: (value: string) => void;
};

const Comments = ({ comments, post_id, get_comments }: propType) => {
	const { isLogedIn, csrfToken, current_logged_user } = useContext(ContextAuth);

	const liked =
		"text-red-500 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-700 border-opacity-50";
	const not_liked =
		"text-gray-500 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-700 border-opacity-50";

	const hasLiked: (likes_usernames: likes_usernamesTypes[]) => boolean = (
		likes_usernames: likes_usernamesTypes[]
	) => {
		return likes_usernames.some(
			(liked_user: likes_usernamesTypes) => liked_user.user_id === current_logged_user?.id
		);
	};

	const handleLike = async (comment_id: number) => {
		if (isLogedIn) {
			const response = await axiosInstance(`/api/blog/${comment_id}/comment_like`, {
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": csrfToken!,
				},
				method: "PUT",
				withCredentials: true,
			});
			if (response.status === 200) {
				console.log("message liked");
				get_comments(post_id);
			}
		} else {
			// open modal to log in
		}
	};

	const isOwner: (author_id: number) => boolean = (author_id: number) => {
		return current_logged_user?.id === author_id;
	};

	return (
		<div className=''>
			<section className='text-gray-400 body-font bg-gray-900'>
				<div className='container px-5 py-2 mx-auto '>
					<AddComment post_id={post_id} get_comments={get_comments} />
					{comments && comments.length > 0 ? (
						<div className='py-2'>Comments:</div>
					) : (
						<div className='pb-48'>No comments yet!</div>
					)}
					{comments && comments.length > 0 ? (
						comments.map((comment: commentType) => (
							<div className='flex flex-wrap -m-4' key={comment.id}>
								<div className=' p-4'>
									<div className='border border-gray-700 border-opacity-75 p-6 rounded-lg'>
										<div className='flex flex-row'>
											<h2 className='text-md text-white font-medium title-font mb-2'>
												<a href={`/profile/${comment.author.user_id}`}>
													{comment.author.user_name}
												</a>
											</h2>
											<div className='text-gray-500 ml-2 flex-1 text-right text-sm leading-7'>
												{isOwner(comment.author.user_id) ? <PostOptionDropdown /> : <div></div>}
											</div>
										</div>
										<p className='leading-relaxed text-base'>{comment.content}</p>
										<div className='pt-3 flex'>
											<button onClick={() => handleLike(comment.id)}>
												<span className={hasLiked(comment.likes_usernames) ? liked : not_liked}>
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
													{comment.likes}
												</span>
											</button>
										</div>
										{/* b */}
									</div>
								</div>
							</div>
						))
					) : (
						<div></div>
					)}
				</div>
			</section>
		</div>
	);
};

export default Comments;
