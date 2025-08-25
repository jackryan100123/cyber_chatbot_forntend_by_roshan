import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    gradient: {
      primary: string[];
      secondary: string[];
      accent: string[];
    };
  };
  isDark: boolean;
    

}

const lightTheme: Theme = {
  colors: {
    primary: '#1e40af',
    secondary: '#3b82f6',
    background: '#f8fafc',
    surface: '#ffffff',
    card: '#ffffff',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    accent: '#3b82f6',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    gradient: {
      primary: ['#1e40af', '#3b82f6', '#60a5fa'],
      secondary: ['#3b82f6', '#60a5fa', '#93c5fd'],
      accent: ['#059669', '#10b981', '#34d399'],
    },
  },
  isDark: false,
};

const darkTheme: Theme = {
  colors: {
    primary: '#60a5fa',
    secondary: '#93c5fd',
    background: '#0c0a09',
    surface: '#1c1917',
    card: '#292524',
    text: '#fafaf9',
    textSecondary: '#a8a29e',
    border: '#44403c',
    accent: '#60a5fa',
    success: '#22c55e',
    warning: '#fbbf24',
    error: '#f87171',
    gradient: {
      primary: ['#1e40af', '#3b82f6', '#60a5fa'],
      secondary: ['#3b82f6', '#60a5fa', '#93c5fd'],
      accent: ['#059669', '#22c55e', '#4ade80'],
    },
  },
  isDark: true,
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
