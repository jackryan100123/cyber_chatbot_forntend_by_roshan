import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Shield,
  TriangleAlert as AlertTriangle,
  Search,
  BookOpen,
  CircleHelp as HelpCircle,
  MessageCircleQuestion,
  Clock,
  Users,
  Award,
  Zap,
  Lock,
  Globe,
  ChevronRight,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { GradientCard } from '@/components/GradientCard';

const { width, height } = Dimensions.get('window');

// Responsive breakpoints
const isTablet = width >= 768;
const isLargeScreen = width >= 1024;
const isSmallScreen = width < 375;

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const features = [
    {
      icon: Clock,
      title: '24/7 Protection',
      description:
        'Round-the-clock cybersecurity monitoring and instant threat response',
      color: theme.colors.secondary,
      gradient: ['#3b82f6', '#1d4ed8'],
    },
    {
      icon: Zap,
      title: 'AI-Powered Response',
      description:
        'Advanced artificial intelligence for immediate cyber threat analysis',
      color: theme.colors.success,
      gradient: ['#10b981', '#059669'],
    },
    {
      icon: Users,
      title: 'Expert Network',
      description:
        'Direct connection to certified cybersecurity professionals worldwide',
      color: theme.colors.warning,
      gradient: ['#f59e0b', '#d97706'],
    },
  ];

  const quickActions = [
    {
      icon: AlertTriangle,
      title: 'Report Threat',
      subtitle: 'Cyber Crime',
      description: 'Report suspicious activities instantly',
      color: theme.colors.error,
      gradient: ['#ef4444', '#dc2626'],
      action: () => router.push('/chat'),
    },
    {
      icon: Search,
      title: 'URL Scanner',
      subtitle: 'Safety Check',
      description: 'Verify website security status',
      color: theme.colors.secondary,
      gradient: ['#3b82f6', '#2563eb'],
      action: () => router.push('/chat'),
    },
    {
      icon: BookOpen,
      title: 'Security Tips',
      subtitle: 'Learn & Protect',
      description: 'Latest cybersecurity guidance',
      color: theme.colors.success,
      gradient: ['#10b981', '#059669'],
      action: () => router.push('/news'),
    },
    {
      icon: HelpCircle,
      title: 'Get Support',
      subtitle: 'Expert Help',
      description: '24/7 professional assistance',
      color: theme.colors.warning,
      gradient: ['#f59e0b', '#d97706'],
      action: () => router.push('/more'),
    },
  ];

  const securityStats = [
    {
      icon: Award,
      number: '50K+',
      label: 'Protected Users',
      color: theme.colors.secondary,
      gradient: ['#3b82f6', '#1d4ed8'],
    },
    {
      icon: Shield,
      number: '99.9%',
      label: 'Uptime',
      color: theme.colors.success,
      gradient: ['#10b981', '#059669'],
    },
    {
      icon: Lock,
      number: '24/7',
      label: 'Monitoring',
      color: theme.colors.warning,
      gradient: ['#f59e0b', '#d97706'],
    },
    {
      icon: Globe,
      number: '150+',
      label: 'Countries',
      color: theme.colors.error,
      gradient: ['#ef4444', '#dc2626'],
    },
  ];

  const getResponsiveColumns = () => {
    if (isLargeScreen) return 4;
    if (isTablet) return 3;
    return 2;
  };

  const getResponsivePadding = () => {
    if (isLargeScreen) return 32;
    if (isTablet) return 24;
    return 20;
  };

  const getResponsiveFontSize = (base: number) => {
    if (isLargeScreen) return base + 4;
    if (isTablet) return base + 2;
    if (isSmallScreen) return base - 2;
    return base;
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
       <StatusBar
              barStyle="dark-content"  // Always black content for iOS status bar (iOS only)
        translucent={false}
        backgroundColor={theme.colors.background} // Customize background color
            />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Enhanced Header Section */}
        <LinearGradient
          colors={
            theme.colors.gradient.primary as [string, string, ...string[]]
          } // Explicit cast
          style={[
            styles.headerGradient,
            {
              paddingHorizontal: getResponsivePadding(),
              minHeight: isTablet ? 280 : 240,
            },
          ]}
        >
          <View style={styles.header}>
            <View
              style={[
                styles.logoContainer,
                {
                  width: isTablet ? 100 : 80,
                  height: isTablet ? 100 : 80,
                },
              ]}
            >
              <Shield
                size={isTablet ? 50 : 40}
                color="#ffffff"
                strokeWidth={2}
              />
              <View style={styles.logoGlow} />
            </View>
            <Text
              style={[
                styles.appTitle,
                {
                  fontSize: getResponsiveFontSize(32),
                  marginBottom: isTablet ? 12 : 8,
                },
              ]}
            >
              Cyber Saathi
            </Text>
            <Text
              style={[
                styles.tagline,
                {
                  fontSize: getResponsiveFontSize(16),
                  maxWidth: isTablet ? 600 : 300,
                },
              ]}
            >
              Your trusted cybersecurity companion for complete digital
              protection
            </Text>

            {/* Floating Security Badge */}
            <View
              style={[
                styles.securityBadge,
                {
                  marginTop: isTablet ? 24 : 16,
                },
              ]}
            >
              <Lock size={16} color="#ffffff" />
              <Text style={styles.securityBadgeText}>Secured & Verified</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Main Content */}
        <View style={[styles.content, { padding: getResponsivePadding() }]}>
          {/* Enhanced CTA Button */}
          <TouchableOpacity
            style={[
              styles.ctaButton,
              {
                marginBottom: isTablet ? 40 : 30,
              },
            ]}
            onPress={() => router.push('/chat')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#ef4444', '#dc2626'] as [string, string, ...string[]]} // Explicit cast
              style={styles.ctaGradient}
            >
              <View style={styles.ctaContent}>
                <MessageCircleQuestion size={24} color="#ffffff" />
                <View style={styles.ctaTextContainer}>
                  <Text
                    style={[
                      styles.ctaText,
                      {
                        fontSize: getResponsiveFontSize(18),
                      },
                    ]}
                  >
                    Start Secure Chat
                  </Text>
                  <Text style={styles.ctaSubtext}>
                    AI-powered cybersecurity assistant
                  </Text>
                </View>
                <ChevronRight size={20} color="#ffffff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Features Section with Enhanced Cards */}
          <View style={[styles.section, { marginBottom: isTablet ? 40 : 30 }]}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: theme.colors.text,
                  fontSize: getResponsiveFontSize(22),
                  marginBottom: isTablet ? 24 : 16,
                },
              ]}
            >
              Why Choose Cyber Saathi?
            </Text>
            <View style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <GradientCard
                  key={index}
                  style={[
                    styles.featureCard,
                    {
                      width: isTablet ? '100%' : '100%',
                      marginBottom: 16,
                      padding: isTablet ? 24 : 20,
                    },
                  ]}
                >
                  <LinearGradient
                    colors={feature.gradient as [string, string, ...string[]]} // Explicit cast
                    style={styles.featureIconContainer}
                  >
                    <feature.icon size={isTablet ? 28 : 24} color="#ffffff" />
                  </LinearGradient>
                  <View style={styles.featureContent}>
                    <Text
                      style={[
                        styles.featureTitle,
                        {
                          color: theme.colors.text,
                          fontSize: getResponsiveFontSize(18),
                        },
                      ]}
                    >
                      {feature.title}
                    </Text>
                    <Text
                      style={[
                        styles.featureDescription,
                        {
                          color: theme.colors.textSecondary,
                          fontSize: getResponsiveFontSize(14),
                        },
                      ]}
                    >
                      {feature.description}
                    </Text>
                  </View>
                </GradientCard>
              ))}
            </View>
          </View>

          {/* Enhanced Quick Actions */}
          <View style={[styles.section, { marginBottom: isTablet ? 40 : 30 }]}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: theme.colors.text,
                  fontSize: getResponsiveFontSize(22),
                  marginBottom: isTablet ? 24 : 16,
                },
              ]}
            >
              Quick Actions
            </Text>
            <View
              style={[
                styles.quickActionsGrid,
                {
                  flexDirection: isTablet ? 'row' : 'column',
                  flexWrap: isTablet ? 'wrap' : 'nowrap',
                },
              ]}
            >
              {quickActions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.quickActionCard,
                    {
                      backgroundColor: theme.colors.card,
                      width: isTablet ? '48%' : '100%',
                      marginBottom: 16,
                      marginRight: isTablet && index % 2 === 0 ? '4%' : 0,
                      padding: isTablet ? 24 : 20,
                    },
                  ]}
                  onPress={action.action}
                  activeOpacity={0.7}
                >
                  <View style={styles.quickActionHeader}>
                    <LinearGradient
                      colors={action.gradient as [string, string, ...string[]]} // Explicit cast
                      style={[
                        styles.quickActionIcon,
                        {
                          width: isTablet ? 70 : 60,
                          height: isTablet ? 70 : 60,
                        },
                      ]}
                    >
                      <action.icon size={isTablet ? 32 : 28} color="#ffffff" />
                    </LinearGradient>
                    <View style={styles.quickActionContent}>
                      <Text
                        style={[
                          styles.quickActionTitle,
                          {
                            color: theme.colors.text,
                            fontSize: getResponsiveFontSize(16),
                          },
                        ]}
                      >
                        {action.title}
                      </Text>
                      <Text
                        style={[
                          styles.quickActionSubtitle,
                          {
                            color: theme.colors.textSecondary,
                            fontSize: getResponsiveFontSize(12),
                          },
                        ]}
                      >
                        {action.subtitle}
                      </Text>
                    </View>
                    <ChevronRight
                      size={20}
                      color={theme.colors.textSecondary}
                    />
                  </View>
                  <Text
                    style={[
                      styles.quickActionDescription,
                      {
                        color: theme.colors.textSecondary,
                        fontSize: getResponsiveFontSize(13),
                      },
                    ]}
                  >
                    {action.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Enhanced Security Stats */}
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: theme.colors.text,
                  fontSize: getResponsiveFontSize(22),
                  marginBottom: isTablet ? 24 : 16,
                },
              ]}
            >
              Trust & Performance
            </Text>
            <View
              style={[
                styles.statsGrid,
                {
                  flexDirection: isTablet ? 'row' : 'row',
                  flexWrap: 'wrap',
                },
              ]}
            >
              {securityStats.map((stat, index) => (
                <View
                  key={index}
                  style={[
                    styles.statCardWrapper,
                    {
                      width: isTablet ? '23%' : '48%',
                      marginRight: isTablet ? '2%' : index % 2 === 0 ? '4%' : 0,
                      marginBottom: 16,
                    },
                  ]}
                >
                  <GradientCard
                    style={[
                      styles.statCard,
                      {
                        padding: isTablet ? 24 : 20,
                      },
                    ]}
                  >
                    <LinearGradient
                      colors={stat.gradient as [string, string, ...string[]]} // Explicit cast
                      style={[
                        styles.statIcon,
                        {
                          width: isTablet ? 50 : 40,
                          height: isTablet ? 50 : 40,
                        },
                      ]}
                    >
                      <stat.icon size={isTablet ? 24 : 20} color="#ffffff" />
                    </LinearGradient>
                    <Text
                      style={[
                        styles.statNumber,
                        {
                          color: theme.colors.text,
                          fontSize: getResponsiveFontSize(24),
                          marginTop: isTablet ? 12 : 8,
                        },
                      ]}
                    >
                      {stat.number}
                    </Text>
                    <Text
                      style={[
                        styles.statLabel,
                        {
                          color: theme.colors.textSecondary,
                          fontSize: getResponsiveFontSize(12),
                        },
                      ]}
                    >
                      {stat.label}
                    </Text>
                  </GradientCard>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
  },
  logoContainer: {
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  logoGlow: {
    position: 'absolute',
    width: '120%',
    height: '120%',
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: -1,
  },
  appTitle: {
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  tagline: {
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  securityBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ctaButton: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  ctaGradient: {
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  ctaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ctaTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  ctaText: {
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  ctaSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  featuresGrid: {
    gap: 0,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    lineHeight: 20,
  },
  quickActionsGrid: {
    gap: 0,
  },
  quickActionCard: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  quickActionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionIcon: {
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontWeight: '600',
    marginBottom: 2,
  },
  quickActionSubtitle: {
    fontWeight: '500',
  },
  quickActionDescription: {
    lineHeight: 18,
  },
  statsGrid: {
    justifyContent: 'space-between',
  },
  statCardWrapper: {
    // Wrapper for responsive spacing
  },
  statCard: {
    alignItems: 'center',
  },
  statIcon: {
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    textAlign: 'center',
  },
});
