import { ShipmentState } from '@/shared/constants/shipment-state.enum';

declare global {
  type $LoginPayload = {
    username: string;
    password: string;
    rememberMe: boolean;
  };

  type $LoginResponse = {
    idToken: string;
  };

  type $MeResponse = {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: any;
    organizationVerifiedSince: string;
    userType: string;
    organizationId: string;
    roles: string[];
  };

  type $ForgotPasswordPayload = {
    email: string;
  };

  type $MessageKey = 'BadRequestException' | 'NotFoundException';
  type $ChangePasswordPayload = {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
  type $GetContainerDetailPayload = {
    container_id: string;
  };

  type $CheckInPayload = {
    container_id: string;
    location: $Geo;
  };

  type $SubmitPickupPayload = {
    container_id: string;
    image_urls: string[];
    message: string;
    signee: string;
  };

  type $RejectPickupPayload = {
    container_id: string;
    message: string;
    reasonId: string;
  };

  type $RejectDeliveryPayload = {
    container_id: string;
    reasonId: string;
  };

  type $SubmitDeliveryPayload = {
    container_id: string;
    image_urls: string[];
    message: string;
    signee: string;
    receiver_name: string;
    deliveryTime: string;
  };

  type $FinishPayload = {
    container_id: string;
    pod: string[];
  };

  type $FileType = 'CONFIRM_PICKUP' | 'SIGNATURE' | 'CONFIRM_DROP_OFF';

  type $ForgotPasswordMessageKey = 'BadRequestException' | 'NotFoundException';

  type $ForgotPasswordResponse = {
    httpStatus: number;
    message: string;
    messageKey: $MessageKey;
    reason: string;
  };

  type $PhoneLoginPayload = {
    phone: string;
  };

  type $PhoneLoginResponse = {
    httpStatus: number;
    message: string;
    messageKey: $MessageKey;
    reason: string;
  };
  type $DashboardInfoResponse = {
    summaries: $SummariesT[];
    containerStatus: $ContainerStatus[];
    waitingForShipment: $WaitingForShipment[];
  } | null;

  type $UrlImgResponse = {
    url: string;
  } | null;

  type $SummariesT = {
    status: 'COMPLETED' | 'NOT_STARTED' | 'IN_PROGRESS';
    amount: number;
  } | null;

  type $ContainerStatus = {
    status: string;
    amount: number;
    statusId: string;
    statusCode: 'SHIPMENT_IN_PROGRESS' | 'PICKUP_SUCCESS' | 'DELIVERY_SUCCESS';
  } | null;

  type $WaitingForShipment = {
    date: string;
    amount: number;
  } | null;

  type $DriverInfoResponse = {
    name: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    photoUrl: string | null;
    drivingLicenseNumber: string | null;
    drivingLicenseImageUrl: string | null;
    drivingLicenseLevel: string | null;
    drivingLicenseExpiryDate: string | null;
    healthCheckupImageUrl: string | null;
    healthCheckupExpiryDate: string | null;
    laborContractImageUrl: string | null;
    laborContractExpiryDate: string | null;
  };

  type $ChangePasswordResponse = $ForgotPasswordResponse;
  type $Geo = {
    lat: string | null;
    lng: string | null;
  };

  export interface $GetContainerDetailResponse {
    contNo: string;
    type: string;
    pickupFailureReason?: string;
    deliveryFailureReason?: string;
    owner: string;
    distance: number;
    totalWeight: number;
    id: string;
    status: string;
    shipmentState: ShipmentState;
    dropoffContact: string;
    pickupContact: string;
    dropoffContactPhone: string;
    pickupContactPhone: string;
    pickupPosition: string;
    pickupGeo: PickupGeo;
    deliveryGeo: DeliveryGeo;
    pickupCheckinGeo: $Geo;
    deliveryCheckinGeo: $Geo;
    note: any;
    truckNumberPlate: string;
    pickupSubmittedTime: any;
    pickupNote: any;
    pickupImageUrls: any;
    shipmentStarted: any;
    shipmentCompleted: any;
    deliverySubmittedTime: any;
    deliveryNote: any;
    deliveryImageUrls: any;
    truckType: any;
    points: string;
    shipmentHistories: any;
    ownerInfo: OwnerInfo;
    plannedPickupDate: string;
    plannedDropoffDate: string;
    fullPickupAddress: string;
    pickupAddress: string;
    pickupContact: string;
    pickupNote: string;
    dropoffAddress: string;
    sealNo: string;
  }

  export interface PickupGeo {
    lat: number;
    lng: number;
  }

  export interface DeliveryGeo {
    lat: number;
    lng: number;
  }

  export interface OwnerInfo {
    name: string;
    phone: any;
    email: any;
    address: any;
  }

  export type $SearchContainerResponse = $SearchContainerData[];

  type ItemData = {
    id: string;
    plate: string;
    type: string;
    distance: string;
    date: string;
    address: string;
    dropoffAddress?: string;
    container_id: string;
    pickupLocation?: {
      lat: string | number;
      lng: string | number;
    };
  };

  export interface $SearchContainerData {
    dropoffAddress: string;
    containers: $Container[];
  }

  export interface $Container {
    id: string;
    contNo: string;
    sealNo: string;
    owner: string;
    distance: number;
    type: string;
    truckType: string;
    dropoffContact: string;
    pickupContact: string;
    dropoffContactPhone: string;
    pickupContactPhone: string;
    pickupPosition: string;
    dropoffUntilDate: string;
    status: string;
    pickupFromDate: string;
    dropPoint: string;
    pickupGeo: $PickupGeo;
    deliveryGeo: $DeliveryGeo;
    note: string;
    pickupAddress: string;
    dropoffAddress: string;
    truckNumberPlate: string;
    ShipmentState: string;
    pickupSubmittedTime?: string;
    pickupFailureReason: any;
    pickupNote: any;
    deliverySubmittedTime: any;
    deliveryFailureReason: any;
    deliveryNote?: string;
  }

  export interface $PickupGeo {
    lat: number;
    lng: number;
  }

  export interface $DeliveryGeo {
    lat: number;
    lng: number;
  }
}

export {};
