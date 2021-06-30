import Head from "next/head";
import Image from "next/image";
import Blogs from "../components/Blogs";
import { postType } from "../types/postTypes";
import AddPostModal from "../components/AddPostModal";
import { useContext, useEffect, useState } from "react";
import { ContextPost } from "../context/PostsContext";

export default function Home() {
	const { get_posts, blog } = useContext(ContextPost);

	useEffect(() => {
		get_posts();
	}, []);

	return (
		<div>
			<Blogs blogs={blog!} />
			{/* <AddPostModal /> */}
		</div>
	);
}
