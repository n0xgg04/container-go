import { useRecoilState } from 'recoil';
import {
  PICK_STEP,
  PickLocationAtom,
} from '@/states/recoil/atoms/PickLocationAtom';

export default function usePickLocationState() {
  return useRecoilState(PickLocationAtom);
}

export const useSetPickLocationFn = () => {
  const [, setState] = usePickLocationState();

  const fn = (location: PickLocationT['checkInLocation']) => {
    setState((pre) => ({
      ...pre,
      step: PICK_STEP.RECEIVE_LOCATION,
      checkInLocation: location,
    }));
  };

  return { fn };
};
