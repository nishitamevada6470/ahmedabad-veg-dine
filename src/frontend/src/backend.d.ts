import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MenuItem {
    id: MenuItemId;
    name: string;
    isAvailable: boolean;
    description: string;
    imageUrl?: string;
    isVegetarian: boolean;
    category: string;
    price: bigint;
}
export type Timestamp = bigint;
export type Result = {
    __kind__: "ok";
    ok: bigint;
} | {
    __kind__: "err";
    err: string;
};
export interface RestaurantInfo {
    name: string;
    email: string;
    address: string;
    openingHours: string;
    phone: string;
}
export type MenuItemId = bigint;
export interface Reservation {
    id: ReservationId;
    status: ReservationStatus;
    date: string;
    name: string;
    specialRequests?: string;
    createdAt: Timestamp;
    time: string;
    partySize: bigint;
    phoneNumber: string;
}
export type ReservationId = bigint;
export type Result_1 = {
    __kind__: "ok";
    ok: ReservationId;
} | {
    __kind__: "err";
    err: string;
};
export interface Review {
    id: bigint;
    customerName: string;
    createdAt: Timestamp;
    reviewText: string;
    rating: bigint;
}
export enum ReservationStatus {
    cancelled = "cancelled",
    pending = "pending",
    confirmed = "confirmed"
}
export interface backendInterface {
    createReservation(name: string, phoneNumber: string, date: string, time: string, partySize: bigint, specialRequests: string | null): Promise<Result_1>;
    getAllMenuItems(): Promise<Array<MenuItem>>;
    getAllReviews(): Promise<Array<Review>>;
    getMenuItemsByCategory(category: string): Promise<Array<MenuItem>>;
    getReservationByPhone(phoneNumber: string): Promise<Array<Reservation>>;
    getRestaurantInfo(): Promise<RestaurantInfo>;
    getVegetarianItems(): Promise<Array<MenuItem>>;
    submitReview(customerName: string, rating: bigint, reviewText: string): Promise<Result>;
}
