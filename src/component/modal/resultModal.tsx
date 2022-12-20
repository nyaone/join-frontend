import type { Dispatch, SetStateAction } from 'react';
import type { PropsWithChildren } from 'react';
import { Dialog } from '@headlessui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ModalWrapper from '@/component/modal/modalWrapper';

export interface ResultModalProps {
  success: boolean;
  title: string;
  onConfirm: () => void;

  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ResultModal = ({ success, title, onConfirm, children, isOpen, setOpen }: PropsWithChildren<ResultModalProps>) => (
  <ModalWrapper isOpen={isOpen} onClose={setOpen}>
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
  </ModalWrapper>
);

export default ResultModal;
