import AddComment from "./AddComment";

const Comments = ({ comments }: any) => {
	return (
		<div className=''>
			<section className='text-gray-400 body-font bg-gray-900'>
				<div className='container px-5 py-2 mx-auto '>
					<AddComment />
					{comments && comments.length > 0 ? (
						<div className='py-2'>Comments:</div>
					) : (
						<div className='pb-48'>No comments yet!</div>
					)}
					{comments.map((comment: any) => (
						<div className='flex flex-wrap -m-4' key={comment.id}>
							<div className=' p-4'>
								<div className='border border-gray-700 border-opacity-75 p-6 rounded-lg'>
									<h2 className='text-md text-white font-medium title-font mb-2'>
										{comment.user_name}
									</h2>
									<p className='leading-relaxed text-base'>
										{comment.content}
									</p>
									<div>{/* TODO Add likes here */}</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default Comments;
