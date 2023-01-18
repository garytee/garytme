export interface PageProps {
  template: string;
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
        skills: [
          {
            skill: string;
          }
        ];
        awards: [
          {
            heading: string;
            subheading: string;
          }
        ];
        experience: [
          {
            date: string;
            company: string;
            position: string;
            description: string;
          }
        ];
      }
    ];
  };
}
