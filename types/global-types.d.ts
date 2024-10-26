export interface StartupCardType {
  _createdAt: string;
  _id: number;
  views: number;
  author: { _id: number };
  description: string;
  image: string;
  category: string;
  title: string;
}
