import { useRecoilState } from 'recoil';
import { PICK_STEP } from '@/states/recoil/atoms/PickLocationAtom';
import { DeliveryLocationAtom } from '@/states/recoil/atoms/DeliveryLocation.atom';

export default function useDeliveryLocationState() {
  return useRecoilState(DeliveryLocationAtom);
}

export const useSetDeliveryLocationFn = () => {
  const [, setState] = useDeliveryLocationState();

  const fn = (location: PickLocationT['checkInLocation']) => {
    setState((pre) => ({
      ...pre,
      step: PICK_STEP.RECEIVE_LOCATION,
      checkInLocation: location,
    }));
  };

  return { fn };
};
