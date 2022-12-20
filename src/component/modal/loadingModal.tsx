import Loading from '@/common/icons/loading';
import ModalWrapper from '@/component/modal/modalWrapper';

interface LoadingModalProps {
  isOpen: boolean;
}

const LoadingModal = ({ isOpen }: LoadingModalProps) => (
  <ModalWrapper isOpen={isOpen} onClose={() => {}}>
    <div>
      <Loading className={'h-12 w-12 text-primary'} />
    </div>
  </ModalWrapper>
);

export default LoadingModal;
