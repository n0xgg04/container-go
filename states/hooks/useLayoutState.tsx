import { useRecoilState } from 'recoil';
import { LayoutStateAtom } from '@/states/recoil/atoms/LayoutState.atom';

export default function useLayoutState() {
  return useRecoilState(LayoutStateAtom);
}
