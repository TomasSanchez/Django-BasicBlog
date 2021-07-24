import { useState } from "react";
import axiosInstance from "../context/AxiosConfig";
import SearchResults from "./SearchResults";

const SearchBar = () => {
	const [inputSearch, setInputSearch] = useState({ inputText: "", postsSearch: true, userSearch: true });
	const [responseData, setResponseData] = useState({ posts: [], users: [] });
	const [open, setOpen] = useState(false);

	const handleSubmit = async () => {
		try {
			const postsResponse = await axiosInstance(
				`/api/blog/search?search=${inputSearch.inputText}&search_fields=title`,
				{
					// req methods
				}
			);
			const usersResponse = await axiosInstance(
				`/api/users/search?search=${inputSearch.inputText}&search_fields=user_name&search_fields=first_name&search_fields=last_name`,
				{
					// req methods
				}
			);
			if (postsResponse.status === 200 || usersResponse.status === 200) {
				setResponseData({ posts: postsResponse.data, users: usersResponse.data });
				setOpen(true);
				setInputSearch({ ...inputSearch, inputText: "" });
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className='flex'>
				<input
					className='rounded-md px-2 py-1 focus:ring-0 mr-2 ring-1 bg-gray-700'
					type='text'
					value={inputSearch.inputText}
					onChange={(e) => setInputSearch({ ...inputSearch, inputText: e.target.value })}
				/>
				<button
					className='hover:text-white'
					onClick={handleSubmit}
					disabled={inputSearch.inputText.length <= 0}>
					<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
						<path
							fillRule='evenodd'
							d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
							clipRule='evenodd'
						/>
					</svg>
				</button>
				<SearchResults open={open} setOpen={setOpen} responseData={responseData} />
			</div>
		</>
	);
};

export default SearchBar;
