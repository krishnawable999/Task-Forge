import React, { Fragment, useState } from 'react'
import { MdAdd, MdOutlineEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { HiDuplicate } from "react-icons/hi";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { Menu, Transition } from '@headlessui/react';
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddSubTask from './AddSubTask';
import AddTask from "./AddTask";
import ConfirmatioDialog from '../Dialogs';
import { useDuplicateTaskMutation, useTrashTaskMutation } from '../../redux/slices/api/taskApiSlice';
import { toast } from 'sonner';

const TaskDialog = ({task}) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  
  const [deleteTask] = useTrashTaskMutation();
  const [duplicateTask] = useDuplicateTaskMutation();
  const duplicateHanlder = async() => {
    try {
      const res = await duplicateTask(task._id).unwrap();

      toast.success(res?.message);

      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };


  const deleteClicks = () => {
    setOpenDialog(true);
  };
  const deleteHandler = async() => {
    try {
      const res = await deleteTask({
        id: task._id,
        isTrashed : "trash",
      }).unwrap();

      toast.success(res?.message);

      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 500);

    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.message);
    }
  };



  const items = [
    {
      label: "Open Task",
      icon: <AiTwotoneFolderOpen className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => navigate(`/task/${task._id}`),
    },
    {
      label: "Edit",
      icon: <MdOutlineEdit className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => setOpenEdit(true),
    },
    {
      label: "Add Sub-Task",
      icon: <MdAdd className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => setOpen(true),
    },
    {
      label: "Duplicate",
      icon: <HiDuplicate className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => duplicateHanlder(),
    },
  ];

  const navigate = useNavigate();
  return (
    <>
    <div>
      <Menu className="relative inline-block text-left" as='div'>
        <Menu.Button className='inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600 '>
          <BsThreeDots />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >

          <Menu.Items className='absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
            <div className='px-1 py-1 space-y-2'>
              {items.map((el) => (
                <Menu.Item key={el.label}>
                  {({ active }) => (
                    <button
                      onClick={el?.onClick}
                      className={`${active ? "bg-blue-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {el.icon}
                      {el.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>

            <div className='px-1 py-1'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => deleteClicks()}
                    className={`${active ? "bg-blue-500 text-white" : "text-red-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <RiDeleteBin6Line
                      className='mr-2 h-5 w-5 text-red-400'
                      aria-hidden='true'
                    />
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>

        </Transition>
      </Menu>
    </div>

    <AddTask 
    open={openEdit}
    setOpen={setOpenDialog}
    task={task}
    key={new Date().getTime()}
    />
    <AddSubTask open={openEdit} setOpen={setOpen}/>

    <ConfirmatioDialog
    open={openDialog}
    setOpen={setOpenDialog}
    onClick={deleteHandler}
    />
    </>
  )
}

export default TaskDialog
