export class Article {
  title?: string;
  type?: ArticleType;
  createdOn?: Date;

  constructor(props?: Partial<Article>) {
    Object.assign(this, props);
  }
}

export enum ArticleType {
  Article = 'ARTICLE',
  Book = 'BOOK',
}
