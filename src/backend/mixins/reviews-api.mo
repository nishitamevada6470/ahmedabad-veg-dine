import List "mo:core/List";
import ReviewTypes "../types/reviews";
import CommonTypes "../types/common";
import ReviewLib "../lib/reviews";

mixin (
  reviews : List.List<ReviewTypes.Review>,
  nextReviewId : { var value : Nat },
) {
  public func submitReview(
    customerName : Text,
    rating : Nat,
    reviewText : Text,
  ) : async CommonTypes.Result<Nat, Text> {
    ReviewLib.submitReview(reviews, nextReviewId, customerName, rating, reviewText);
  };

  public query func getAllReviews() : async [ReviewTypes.Review] {
    ReviewLib.getAllReviews(reviews);
  };
};
