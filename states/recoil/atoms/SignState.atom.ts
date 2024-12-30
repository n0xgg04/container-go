import { atom } from 'recoil';

export const SignAtom = atom({
  key: 'SignAtom',
  default: {
    signBase64: '',
    sender_name: '',
    signFile: '',
    signAt: '',
  },
});
