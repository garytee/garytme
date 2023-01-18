import { format } from 'date-fns';
import { PostProps } from '../../models/PostProps';
import DOMPurify from 'isomorphic-dompurify';

export default function PostTemplate({ postProps }: { postProps: PostProps }) {
  return (
    <section>
      <ul>
        <li>
          <h3>{postProps.title.rendered}</h3>
          <p>{format(new Date(postProps.date), 'LLLL d, yyyy')}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(postProps.content.rendered),
            }}
          />
        </li>
      </ul>
    </section>
  );
}
