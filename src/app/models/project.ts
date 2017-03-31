import { Base } from './base';
export class Project extends Base {
  git_url: string;
  description: string;
  demo_url: string;
  image_url: string;
  author_name: string;
  name: string;
  caption: string;
  twitter_id: string;
  approved: boolean;
  created_at: string;
  upvotes: number;
  upvoted_by: any;
}
