import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, Mail, Globe, MapPin, Download, FileText, Shield, Users, TriangleAlert as AlertTriangle, ExternalLink, BookOpen, Headphones as HeadphonesIcon, Moon, Sun, Settings } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { GradientCard } from '@/components/GradientCard';
import { GridLayout } from '@/components/GridLayout';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'guide' | 'checklist';
  size: string;
}

export default function MoreScreen() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [downloadingResource, setDownloadingResource] = useState<string | null>(null);

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

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Cybersecurity Best Practices Guide',
      description: 'Comprehensive guide covering essential cybersecurity practices for individuals and businesses.',
      type: 'pdf',
      size: '2.4 MB',
    },
    {
      id: '2',
      title: 'Phishing Attack Prevention',
      description: 'Learn to identify and prevent phishing attacks with real-world examples and tips.',
      type: 'guide',
      size: '1.8 MB',
    },
    {
      id: '3',
      title: 'Social Media Security Checklist',
      description: 'Step-by-step checklist to secure your social media accounts and protect your privacy.',
      type: 'checklist',
      size: '890 KB',
    },
    {
      id: '4',
      title: 'Mobile Device Security Handbook',
      description: 'Complete guide to securing smartphones and tablets against cyber threats.',
      type: 'pdf',
      size: '3.1 MB',
    },
  ];

  const handleCall = (phoneNumber: string) => {
    Alert.alert(
      'Make Call',
      `Do you want to call ${phoneNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => {
            Linking.openURL(`tel:${phoneNumber}`);
          },
        },
      ]
    );
  };

  const handleEmail = (email: string) => {
    Alert.alert(
      'Send Email',
      `Open email client to send message to ${email}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Open',
          onPress: () => {
            Linking.openURL(`mailto:${email}?subject=Cybersecurity Inquiry`);
          },
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
        {
          text: 'Open',
          onPress: () => {
            Linking.openURL(url);
          },
        },
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
        {
          text: 'Open Maps',
          onPress: () => {
            Linking.openURL(url);
          },
        },
      ]
    );
  };

  const downloadResource = async (resource: Resource) => {
    setDownloadingResource(resource.id);
    
    // Simulate download
    setTimeout(() => {
      setDownloadingResource(null);
      Alert.alert(
        'Download Complete',
        `${resource.title} has been downloaded successfully.`,
        [{ text: 'OK' }]
      );
    }, 2000);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'guide': return BookOpen;
      case 'checklist': return Shield;
      default: return FileText;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <GradientCard useGradient style={styles.header}>
          <Settings size={24} color="#ffffff" />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Resources & Settings</Text>
            <Text style={styles.headerSubtitle}>Emergency help & app preferences</Text>
          </View>
        </GradientCard>

        {/* Theme Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>App Settings</Text>
          <GradientCard style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <View style={[styles.settingIcon, { backgroundColor: `${theme.colors.primary}15` }]}>
                  {isDark ? (
                    <Moon size={20} color={theme.colors.primary} />
                  ) : (
                    <Sun size={20} color={theme.colors.primary} />
                  )}
                </View>
                <View>
                  <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
                    {isDark ? 'Dark Mode' : 'Light Mode'}
                  </Text>
                  <Text style={[styles.settingSubtitle, { color: theme.colors.textSecondary }]}>
                    Toggle app appearance
                  </Text>
                </View>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={isDark ? '#ffffff' : '#f4f3f4'}
              />
            </View>
          </GradientCard>
        </View>

        {/* Emergency Services */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Emergency Services</Text>
          <GridLayout columns={1} spacing={12}>
            {emergencyContacts.map((contact) => (
              <TouchableOpacity
                key={contact.id}
                style={[styles.contactCard, { backgroundColor: theme.colors.card }]}
                onPress={contact.action}
                activeOpacity={0.7}>
                <View style={[styles.contactIcon, { backgroundColor: `${contact.color}15` }]}>
                  <contact.icon size={24} color={contact.color} />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={[styles.contactTitle, { color: theme.colors.text }]}>{contact.title}</Text>
                  <Text style={[styles.contactSubtitle, { color: theme.colors.textSecondary }]}>{contact.subtitle}</Text>
                  <Text style={[styles.contactValue, { color: theme.colors.primary }]}>{contact.value}</Text>
                </View>
                <ExternalLink size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </GridLayout>
        </View>

        {/* Contact Authorities */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Contact Authorities</Text>
          <GridLayout columns={1} spacing={12}>
            {contactAuthorities.map((contact) => (
              <TouchableOpacity
                key={contact.id}
                style={[styles.contactCard, { backgroundColor: theme.colors.card }]}
                onPress={contact.action}
                activeOpacity={0.7}>
                <View style={[styles.contactIcon, { backgroundColor: `${contact.color}15` }]}>
                  <contact.icon size={24} color={contact.color} />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={[styles.contactTitle, { color: theme.colors.text }]}>{contact.title}</Text>
                  <Text style={[styles.contactSubtitle, { color: theme.colors.textSecondary }]}>{contact.subtitle}</Text>
                  {contact.value && (
                    <Text style={[styles.contactValue, { color: theme.colors.primary }]}>{contact.value}</Text>
                  )}
                </View>
                <ExternalLink size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </GridLayout>
        </View>

        {/* Cybersecurity Resources */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Cybersecurity Resources</Text>
          <GridLayout columns={1} spacing={12}>
            {resources.map((resource) => {
              const ResourceIcon = getResourceIcon(resource.type);
              const isDownloading = downloadingResource === resource.id;
              
              return (
                <GradientCard key={resource.id} style={styles.resourceCard}>
                  <View style={styles.resourceHeader}>
                    <View style={[styles.resourceIcon, { backgroundColor: `${theme.colors.primary}15` }]}>
                      <ResourceIcon size={20} color={theme.colors.primary} />
                    </View>
                    <View style={styles.resourceInfo}>
                      <Text style={[styles.resourceTitle, { color: theme.colors.text }]}>{resource.title}</Text>
                      <Text style={[styles.resourceSize, { color: theme.colors.textSecondary }]}>{resource.size}</Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.downloadButton, { 
                        backgroundColor: isDownloading ? theme.colors.border : `${theme.colors.primary}15` 
                      }]}
                      onPress={() => downloadResource(resource)}
                      disabled={isDownloading}>
                      <Download size={18} color={isDownloading ? theme.colors.textSecondary : theme.colors.primary} />
                    </TouchableOpacity>
                  </View>
                  <Text style={[styles.resourceDescription, { color: theme.colors.textSecondary }]}>{resource.description}</Text>
                </GradientCard>
              );
            })}
          </GridLayout>
        </View>

        {/* Additional Help */}
        <View style={styles.section}>
          <GradientCard style={styles.helpCard}>
            <View style={[styles.helpIcon, { backgroundColor: `${theme.colors.primary}15` }]}>
              <HeadphonesIcon size={32} color={theme.colors.primary} />
            </View>
            <Text style={[styles.helpTitle, { color: theme.colors.text }]}>Need Additional Help?</Text>
            <Text style={[styles.helpDescription, { color: theme.colors.textSecondary }]}>
              Our AI assistant is available 24/7 to help with cybersecurity questions, 
              threat reporting, and security guidance.
            </Text>
            <TouchableOpacity style={[styles.helpButton, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.helpButtonText}>Chat with Cyber Saathi</Text>
            </TouchableOpacity>
          </GradientCard>
        </View>
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingCard: {
    padding: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
  contactIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  contactSubtitle: {
    fontSize: 13,
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  resourceCard: {
    padding: 16,
  },
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
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  resourceSize: {
    fontSize: 12,
  },
  downloadButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resourceDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  helpCard: {
    padding: 24,
    alignItems: 'center',
  },
  helpIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  helpDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  helpButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  helpButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
});