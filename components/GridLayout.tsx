import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface GridLayoutProps {
  children: React.ReactNode;
  columns?: number;
  spacing?: number;
  style?: any;
}

export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  columns = 2,
  spacing = 16,
  style,
}) => {
  // Responsive breakpoints
  const isTablet = width >= 768;
  const isLargeScreen = width >= 1024;
  
  // Adjust columns based on screen size
  const responsiveColumns = React.useMemo(() => {
    if (isLargeScreen && columns === 2) return 4;
    if (isTablet && columns === 2) return 3;
    return columns;
  }, [columns, isTablet, isLargeScreen]);

  // Calculate responsive spacing
  const responsiveSpacing = React.useMemo(() => {
    if (isLargeScreen) return spacing + 8;
    if (isTablet) return spacing + 4;
    return spacing;
  }, [spacing, isTablet, isLargeScreen]);

  // Calculate item width with proper spacing
  const itemWidth = React.useMemo(() => {
    const totalSpacing = responsiveSpacing * (responsiveColumns + 1);
    const availableWidth = width - totalSpacing;
    return availableWidth / responsiveColumns;
  }, [responsiveColumns, responsiveSpacing]);

  const childrenArray = React.Children.toArray(children);

  return (
    <View style={[styles.container, { gap: responsiveSpacing }, style]}>
      {childrenArray.map((child, index) => (
        <View 
          key={index} 
          style={[
            styles.item, 
            { 
              width: responsiveColumns === 1 ? '100%' : itemWidth,
              marginBottom: index < childrenArray.length - responsiveColumns ? responsiveSpacing : 0,
            }
          ]}>
          {child}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  item: {
    // Individual item styling handled by width prop
  },
});