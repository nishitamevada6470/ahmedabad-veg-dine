import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useAllReviews, useSubmitReview } from "../hooks/useReviews";
import type { Review } from "../types";

function StarDisplay({ value }: { value: number }) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Rating: ${value} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${star <= value ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
        />
      ))}
    </div>
  );
}

function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div
      className="flex items-center gap-1"
      role="radiogroup"
      aria-label="Star rating"
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hovered || value);
        return (
          <button
            key={star}
            type="button"
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            data-ocid={`reviews.star.${star}`}
            className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm transition-colors duration-150"
          >
            <Star
              className={`w-5 h-5 ${filled ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
            />
          </button>
        );
      })}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const date = new Date(Number(review.createdAt / 1_000_000n));
  const formattedDate = date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Card
        className="p-5 bg-card border border-border rounded-2xl"
        data-ocid={`reviews.item.${index + 1}`}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="font-semibold text-foreground text-sm">
              {review.customerName}
            </p>
            <p className="text-muted-foreground text-xs mt-0.5">
              {formattedDate}
            </p>
          </div>
          <StarDisplay value={Number(review.rating)} />
        </div>
        <p className="text-foreground/80 text-sm leading-relaxed">
          {review.reviewText}
        </p>
      </Card>
    </motion.div>
  );
}

function ReviewForm() {
  const { mutateAsync, isPending } = useSubmitReview();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || rating === 0 || !text.trim()) {
      setError("Please fill in all fields and select a star rating.");
      return;
    }
    setError("");
    try {
      await mutateAsync({
        customerName: name.trim(),
        rating,
        reviewText: text.trim(),
      });
      setSuccess(true);
      setName("");
      setRating(0);
      setText("");
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to submit review. Please try again.",
      );
    }
  };

  return (
    <Card
      className="p-6 sm:p-8 bg-card border border-border rounded-2xl"
      data-ocid="reviews.form"
    >
      <h2 className="font-display text-2xl font-semibold text-foreground mb-1">
        Share Your Experience
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        Enjoyed your meal at Sattv? We'd love to hear from you.
      </p>

      {success && (
        <p
          className="mb-5 p-4 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
          data-ocid="reviews.success_state"
          aria-live="polite"
        >
          🎉 Thank you for your review! It means a lot to us.
        </p>
      )}

      {error && (
        <div
          className="mb-5 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
          data-ocid="reviews.error_state"
          role="alert"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="space-y-2">
          <Label
            htmlFor="review-name"
            className="text-sm font-medium text-foreground"
          >
            Your Name
          </Label>
          <Input
            id="review-name"
            type="text"
            placeholder="e.g. Priya Shah"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-background border-input"
            data-ocid="reviews.name.input"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Rating</Label>
          <div data-ocid="reviews.rating.select">
            <StarRatingInput value={rating} onChange={setRating} />
          </div>
          {rating > 0 && (
            <p className="text-xs text-muted-foreground">
              {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="review-text"
            className="text-sm font-medium text-foreground"
          >
            Your Review
          </Label>
          <Textarea
            id="review-text"
            placeholder="Tell us about your dining experience at Sattv…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="bg-background border-input resize-none"
            data-ocid="reviews.text.textarea"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-smooth"
          data-ocid="reviews.submit_button"
        >
          {isPending ? (
            <span data-ocid="reviews.loading_state">Submitting…</span>
          ) : (
            "Submit Review"
          )}
        </Button>
      </form>
    </Card>
  );
}

export default function ReviewsPage() {
  const { data: reviews, isLoading } = useAllReviews();

  const avgRating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length
      : 0;

  return (
    <div data-ocid="reviews.page">
      {/* ── Page header ── */}
      <section className="py-14 sm:py-16 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute -bottom-10 -left-8 w-40 h-40 rounded-full bg-primary-foreground/10 pointer-events-none" />
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-primary-foreground/10 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary-foreground/70 font-semibold text-sm tracking-widest uppercase block mb-3">
              Guest Voices
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-primary-foreground leading-tight mb-4">
              Customer Reviews
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl leading-relaxed">
              Read what our guests say about their dining experience at Sattv.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Rating summary ── */}
      {!isLoading && reviews && reviews.length > 0 && (
        <section className="py-10 bg-muted/30 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-6 justify-center"
            >
              <div className="text-center">
                <p className="font-display text-5xl font-bold text-primary">
                  {avgRating.toFixed(1)}
                </p>
                <p className="text-muted-foreground text-sm mt-1">out of 5</p>
              </div>
              <div className="flex flex-col items-center sm:items-start gap-1">
                <StarDisplay value={Math.round(avgRating)} />
                <p className="text-muted-foreground text-sm">
                  Based on {reviews.length}{" "}
                  {reviews.length === 1 ? "review" : "reviews"}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Reviews list */}
          <div className="lg:col-span-3 space-y-5" data-ocid="reviews.list">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              What Our Guests Say
            </h2>

            {isLoading ? (
              <div className="space-y-4" data-ocid="reviews.loading_state">
                {[1, 2, 3].map((k) => (
                  <Card
                    key={k}
                    className="p-5 border border-border rounded-2xl"
                  >
                    <div className="flex justify-between mb-3">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-28 rounded" />
                        <Skeleton className="h-3 w-20 rounded" />
                      </div>
                      <Skeleton className="h-5 w-24 rounded" />
                    </div>
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-3/4 rounded mt-2" />
                  </Card>
                ))}
              </div>
            ) : reviews && reviews.length > 0 ? (
              reviews.map((review, index) => (
                <ReviewCard
                  key={String(review.id)}
                  review={review}
                  index={index}
                />
              ))
            ) : (
              <div
                className="flex flex-col items-center justify-center py-16 text-center"
                data-ocid="reviews.empty_state"
              >
                <MessageSquare className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  No reviews yet
                </h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Be the first to share your Sattv dining experience!
                </p>
              </div>
            )}
          </div>

          {/* Submission form */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <ReviewForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
