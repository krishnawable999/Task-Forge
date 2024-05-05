import React from 'react'
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import Button from './Button';
import Loader from './Loader';
import ModalWrapper from './ModelWrapper';
import Textbox from './Textbox';
import { toast } from 'sonner';
import { useChangePasswordMutation } from '../redux/slices/api/userApiSlice';

const ChangePassword = ({open, setOpen}) => {

    const {register, handleSubmit, formState: {errors}} = useForm();

    const [changeUserPassword, {isLoading}] = useChangePasswordMutation();

    const handleOnSubmit = async (data) =>{
        if(data.password !== data.cpass){
            toast.warning("Password doesn't Match");
            return;
        }

        try {
            const res = await changeUserPassword(data).unwrap();
            toast.success("New User Added Successfully");

            setTimeout(() => {
                setOpen(false);
            }, 1500);
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.error);
        }
    };



  return (
    <div>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
            <Dialog.Title as='h2' className="text-base font-bold leading-6 text-gray-900 mb-4">
                Change Password
            </Dialog.Title>
            <div className="mt-2 flex flex-col gap-6">
                <Textbox
                placeholder="New Password"
                type="password"
                name="password"
                label="New Password"
                className="w-full rounded"
                register={register("password",{
                    required:"New Password is required"
                })}
                error={errors.password ? errors.password.message : ""}
                />

                <Textbox
                placeholder="Confirm Password"
                type="password"
                name="cpass"
                label="Confirm Password"
                className="w-full rounded"
                register={register("cpass",{
                    required:"New Password is required"
                })}
                error={errors.cpass ? errors.cpass.message : ""}
                />
            </div>

            {isLoading ? (
                <div className="py-5">
                    <Loader/>
                </div>
            ) : (
                <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
                    <Button
                    type="submit"
                    className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 "
                    label="Save"
                    />

                    <button type='button'
                    className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                    onClick={()=> setOpen(false)}
                    >
                        Cancel
                    </button>

                </div>
            )}
        </form>
      </ModalWrapper>
    </div>
  )
}

export default ChangePassword
