export interface PortfolioProps {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  acf: {
    flexible_content: [
      {
        image: {
          url: string;
          alt: string;
        };
        built_with: string;
        link_to_content: {
          url: string;
          title: string;
        };
        stack: [
          {
            stack_type: string;
            stack_items: [
              {
                stack_item: string;
              }
            ];
            hidden: boolean;
          }
        ];
      }
    ];
  };
}
