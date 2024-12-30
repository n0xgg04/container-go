import { useRecoilState } from 'recoil';
import { UploadS3Atom } from '@/states/recoil/atoms/UploadS3.atom';

export default function useUploadState() {
  return useRecoilState(UploadS3Atom);
}
