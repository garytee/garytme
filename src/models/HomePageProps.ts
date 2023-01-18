export interface HomePageProps {
  id: number;
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
        image: {
          url: string;
          alt: string;
        };
        name: string;
        location: string;
        title: string;
        description: string;
        links: [
          {
            icon: string;
            url: string;
            tooltip_text: string;
          }
        ];
      }
    ];
  };
}
