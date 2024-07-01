export class Comment {
  title?: string;
  user?: string;
  createdOn?: Date;

  constructor(props?: Partial<Comment>) {
    Object.assign(this, props);
  }
}
