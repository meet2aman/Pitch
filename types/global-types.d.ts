export interface StartupCardType {
  _createdAt: Date | string;
  _id: number;
  views: number;
  author: { _id: number; name: string };
  description: string;
  image: string;
  category: string;
  title: string;
}
