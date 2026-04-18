import List "mo:core/List";
import Time "mo:core/Time";
import ResTypes "../types/reservation";
import Common "../types/common";

module {
  public type Reservation = ResTypes.Reservation;
  public type ReservationId = ResTypes.ReservationId;

  public func createReservation(
    reservations : List.List<Reservation>,
    nextId : Nat,
    name : Text,
    phoneNumber : Text,
    date : Text,
    time : Text,
    partySize : Nat,
    specialRequests : ?Text,
  ) : (Reservation, Nat) {
    let reservation : Reservation = {
      id = nextId;
      name;
      phoneNumber;
      date;
      time;
      partySize;
      specialRequests;
      status = #pending;
      createdAt = Time.now();
    };
    reservations.add(reservation);
    (reservation, nextId + 1);
  };

  public func getReservationByPhone(
    reservations : List.List<Reservation>,
    phoneNumber : Text,
  ) : [Reservation] {
    reservations.filter(func(r) { r.phoneNumber == phoneNumber }).toArray();
  };
};
