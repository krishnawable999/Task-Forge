import { useState } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Task from './pages/Task'
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom"
import Users from './pages/Users'
import Trash from './pages/Trash'
import TaskDetail from './pages/TaskDetail'
import {Toaster} from "sonner"


function Layout(){
  const user="";

  const location = useLocation()

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row ">
      <div className="w1/5 h-screen bg-white sticky top-0 hidden md:block">
        {/* <Slidebar/> */}
      </div>

      {/* <MobileSidebar/> */}

      <div className="flex-1 overflow-y-auto">
        {/* <Navbar/> */}

        <div className="p-4 2xl:px-10">
          {/* <Outlet/> */}
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/log-in" state={{from : location}} replace/>
  )
}


function App() {

  return (
    <>
      <main className='w-full min-h-screen bg-[#f3f4f6]'>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Navigate to="/dashboard" />} />
            <Route path='/dashboard >' element={<Dashboard />} />
            <Route path='/task >' element={<Task />} />
            <Route path='/completed/:status >' element={<Task />} />
            <Route path='/in-progress/:status >' element={<Task />} />
            <Route path='/todo/:status >' element={<Task />} />
            <Route path='/team >' element={<Users />} />
            <Route path='/trashed >' element={<Trash />} />
            <Route path='/task/:id >' element={<TaskDetail />} />
          </Route>

          <Route path='/log-in' element={<Login />} />
        </Routes>

        <Toaster richColors />
      </main>


    </>
  )
}

export default App
