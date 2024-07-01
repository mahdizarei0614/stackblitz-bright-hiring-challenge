export class Author {
  id: number = 0;
  name: string = '';
  imageUrl: string = '';
  totalPosts: number = 0;
  totalComments: number = 0;

  constructor(props?: Partial<Author>) {
    Object.assign(this, props);
  }
}

export enum AuthorSortType {
  Name = 'name',
  totalPosts = 'total-posts',
  totalComments = 'total-comments',
}
