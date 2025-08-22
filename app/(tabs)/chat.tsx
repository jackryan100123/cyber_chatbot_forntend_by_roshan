import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Send,
  MessageCircle,
  Bot,
  User,
  Mic,
  MicOff,
  Trash2,
  Wifi,
  WifiOff,
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { GradientCard } from '@/components/GradientCard';
import * as Speech from 'expo-speech';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatScreen() {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Cyber Saathi AI assistant. I can help you with:\n\n• Reporting cyber crimes\n• Checking website safety\n• Providing security tips\n• Emergency cyber help\n\nHow can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const clearChat = () => {
    Alert.alert('Clear Chat', 'Are you sure you want to clear all messages?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => {
          setMessages([
            {
              id: '1',
              text: "Hello! I'm your Cyber Saathi AI assistant. How can I assist you today?",
              isUser: false,
              timestamp: new Date(),
            },
          ]);
        },
      },
    ]);
  };

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // Simulate voice input result
      setInputText('Voice input: How can I report a cyber crime?');
    } else {
      // Start recording
      setIsRecording(true);
      // Simulate recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        setInputText('Voice input: How can I report a cyber crime?');
      }, 3000);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response (replace with actual Groq API call)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes('report') || input.includes('crime')) {
      return "I'll help you report a cyber crime. For immediate assistance:\n\n📞 Call 1930 (National Cyber Crime Helpline)\n📧 Email: cybercrime-chd@nic.in\n🌐 Visit: cybercrime.gov.in\n\nPlease provide details about the incident, and I'll guide you through the reporting process.";
    } else if (
      input.includes('website') ||
      input.includes('url') ||
      input.includes('safe')
    ) {
      return "To check if a website is safe:\n\n✅ Look for HTTPS (secure connection)\n✅ Check for verified certificates\n✅ Avoid suspicious pop-ups\n✅ Use reputable antivirus software\n\nShare the URL you're concerned about, and I'll provide specific guidance.";
    } else if (input.includes('banking') || input.includes('bank')) {
      return 'Online Banking Security Tips:\n\n🔒 Always use official bank apps/websites\n🔒 Never share OTP or passwords\n🔒 Use strong, unique passwords\n🔒 Enable two-factor authentication\n🔒 Check statements regularly\n🔒 Log out completely after use\n\nIs there a specific banking security concern you have?';
    } else if (input.includes('phishing') || input.includes('email')) {
      return "Phishing Email Protection:\n\n🚨 Don't click suspicious links\n🚨 Verify sender's identity\n🚨 Check for spelling errors\n🚨 Don't download unknown attachments\n🚨 Look for urgent language/threats\n\nIf you received a suspicious email, don't interact with it. Would you like me to help you report it?";
    } else {
      return "I understand your concern. For comprehensive cybersecurity assistance:\n\n• Describe your specific issue in detail\n• Share any error messages or suspicious activity\n• Let me know if it's urgent\n\nI'm here to help keep you safe online. What specific cybersecurity challenge are you facing?";
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <GradientCard useGradient style={styles.header}>
        <View style={styles.headerIcon}>
          <Bot size={24} color="#ffffff" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.headerTitle, { color: '#ffffff' }]}>
            Cyber Saathi AI
          </Text>
          <View style={styles.statusContainer}>
            {isOnline ? (
              <Wifi size={14} color="#ffffff" />
            ) : (
              <WifiOff size={14} color="#ffffff" />
            )}
            <Text
              style={[
                styles.headerSubtitle,
                { color: 'rgba(255, 255, 255, 0.9)' },
              ]}
            >
              {isOnline ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.clearButton} onPress={clearChat}>
          <Trash2 size={20} color="#ffffff" />
        </TouchableOpacity>
      </GradientCard>

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.isUser ? styles.userMessage : styles.aiMessage,
              ]}
            >
              <View style={styles.messageIcon}>
                {message.isUser ? (
                  <User size={16} color="#3b82f6" />
                ) : (
                  <Bot size={16} color="#3b82f6" />
                )}
              </View>
              <GradientCard style={styles.messageBubble}>
                <Text
                  style={[styles.messageText, { color: theme.colors.text }]}
                >
                  {message.text}
                </Text>
                <Text
                  style={[
                    styles.timestamp,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </GradientCard>
            </View>
          ))}

          {isTyping && (
            <View style={[styles.messageContainer, styles.aiMessage]}>
              <View
                style={[
                  styles.messageIcon,
                  { backgroundColor: theme.colors.secondary },
                ]}
              >
                <Bot size={16} color="#ffffff" />
              </View>
              <GradientCard style={styles.typingIndicator}>
                <ActivityIndicator
                  size="small"
                  color={theme.colors.secondary}
                />
                <Text
                  style={[
                    styles.typingText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Cyber Saathi is typing...
                </Text>
              </GradientCard>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.colors.surface,
              borderTopColor: theme.colors.border,
            },
          ]}
        >
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
                color: theme.colors.text,
              },
            ]}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask about cybersecurity..."
            placeholderTextColor={theme.colors.textSecondary}
            multiline
            maxLength={1000}
          />
          <TouchableOpacity
            style={[
              styles.voiceButton,
              {
                backgroundColor: isRecording
                  ? theme.colors.error
                  : theme.colors.background,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={toggleRecording}
          >
            {isRecording ? (
              <MicOff size={20} color="#ffffff" />
            ) : (
              <Mic size={20} color={theme.colors.textSecondary} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor: inputText.trim()
                  ? theme.colors.primary
                  : theme.colors.border,
              },
            ]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <Send
              size={20}
              color={inputText.trim() ? '#ffffff' : theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  headerIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    marginLeft: 4,
  },
  clearButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatContainer: {
    flex: 1,
    // paddingBottom:20,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  userMessage: {
    flexDirection: 'row-reverse',
  },
  aiMessage: {
    flexDirection: 'row',
  },
  messageIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  messageBubble: {
    flex: 1,
    maxWidth: '80%',
    padding: 12,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  typingText: {
    marginLeft: 8,
    fontSize: 14,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
  },
  textInput: {
    flex: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    fontSize: 16,
    maxHeight: 100,
    borderWidth: 1,
  },
  voiceButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderWidth: 1,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
