import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultValue = 'light';

function getInitialTheme(): string {
  if (!browser) return defaultValue;
  
  const stored = localStorage.getItem('theme');
  return stored ?? defaultValue;
}

export const theme = writable(getInitialTheme());

if (browser) {
  const initialTheme = getInitialTheme();
  if (initialTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
}

theme.subscribe((value) => {
  if (browser) {
    localStorage.setItem('theme', value);
    if (value === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
});
