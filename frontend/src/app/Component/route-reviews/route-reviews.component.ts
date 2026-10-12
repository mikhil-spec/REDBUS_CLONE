import {Component, OnInit} from "@angular/core";
import {ReviewService} from "../../service/review.service";
import {RouteReview, ReviewRatingSummary, EligibleBooking} from "../../model/review.model";
import {HttpClient} from "@angular/common/http";
import { url } from "../../config";
import { TranslationService } from "../../service/translation.service";

import { DEFAULT_AVATAR } from "../../config/avatar";
@Component({
  selector: "app-route-reviews",
  templateUrl : "./route-reviews.component.html" ,
  styleUrls : ["./route-reviews.component.css"]
})
export class RouteReviewsComponent implements OnInit{
  // Bus and reviews state
  selectedBusId = "";
  availableBuses : any[] = [];
  reviews : RouteReview[] = [];
  summary : ReviewRatingSummary = {averageRating: 0, totalReviews: 0 , starBreakdown:{5: 0, 4: 0, 3: 0, 2: 0, 1: 0}};
  isLoading= true;

  activeStarFilter = 0; // 0 = all
  activeSort = "recent";
  activeLanguage = "";
  defaultAvatar = DEFAULT_AVATAR;
  routesMessageKey = "";
  readonly languageCodes = ["en", "hi", "te", "ta"];

  // Current session traveler
  currentCustomerId = '';
  currentUserName = '';
  isUserVerified = true;

  // Eligible journeys to review
  eligibleJourneys : EligibleBooking[] = [];
  showReviewModal = false;
  isEditing = false;
  editingReviewId = '';

  // Form Model
  reviewForm= {
    bookingId : '',
    rating : 5,
    headline : '',
    comment : ""
  };

  toastAlert = "";

  constructor(
    private reviewService : ReviewService,
    private http : HttpClient,
    private i18n : TranslationService
  ) {}

  ngOnInit() : void{
    this.fetchInitialData();
  }

  fetchInitialData(): void{
    this.reviewService.getReviewedBuses().subscribe({
      next: (res) => {
        this.availableBuses = res.data || [];
        this.routesMessageKey = this.availableBuses.length ? "" : "REVIEWS.NO_ROUTES";
        this.selectedBusId = "all";
        this.loadBusReviews();
      },
      error: () => {
        this.isLoading = false;
        this.routesMessageKey = "REVIEWS.ROUTES_UNAVAILABLE";
        this.triggerToast(this.i18n.translate("REVIEWS.TOAST_LOAD_ROUTES_FAILED"));
      },
    });

    const rawUser = sessionStorage.getItem('Loggedinuser');

    if (!rawUser) {
      this.isUserVerified = false;
      return;
    }

    try {
      const user = JSON.parse(rawUser);
      this.currentCustomerId = user?._id || '';
      this.currentUserName = user?.name || '';
      this.isUserVerified = user?.isVerified === true;

      if (this.currentCustomerId) {
        this.loadEligibleBookings();
      }
    } catch {
      this.currentCustomerId = '';
      this.isUserVerified = false;
    }
  }

  loadBusReviews(): void{
    if (!this.selectedBusId) return;
    this.isLoading = true;
    this.reviewService.getBusRouteReviews(this.selectedBusId, this.activeStarFilter, this.activeSort, this.activeLanguage).subscribe({
      next : res=> {
        this.reviews = res.data || [];
        this.summary = res.summary || { averageRating: 0, totalReviews: 0, starBreakdown: {5: 0, 4: 0, 3: 0, 2: 0, 1: 0}};
        this.isLoading = false;
      },
      error: ()=> {
        this.isLoading = false;
        this.triggerToast(this.i18n.translate("REVIEWS.TOAST_LOAD_REVIEWS_FAILED"));
      }
    });
  }

  loadEligibleBookings() : void{
    if (!this.currentCustomerId) return;
    this.reviewService.getEligibleCompletedBookings(this.currentCustomerId).subscribe({
      next: res=> {
        this.eligibleJourneys = res.data || [];
        if (this.eligibleJourneys.length> 0) {
          this.reviewForm.bookingId = this.eligibleJourneys[0]._id;
        }
      }
    });
  }

  setLanguageFilter(code: string): void {
    this.activeLanguage = code;
    this.loadBusReviews();
  }

  languageLabel(code: string): string {
    const names: Record<string, string> = { en: "English", hi: "हिन्दी", te: "తెలుగు", ta: "தமிழ்" };
    return names[code] || code;
  }

  changeSelectedBus(busId:string) : void{
    this.selectedBusId = busId;
    this.loadBusReviews();
  }

