import List "mo:core/List";
import Time "mo:core/Time";
import ReviewTypes "../types/reviews";
import CommonTypes "../types/common";

module {
  public func submitReview(
    reviews : List.List<ReviewTypes.Review>,
    nextId : { var value : Nat },
    customerName : Text,
    rating : Nat,
    reviewText : Text,
  ) : CommonTypes.Result<Nat, Text> {
    if (rating < 1 or rating > 5) {
      return #err("Rating must be between 1 and 5");
    };
    let id = nextId.value;
    nextId.value += 1;
    let review : ReviewTypes.Review = {
      id;
      customerName;
      rating;
      reviewText;
      createdAt = Time.now();
    };
    reviews.add(review);
    #ok(id);
  };

  public func getAllReviews(reviews : List.List<ReviewTypes.Review>) : [ReviewTypes.Review] {
    reviews.reverse().toArray();
  };
};
