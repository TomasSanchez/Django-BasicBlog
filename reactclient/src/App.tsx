import { useContext, useEffect } from "react";
import Blogs from "./components/Blogs";
import { ContextPost } from "./context/PostsContext";

function App() {
	const { get_posts, blog } = useContext(ContextPost);

	useEffect(() => {
		document.title = "Tomas's Blog";
		get_posts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			{!blog ? (
				<div className='container flex m-auto mt-2'>
					<button
						type='button'
						className='m-auto bg-gray-600 py-2 px-5 rounded-lg'
						disabled>
						<svg
							className='animate-spin h-5 w-5 mr-3'
							viewBox='0 0 24 24'></svg>
						Processing
					</button>
				</div>
			) : (
				<Blogs blogs={blog!} />
			)}
		</div>
	);
}

export default App;
