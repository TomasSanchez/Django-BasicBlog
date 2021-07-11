import { useContext, useEffect, useState } from "react";
import Blogs from "./components/Blogs";
import { ContextPost } from "./context/PostsContext";

function App() {
	const { get_posts, blog } = useContext(ContextPost);
	const [data, setData] = useState("as");
	// DEVELOPING ONLY
	const fetch_test_data = async () => {
		const response = await fetch(
			"http://dummy.restapiexample.com/api/v1/employee/1"
		);
		const jsres = await response.json();
		setData(jsres);
		console.log("res: ", data);
	};

	useEffect(() => {
		document.title = "Tomas's Blog";
		get_posts();
		// REMOVE
		fetch_test_data();
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
