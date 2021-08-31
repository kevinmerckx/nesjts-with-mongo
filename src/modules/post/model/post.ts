export interface IPost {
  content: string;
  likes: {
    by: string;
  }[];
}
