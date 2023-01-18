export interface PostProps {
  id: number;
  slug: string;
  date: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf: {
    flexible_content: [
      {
        name: string;
        location: string;
        links: [
          {
            icon: string;
            url: string;
          }
        ];
      }
    ];
  };
}
