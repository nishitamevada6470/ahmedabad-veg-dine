mixin (
  restaurantName : { var value : Text },
  restaurantAddress : { var value : Text },
  restaurantPhone : { var value : Text },
  restaurantEmail : { var value : Text },
  restaurantOpeningHours : { var value : Text },
) {

  public type RestaurantInfo = {
    name : Text;
    address : Text;
    phone : Text;
    email : Text;
    openingHours : Text;
  };

  public query func getRestaurantInfo() : async RestaurantInfo {
    {
      name = restaurantName.value;
      address = restaurantAddress.value;
      phone = restaurantPhone.value;
      email = restaurantEmail.value;
      openingHours = restaurantOpeningHours.value;
    };
  };
};
