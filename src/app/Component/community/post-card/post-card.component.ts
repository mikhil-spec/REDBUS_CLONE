import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommunityPost } from '../../model/community.model';
import { CommunityService } from '../../service/community.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
  @Input() post!: CommunityPost;
  @Input() currentUserId: string = '';
  @Output() postUpdated = new EventEmitter<void>();

  showComments: boolean = false;

  constructor(private readonly communityService: CommunityService) {}

  get isLiked(): boolean {
    return this.post?.likes?.includes(this.currentUserId) || false;
  }

  onLike(): void {
    if (!this.currentUserId) {
      alert('Please log in to like posts.');
      return;
    }
    this.communityService.toggleLike(this.post._id, this.currentUserId).subscribe({
      next: () => this.postUpdated.emit()
    });
  }

  onReport(): void {
    const reason = prompt('Please specify why you are reporting this post (e.g., spam, offensive content):');
    if (reason) {
      this.communityService.reportPost(this.post._id, reason).subscribe({
        next: () => alert('Thank you. The post has been flagged for moderation review.')
      });
    }
  }

  shareExternal(platform: 'twitter' | 'whatsapp' | 'copy'): void {
    const shareUrl = `${window.location.origin}/community#post-${this.post._id}`;
    const shareText = `Check out this travel story on Tedbus: "${this.post.title}"`;

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    } else if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Post link copied to clipboard!');
    }
  }
}