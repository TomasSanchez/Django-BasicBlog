import { commentType } from "../types/commentTypes";
import AddComment from "./AddComment";

type propType = {
	comments: commentType[] | undefined;
	post_id: number;
	get_comments: VoidFunction;
};

const Comments = ({ comments, post_id, get_comments }: propType) => {
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
							<div
								className='flex flex-wrap -m-4'
								key={comment.id}>
								<div className=' p-4'>
									<div className='border border-gray-700 border-opacity-75 p-6 rounded-lg'>
										<h2 className='text-md text-white font-medium title-font mb-2'>
											<a
												href={`/profile/${comment.author.user_id}`}>
												{comment.author.user_name}
											</a>
										</h2>
										<p className='leading-relaxed text-base'>
											{comment.content}
										</p>
										<div>{comment.likes}</div>
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
