/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { whoAmIuserType } from "../types/userTypes";

type propType = {
	user: whoAmIuserType;
	handleLogout: () => void;
};

const Dropdown = ({ user, handleLogout }: propType) => {
	return (
		<Menu as='div' className='relative inline-block text-left'>
			{({ open }) => (
				<>
					<div>
						<Menu.Button
							className='
                            inline-flex justify-center 
                            px-4 py-2  text-sm font-medium  
                            hover:bg-gray-70 text-gray-300 body-font '>
							{user && "@" + user.user_name}
							<ChevronDownIcon className='-mr-1 ml-2 h-5 w-5' aria-hidden='true' />
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
							className='origin-top-right right-1 absolute z-auto mt-2 w-40 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none'
							style={{ zIndex: 9999999 }}>
							<div className=''>
								<Menu.Item>
									{user && (
										<a
											href={`/profile/${user.id}`}
											className='text-gray-300 block px-4 py-2 text-sm hover:bg-gray-600 rounded-md hover:text-gray-100'>
											Profile
										</a>
									)}
								</Menu.Item>
							</div>
							<div className=''>
								<Menu.Item>
									<a
										href='/'
										className='text-gray-300 block px-4 py-2 text-sm hover:bg-gray-600 rounded-md hover:text-gray-100'>
										Settings
									</a>
								</Menu.Item>
							</div>
							<div className=''>
								<Menu.Item>
									<div className='text-gray-300 block px-4 py-2 text-sm hover:bg-gray-600 rounded-md hover:text-gray-100'>
										<button onClick={handleLogout}>
											Logout
											<svg
												fill='none'
												stroke='currentColor'
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												className='w-4 h-4 ml-1 inline-flex'
												viewBox='0 0 24 24'>
												<path d='M5 12h14M12 5l7 7-7 7' />
											</svg>
										</button>
									</div>
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
};

export default Dropdown;
