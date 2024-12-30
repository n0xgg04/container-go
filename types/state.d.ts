import { $MeResponse } from '@/types/api';
import { PICK_STEP } from '@/states/recoil/atoms/PickLocationAtom';

declare global {
  type User = $MeResponse;

  type CheckValidResultT = {
    isValid: boolean;
    data: User;
    expire_at: string;
  };

  type LoginResult = {
    isLoggedIn: boolean;
    data: User;
    expire_at: string;
    access_token: string;
  };

  type AuthenticationAtom = {
    isLoading: boolean;
    isLoggedIn: boolean;
    data?: User;
    payload: {
      access_token?: string;
      expire_at?: string;
    };
  };

  type PickLocationT = {
    step: PICK_STEP;
    container_id: string;
    checkInLocation?: {
      latitude: number;
      longitude: number;
    };
  };

  type EstimateDeliverData = {
    id: string;
    bill_id: string;
    type: string;
    distance: string;
    receive_date: string;
    sender_phone: string;
    receiver_phone: string;
    sender_note: string;
    receiver_note: string;
    send_date: string;
    receiver_address: string;
    sender_address: string;
    receiver_name: string;
    sender_name: string;
    container_id: string;
    pickupLocation: {
      lat: string | number;
      lng: string | number;
    };
    deliveryLocation: {
      lat: string | number;
      lng: string | number;
    };
    pickupPosition: string;
    note: string;
    pickupNote: string;
    deliveryNote: string;
  };
}

export {};
