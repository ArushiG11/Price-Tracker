"use client"

import { FormEvent, Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import Image from 'next/image'
import { addEmailtoProduct } from "@/lib/actions"

interface Props {
  productId: string
}

const Modal = ({ productId }: Props) => {
    let [isOpen, setIsOpen] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [email, setEmail] = useState('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitted(true);
        await addEmailtoProduct(productId, email);
        setIsSubmitted(false);
        setEmail('');
        closeModal();  
    }

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)
  return (
    <>
      <button type="button" className='btn' onClick={openModal}>
        Track
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="dialog-container" onClose={closeModal} >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className="flex justify-between">
                    <Image
                    src="/assets/icons/price-tag-logo.svg"
                    alt="price"
                    width={28}
                    height={28}
                    className="mb-4"
                  />

                    <Image
                    src="/assets/icons/x-close.svg"
                    alt="close"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                    onClick={closeModal}
                  />
                    </div>
                  
                  
                  <Dialog.Title
                    as="h4"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Sign Up for Notifications
                  </Dialog.Title>
                  <div className="mt-2">
                  <p className="text-sm text-gray-500 mt-2">
                    Stay up-to-date with the latest news and updates. 
                </p>
                  </div>

                <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <div className="dialog-input_container">
                        <Image
                        src="/assets/icons/mail.svg"
                        alt="email"
                        width={18}
                        height={18}
                        />
                        <input
                        required
                        type="email"
                        id="email"
                        placeholder="Enter your Email Address"
                        className="dialog-input"
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                      type="submit"
                      className="dialog-btn"
                    >
                      {isSubmitted ? 'Submitting...':'Track'}
                    </button>
                </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  
  )
}

export default Modal
