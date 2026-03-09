import { create } from 'zustand';

interface ThemeState {
    isDark: boolean;
    toggleTheme: () => void;
    setTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    isDark: false,
    toggleTheme: () =>
        set((state) => {
            const newIsDark = !state.isDark;
            localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
            if (newIsDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            return { isDark: newIsDark };
        }),
    setTheme: (isDark) => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        set({ isDark });
    },
}));

// Initialize theme from localStorage if available
const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialIsDark = savedTheme === 'dark' || (!savedTheme && systemDark);

if (initialIsDark) {
    document.documentElement.classList.add('dark');
    useThemeStore.getState().setTheme(true);
} else {
    document.documentElement.classList.remove('dark');
    useThemeStore.getState().setTheme(false);
}
