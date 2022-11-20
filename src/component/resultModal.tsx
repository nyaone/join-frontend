import { Fragment } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { PropsWithChildren } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export interface ResultModalProps {
  success: boolean;
  title: string;
  onConfirm: () => void;

  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ResultModal = ({ success, title, onConfirm, children, isOpen, setOpen }: PropsWithChildren<ResultModalProps>) => (
  <Transition.Root show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={setOpen}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </Transition.Child>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div>
                <div
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
                    success ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  {success ? (
                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  ) : (
                    <XMarkIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  )}
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">{children}</div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="hover:bg-darker inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:text-sm"
                  onClick={() => {
                    onConfirm();
                    setOpen(false);
                  }}
                >
                  OK
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
);

export default ResultModal;
