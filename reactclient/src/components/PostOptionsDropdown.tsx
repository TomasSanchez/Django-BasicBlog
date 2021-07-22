import { Fragment, useContext, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import axiosInstance from "../context/AxiosConfig";
import { ContextAuth } from "../context/AuthContext";
import { ContextPost } from "../context/PostsContext";
import EditPostModal from "./EditPostModal";

type propType = {
	id: number;
	prevPost: { title: string; content: string };
};
export default function PostOptionDropdown({ id, prevPost }: propType) {
	const [openEdit, setOpenEdit] = useState<boolean>(false);
	const { isLogedIn, csrfToken } = useContext(ContextAuth);
	const { get_posts } = useContext(ContextPost);

	const handleDelete = async () => {
		if (isLogedIn) {
			try {
				const response = await axiosInstance(`/api/blog/${id}`, {
					headers: {
						"Content-Type": "application/json",
						"X-CSRFToken": csrfToken!,
					},
					method: "DELETE",
					withCredentials: true,
				});
				if (response.status === 204) {
					get_posts();
				}
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<Menu as='div' className='relative inline-block text-left'>
			{({ open }) => (
				<>
					<div>
						<Menu.Button className='inline-flex justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-300 focus:outline-none '>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5 block text-right m-auto'
								style={{
									marginRight: "inherit",
								}}
								viewBox='0 0 20 20'
								fill='currentColor'>
								<path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z' />
							</svg>
						</Menu.Button>
					</div>

					<EditPostModal open={openEdit} setOpen={setOpenEdit} prevPost={prevPost} id={id} />
					<Transition
						show={open}
						as={Fragment}
						enter='transition ease-out duration-100'
						enterFrom='transform opacity-0 scale-95'
						enterTo='transform opacity-100 scale-100'
						leave='transition ease-in duration-75'
						leaveFrom='transform opacity-100 scale-100'
						leaveTo='transform opacity-0 scale-95'>
						<Menu.Items
							static
							className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none'>
							<div className='py-1'>
								<Menu.Item>
									<div className='text-gray-300 block text-sm hover:bg-gray-400 hover:text-gray-900 rounded-t-md'>
										<button className='w-full text-left px-4 py-2' onClick={() => handleDelete()}>
											Delete
										</button>
									</div>
								</Menu.Item>
								<Menu.Item>
									<div className='text-gray-300 block text-sm hover:bg-gray-400 hover:text-gray-900'>
										<button
											className='w-full text-left px-4 py-2 '
											onClick={() => setOpenEdit(true)}>
											Edit
										</button>
									</div>
								</Menu.Item>
								<Menu.Item>
									<div className='text-gray-300 block text-sm hover:bg-gray-400 hover:text-gray-900 rounded-b-md'>
										<button className='w-full text-left px-4 py-2'>Else</button>
									</div>
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
}
