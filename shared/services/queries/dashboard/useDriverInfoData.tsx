import React from 'react';
import useDriverInfo from './useDriverInfo';
import useDriverInfoState from '@/states/hooks/useDriverInfoState';

export default function useDriverInfoData() {
  const { isLoading, isError, data, error, refetch } = useDriverInfo();
  const [state, setState] = useDriverInfoState();

  const drivingLicenseLevel = React.useMemo(() => {
    if (isLoading || isError) return '-';
    return data?.drivingLicenseLevel;
  }, [data?.drivingLicenseLevel, isError, isLoading]);

  const drivingLicenseNumber = React.useMemo(() => {
    if (isLoading || isError) return '-';
    return data?.drivingLicenseNumber;
  }, [data?.drivingLicenseNumber, isError, isLoading]);

  const drivingLicenseExpiryDate = React.useMemo(() => {
    if (isLoading || isError) return '-';
    return data?.drivingLicenseExpiryDate;
  }, [data?.drivingLicenseExpiryDate, isError, isLoading]);

  const healthCheckupExpiryDate = React.useMemo(() => {
    if (isLoading || isError) return '-';
    return data?.healthCheckupExpiryDate;
  }, [data?.healthCheckupExpiryDate, isError, isLoading]);

  const laborContractExpiryDate = React.useMemo(() => {
    if (isLoading || isError) return '-';
    return data?.laborContractExpiryDate;
  }, [data?.laborContractExpiryDate, isError, isLoading]);

  const healthCheckupImageUrl = React.useMemo(() => {
    if (isLoading || isError) return '';
    return data?.healthCheckupImageUrl;
  }, [data?.healthCheckupImageUrl, isError, isLoading]);

  const laborContractImageUrl = React.useMemo(() => {
    if (isLoading || isError) return '';
    return data?.laborContractImageUrl;
  }, [data?.laborContractImageUrl, isError, isLoading]);

  React.useEffect(() => {
    setState({
      drivingLicenseLevel: drivingLicenseLevel || '-',
      drivingLicenseNumber: drivingLicenseNumber || '-',
      drivingLicenseExpiryDate: drivingLicenseExpiryDate || '-',
      healthCheckupExpiryDate: healthCheckupExpiryDate || '-',
      laborContractExpiryDate: laborContractExpiryDate || '-',
      healthCheckupImageUrl: healthCheckupImageUrl || '',
      laborContractImageUrl: laborContractImageUrl || '',
    });
  }, [
    drivingLicenseLevel,
    drivingLicenseNumber,
    drivingLicenseExpiryDate,
    healthCheckupExpiryDate,
    laborContractExpiryDate,
    healthCheckupImageUrl,
    laborContractImageUrl,
  ]);

  return { isLoading, refetch };
}
