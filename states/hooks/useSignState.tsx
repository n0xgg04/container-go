import { useRecoilState } from 'recoil';
import { SignAtom } from '@/states/recoil/atoms/SignState.atom';

export default function useSignState() {
  return useRecoilState(SignAtom);
}
