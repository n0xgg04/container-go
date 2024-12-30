import { useRecoilState } from 'recoil';
import { NetworkDevToolAtom } from '@/states/recoil/atoms/NetworkDevTool.atom';

export default function useNetworkDevToolState() {
  return useRecoilState(NetworkDevToolAtom);
}
