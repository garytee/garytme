import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { PageProps } from '../../models/PageProps';

export default function ResumeTemplate({
  pageProps,
}: {
  pageProps: PageProps;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 max-w-screen-desktop m-auto p-8 laptop:grid-cols-3">
      <div className="col_1 order-2 laptop:order-1">
        {pageProps.acf.flexible_content.map(({ skills, awards }, index) => (
          <React.Fragment key={index}>
            {skills && (
              <div className="skills mb-10">
                <h1 className="border-[2px] border-black dark:border-white inline-flex mb-2 p-2">
                  SKILLS
                </h1>
                <div className="mt-2">
                  {skills.map(({ skill }, index) => (
                    <React.Fragment key={index}>
                      <h5>{skill}</h5>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {awards && (
              <div className="awards">
                <h1 className="border-[2px] border-black dark:border-white inline-flex mb-2 p-2">
                  AWARDS
                </h1>
                {awards.map(({ heading, subheading }, index) => (
                  <React.Fragment key={index}>
                    <div className="mt-2">
                      <h5>{heading}</h5>
                      <h5>{subheading}</h5>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="col_2 col-span-2 order-1 laptop:order-2">
        {pageProps.acf.flexible_content.map(({ experience }, index) => (
          <React.Fragment key={index}>
            {experience && (
              <div className="experience">
                <h1 className="border-[2px] border-black dark:border-white inline-flex mb-2 p-2">
                  EXPERIENCE
                </h1>
                {experience.map(
                  (
                    { date, company, title, description, bullet_points },
                    index
                  ) => (
                    <React.Fragment key={index}>
                      <div className="mb-6 mt-4">
                        <div className="grid grid-cols-1 max-w-screen-desktop mb-2 laptop:grid-cols-2">
                          <h5 className="order-1 laptop:order-2">
                            <em>{date}</em>
                          </h5>
                          <h5 className="order-2 laptop:order-1">
                            <strong className="text-xl">{company}</strong>
                          </h5>
                        </div>
                        <h5 className=" text-lg mb-4">{title}</h5>
                        {/* <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(description),
                          }}
                        /> */}
                        {bullet_points && (
                          <div className="mt-2">
                            <ul className="list-disc mx-[15px]">
                              {bullet_points.map(({ bullet_point }, index) => (
                                <React.Fragment key={index}>
                                  <li className="mb-[2px]">{bullet_point}</li>
                                </React.Fragment>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  )
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
