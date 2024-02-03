import { Author } from './author.entity';
import { Topic } from './topic.enum';

export interface Article {
  id: string;
  author: Author;
  title: string;
  topic: Topic;
  content: string;
  publishedAt: number;
  views: number;
  likes: number;
  comments: number;
}
