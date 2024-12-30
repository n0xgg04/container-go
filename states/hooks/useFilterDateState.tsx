import { useRecoilState } from 'recoil';
import { FilterDateAtom } from '../recoil/atoms/FilterDateAtom';

export default function useFilterDateState() {
  return useRecoilState(FilterDateAtom);
}
