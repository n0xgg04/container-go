import { useRecoilState } from 'recoil';
import { DeliveryUploadS3Atom } from '@/states/recoil/atoms/DeliveryUploadS3.atom';

export default function useDeliveryUploadS3() {
  return useRecoilState(DeliveryUploadS3Atom);
}
