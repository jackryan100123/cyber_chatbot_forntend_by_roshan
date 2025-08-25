import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Newspaper, ExternalLink, Calendar } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { GradientCard } from '@/components/GradientCard';
import { GridLayout } from '@/components/GridLayout';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  source: string;
  category: 'threat' | 'security' | 'privacy' | 'general';
  severity: 'low' | 'medium' | 'high';
}

export default function NewsScreen() {
  const { theme } = useTheme();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data - replace with actual API call
  const mockArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'New Phishing Campaign Targets Mobile Banking Users',
      description: 'Cybersecurity experts warn of a sophisticated phishing campaign specifically designed to steal mobile banking credentials. The attack uses fake SMS messages...',
      publishedAt: '2024-01-15T10:30:00Z',
      source: 'CyberSecurity Today',
      category: 'threat',
      severity: 'high',
    },
    {
      id: '2',
      title: 'Microsoft Releases Critical Security Updates',
      description: 'Microsoft has released emergency security patches addressing several critical vulnerabilities in Windows and Office applications...',
      publishedAt: '2024-01-15T08:15:00Z',
      source: 'TechSecurity News',
      category: 'security',
      severity: 'high',
    },
    {
      id: '3',
      title: 'Privacy Concerns Rise with New Social Media Features',
      description: 'Data privacy advocates raise concerns about new location-sharing features in popular social media platforms...',
      publishedAt: '2024-01-14T16:45:00Z',
      source: 'Privacy Watch',
      category: 'privacy',
      severity: 'medium',
    },
    {
      id: '4',
      title: 'AI-Powered Cybersecurity Tools Show Promise',
      description: 'Recent developments in artificial intelligence are revolutionizing how organizations detect and respond to cyber threats...',
      publishedAt: '2024-01-14T14:20:00Z',
      source: 'AI Security Review',
      category: 'general',
      severity: 'low',
    },
    {
      id: '5',
      title: 'Ransomware Attack Hits Major Hospital Network',
      description: 'A sophisticated ransomware attack has disrupted operations at multiple hospitals, highlighting vulnerabilities in healthcare cybersecurity...',
      publishedAt: '2024-01-13T12:00:00Z',
      source: 'Healthcare Security Alert',
      category: 'threat',
      severity: 'high',
    },
  ];

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setArticles(mockArticles);
    } catch (error) {
      Alert.alert('Error', 'Failed to load news articles');
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNews();
    setRefreshing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return theme.colors.error;
      case 'medium': return theme.colors.warning;
      case 'low': return theme.colors.success;
      default: return theme.colors.textSecondary;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const openArticle = (article: NewsArticle) => {
    Alert.alert(
      article.title,
      `${article.description}\n\nSource: ${article.source}\nPublished: ${formatDate(article.publishedAt)}`,
      [{ text: 'Close', style: 'cancel' }]
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>Loading cybersecurity news...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
       <StatusBar
              barStyle="dark-content"  // Always black content for iOS status bar (iOS only)
        translucent={false}
        backgroundColor={theme.colors.background} // Customize background color
            />
      <GradientCard useGradient style={styles.header}>
        <Newspaper size={24} color="#ffffff" />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Cybersecurity News</Text>
          <Text style={styles.headerSubtitle}>Stay updated on latest threats & security</Text>
        </View>
      </GradientCard>

      {/* News Articles */}
      <ScrollView
        style={styles.articlesContainer}
        contentContainerStyle={styles.articlesContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        
        <GridLayout columns={1} spacing={16}>
          {articles.map((article) => (
            <TouchableOpacity
              key={article.id}
              onPress={() => openArticle(article)}
              activeOpacity={0.7}>
              <GradientCard style={styles.articleCard}>
                <View style={styles.articleHeader}>
                  <View style={[
                    styles.severityBadge, 
                    { backgroundColor: getSeverityColor(article.severity) }
                  ]}>
                    <Text style={styles.severityText}>
                      {article.severity.toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.articleMeta}>
                    <Calendar size={14} color={theme.colors.textSecondary} />
                    <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>{formatDate(article.publishedAt)}</Text>
                  </View>
                </View>

                <Text style={[styles.articleTitle, { color: theme.colors.text }]}>{article.title}</Text>
                <Text style={[styles.articleDescription, { color: theme.colors.textSecondary }]} numberOfLines={3}>
                  {article.description}
                </Text>

                <View style={styles.articleFooter}>
                  <Text style={[styles.sourceText, { color: theme.colors.primary }]}>{article.source}</Text>
                  <ExternalLink size={16} color={theme.colors.primary} />
                </View>
              </GradientCard>
            </TouchableOpacity>
          ))}
        </GridLayout>

        {articles.length === 0 && (
          <View style={styles.emptyState}>
            <Newspaper size={48} color={theme.colors.textSecondary} />
            <Text style={[styles.emptyStateText, { color: theme.colors.textSecondary }]}>No articles found</Text>
            <Text style={[styles.emptyStateSubtext, { color: theme.colors.textSecondary }]}>
              Pull to refresh for latest news
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
     borderRadius: 0,
  },
  headerTextContainer: {
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  articlesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  articlesContent: {
    paddingBottom: 32, // Added bottom padding to prevent content cutoff
  },
  articleCard: {
    padding: 20,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: 4,
    fontSize: 12,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 24,
  },
  articleDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sourceText: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});