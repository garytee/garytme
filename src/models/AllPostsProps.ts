export interface AllPostsProps {
  id: number;
  slug: string;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  acf: {
    featured_image: {
      url: string;
      alt: string;
    };
  };
}
