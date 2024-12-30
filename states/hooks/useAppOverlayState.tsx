import { useRecoilState } from 'recoil';
import { AppOverlayAtom } from '@/states/recoil/atoms/AppOverlay.atom';

export default function useAppOverlayState() {
  return useRecoilState(AppOverlayAtom);
}
