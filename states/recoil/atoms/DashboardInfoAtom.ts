import { atom } from 'recoil';

type DashboardInfoT = {
  data: $DashboardInfoResponse;
  from: string;
  to: string;
};

export const DashboardInfoAtom = atom<DashboardInfoT>({
  key: 'DashboardInfoAtom',
  default: {
    data: undefined as unknown as $DashboardInfoResponse,
    from: '2024-08-12',
    to: '2024-08-18',
  },
});
