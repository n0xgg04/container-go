import { useRecoilState } from 'recoil';
import { DashboardInfoAtom } from '../recoil/atoms/DashboardInfoAtom';

export default function useDashboardInfoState() {
  return useRecoilState(DashboardInfoAtom);
}
