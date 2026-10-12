import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from '../config';
import { CommunityPost, PostComment, TravelerProfileStats } from '../model/community.model';

@Injectable({
    providedIn: 'root'
})
export class CommunityService {
    private readonly baseUrl = `${url}/api/community`;

    constructor(private http: HttpClient) {}

    getCommunityPosts(topic?: string, sort?: string, destination?: string, route?: string, language?: string): Observable<{ success: boolean; data: CommunityPost[] }> {
        let params: any = {};
        if(language) params.language = language;
        if (topic && topic !== 'All') params.topic = topic;
        if(sort) params.sort = sort;
        if(destination) params.destination= destination;
        if(route) params.route = route;

        return this.http.get<{ success: boolean; data: CommunityPost[] }>(`${this.baseUrl}/posts`, {params});

    }

    getModerationQueue(): Observable<{ success: boolean; count: number; data: CommunityPost[] }> {
        return this.http.get<{ success: boolean; count: number; data: CommunityPost[] }>(`${this.baseUrl}/moderation/reported`);
    }

    getPostDetails(postId: string): Observable<{success: boolean; data: CommunityPost; comments:PostComment[]}> {
        return this.http.get<{success: boolean; data: CommunityPost; comments: PostComment[]}>(`${this.baseUrl}/posts/${postId}`);
    }

    createPost(payload: {
        authorId: string;
        topic: string;
        title: string;
        content: string;
        photos?: string[];
        routeTag?: {departure: string; destination: string};
        destinationTag?: string;
    }): Observable<{success:boolean; message: string; data: CommunityPost}> {
        return this.http.post<{success: boolean; message: string; data: CommunityPost}>(`${this.baseUrl}/posts`, payload);

    }

    toggleLike(postId: string, customerId:string): Observable<{success:boolean; liked:boolean; totalLikes:number}>{
        return this.http.post<{success: boolean; liked: boolean; totalLikes: number}>(`${this.baseUrl}/posts/${postId}/like`, {customerId});
    }

    addComment(postId: string, authorId: string, content: string): Observable<{ success: boolean; data: PostComment }> {
        return this.http.post<{ success: boolean; data: PostComment }>(`${this.baseUrl}/posts/${postId}/comments`, { authorId, content });
    }

    reportPost(postId: string, customerId: string, reason: string): Observable<{ success: boolean; message: string }> {
        return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/posts/${postId}/report`, { customerId, reason });
    }

    getTravelerProfile(customerId: string): Observable<{ success: boolean; data: TravelerProfileStats }> {
        return this.http.get<{ success: boolean; data: TravelerProfileStats }>(`${this.baseUrl}/profile/${customerId}`);
    }

    moderatePost(postId: string, action: 'approve' | 'flag' | 'remove', isFeatured?: boolean): Observable<any> {
        return this.http.patch(`${this.baseUrl}/posts/${postId}/moderate`, { action, isFeatured });
    }

}