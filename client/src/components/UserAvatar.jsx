import React from 'react'
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInitials } from '../utils';
import { toast } from 'sonner';
import { useLogoutMutation } from '../redux/slices/api/authApiSlice';
import {logout} from "../redux/slices/authSlice"
import AddUser from './AddUser';
import ChangePassword from './ChangePassword';

function getInitialsAlternate(name) {
  if (!name) return '';

  const words = name.split(' ');
  const initials = words.map(word => word.charAt(0).toUpperCase()).join('');

  return initials;
}

const UserAvatar = () => {
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const {user} = useSelector((state)=> state.auth);
  // const [logoutUser] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser] = useLogoutMutation();
  const logoutHandler = async ()=>{
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      localStorage.removeItem('authToken');
      // console.log("before navogation",useSelector((state) => state.auth));
      navigate("/log-in");
      // console.log("Auth State after navigation:", useSelector((state) => state.auth));
    } catch (error) {
      toast.error("Something Went Wrong")
    }
  }

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left ">
            <div>
              <Menu.Button className="w-10 h-10 2xl:w-12 2xl:h-12 items-center justify-center rounded-full bg-blue-600 ">
                <span className="text-white font-semibold ">
                  {getInitialsAlternate(user?.name)}
                </span>
              </Menu.Button>
            </div>

          {/* <Transition
          as="Fragment"
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Item className="absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none">
              <div className="p-4">
                  <Menu.Item>
                    {({active})=>(
                      <button onClick={()=> setOpen(true)} className="text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base ">
                        <FaUser className="mr-2" aria-hidden="true"/>
                        Profile
                      </button>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({active})=>(
                      <button onClick={()=> setOpenPassword(true)} className="text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base ">
                        <FaUserLock className="mr-2" aria-hidden="true"/>
                        Change Password
                      </button>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({active})=>(
                      <button onClick={logoutHandler} className="text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base ">
                        <IoLogOutOutline className="mr-2" aria-hidden="true"/>
                        Logout
                      </button>
                    )}
                  </Menu.Item>   
              </div>
          </Menu.Item>
        </Transition> */}
        <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none'>
              <div className='p-4'>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpen(true)}
                      className='text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base'
                    >
                      <FaUser className='mr-2' aria-hidden='true' />
                      Profile
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpenPassword(true)}
                      className={`tetx-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base`}
                    >
                      <FaUserLock className='mr-2' aria-hidden='true' />
                      Change Password
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logoutHandler}
                      className={`text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base`}
                    >
                      <IoLogOutOutline className='mr-2' aria-hidden='true' />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
            </Transition>
      </Menu>
      <AddUser open={open} setOpen={setOpen} userData={user}/>
      <ChangePassword open={openPassword} setOpen={setOpenPassword} />
    </div>
  )
}

export default UserAvatar



// import React, { Fragment, useState } from 'react';
// import { Menu, Transition } from '@headlessui/react';
// import { FaUser, FaUserLock } from 'react-icons/fa';
// import { IoLogOutOutline } from 'react-icons/io5';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { getInitials } from '../utils';
// import { toast } from 'sonner';
// import { useLogoutMutation } from '../redux/slices/api/authApiSlice';
// import { logout } from '../redux/slices/authSlice';

// const UserAvatar = () => {
//   const [open, setOpen] = useState(false);
//   const [openPassword, setOpenPassword] = useState(false);
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [logoutUser] = useLogoutMutation();

//   const logoutHandler = async () => {
//     try {
//       console.log("logout handler clicked")
//       await logoutUser().unwrap();
//       dispatch(logout());
//       localStorage.removeItem('authToken'); // Remove auth token from local storage
//       navigate('/log-in');
//     } catch (error) {
//       toast.error('Something Went Wrong');
//     }
//   };

//   return (
//     <div className="">
//       <Menu as="div" className="relative inline-block text-left">
//         {/* <h1 onClick={logoutHandler}>logout</h1> */}
//         <div>
//           <Menu.Button className="w-10 h-10 2xl:w-12 2xl:h-12 items-center justify-center rounded-full bg-blue-600">
//             <span className="text-white font-semibold">{getInitials(user?.name)}</span>
//           </Menu.Button>
//         </div>

//         <Transition
//           as={Fragment}
//           enter="transition ease-out duration-100"
//           enterFrom="transform opacity-0 scale-95"
//           enterTo="transform opacity-100 scale-100"
//           leave="transition ease-out duration-100"
//           leaveFrom="transform opacity-100 scale-100"
//           leaveTo="transform opacity-0 scale-95"
//         >
//           <Menu.Item className="absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none">
//             <div className="p-4">
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     onClick={() => setOpen(true)}
//                     className="text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base"
//                   >
//                     <FaUser className="mr-2" aria-hidden="true" />
//                     Profile
//                   </button>
//                 )}
//               </Menu.Item>

//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     onClick={() => setOpenPassword(true)}
//                     className="text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base"
//                   >
//                     <FaUserLock className="mr-2" aria-hidden="true" />
//                     Change Password
//                   </button>
//                 )}
//               </Menu.Item>

//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     onClick={logoutHandler} // Make sure this onClick is correctly attached
//                     className="text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base"
//                   >
//                     <IoLogOutOutline className="mr-2" aria-hidden="true" />
//                     Logout
//                   </button>
//                 )}
//               </Menu.Item>
//             </div>
//           </Menu.Item>
//         </Transition>
//       </Menu>
//     </div>
//   );
// };

// export default UserAvatar;

