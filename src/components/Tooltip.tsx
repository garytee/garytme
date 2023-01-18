import React, { memo } from 'react';
import cx from 'classnames';

export type TooltipProps = {
  children: React.ReactNode;
  text: string;
};

const Tooltip = memo((props: TooltipProps) => {
  return (
    <span className="group relative">
      <span
        className={cx(
          'pointer-events-none',
          'absolute',
          '-bottom-8',
          'left-1/2',
          '-translate-x-1/2',
          'whitespace-nowrap',
          'rounded',
          'bg-black',
          'px-2',
          'py-1,',
          'text-white',
          'text-sm',
          'opacity-0',
          'transition',
          'before:absolute',
          'before:left-1/2',
          'before:top-full',
          'before:-translate-x-1/2',
          'before:border-4',
          'before:border-transparent',
          'before:border-t-black',
          'before:content-[""]',
          'group-hover:opacity-100',
          // puts tooltip arrow on the bottom
          'before:rotate-180',
          'before:-top-2',
          'dark:bg-white',
          'dark:text-black',
          'dark:before:border-t-white'
        )}
      >
        {props.text}
      </span>
      {props.children}
    </span>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
