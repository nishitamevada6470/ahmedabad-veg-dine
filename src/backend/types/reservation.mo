import Common "common";

module {
  public type ReservationId = Nat;

  public type Reservation = {
    id : ReservationId;
    name : Text;
    phoneNumber : Text;
    date : Text; // YYYY-MM-DD
    time : Text; // HH:MM
    partySize : Nat;
    specialRequests : ?Text;
    status : Common.ReservationStatus;
    createdAt : Common.Timestamp;
  };
};
