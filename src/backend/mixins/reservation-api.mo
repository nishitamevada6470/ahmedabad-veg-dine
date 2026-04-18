import List "mo:core/List";
import ReservationLib "../lib/reservation";
import Common "../types/common";
import ResTypes "../types/reservation";

mixin (reservations : List.List<ResTypes.Reservation>, nextReservationId : { var value : Nat }) {

  public func createReservation(
    name : Text,
    phoneNumber : Text,
    date : Text,
    time : Text,
    partySize : Nat,
    specialRequests : ?Text,
  ) : async Common.Result<ResTypes.ReservationId, Text> {
    if (name.size() == 0) {
      return #err("Name is required");
    };
    if (phoneNumber.size() == 0) {
      return #err("Phone number is required");
    };
    if (partySize == 0) {
      return #err("Party size must be at least 1");
    };
    let (reservation, newNextId) = ReservationLib.createReservation(
      reservations,
      nextReservationId.value,
      name,
      phoneNumber,
      date,
      time,
      partySize,
      specialRequests,
    );
    nextReservationId.value := newNextId;
    #ok(reservation.id);
  };

  public query func getReservationByPhone(phoneNumber : Text) : async [ResTypes.Reservation] {
    ReservationLib.getReservationByPhone(reservations, phoneNumber);
  };
};
