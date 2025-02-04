export const ENDPOINTS = {
  LOGIN: '/authenticate',
  FORGOT_PASSWORD: '/forgot-password',
  OTP: '/otp',
  VERIFY_OTP: '/verify-otp',
  CARRIER_DRIVER_STATISTICS_CONTAINER: '/carrier/driver/statistics/container',
  CARRIER_PRESIGNED_URL_DOWNLOAD: '/carrier/presigned-url/download?filePath=',
  ME: '/me',
  CHANGE_PASSWORD: '/change-password',
  DRIVER_INFO: '/carrier/person/driver-info',
  SEARCH_CONTAINER: '/carrier/driver/containers/shipment/search',
  CONTAINER_DETAIL: '/carrier/driver/containers',
  START_DELIVERY: '/carrier/driver/container/:id/shipment/start',
  CHECK_IN: '/carrier/driver/shipment/:id/pickup/check-in',
  CHECK_IN_DELIVERY: '/carrier/driver/shipment/:id/delivery/check-in',
  UPLOAD_S3: '/carrier/presigned-url/upload',
  GET_REASONS: '/carrier/driver/container/shipment-failure-reasons',
  REJECT_PICK: '/carrier/driver/shipment/:id/pickup/submit',
  REJECT_DELIVERY: '/carrier/driver/shipment/:id/delivery/submit',
  SUBMIT_PICKUP: '/carrier/driver/shipment/:id/pickup/submit',
  DELIVERY_SUBMIT: '/carrier/driver/shipment/:id/delivery/submit',
  SHIPMENT_SUBMIT: '/carrier/driver/container/:id/shipment/finish',
};
