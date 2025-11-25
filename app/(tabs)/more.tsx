

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
  Switch,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Download,
  FileText,
  Shield,
  BookOpen,
  Headphones as HeadphonesIcon,
  Moon,
  Sun,
  Settings,
  ExternalLink,
  Eye,
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { GradientCard } from '@/components/GradientCard';
import { GridLayout } from '@/components/GridLayout';

// API
import api, { Booklet as ApiBooklet } from '@/services/api';

// 👇 New: Expo helpers for view & download + notifications
import * as FileSystem from 'expo-file-system/legacy';
import * as WebBrowser from 'expo-web-browser';
import * as Notifications from 'expo-notifications';

interface Booklet extends ApiBooklet {
  description?: string;
  icon?: 'pdf' | 'guide' | 'checklist';
}

export default function MoreScreen() {
  const { theme, toggleTheme, isDark } = useTheme();
  const router = useRouter();

  const [booklets, setBooklets] = useState<Booklet[]>([]);
  const [loadingBooklets, setLoadingBooklets] = useState<boolean>(false);
  const [bookletsError, setBookletsError] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Configure notifications and ask permission
  useEffect(() => {
    (async () => {
      try {
        // Configure the notification handler
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
            shouldShowBanner: true,
            shouldShowList: true,
          }),
        });

        // Request permissions
        const settings = await Notifications.getPermissionsAsync();
        if (!settings.granted) {
          const { status } = await Notifications.requestPermissionsAsync();
          console.log('Notification permission status:', status);
        }
      } catch (error) {
        console.error('Notification setup error:', error);
      }
    })();
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingBooklets(true);
        setBookletsError(null);
        const res = await api.getBooklets();
        const mapped: Booklet[] = res.booklets.map((b: ApiBooklet) => {
          const lower = b.title?.toLowerCase?.() || '';
          const icon: Booklet['icon'] = lower.includes('checklist')
            ? 'checklist'
            : lower.includes('guide') || lower.includes('handbook')
            ? 'guide'
            : 'pdf';
          return { ...b, icon, description: b.title };
        });
        setBooklets(mapped);
      } catch (e: any) {
        setBookletsError(e?.message || 'Failed to load resources');
      } finally {
        setLoadingBooklets(false);
      }
    };
    load();
  }, []);

  const emergencyContacts = [
    {
      id: '1',
      title: 'National Cyber Crime Helpline',
      subtitle: '24/7 Emergency Support',
      value: '1930',
      icon: Phone,
      color: theme.colors.error,
      action: () => handleCall('1930'),
    },
    {
      id: '2',
      title: 'Chandigarh Cyber Cell',
      subtitle: 'Local Cyber Crime Unit',
      value: '0172-2749900',
      icon: Phone,
      color: theme.colors.secondary,
      action: () => handleCall('0172-2749900'),
    },
  ];

  const contactAuthorities = [
    {
      id: '1',
      title: 'Email Support',
      subtitle: 'cybercrime-chd@nic.in',
      icon: Mail,
      color: theme.colors.success,
      action: () => handleEmail('cybercrime-chd@nic.in'),
    },
    {
      id: '2',
      title: 'Cyber Crime Portal',
      subtitle: 'Official Government Portal',
      value: 'cybercrime.gov.in',
      icon: Globe,
      color: theme.colors.warning,
      action: () => handleWebsite('https://cybercrime.gov.in'),
    },
    {
      id: '3',
      title: 'Find Cyber Police Station',
      subtitle: 'Locate nearest station',
      icon: MapPin,
      color: theme.colors.primary,
      action: () => handleMapLocation(),
    },
  ];

  // ---------- Actions ----------
  const handleCall = (phoneNumber: string) => {
    Alert.alert('Make Call', `Do you want to call ${phoneNumber}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Call', onPress: () => Linking.openURL(`tel:${phoneNumber}`) },
    ]);
  };

  const handleEmail = (email: string) => {
    Alert.alert(
      'Send Email',
      `Open email client to send message to ${email}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Open',
          onPress: () =>
            Linking.openURL(`mailto:${email}?subject=Cybersecurity Inquiry`),
        },
      ]
    );
  };

  const handleWebsite = (url: string) => {
    Alert.alert(
      'Open Website',
      'This will open the official cyber crime portal in your browser.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open', onPress: () => Linking.openURL(url) },
      ]
    );
  };

  const handleMapLocation = () => {
    const latitude = 30.739204757628027;
    const longitude = 76.77835647910382;
    const url = `https://maps.google.com/?q=${latitude},${longitude}`;
    Alert.alert(
      'Open Map',
      'This will show cyber police station locations in Google Maps.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Maps', onPress: () => Linking.openURL(url) },
      ]
    );
  };

  // ---------- Booklet: VIEW ----------
  // Opens in Expo's in-app browser (nice preview)
  const viewBooklet = async (booklet: Booklet) => {
    try {
      if (!booklet.fileUrl) {
        Alert.alert('Unavailable', 'No file URL found for this booklet.');
        return;
      }
      await WebBrowser.openBrowserAsync(booklet.fileUrl);
    } catch {
      Alert.alert('Error', 'Unable to open the booklet.');
    }
  };

  // ---------- Booklet: DOWNLOAD ----------
  // Saves to app's document directory and notifies the user
  const downloadBooklet = async (booklet: Booklet) => {
    if (!booklet.fileUrl) {
      Alert.alert('Unavailable', 'No file URL found for this booklet.');
      return;
    }

    Alert.alert(
      'Download',
      `Download "${booklet.title}"${booklet.size ? ` (${booklet.size})` : ''}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Download',
          onPress: async () => {
            try {
              setDownloadingId(booklet.id);

              // Build a safe local filename using cache directory
              const ext = getExtensionFromUrl(booklet.fileUrl) || 'pdf';
              const safeBase = sanitizeFilename(booklet.title || 'booklet');
              const localUri = `${FileSystem.cacheDirectory}${safeBase}.${ext}`;

              const result = await FileSystem.downloadAsync(
                booklet.fileUrl,
                localUri
              );

              console.log('Downloaded to:', result.uri);

              // Fire a local notification
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: 'Download complete ✓',
                  body: `${booklet.title} saved to app storage.`,
                  data: { id: booklet.id },
                },
                trigger: null,
              });

              // Show success alert
              Alert.alert(
                'Downloaded',
                `"${booklet.title}" has been downloaded successfully to your device.`,
                [{ text: 'OK', style: 'default' }]
              );
            } catch (error: any) {
              console.error('Download error:', error);
              Alert.alert(
                'Error', 
                `Failed to download. ${error?.message || 'Please try again.'}`
              );
            } finally {
              setDownloadingId(null);
            }
          },
        },
      ]
    );
  };

  const getExtensionFromUrl = (url: string) => {
    try {
      const u = new URL(url);
      const path = u.pathname;
      const last = path.split('/').pop() || '';
      const dot = last.lastIndexOf('.');
      return dot > -1 ? last.slice(dot + 1).split('?')[0] : null;
    } catch {
      const q = url.split('?')[0];
      const last = q.split('/').pop() || '';
      const dot = last.lastIndexOf('.');
      return dot > -1 ? last.slice(dot + 1) : null;
    }
  };

  const sanitizeFilename = (name: string) =>
    name
      .replace(/[\\/:*?"<>|]+/g, '')
      .slice(0, 120)
      .trim() || 'file';

  const getResourceIcon = (type?: Booklet['icon']) => {
    switch (type) {
      case 'guide':
        return BookOpen;
      case 'checklist':
        return Shield;
      case 'pdf':
      default:
        return FileText;
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle="dark-content"
        translucent={false}
        backgroundColor={theme.colors.background}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <GradientCard useGradient style={styles.header}>
          <Settings size={24} color="#ffffff" />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Resources & Settings</Text>
            <Text style={styles.headerSubtitle}>
              Emergency help & app preferences
            </Text>
          </View>
        </GradientCard>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            App Settings
          </Text>
          <GradientCard style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <View
                  style={[
                    styles.settingIcon,
                    { backgroundColor: `${theme.colors.primary}15` },
                  ]}
                >
                  {isDark ? (
                    <Moon size={20} color={theme.colors.primary} />
                  ) : (
                    <Sun size={20} color={theme.colors.primary} />
                  )}
                </View>
                <View>
                  <Text
                    style={[styles.settingTitle, { color: theme.colors.text }]}
                  >
                    {isDark ? 'Dark Mode' : 'Light Mode'}
                  </Text>
                  <Text
                    style={[
                      styles.settingSubtitle,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Toggle app appearance
                  </Text>
                </View>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{
                  false: theme.colors.border,
                  true: theme.colors.primary,
                }}
                thumbColor={isDark ? '#ffffff' : '#f4f3f4'}
              />
            </View>
          </GradientCard>
        </View>

        {/* Emergency Services */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Emergency Services
          </Text>
          <GridLayout columns={1} spacing={12}>
            {emergencyContacts.map((contact) => (
              <TouchableOpacity
                key={contact.id}
                style={[
                  styles.contactCard,
                  { backgroundColor: theme.colors.card },
                ]}
                onPress={contact.action}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.contactIcon,
                    { backgroundColor: `${contact.color}15` },
                  ]}
                >
                  <contact.icon size={24} color={contact.color} />
                </View>
                <View style={styles.contactInfo}>
                  <Text
                    style={[styles.contactTitle, { color: theme.colors.text }]}
                  >
                    {contact.title}
                  </Text>
                  <Text
                    style={[
                      styles.contactSubtitle,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {contact.subtitle}
                  </Text>
                  <Text
                    style={[
                      styles.contactValue,
                      { color: theme.colors.primary },
                    ]}
                  >
                    {contact.value}
                  </Text>
                </View>
                <ExternalLink size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </GridLayout>
        </View>

        {/* Contact Authorities */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Contact Authorities
          </Text>
          <GridLayout columns={1} spacing={12}>
            {contactAuthorities.map((contact) => (
              <TouchableOpacity
                key={contact.id}
                style={[
                  styles.contactCard,
                  { backgroundColor: theme.colors.card },
                ]}
                onPress={contact.action}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.contactIcon,
                    { backgroundColor: `${contact.color}15` },
                  ]}
                >
                  <contact.icon size={24} color={contact.color} />
                </View>
                <View style={styles.contactInfo}>
                  <Text
                    style={[styles.contactTitle, { color: theme.colors.text }]}
                  >
                    {contact.title}
                  </Text>
                  <Text
                    style={[
                      styles.contactSubtitle,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {contact.subtitle}
                  </Text>
                  {contact.value && (
                    <Text
                      style={[
                        styles.contactValue,
                        { color: theme.colors.primary },
                      ]}
                    >
                      {contact.value}
                    </Text>
                  )}
                </View>
                <ExternalLink size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </GridLayout>
        </View>

        {/* Cybersecurity Resources (API) */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Cybersecurity Resources
          </Text>

          {loadingBooklets && (
            <GradientCard style={styles.resourceCard}>
              <Text style={{ color: theme.colors.textSecondary }}>
                Loading resources…
              </Text>
            </GradientCard>
          )}

          {!!bookletsError && (
            <GradientCard style={styles.resourceCard}>
              <Text style={{ color: theme.colors.error }}>{bookletsError}</Text>
            </GradientCard>
          )}

          <GridLayout columns={1} spacing={12}>
            {booklets.map((bk) => {
              const ResourceIcon = getResourceIcon(bk.icon);
              const isDownloading = downloadingId === bk.id;
              return (
                <GradientCard key={bk.id} style={styles.resourceCard}>
                  <View style={styles.resourceHeader}>
                    <View
                      style={[
                        styles.resourceIcon,
                        { backgroundColor: `${theme.colors.primary}15` },
                      ]}
                    >
                      <ResourceIcon size={20} color={theme.colors.primary} />
                    </View>
                    <View style={styles.resourceInfo}>
                      <Text
                        style={[
                          styles.resourceTitle,
                          { color: theme.colors.text },
                        ]}
                      >
                        {bk.title}
                      </Text>
                      <Text
                        style={[
                          styles.resourceSize,
                          { color: theme.colors.textSecondary },
                        ]}
                      >
                        {bk.size || 'PDF'}
                      </Text>
                    </View>

                    {/* ACTIONS: View | Download */}
                    <View style={styles.actionsRow}>
                      <TouchableOpacity
                        style={[
                          styles.actionPill,
                          { backgroundColor: `${theme.colors.primary}15` },
                        ]}
                        onPress={() => viewBooklet(bk)}
                      >
                        <Eye size={16} color={theme.colors.primary} />
                        <Text
                          style={[
                            styles.actionPillText,
                            { color: theme.colors.primary },
                          ]}
                        >
                          View
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.actionPill,
                          {
                            backgroundColor: isDownloading
                              ? theme.colors.border
                              : `${theme.colors.primary}15`,
                          },
                        ]}
                        onPress={() => downloadBooklet(bk)}
                        disabled={isDownloading}
                      >
                        <Download
                          size={16}
                          color={
                            isDownloading
                              ? theme.colors.textSecondary
                              : theme.colors.primary
                          }
                        />
                        <Text
                          style={[
                            styles.actionPillText,
                            {
                              color: isDownloading
                                ? theme.colors.textSecondary
                                : theme.colors.primary,
                            },
                          ]}
                        >
                          {isDownloading ? 'Downloading…' : 'Download'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {!!bk.description && (
                    <Text
                      style={[
                        styles.resourceDescription,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {bk.description}
                    </Text>
                  )}
                </GradientCard>
              );
            })}
          </GridLayout>
        </View>

        {/* Additional Help */}
        <View style={styles.section}>
          <GradientCard style={styles.helpCard}>
            <View
              style={[
                styles.helpIcon,
                { backgroundColor: `${theme.colors.primary}15` },
              ]}
            >
              <HeadphonesIcon size={32} color={theme.colors.primary} />
            </View>
            <Text style={[styles.helpTitle, { color: theme.colors.text }]}>
              Need Additional Help?
            </Text>
            <Text
              style={[
                styles.helpDescription,
                { color: theme.colors.textSecondary },
              ]}
            >
              Our AI assistant is available 24/7 to help with cybersecurity
              questions, threat reporting, and security guidance.
            </Text>
            <TouchableOpacity
              style={[
                styles.helpButton,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => router.push('/(tabs)/chat')}
            >
              <Text style={styles.helpButtonText}>Chat with Cyber Saathi</Text>
            </TouchableOpacity>
          </GradientCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 0,
  },
  headerTextContainer: { marginLeft: 12 },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: { fontSize: 14, color: 'rgba(255, 255, 255, 0.9)' },

  section: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },

  // Settings
  settingCard: { padding: 16 },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingTitle: { fontSize: 16, fontWeight: '600', marginBottom: 2 },
  settingSubtitle: { fontSize: 13 },

  // Contacts
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  contactIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactInfo: { flex: 1 },
  contactTitle: { fontSize: 16, fontWeight: '600', marginBottom: 2 },
  contactSubtitle: { fontSize: 13, marginBottom: 4 },
  contactValue: { fontSize: 14, fontWeight: '500' },

  // Resources
  resourceCard: { padding: 16 },
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  resourceInfo: { flex: 1 },
  resourceTitle: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  resourceSize: { fontSize: 12 },
  resourceDescription: { fontSize: 13, lineHeight: 18, marginTop: 4 },

  // Action pills
  actionsRow: { flexDirection: 'row', gap: 8 },
  actionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  actionPillText: { fontSize: 12, fontWeight: '700' },

  // Help
  helpCard: { padding: 24, alignItems: 'center' },
  helpIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  helpTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  helpDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  helpButton: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 24 },
  helpButtonText: { fontSize: 14, fontWeight: '600', color: '#ffffff' },
});
