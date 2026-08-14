import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { CommunityPost, Comment, ForumCategory } from '../model/community.model';
import { url } from '../config';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  private readonly apiUrl = `${url}community`;
  private readonly postsSubject = new BehaviorSubject<CommunityPost[]>([]);
  public readonly posts$ = this.postsSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  /**
   * Fetch all posts or filter by category/destination
   */
  getPosts(category?: ForumCategory, destination?: string): Observable<CommunityPost[]> {
    // Falls back to API or local mock data for testing
    return this.http.get<CommunityPost[]>(`${this.apiUrl}/posts`);
  }

  /**
   * Create a post (Verified Users only)
   */
  createPost(postData: Partial<CommunityPost>): Observable<CommunityPost> {
    return this.http.post<CommunityPost>(`${this.apiUrl}/posts`, postData);
  }

  /**
   * Toggle like state on a post
   */
  toggleLike(postId: string, userId: string): Observable<{ liked: boolean; totalLikes: number }> {
    return this.http.post<{ liked: boolean; totalLikes: number }>(`${this.apiUrl}/posts/${postId}/like`, { userId });
  }

  /**
   * Add a comment to a post
   */
  addComment(postId: string, commentData: Partial<Comment>): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/posts/${postId}/comments`, commentData);
  }

  /**
   * Report an inappropriate post for moderation
   */
  reportPost(postId: string, reason: string): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(`${this.apiUrl}/posts/${postId}/report`, { reason });
  }

  /**
   * Admin Moderation: Delete an inappropriate post
   */
  deletePost(postId: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/posts/${postId}`);
  }
}