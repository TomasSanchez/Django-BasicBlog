import { useContext, useEffect } from "react";
import Blogs from "./components/Blogs";
import { ContextPost } from "./context/PostsContext";

function App() {
	const { get_posts, blog } = useContext(ContextPost);

	useEffect(() => {
		get_posts();
	}, []);

	return (
		<div>
			<Blogs blogs={blog!} />
		</div>
	);
}

export default App;
