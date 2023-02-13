// import { useTheme } from 'next-themes';

// const DarkModeToggle = () => {
//   const { theme, setTheme } = useTheme();

//   // set localstorage theme based on system theme
//   let themeData = localStorage.getItem('theme');
//   if (!themeData) {
//     if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//       setTheme('dark');
//     } else {
//       setTheme('light');
//     }
//   }

//   return (
//     <>
//       <button
//         aria-label="Toggle Dark Mode"
//         type="button"
//         onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//       >
//         {theme === 'dark' ? '🌞' : '🌚'}
//       </button>
//     </>
//   );
// };

// export default DarkModeToggle;

import { useTheme } from 'next-themes';
import { Switch } from '@headlessui/react';

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();

  // set localstorage theme based on system theme
  let themeData = localStorage.getItem('theme');
  if (!themeData) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <>
      <Switch
        checked={theme === 'dark'}
        onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={`${
          theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
        } relative inline-flex items-center h-6 rounded-full w-11`}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={`${
            theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
          } inline-block z-[1] w-4 h-4 transform bg-white rounded-full transition duration-200 ease-in-out`}
        />

        {/* show emoji with switch */}
        <span
          className={`${
            theme === 'dark'
              ? '-translate-x-3 -translate-y-3'
              : 'translate-x-2 -translate-y-3'
          } inline-block w-4 h-0 transform bg-white rounded-full transition duration-200 ease-in-out`}
        >
          {theme === 'dark' ? '🌚' : '🌞'}
        </span>
      </Switch>
    </>
  );
};

export default DarkModeToggle;
