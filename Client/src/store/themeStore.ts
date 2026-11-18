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
            localStorage.setItem('successbridge-theme', newIsDark ? 'dark' : 'light');
            if (newIsDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            return { isDark: newIsDark };
        }),
    setTheme: (isDark) => {
        localStorage.setItem('successbridge-theme', isDark ? 'dark' : 'light');
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        set({ isDark });
    },
}));

// Initialize theme from localStorage; dark mode is the default
const savedTheme = localStorage.getItem('successbridge-theme');
const initialIsDark = savedTheme ? savedTheme === 'dark' : true;

if (initialIsDark) {
    document.documentElement.classList.add('dark');
    useThemeStore.getState().setTheme(true);
} else {
    document.documentElement.classList.remove('dark');
    useThemeStore.getState().setTheme(false);
}
