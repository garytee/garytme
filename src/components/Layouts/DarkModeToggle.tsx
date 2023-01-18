import { useTheme } from 'next-themes';

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
      <button
        aria-label="Toggle Dark Mode"
        type="button"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? '🌞' : '🌚'}
      </button>
    </>
  );
};

export default DarkModeToggle;
