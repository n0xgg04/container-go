import { useRecoilState } from 'recoil';
import { DeliveryTakePhotoAtom } from '@/states/recoil/atoms/DeliveryTakePhotoState.atom';

export default function useDeliveryTakePhotoState() {
  return useRecoilState(DeliveryTakePhotoAtom);
}
