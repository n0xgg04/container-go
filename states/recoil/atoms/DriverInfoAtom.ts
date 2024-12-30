import { atom } from 'recoil';

type DriverInfoT = {
  drivingLicenseLevel: string;
  drivingLicenseNumber: string;
  drivingLicenseExpiryDate: string;
  healthCheckupExpiryDate: string;
  laborContractExpiryDate: string;
  healthCheckupImageUrl: string;
  laborContractImageUrl: string;
};

export const DriverInfoAtom = atom<DriverInfoT>({
  key: 'DriverInfoAtom',
  default: {
    drivingLicenseLevel: '-',
    drivingLicenseNumber: '-',
    drivingLicenseExpiryDate: '-',
    healthCheckupExpiryDate: '-',
    laborContractExpiryDate: '-',
    healthCheckupImageUrl: '',
    laborContractImageUrl: '',
  },
});
