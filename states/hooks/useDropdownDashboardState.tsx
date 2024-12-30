import { useRecoilState } from 'recoil';
import { DropdownDashboardAtom } from '@/states/recoil/atoms/DropdownDashboard.atom';

export default function useDropdownDashboardState() {
  return useRecoilState(DropdownDashboardAtom);
}
