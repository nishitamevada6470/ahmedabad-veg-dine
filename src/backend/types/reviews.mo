import CommonTypes "../types/common";

module {
  public type Review = {
    id : Nat;
    customerName : Text;
    rating : Nat;
    reviewText : Text;
    createdAt : CommonTypes.Timestamp;
  };
};
