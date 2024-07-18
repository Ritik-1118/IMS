import { Fragment } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slice/authSlice";

const navigation = [
    { name: "Dashboard", href: "/", current: true },
    { name: "Inventory", href: "/inventory", current: false },
    { name: "Purchase Details", href: "/purchase-details", current: false },
    { name: "Sales", href: "/sales", current: false },
    { name: "Manage Store", href: "/manage-store", current: false },
];


function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Header() {
    const dispatch = useDispatch();
    const user = JSON.parse(useSelector((state) => state.auth.user));

    const handleLogout = async () => {
        dispatch(logout());
        window.location.reload();
    }

    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="flex justify-center items-center gap-2">
                                                <img
                                                    className="h-8 w-8"
                                                    src="/assets/logo.png"
                                                    alt="Inventory Management System"
                                                />
                                                <span className="font-bold text-white italic">
                                                    Inventory Management
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            <button
                                                type="button"
                                                className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                <span className="sr-only">View notifications</span>
                                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <MenuButton className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="sr-only">Open user menu</span>
                                                        <img
                                                            className="h-8 w-8 rounded-full"
                                                            src={user.imageUrl || "./assets/profile.jpeg"}
                                                            alt="profile"
                                                        />
                                                    </MenuButton>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <MenuItem className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className=" px-2 flex flex-col gap-2">
                                                            <span className="">{user.username}</span>
                                                            <span className=" py-1">{user.email}</span>
                                                            <div 
                                                                className=" border w-1/2 flex items-center justify-center bg-gray-500 rounded-lg text-white/90 cursor-pointer"
                                                                onClick={handleLogout}
                                                            >
                                                                Logout
                                                            </div>                                                        </div>
                                                    </MenuItem>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <DisclosureButton className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <Bars3Icon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </DisclosureButton>
                                    </div>
                                </div>
                            </div>
                            
                            {/* for mobile size */}
                            <DisclosurePanel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigation.map((item) => (
                                        <Link to={item.href} key={item.name}>
                                            <DisclosureButton
                                                key={item.name}
                                                as="a"
                                                className={classNames(
                                                    item.current
                                                        ? "bg-gray-900 text-white"
                                                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                    "block rounded-md px-3 py-2 text-base font-medium"
                                                )}
                                                aria-current={item.current ? "page" : undefined}
                                            >
                                                {item.name}
                                            </DisclosureButton>
                                        </Link>
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 pt-4 pb-3">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src={user.imageUrl || "./assets/profile.jpeg"}
                                                alt="profile"
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-white">
                                                {user.username}
                                            </div>
                                            <div className="text-sm font-medium leading-none text-gray-400">
                                                {user.email}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="mt-3 space-y-1 px-2 text-white">
                                        <div className=" px-2 flex flex-col gap-2">
                                            <span className="">{user.username}</span>
                                            <span className=" py-1">{user.email}ritik1118@gmail.com</span>
                                            <div 
                                                className=" border w-1/2 flex items-center justify-center bg-gray-500 rounded-lg text-white/90 cursor-pointer"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DisclosurePanel>
                        </>
                    )}
                </Disclosure>
            </div>
        </>
    );
}
