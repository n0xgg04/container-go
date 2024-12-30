import { useRecoilState } from 'recoil';
import { TakePhotoStateAtom } from '@/states/recoil/atoms/TakePhotoState.atom';

export default function useTakePhotoState() {
  return useRecoilState(TakePhotoStateAtom);
}
