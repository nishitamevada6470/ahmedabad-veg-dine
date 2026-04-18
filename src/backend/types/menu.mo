import Common "common";

module {
  public type MenuItemId = Nat;

  public type MenuItem = {
    id : MenuItemId;
    name : Text;
    description : Text;
    price : Nat; // in paise
    category : Text;
    isVegetarian : Bool;
    isAvailable : Bool;
    imageUrl : ?Text;
  };
};
