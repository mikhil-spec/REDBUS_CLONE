export type ForumCategory = 'Route Discussion' | 'Destination Guide' | 'Travel Advice' | 'General Story';

export interface Comment {
  _id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorPicture?: string;
  content: string;
  createdAt: string;
}

export interface CommunityPost {
  _id: string;
  authorId: string;
  authorName: string;
  authorPicture?: string;
  isVerifiedUser: boolean;
  category: ForumCategory;
  relatedRoute?: string; // e.g., "Delhi to Jaipur"
  relatedDestination?: string; // e.g., "Jaipur"
  title: string;
  content: string;
  imageUrl?: string;
  likes: string[]; // Array of User IDs who liked the post
  commentsCount: number;
  isReported: boolean;
  reportReason?: string;
  isFeatured?: boolean;
  createdAt: string;
}