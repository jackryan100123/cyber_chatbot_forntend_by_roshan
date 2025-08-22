import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

interface GradientCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  gradientType?: 'primary' | 'secondary' | 'accent';
  useGradient?: boolean;
}

export const GradientCard: React.FC<GradientCardProps> = ({
  children,
  style,
  gradientType = 'primary',
  useGradient = false,
}) => {
  const { theme } = useTheme();

  if (useGradient) {
    return (
      <LinearGradient
        colors={
          theme.colors.gradient[gradientType] as [string, string, ...string[]]
        } // Explicit type casting
        style={[styles.card, style]}
      >
        {children}
      </LinearGradient>
    );
  }

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.card }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});
