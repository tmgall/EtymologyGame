import { createContext, useContext, useEffect, useLayoutEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const THEME_KEY = 'theme';
const darkQuery = () => window.matchMedia('(prefers-color-scheme: dark)');

const getSavedTheme = (): Theme | null => {
    try {
        const saved = localStorage.getItem(THEME_KEY);
        return saved === 'light' || saved === 'dark' ? saved : null;
    } catch {
        return null;
    }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(() => getSavedTheme() ?? (darkQuery().matches ? 'dark' : 'light'));

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Until the player picks a theme, follow the device's light/dark setting.
    useEffect(() => {
        const query = darkQuery();
        const handleChange = (e: MediaQueryListEvent) => {
            if (!getSavedTheme()) setTheme(e.matches ? 'dark' : 'light');
        };
        query.addEventListener('change', handleChange);
        return () => query.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => {
            const next = prev === 'light' ? 'dark' : 'light';
            try {
                localStorage.setItem(THEME_KEY, next);
            } catch {
                // Storage can be unavailable (e.g. private browsing); the toggle still applies.
            }
            return next;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
