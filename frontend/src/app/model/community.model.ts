export interface TravelerAuthor {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    isVerified: boolean;
    role: string;
    badges?: string[];
}

export interface PostComment {
    _id?: string;
    post: string;
    author: TravelerAuthor;
    content: string;
    createdAt: string; 
}

export interface CommunityPost {
    _id: string;
    author: TravelerAuthor;
    topic: 'Journey Stories' | 'Travel Tips' | 'Route Advice' | 'Destination Guide' | 'General Discussion';
    title: string;
    content: string;
    photos: string[];
    routeTag?: {
        departure?: string;
        destination: string;
    };
    destinationTag?: string;
    likes: string[];
    likeCount?: number;
    views: number;
    isFeatured?: boolean;
    status: 'active' | 'flagged' | 'removed';
    commentCount?: number;
    createdAt: string;
    updatedAt: string;
}

export interface TravelerProfileStats {
    profile: TravelerAuthor & { bio?: string; phone?: string };
    stats: {
        totalStories: number;
        likesEarned: number;
    };
    posts: CommunityPost[];
}