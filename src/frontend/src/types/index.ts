import type {
  MenuItem,
  Reservation,
  ReservationStatus,
  RestaurantInfo,
  Result,
  Review,
} from "../backend.d";

export type {
  MenuItem,
  Reservation,
  RestaurantInfo,
  Result,
  ReservationStatus,
  Review,
};

export interface CreateReservationInput {
  name: string;
  phoneNumber: string;
  date: string;
  time: string;
  partySize: number;
  specialRequests?: string;
}

export interface CreateReviewInput {
  customerName: string;
  rating: number;
  reviewText: string;
}

export type NavItem = {
  label: string;
  href: string;
};
