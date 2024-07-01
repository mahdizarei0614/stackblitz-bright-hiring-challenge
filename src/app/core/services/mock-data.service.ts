import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Author } from '../models/author.model';
import { Article, ArticleType } from '../models/article.model';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  getAuthors(numberOfRows: number): Observable<Author[]> {
    const authors = Array(numberOfRows)
      .fill(null)
      .map(
        (author, index) =>
          new Author({
            id: index,
            name: `Author ${index + 1}`,
            imageUrl: `https://picsum.photos/200?${index}`,
            totalPosts: Math.ceil(Math.random() * 50),
            totalComments: Math.ceil(Math.random() * 50),
          })
      );
    return of(authors).pipe(delay(1000));
  }

  getArticles() {
    const articles = [
      new Article({
        title: 'Article 1',
        type: ArticleType.Article,
        createdOn: new Date(),
      }),
      new Article({
        title: 'Book 1',
        type: ArticleType.Book,
        createdOn: new Date(),
      }),
    ];
    return of(articles).pipe(delay(1000));
  }

  getComments() {
    const comments = [
      new Comment({
        title: 'Comment 1',
        user: 'User A',
        createdOn: new Date(),
      }),
      new Comment({
        title: 'Comment 2',
        user: 'User B',
        createdOn: new Date(),
      }),
    ];
    return of(comments).pipe(delay(1000));
  }
}