  setStarFilter(star: number):void{
    this.activeStarFilter = this.activeStarFilter === star ? 0 : star;
    this.loadBusReviews();
  }

  setSort(sortOption: string) : void {
    this.activeSort = sortOption;
    this.loadBusReviews();
  }

  openWriteReviewModal() : void{
    if (!this.isUserVerified) {
      this.triggerToast(this.i18n.translate("REVIEWS.TOAST_VERIFIED_ONLY"));
      return;
    }
    if (this.eligibleJourneys.length === 0) {
      this.triggerToast(this.i18n.translate("REVIEWS.TOAST_NO_ELIGIBLE"));
      return;
    }
    this.isEditing = false;
    this.editingReviewId = "";
    this.reviewForm = {
      bookingId : this.eligibleJourneys[0]._id,
      rating : 5,
      headline: "",
      comment : "" ,
    };
    this.showReviewModal = true;
  }

  openEditModal(review: RouteReview): void{
    if (!review.canEdit) {
      this.triggerToast(this.i18n.translate("REVIEWS.TOAST_EDIT_EXPIRED"));
      return;
    }
    this.isEditing = true;
    this.editingReviewId = review._id;
    this.reviewForm = {
      bookingId : review.booking,
      rating : review.rating,
      headline :  review.headline || '',
      comment : review.comment
    };
    this.showReviewModal = true;
  }

  closeReviewModal():void{
    this.showReviewModal = false;
  }

  submitReviewForm() : void{
    if (this.reviewForm.comment.trim().length < 20){
      this.triggerToast(this.i18n.translate("REVIEWS.TOAST_MIN_CHARS"));
      return;
    }

    if (this.isEditing){
      this.reviewService.editReview(this.editingReviewId,{
        customerId : this.currentCustomerId,
        rating : this.reviewForm.rating,
        headline : this.reviewForm.headline,
        comment : this.reviewForm.comment
      }).subscribe({
        next: ()=> {
          this.triggerToast(this.i18n.translate("REVIEWS.TOAST_UPDATED"));
          this.showReviewModal = false;
          this.loadBusReviews();
        },
        error: err=> this.triggerToast(err.error?.message || this.i18n.translate("REVIEWS.TOAST_UPDATE_FAILED"))
      });
    } else{
      this.reviewService.submitRouteReview({
        customerId : this.currentCustomerId,
        bookingId : this.reviewForm.bookingId,
        rating : this.reviewForm.rating,
        headline : this.reviewForm.headline,
        comment: this.reviewForm.comment
      }).subscribe( {
        next: ()=> {
          this.triggerToast(this.i18n.translate("REVIEWS.TOAST_PUBLISHED"));
          this.showReviewModal = false;
          this.loadBusReviews();
          this.loadEligibleBookings();
        },
        error: err=> this.triggerToast(err.error?.message || this.i18n.translate("REVIEWS.TOAST_SUBMIT_FAILED"))
      });
    }
  }

  onVoteHelpful(review: RouteReview): void{
    this.reviewService.voteHelpful(review._id, this.currentCustomerId).subscribe({
      next: res=> {
        const idx = review.helpfulVotes.indexOf(this.currentCustomerId);
        if (res.upvoted && idx === -1){
          review.helpfulVotes.push(this.currentCustomerId);
        } else if (!res.upvoted && idx !== -1){
          review.helpfulVotes.splice(idx, 1);
        }
        if (review.helpfulVotes.length >= 3) {
          review.isTrustedReviewer = true;
        }
      },
      error: ()=> this.triggerToast(this.i18n.translate("REVIEWS.TOAST_VOTE_FAILED"))
    });
  }

  onReport(review : RouteReview):void {
    const reason = prompt("Please specify why this review violates guidelines (Spam, Abusive, Fake experience):");
    if (!reason) return;

    this.reviewService.reportReview(review._id , this.currentCustomerId, reason).subscribe({
      next: res=> {
        this.triggerToast(res.message);
        this.loadBusReviews();
      },
      error: () => this.triggerToast(this.i18n.translate("REVIEWS.TOAST_REPORT_FAILED"))
    });
  }

  getStarPercentage(star: number):number{
    if (!this.summary.totalReviews || !this.summary.starBreakdown[star]) return 0;
    return Math.round((this.summary.starBreakdown[star] / this.summary.totalReviews) * 100);
  }

  getStarsArray(count:number): number[] {
    return Array(count).fill(0);
  }

  triggerToast(msg: string) : void{
    this.toastAlert = msg;
    setTimeout(()=> {
      this.toastAlert = "";
    }, 4000);
  }
}