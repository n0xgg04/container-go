import { useRecoilState } from 'recoil';
import { PODAtom } from '@/states/recoil/atoms/POD.atom';

export default function usePodState() {
  return useRecoilState(PODAtom);
}
