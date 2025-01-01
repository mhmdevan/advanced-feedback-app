export interface Feedback {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}
