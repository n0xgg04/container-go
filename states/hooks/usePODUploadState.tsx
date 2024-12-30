import { useRecoilState } from 'recoil';
import { PODUploadedAtom } from '@/states/recoil/atoms/PODUploaded.atom';

export default function usePodUploadState() {
  return useRecoilState(PODUploadedAtom);
}
