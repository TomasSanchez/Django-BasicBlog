/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes: any) {
	return classes.filter(Boolean).join(" ");
}

export default function PostOptionDropdown() {
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
									{({ active }) => (
										<a
											href='#'
											className='text-gray-300 block px-4 py-2 text-sm hover:bg-gray-400 hover:text-gray-900'>
											Delete
										</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<a
											href='#'
											className='text-gray-300 block px-4 py-2 text-sm hover:bg-gray-400 hover:text-gray-900'>
											Edit
										</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<a
											href='#'
											className='text-gray-300 block px-4 py-2 text-sm hover:bg-gray-400 hover:text-gray-900'>
											Else
										</a>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
}
