import { atom } from 'recoil';

export const NetworkDevToolAtom = atom<NetworkDevTool>({
  key: 'NetworkDevToolAtom',
  default: [],
});
