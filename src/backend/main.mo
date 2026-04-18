import List "mo:core/List";
import MenuTypes "types/menu";
import ResTypes "types/reservation";
import ReviewTypes "types/reviews";
import MenuLib "lib/menu";
import MenuApi "mixins/menu-api";
import ReservationApi "mixins/reservation-api";
import RestaurantInfoApi "mixins/restaurant-info-api";
import ReviewsApi "mixins/reviews-api";

actor {
  // Menu state
  let menuItems = List.empty<MenuTypes.MenuItem>();

  // Reservation state
  let reservations = List.empty<ResTypes.Reservation>();
  let nextReservationId = { var value : Nat = 1 };

  // Reviews state
  let reviews = List.empty<ReviewTypes.Review>();
  let nextReviewId = { var value : Nat = 1 };

  // Restaurant info stable vars
  let restaurantName = { var value : Text = "Shree Ahmedabad Rasoi" };
  let restaurantAddress = { var value : Text = "123 CG Road, Navrangpura, Ahmedabad, Gujarat 380009" };
  let restaurantPhone = { var value : Text = "+91 79 2646 0000" };
  let restaurantEmail = { var value : Text = "info@shreeahmedabadrasoi.com" };
  let restaurantOpeningHours = { var value : Text = "Mon-Sun: 11:00 AM - 11:00 PM" };

  // Seed initial menu data
  do {
    MenuLib.seedMenuItems(menuItems);
  };

  include MenuApi(menuItems);
  include ReservationApi(reservations, nextReservationId);
  include RestaurantInfoApi(restaurantName, restaurantAddress, restaurantPhone, restaurantEmail, restaurantOpeningHours);
  include ReviewsApi(reviews, nextReviewId);
};
