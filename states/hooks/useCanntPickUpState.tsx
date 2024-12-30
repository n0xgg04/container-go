import { useRecoilState } from 'recoil';
import { CanntPickUpAtom } from '@/states/recoil/atoms/CanntPickUp.atom';

export default function useCanntPickUpState() {
  return useRecoilState(CanntPickUpAtom);
}
