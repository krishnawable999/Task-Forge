import React from 'react'
import { MdOutlineAddTask } from "react-icons/md";
import{MdDashboard,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,} from "react-icons/md"
  import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { setOpenSidebar } from '../redux/slices/authSlice';
import {useDispatch, useSelector} from "react-redux"
import { Link, useLocation} from "react-router-dom"
import clsx from "clsx";
const linkData = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tasks",
    link: "tasks",
    icon: <FaTasks />,
  },
  {
    label: "Completed",
    link: "completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "In Progress",
    link: "in-progress/in progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "To Do",
    link: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Team",
    link: "team",
    icon: <FaUsers />,
  },
  {
    label: "Trash",
    link: "trashed",
    icon: <FaTrashAlt />,
  }
];
const Sidebar = () => {
  const {user} = useSelector((state) => state.auth);

  const dispatch = useDispatch()
  const location = useLocation()

  const path = location.pathname.split("/")[1]

  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0 , 7);

  const closeSidebar = () =>{
    dispatch(setOpenSidebar(false));
  }

  const NavLink = ({el}) => {
    return (
      <Link to={el.link} onClick={closeSidebar}
      className={clsx("w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]", path === el.link.split("/")[0] ? "bg-blue-700 text-white" : "")}
      >
        {el.icon}
        <span className="hover:text-[#2564ed]">{el.label}</span>

      </Link>
    )
  }

  return (
    <div className="w-full h-full flex flex-col gap-6 p-5">
      <h1 className="flex gap-1 items-center">
      <p className="">
        < MdOutlineAddTask className="bg-blue-700 rounded-3xl text-white text-3xl font-black"/>
      </p>
      <span className="text-2xl font-bold text-black">Task-Forge</span>
      </h1>
      <div className="flex flex-1 flex-col gap-1 py-8 ">
        {
          sidebarLinks.map((link)=>(
            <NavLink el={link} key={link.label}/>
          ))
        }
      </div>
      
      <div>
        <div>
          <button className="w-full flex gap-2 p-2 items-center text-lg text-gray-800">
            <MdSettings/>
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
