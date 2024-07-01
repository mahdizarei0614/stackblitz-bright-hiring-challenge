import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Author, AuthorSortType } from '../../core/models/author.model';
import { Article } from '../../core/models/article.model';
import { Comment } from '../../core/models/comment.model';
import { MockDataService } from '../../core/services/mock-data.service';

@Injectable({
  providedIn: 'root',
})
export class DataFacadeService {
  private mockDataService = inject(MockDataService);
  private authorsSubject = new BehaviorSubject<Author[]>([]);
  private articlesSubject = new BehaviorSubject<Article[]>([]);
  private commentsSubject = new BehaviorSubject<Comment[]>([]);

  get authors$(): Observable<Author[]> {
    return this.authorsSubject.asObservable();
  }

  get articles$(): Observable<Article[]> {
    return this.articlesSubject.asObservable();
  }

  get comments$(): Observable<Comment[]> {
    return this.commentsSubject.asObservable();
  }

  get totalAuthors$(): Observable<number> {
    return this.authors$.pipe(map(authors => authors?.length ?? 0));
  }

  get totalArticles$(): Observable<number> {
    return this.articles$.pipe(map(articles => articles?.length ?? 0));
  }

  get totalComments$(): Observable<number> {
    return this.comments$.pipe(map(comments => comments?.length ?? 0));
  }

  loadAuthors(
    searchText: string = '',
    sortType: AuthorSortType = AuthorSortType.Name
  ) {
    this.mockDataService.getAuthors(5).subscribe(authors => {
      let filteredAuthors = authors;

      if (searchText) {
        filteredAuthors = filteredAuthors.filter(author =>
          author.name.toLowerCase().includes(searchText.toLowerCase())
        );
      }

      if (sortType) {
        filteredAuthors = filteredAuthors.sort((a, b) => {
          if (sortType === AuthorSortType.Name) {
            return a.name.localeCompare(b.name);
          } else if (sortType === AuthorSortType.totalPosts) {
            return b.totalPosts - a.totalPosts;
          } else if (sortType === AuthorSortType.totalComments) {
            return b.totalComments - a.totalComments;
          }
          return 0;
        });
      }

      this.authorsSubject.next(filteredAuthors);
    });
  }

  loadArticles() {
    this.mockDataService.getArticles().subscribe(articles => {
      this.articlesSubject.next(articles);
    });
  }

  loadComments() {
    this.mockDataService.getComments().subscribe(comments => {
      this.commentsSubject.next(comments);
    });
  }
}
