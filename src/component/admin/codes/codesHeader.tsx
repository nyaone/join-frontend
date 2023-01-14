import { PlusIcon } from '@heroicons/react/24/solid';
import type { InviteCode } from '@/common/api/admin';
import { DefaultCode } from '@/component/admin/codes/DefaultCode';
import Loading from '@/common/icons/loading';

interface CodesHeaderProps {
  setCurrentEditingCode: (state: InviteCode) => void;
  setCreatingNew: (state: boolean) => void;
  setEditModalOpen: (state: boolean) => void;
  isLoading: boolean;
}

const CodesHeader = ({ setCurrentEditingCode, setCreatingNew, setEditModalOpen, isLoading }: CodesHeaderProps) => (
  <div className="flex items-center">
    <div className="flex flex-auto flex-row gap-3">
      <h1 className="text-xl font-semibold text-gray-900">我的邀请码</h1>
      <Loading
        className={`h-5 w-5 text-primary transition-opacity duration-200 ${isLoading ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
    <div className="sm:mt-0 sm:ml-16 sm:flex-none">
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:w-auto"
        onClick={() => {
          setCurrentEditingCode(DefaultCode);
          setCreatingNew(true);
          setEditModalOpen(true);
        }}
      >
        <PlusIcon className={'h-5 w-5'} />
      </button>
    </div>
  </div>
);

export default CodesHeader;
