import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import { FaExternalLinkAlt, FaRegTimesCircle } from 'react-icons/fa';
import DOMPurify from 'isomorphic-dompurify';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { PortfolioProps } from '../../models/PortfolioProps';

const Modal = ({
  selectedPost,
  setShowModal,
  showModal,
}: {
  selectedPost: PortfolioProps;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
}) => {
  const cancelButtonRef = useRef(null);
  return (
    <>
      <Transition.Root show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setShowModal}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full bg-gray-100 dark:bg-gray-900">
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium"
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                              selectedPost.title.rendered
                            ),
                          }}
                        />
                        {selectedPost.acf.flexible_content.map(
                          (
                            item: PortfolioProps['acf']['flexible_content'][0]
                          ) => {
                            if (item.link_to_content) {
                              return (
                                <div key={uuidv4()}>
                                  <Link
                                    href={item.link_to_content.url}
                                    target="_blank"
                                  >
                                    <button
                                      aria-label={item.link_to_content.title}
                                      type="button"
                                      className="inline-flex items-center mt-4 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                      {item.link_to_content.title}&nbsp;&nbsp;
                                      <FaExternalLinkAlt />
                                    </button>
                                  </Link>
                                </div>
                              );
                            }
                            if (item.stack) {
                              const visibleStack = item.stack.filter(
                                (item) => !item.hidden
                              );
                              const visibleStackLength = visibleStack.length;
                              return (
                                <div key={uuidv4()}>
                                  <div
                                    className={
                                      visibleStackLength < 3
                                        ? 'p-8 grid-flow-row gap-4 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-2 desktop:grid-cols-2'
                                        : 'p-8 grid-flow-row gap-4 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3'
                                    }
                                  >
                                    {item.stack.map(
                                      (
                                        stackItem: PortfolioProps['acf']['flexible_content'][0]['stack'][0]
                                      ) => {
                                        if (!stackItem.hidden) {
                                          return (
                                            <div key={uuidv4()}>
                                              <h2 className="p-4 border-[1px] light:border-black dark:border-white">
                                                {stackItem.stack_type}
                                              </h2>
                                              {stackItem.stack_items.map(
                                                (
                                                  stackItemItem: PortfolioProps['acf']['flexible_content'][0]['stack'][0]['stack_items'][0]
                                                ) => {
                                                  return (
                                                    <div
                                                      key={uuidv4()}
                                                      className="pt-2"
                                                    >
                                                      <h3>
                                                        {
                                                          stackItemItem.stack_item
                                                        }
                                                      </h3>
                                                    </div>
                                                  );
                                                }
                                              )}
                                            </div>
                                          );
                                        }
                                      }
                                    )}
                                  </div>
                                </div>
                              );
                            }
                          }
                        )}
                        {/* close dialog */}
                        <button
                          aria-label="Close Modal"
                          type="button"
                          className="absolute top-0 right-0 m-2 inline-flex justify-center rounded-md border border-transparent shadow-sm focus:outline-visible"
                          ref={cancelButtonRef}
                          onClick={() => setShowModal(false)}
                        >
                          <FaRegTimesCircle />
                        </button>
                      </Dialog.Title>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
export default Modal;
