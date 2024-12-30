import { useRecoilState } from 'recoil';
import { DriverInfoAtom } from '../recoil/atoms/DriverInfoAtom';

export default function useDriverInfoState() {
  return useRecoilState(DriverInfoAtom);
}
