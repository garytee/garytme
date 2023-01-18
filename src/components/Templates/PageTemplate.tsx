import { format } from 'date-fns';
import { PageProps } from '../../models/PageProps';
import DOMPurify from 'isomorphic-dompurify';

export default function PageTemplate({ pageProps }: { pageProps: PageProps }) {
  return (
    <section>
      <h2>Page</h2>
      <ul>
        <li>
          <h3>{pageProps.title.rendered}</h3>
          <p>{format(new Date(pageProps.date), 'LLLL d, yyyy')}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(pageProps.content.rendered),
            }}
          />
        </li>
      </ul>
    </section>
  );
}
