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
  private _mockDataService = inject(MockDataService);
  private _authorsSubject = new BehaviorSubject<Author[]>([]);
  private _articlesSubject = new BehaviorSubject<Article[]>([]);
  private _commentsSubject = new BehaviorSubject<Comment[]>([]);

  get authors$(): Observable<Author[]> {
    return this._authorsSubject.asObservable();
  }

  get articles$(): Observable<Article[]> {
    return this._articlesSubject.asObservable();
  }

  get comments$(): Observable<Comment[]> {
    return this._commentsSubject.asObservable();
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
    this._mockDataService.getAuthors(5).subscribe(authors => {
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

      this._authorsSubject.next(filteredAuthors);
    });
  }

  loadArticles() {
    this._mockDataService.getArticles().subscribe(articles => {
      this._articlesSubject.next(articles);
    });
  }

  loadComments() {
    this._mockDataService.getComments().subscribe(comments => {
      this._commentsSubject.next(comments);
    });
  }
}
