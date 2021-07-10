import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { commentType, likes_usernamesTypes } from "../types/commentTypes";
import { postType } from "../types/postTypes";
import { ContextAuth } from "./AuthContext";

type contextProps = {
	blog: postType[] | undefined;
	get_posts: VoidFunction;
	comments: commentType[] | undefined;
	get_comments: (post_id: number) => void;
	hasLiked: (likes_usernames: likes_usernamesTypes[]) => boolean;
	handleLike: (post_id: number) => void;
	isOwner: (author_id: number) => boolean;
	liked: string;
	not_liked: string;
};

export const ContextPost = createContext<contextProps>({
	blog: undefined,
	get_posts: () => {},
	comments: undefined,
	get_comments: (post_idvalue: number) => {},
	hasLiked: (likes_usernames: likes_usernamesTypes[]) => false,
	handleLike: (post_id: number) => {},
	isOwner: (author_id: number) => false,
	liked: "",
	not_liked: "",
});

const PostsContext = ({ children }: any) => {
	const [blog, setBlog] = useState<postType[]>();
	const [comments, setComments] = useState<commentType[]>();
	const { isLogedIn, csrfToken, user } = useContext(ContextAuth);

	const liked =
		"text-red-500 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-700 border-opacity-50";
	const not_liked =
		"text-gray-500 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-700 border-opacity-50";

	const get_posts = async () => {
		try {
			// const response = await fetch("http://127.0.0.1:8000/api/"); // standar development url
			const response = await fetch("http://localhost:8080/api/");
			const blogs = await response.json();
			setBlog(blogs);
		} catch (error) {
			console.error(error);
		}
	};

	const get_comments = async (post_id: number) => {
		const commentResponse = await fetch(
			`http://localhost:8000/api/${post_id}/comment`
		);
		const comments = await commentResponse.json();
		setComments(comments);
	};

	const hasLiked: (likes_usernames: likes_usernamesTypes[]) => boolean = (
		likes_usernames: likes_usernamesTypes[]
	) => {
		return likes_usernames.some(
			(liked_user: likes_usernamesTypes) =>
				liked_user.user_id === user?.id
		);
	};

	const handleLike = async (post_id: number) => {
		if (isLogedIn) {
			const response = await fetch(
				`http://localhost:8000/api/${post_id}/post_like`,
				{
					headers: {
						"Content-Type": "application/json",
						"X-CSRFToken": csrfToken,
					},
					method: "PUT",
					credentials: "include",
				}
			);
			if (response.ok) {
				get_posts();
			}
		} else {
			// open modal to log in
		}
	};

	const isOwner: (author_id: number) => boolean = (author_id: number) => {
		return user?.id === author_id;
	};

	const PostContextValues = {
		blog,
		get_posts,
		comments,
		get_comments,
		hasLiked,
		handleLike,
		isOwner,
		liked,
		not_liked,
	};

	useEffect(() => {
		get_posts();
	}, []);

	return (
		<ContextPost.Provider value={PostContextValues}>
			{children}
		</ContextPost.Provider>
	);
};

export default PostsContext;
