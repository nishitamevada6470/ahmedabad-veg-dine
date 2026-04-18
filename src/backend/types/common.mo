module {
  public type Timestamp = Int;

  public type ReservationStatus = {
    #pending;
    #confirmed;
    #cancelled;
  };

  public type Result<T, E> = { #ok : T; #err : E };
};
