import Post from "./components/Post";
import Comment from "./components/Comments";
import { useContext, useEffect, useState } from "react";
import { commentType } from "./types/commentTypes";
import { postType } from "./types/postTypes";
import { ContextPost } from "./context/PostsContext";
import { useParams } from "react-router-dom";

const PostDetail = () => {
	const [post, setPost] = useState<postType>();
	const { get_comments, comments, hasLiked, isOwner, handleLike } =
		useContext(ContextPost);

	const get_post = async (id: string) => {
		try {
			const postResponse = await fetch(`http://localhost:8000/api/${id}`);
			const post = await postResponse.json();
			setPost(post);
		} catch (error) {
			console.error(error);
		}
	};
	const { id } = useParams<{ id: string }>();
	console.log("id from postdetail: ", id);

	useEffect(() => {
		get_post(id);
		get_comments(id);
	}, []);

	return (
		<div className=''>
			<section className='text-gray-400 bg-gray-800 body-font'>
				<div className='container px-5 py-24 mx-auto'>
					<div className='-my-8 divide-y-2 divide-gray-800'>
						{post && <Post post={post!} />}
					</div>
				</div>
			</section>
			<Comment
				comments={comments}
				post_id={id}
				get_comments={get_comments}
			/>
		</div>
	);
};

export default PostDetail;
