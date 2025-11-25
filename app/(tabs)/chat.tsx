// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
//   Send,
//   MessageCircle,
//   Bot,
//   User,
//   Mic,
//   MicOff,
//   Trash2,
//   Wifi,
//   WifiOff,
// } from 'lucide-react-native';
// import { useTheme } from '@/contexts/ThemeContext';
// import { GradientCard } from '@/components/GradientCard';
// import * as Speech from 'expo-speech';

// interface Message {
//   id: string;
//   text: string;
//   isUser: boolean;
//   timestamp: Date;
// }

// export default function ChatScreen() {
//   const { theme } = useTheme();
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: '1',
//       text: "Hello! I'm your Cyber Saathi AI assistant. I can help you with:\n\n• Reporting cyber crimes\n• Checking website safety\n• Providing security tips\n• Emergency cyber help\n\nHow can I assist you today?",
//       isUser: false,
//       timestamp: new Date(),
//     },
//   ]);
//   const [inputText, setInputText] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [isOnline, setIsOnline] = useState(true);
//   const scrollViewRef = useRef<ScrollView>(null);

//   useEffect(() => {
//     scrollViewRef.current?.scrollToEnd({ animated: true });
//   }, [messages]);

//   const clearChat = () => {
//     Alert.alert('Clear Chat', 'Are you sure you want to clear all messages?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Clear',
//         style: 'destructive',
//         onPress: () => {
//           setMessages([
//             {
//               id: '1',
//               text: "Hello! I'm your Cyber Saathi AI assistant. How can I assist you today?",
//               isUser: false,
//               timestamp: new Date(),
//             },
//           ]);
//         },
//       },
//     ]);
//   };

//   const toggleRecording = () => {
//     if (isRecording) {
//       // Stop recording
//       setIsRecording(false);
//       // Simulate voice input result
//       setInputText('Voice input: How can I report a cyber crime?');
//     } else {
//       // Start recording
//       setIsRecording(true);
//       // Simulate recording for 3 seconds
//       setTimeout(() => {
//         setIsRecording(false);
//         setInputText('Voice input: How can I report a cyber crime?');
//       }, 3000);
//     }
//   };

//   const sendMessage = async () => {
//     if (!inputText.trim()) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text: inputText,
//       isUser: true,
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInputText('');
//     setIsTyping(true);

//     // Simulate AI response (replace with actual Groq API call)
//     setTimeout(() => {
//       const aiResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         text: generateAIResponse(inputText),
//         isUser: false,
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, aiResponse]);
//       setIsTyping(false);
//     }, 1500);
//   };

//   const generateAIResponse = (userInput: string): string => {
//     const input = userInput.toLowerCase();

//     if (input.includes('report') || input.includes('crime')) {
//       return "I'll help you report a cyber crime. For immediate assistance:\n\n📞 Call 1930 (National Cyber Crime Helpline)\n📧 Email: cybercrime-chd@nic.in\n🌐 Visit: cybercrime.gov.in\n\nPlease provide details about the incident, and I'll guide you through the reporting process.";
//     } else if (
//       input.includes('website') ||
//       input.includes('url') ||
//       input.includes('safe')
//     ) {
//       return "To check if a website is safe:\n\n✅ Look for HTTPS (secure connection)\n✅ Check for verified certificates\n✅ Avoid suspicious pop-ups\n✅ Use reputable antivirus software\n\nShare the URL you're concerned about, and I'll provide specific guidance.";
//     } else if (input.includes('banking') || input.includes('bank')) {
//       return 'Online Banking Security Tips:\n\n🔒 Always use official bank apps/websites\n🔒 Never share OTP or passwords\n🔒 Use strong, unique passwords\n🔒 Enable two-factor authentication\n🔒 Check statements regularly\n🔒 Log out completely after use\n\nIs there a specific banking security concern you have?';
//     } else if (input.includes('phishing') || input.includes('email')) {
//       return "Phishing Email Protection:\n\n🚨 Don't click suspicious links\n🚨 Verify sender's identity\n🚨 Check for spelling errors\n🚨 Don't download unknown attachments\n🚨 Look for urgent language/threats\n\nIf you received a suspicious email, don't interact with it. Would you like me to help you report it?";
//     } else {
//       return "I understand your concern. For comprehensive cybersecurity assistance:\n\n• Describe your specific issue in detail\n• Share any error messages or suspicious activity\n• Let me know if it's urgent\n\nI'm here to help keep you safe online. What specific cybersecurity challenge are you facing?";
//     }
//   };

//   return (
//     <SafeAreaView
//       style={[styles.container, { backgroundColor: theme.colors.background }]}
//     >
//       <GradientCard useGradient style={styles.header}>
//         <View style={styles.headerIcon}>
//           <Bot size={24} color="#ffffff" />
//         </View>
//         <View style={styles.headerText}>
//           <Text style={[styles.headerTitle, { color: '#ffffff' }]}>
//             Cyber Saathi AI
//           </Text>
//           <View style={styles.statusContainer}>
//             {isOnline ? (
//               <Wifi size={14} color="#ffffff" />
//             ) : (
//               <WifiOff size={14} color="#ffffff" />
//             )}
//             <Text
//               style={[
//                 styles.headerSubtitle,
//                 { color: 'rgba(255, 255, 255, 0.9)' },
//               ]}
//             >
//               {isOnline ? 'Online' : 'Offline'}
//             </Text>
//           </View>
//         </View>
//         <TouchableOpacity style={styles.clearButton} onPress={clearChat}>
//           <Trash2 size={20} color="#ffffff" />
//         </TouchableOpacity>
//       </GradientCard>

//       <KeyboardAvoidingView
//         style={styles.chatContainer}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

//       >
//         <ScrollView
//           ref={scrollViewRef}
//           style={styles.messagesContainer}
//           showsVerticalScrollIndicator={false}
//         >
//           {messages.map((message) => (
//             <View
//               key={message.id}
//               style={[
//                 styles.messageContainer,
//                 message.isUser ? styles.userMessage : styles.aiMessage,
//               ]}
//             >
//               <View style={styles.messageIcon}>
//                 {message.isUser ? (
//                   <User size={16} color="#3b82f6" />
//                 ) : (
//                   <Bot size={16} color="#3b82f6" />
//                 )}
//               </View>
//               <GradientCard style={styles.messageBubble}>
//                 <Text
//                   style={[styles.messageText, { color: theme.colors.text }]}
//                 >
//                   {message.text}
//                 </Text>
//                 <Text
//                   style={[
//                     styles.timestamp,
//                     { color: theme.colors.textSecondary },
//                   ]}
//                 >
//                   {message.timestamp.toLocaleTimeString([], {
//                     hour: '2-digit',
//                     minute: '2-digit',
//                   })}
//                 </Text>
//               </GradientCard>
//             </View>
//           ))}

//           {isTyping && (
//             <View style={[styles.messageContainer, styles.aiMessage]}>
//               <View
//                 style={[
//                   styles.messageIcon,
//                   { backgroundColor: theme.colors.secondary },
//                 ]}
//               >
//                 <Bot size={16} color="#ffffff" />
//               </View>
//               <GradientCard style={styles.typingIndicator}>
//                 <ActivityIndicator
//                   size="small"
//                   color={theme.colors.secondary}
//                 />
//                 <Text
//                   style={[
//                     styles.typingText,
//                     { color: theme.colors.textSecondary },
//                   ]}
//                 >
//                   Cyber Saathi is typing...
//                 </Text>
//               </GradientCard>
//             </View>
//           )}
//         </ScrollView>

//         {/* Input Area */}
//         <View
//           style={[
//             styles.inputContainer,
//             {
//               backgroundColor: theme.colors.surface,
//               borderTopColor: theme.colors.border,
//             },
//           ]}
//         >
//           <TextInput
//             style={[
//               styles.textInput,
//               {
//                 backgroundColor: theme.colors.background,
//                 borderColor: theme.colors.border,
//                 color: theme.colors.text,
//               },
//             ]}
//             value={inputText}
//             onChangeText={setInputText}
//             placeholder="Ask about cybersecurity..."
//             placeholderTextColor={theme.colors.textSecondary}
//             multiline
//             maxLength={1000}
//           />
//           <TouchableOpacity
//             style={[
//               styles.voiceButton,
//               {
//                 backgroundColor: isRecording
//                   ? theme.colors.error
//                   : theme.colors.background,
//                 borderColor: theme.colors.border,
//               },
//             ]}
//             onPress={toggleRecording}
//           >
//             {isRecording ? (
//               <MicOff size={20} color="#ffffff" />
//             ) : (
//               <Mic size={20} color={theme.colors.textSecondary} />
//             )}
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.sendButton,
//               {
//                 backgroundColor: inputText.trim()
//                   ? theme.colors.primary
//                   : theme.colors.border,
//               },
//             ]}
//             onPress={sendMessage}
//             disabled={!inputText.trim()}
//           >
//             <Send
//               size={20}
//               color={inputText.trim() ? '#ffffff' : theme.colors.textSecondary}
//             />
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     borderRadius: 0,
//   },
//   headerIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 12,
//   },
//   headerText: {
//     flex: 1,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 2,
//   },
//   headerSubtitle: {
//     fontSize: 14,
//     marginLeft: 4,
//   },
//   clearButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   chatContainer: {
//     flex: 1,
//     // paddingBottom:20,
//   },
//   messagesContainer: {
//     flex: 1,
//     padding: 16,
//   },
//   messageContainer: {
//     flexDirection: 'row',
//     marginBottom: 16,
//   },
//   userMessage: {
//     flexDirection: 'row-reverse',
//   },
//   aiMessage: {
//     flexDirection: 'row',
//   },
//   messageIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginHorizontal: 8,
//   },
//   messageBubble: {
//     flex: 1,
//     maxWidth: '80%',
//     padding: 12,
//   },
//   messageText: {
//     fontSize: 16,
//     lineHeight: 22,
//   },
//   timestamp: {
//     fontSize: 12,
//     marginTop: 4,
//   },
//   typingIndicator: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//   },
//   typingText: {
//     marginLeft: 8,
//     fontSize: 14,
//     fontStyle: 'italic',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     padding: 16,
//     borderTopWidth: 1,
//   },
//   textInput: {
//     flex: 1,
//     borderRadius: 24,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     marginRight: 12,
//     fontSize: 16,
//     maxHeight: 100,
//     borderWidth: 1,
//   },
//   voiceButton: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 8,
//     borderWidth: 1,
//   },
//   sendButton: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// -----------------------2nd code------------------------------------

// import React, { useEffect, useRef, useState } from 'react';
// import {
//   Alert,
//   Dimensions,
//   KeyboardAvoidingView,
//   Linking,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   useColorScheme,
// } from 'react-native';
// import { useTheme } from '@/contexts/ThemeContext';
// import { GradientCard } from '@/components/GradientCard';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Audio } from 'expo-av';

// // ⚠️ Adjust the path if your api file lives elsewhere
// import api, { formatUrlForScan, isUrlScanRequest } from '@/services/api';

// interface Message {
//   id: string;
//   content: string;
//   sender: 'user' | 'bot';
//   timestamp: Date;
//   type?: 'text' | 'url-scan' | 'emergency' | 'info';
// }

// const { width } = Dimensions.get('window');

// // Minimal in-file palette to replace AppColors
// const Colors = {
//   background: '#0a0a0b',
//   backgroundLight: '#f7f7f8',
//   surface: '#111114',
//   surfaceLight: '#ffffff',
//   border: '#2a2a2e',
//   borderLight: '#e6e6ea',
//   primary: '#6c5ce7',
//   warning: '#f59e0b',
//   error: '#ef4444',
//   textPrimary: '#f5f5f7',
//   textPrimaryLight: '#111114',
//   textSecondary: '#a0a0a8',
//   bubbleUser: '#2b2b33',
//   bubbleUserLight: '#e9eefc',
//   bubbleBot: '#15151b',
//   bubbleBotLight: '#ffffff',
//   shadow: 'rgba(0,0,0,0.2)',
//   btnDisabled: '#c9c9d1',
//   gradientPrimary: ['#7c4dff', '#5c6cff'] as [string, string],
//   gradientDark: ['#1b1c26', '#14151c'] as [string, string],
// };

// export default function ChatScreen() {
//   const colorScheme = useColorScheme();
//   const isDark = colorScheme === 'dark';
//   const insets = useSafeAreaInsets();

//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: '1',
//       content:
//         "Hello! I'm CyberSaathi, your AI-powered cybersecurity assistant. I'm here to help you stay safe online.\n\nI can assist you with:\n• **Reporting cyber crimes**\n• **Checking website safety**\n• **Providing security tips**\n• **Emergency cyber help**\n\nHow can I help protect you today?",
//       sender: 'bot',
//       timestamp: new Date(),
//       type: 'info',
//     },
//   ]);
//   const [inputText, setInputText] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [isConnected, setIsConnected] = useState(true);
//   const [isRecording, setIsRecording] = useState(false);
//   const [headerHeight, setHeaderHeight] = useState(56);

//   const scrollViewRef = useRef<ScrollView>(null);
//   const recordingRef = useRef<Audio.Recording | null>(null);

//   useEffect(() => {
//     checkApiConnection();
//     const t = setTimeout(
//       () => scrollViewRef.current?.scrollToEnd({ animated: true }),
//       100
//     );
//     return () => clearTimeout(t);
//   }, [messages, isTyping]);

//   const checkApiConnection = async () => {
//     try {
//       await api.getHealth();
//       setIsConnected(true);
//     } catch (e) {
//       setIsConnected(false);
//       console.error('API Connection failed:', e);
//     }
//   };

//   const generateUniqueId = () =>
//     `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

//   // Convert UI messages to server messages (user-first, no info bubbles, trimmed)
//   type ApiMsg = { role: 'user' | 'assistant'; content: string };
//   const toApiHistory = (msgs: Message[]): ApiMsg[] => {
//     const cleaned = msgs.filter(
//       (m) => m.content.trim() !== '' && m.type !== 'info'
//     );
//     const recent = cleaned.slice(-20);
//     const mapped = recent.map<ApiMsg>((m) => ({
//       role: m.sender === 'bot' ? 'assistant' : 'user',
//       content: m.content,
//     }));
//     const firstUser = mapped.findIndex((m) => m.role === 'user');
//     return firstUser <= 0 ? mapped : mapped.slice(firstUser);
//   };

//   // URL Scan
//   const scanUrl = async (url: string) => {
//     try {
//       const scanning: Message = {
//         id: generateUniqueId(),
//         content: `🔍 **Scanning URL**: ${url}\n\n⏳ Analyzing website for potential threats...\nThis may take up to 30 seconds.`,
//         sender: 'bot',
//         timestamp: new Date(),
//         type: 'info',
//       };
//       setMessages((p) => [...p, scanning]);

//       const res = await api.scanUrl(url);
//       if (res.success && res.result) {
//         const r = res.result;
//         let emoji = '❓';
//         let sentence = 'Unable to determine risk level.';
//         if (r.riskLevel === 'dangerous') {
//           emoji = '🚨';
//           sentence = 'This URL has been flagged as dangerous!';
//         } else if (r.riskLevel === 'suspicious') {
//           emoji = '⚠️';
//           sentence = 'This URL appears suspicious. Exercise caution.';
//         } else if (r.riskLevel === 'safe') {
//           emoji = '✅';
//           sentence = 'This URL appears to be safe.';
//         }

//         const content = `${emoji} **Security Scan Results**

// 🔗 **URL**: ${url}
// 🛡️ **Risk Level**: ${r.riskLevel.toUpperCase()}
// 📊 **Assessment**: ${sentence}

// **Detection Details**:
// • Malicious: ${r.details.malicious}
// • Suspicious: ${r.details.suspicious}
// • Safe: ${r.details.harmless}
// • Unrated: ${r.details.undetected}

// ⏱️ **Scan Time**: ${new Date(r.scanTime).toLocaleTimeString()}

// ${
//   r.riskLevel === 'dangerous'
//     ? '\n🚨 **WARNING**: Do not visit this website! It may contain malware or be used for phishing.'
//     : r.riskLevel === 'suspicious'
//     ? '\n⚠️ **CAUTION**: Be very careful if you choose to visit this website.'
//     : '\n✅ **RECOMMENDATION**: While this URL appears safe, always be cautious with personal information.'
// }`;

//         setMessages((p) => [
//           ...p,
//           {
//             id: generateUniqueId(),
//             content,
//             sender: 'bot',
//             timestamp: new Date(),
//             type: 'url-scan',
//           },
//         ]);
//       } else {
//         throw new Error(res.error || 'Failed to scan URL');
//       }
//     } catch (err: any) {
//       console.error('URL Scan Error:', err);
//       setMessages((p) => [
//         ...p,
//         {
//           id: generateUniqueId(),
//           content: `⚠️ **Scan Error**: ${
//             err?.message || 'Failed to scan URL'
//           }\n\nPlease ensure:\n• The URL is valid and accessible\n• You have an internet connection\n• Try again in a few moments`,
//           sender: 'bot',
//           timestamp: new Date(),
//         },
//       ]);
//     }
//   };

//   // Voice (expo-av)
//   const startRecording = async () => {
//     try {
//       const { status } = await Audio.requestPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert(
//           'Permission Required',
//           'Please grant microphone permission to use voice input.'
//         );
//         return;
//       }
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       });
//       const recording = new Audio.Recording();
//       await recording.prepareToRecordAsync(
//         Audio.RecordingOptionsPresets.HIGH_QUALITY
//       );
//       await recording.startAsync();
//       recordingRef.current = recording;
//       setIsRecording(true);
//     } catch (e) {
//       console.error('Failed to start recording:', e);
//       Alert.alert(
//         'Recording Error',
//         'Failed to start voice recording. Please try again.'
//       );
//     }
//   };

//   const stopRecording = async () => {
//     if (!recordingRef.current) return;
//     try {
//       setIsRecording(false);
//       await recordingRef.current.stopAndUnloadAsync();
//       const uri = recordingRef.current.getURI();
//       recordingRef.current = null;

//       if (uri) {
//         const tr = await api.transcribeAudio(uri);
//         if (tr.success && tr.text) {
//           const newText = tr.text.trim();
//           if (newText)
//             setInputText((prev) => (prev ? `${prev} ${newText}` : newText));
//         } else {
//           Alert.alert(
//             'Transcription Error',
//             tr.error || 'Failed to transcribe audio'
//           );
//         }
//       }
//     } catch (e) {
//       console.error('Failed to stop recording:', e);
//       Alert.alert(
//         'Recording Error',
//         'Failed to process voice recording. Please try again.'
//       );
//     }
//   };

//   // Chat send
//   const handleSend = async () => {
//     if (!inputText.trim()) return;

//     const userMsg: Message = {
//       id: generateUniqueId(),
//       content: inputText,
//       sender: 'user',
//       timestamp: new Date(),
//       type: 'text',
//     };
//     setMessages((p) => [...p, userMsg]);

//     const current = inputText;
//     setInputText('');
//     setIsTyping(true);

//     // URL scan?
//     if (isUrlScanRequest(current)) {
//       const url = formatUrlForScan(current);
//       if (url) {
//         await scanUrl(url);
//       } else {
//         setMessages((p) => [
//           ...p,
//           {
//             id: generateUniqueId(),
//             content: `⚠️ **No valid URL found**\n\nPlease provide a URL starting with http:// or https://\n\n**Example:**\n\`scan url https://example.com\``,
//             sender: 'bot',
//             timestamp: new Date(),
//           },
//         ]);
//       }
//       setIsTyping(false);
//       return;
//     }

//     // Chat flow
//     try {
//       const history = toApiHistory([...messages, userMsg]);

//       // If your backend rejects arrays, switch your api.ts to a "smart" sender (prompt-only).
//       // Here we assume api.sendChatMessage accepts the array [{role, content}, ...]
//       const response = await api.sendChatMessage(history as any);

//       if (response.success) {
//         setMessages((p) => [
//           ...p,
//           {
//             id: generateUniqueId(),
//             content: response.response,
//             sender: 'bot',
//             timestamp: new Date(),
//           },
//         ]);
//       } else {
//         throw new Error(response.error || 'Failed to get response');
//       }
//     } catch (e) {
//       console.error('Chat API Error:', e);
//       setMessages((p) => [
//         ...p,
//         {
//           id: generateUniqueId(),
//           content:
//             "⚠️ I'm experiencing technical difficulties. Please try again or contact our emergency helpline at **1930** for immediate assistance.",
//           sender: 'bot',
//           timestamp: new Date(),
//         },
//       ]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   const handleEmergencyCall = () => {
//     Alert.alert(
//       'Emergency Call',
//       'Call the National Cyber Crime Helpline (1930)?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Call Now', onPress: () => Linking.openURL('tel:1930') },
//       ]
//     );
//   };

//   const handleClearChat = () => {
//     Alert.alert(
//       'Clear Chat',
//       'Are you sure you want to clear the chat history?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Clear',
//           style: 'destructive',
//           onPress: () =>
//             setMessages([
//               {
//                 id: '1',
//                 content:
//                   "Hello! I'm CyberSaathi, your AI-powered cybersecurity assistant. How can I help you stay safe online today?",
//                 sender: 'bot',
//                 timestamp: new Date(),
//                 type: 'info',
//               },
//             ]),
//         },
//       ]
//     );
//   };

//   const Bubble = ({ m }: { m: Message }) => {
//     const isUser = m.sender === 'user';
//     const bubbleBg = isDark
//       ? isUser
//         ? Colors.bubbleUser
//         : Colors.bubbleBot
//       : isUser
//       ? Colors.bubbleUserLight
//       : Colors.bubbleBotLight;
//     const textColor = isDark ? Colors.textPrimary : Colors.textPrimaryLight;
//     const borderColor = isDark ? Colors.border : Colors.borderLight;

//     return (
//       <View style={[styles.msgRow, isUser ? styles.rowUser : styles.rowBot]}>
//         <View
//           style={[
//             styles.bubble,
//             {
//               backgroundColor: bubbleBg,
//               borderColor,
//               shadowColor: Colors.shadow,
//             },
//           ]}
//         >
//           <Text style={[styles.msgText, { color: textColor }]}>
//             {m.content}
//           </Text>
//           <Text style={[styles.msgTime, { color: Colors.textSecondary }]}>
//             {m.timestamp.toLocaleTimeString([], {
//               hour: '2-digit',
//               minute: '2-digit',
//             })}
//           </Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView
//       style={[
//         styles.container,
//         {
//           backgroundColor: isDark ? Colors.background : Colors.backgroundLight,
//         },
//       ]}
//     >
//       {/* <StatusBar
//         barStyle={isDark ? 'light-content' : 'dark-content'}
//         backgroundColor="transparent"
//         translucent
//       /> */}

//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={insets.top + headerHeight}
//       >
//         {/* Header */}
//         {/* <View
//           style={styles.header}
//           onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
//         > */}
//           {/* <LinearGradient
//             colors={isDark ? Colors.gradientDark : Colors.gradientPrimary}
//             style={styles.headerGradient}
//           >
//             <View style={styles.headerContent}>
//               <View style={styles.headerLeft}>
//                 <View style={styles.headerText}>
//                   <Text style={styles.headerTitle}>CyberSaathi</Text>
//                   <Text style={styles.headerSubtitle}>
//                     {isConnected ? '🟢 Online' : '🔴 Offline'}
//                   </Text>
//                 </View>
//               </View>

//               <View style={styles.headerRight}>
//                 <TouchableOpacity
//                   style={styles.headerButton}
//                   onPress={handleEmergencyCall}
//                 >
//                   <Text style={styles.headerButtonText}>1930</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.headerButton}
//                   onPress={handleClearChat}
//                 >
//                   <Text style={styles.headerButtonText}>Clear</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </LinearGradient> */}

//           <GradientCard useGradient style={styles.header}>
//             <View style={styles.headerText}
//             >
//               <Text style={[styles.headerTitle, { color: '#ffffff' }]}>
//                 Cyber Saathi AI
//               </Text>
//               <Text style={styles.headerSubtitle}>
//                 {isConnected ? '🟢 Online' : '🔴 Offline'}
//               </Text>
//             </View>

//              <View style={styles.headerContent}>
//               <View style={styles.headerLeft}>
//                 <View style={styles.headerText}>
//                   <Text style={styles.headerTitle}>CyberSaathi</Text>
//                   <Text style={styles.headerSubtitle}>
//                     {isConnected ? '🟢 Online' : '🔴 Offline'}
//                   </Text>
//                 </View>
//               </View>
//            <View style={styles.headerRight}>
//                 <TouchableOpacity
//                   style={styles.headerButton}
//                   onPress={handleEmergencyCall}
//                 >
//                   <Text style={styles.headerButtonText}>1930</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.headerButton}
//                   onPress={handleClearChat}
//                 >
//                   <Text style={styles.headerButtonText}>Clear</Text>
//                 </TouchableOpacity>
//               </View>
//               </View>
//           </GradientCard>
//         {/* </View> */}

//         {/* Connection Status */}
//         {!isConnected && (
//           <View style={styles.connectionWarning}>
//             <Text style={styles.connectionText}>
//               ⚠️ Limited functionality - Check your connection
//             </Text>
//           </View>
//         )}

//         {/* Messages */}
//         <ScrollView
//           ref={scrollViewRef}
//           style={styles.messagesContainer}
//           contentContainerStyle={styles.messagesContent}
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//         >
//           {messages.map((m) => (
//             <Bubble key={m.id} m={m} />
//           ))}

//           {isTyping && (
//             <View style={styles.typingContainer}>
//               <View
//                 style={[
//                   styles.typingBubble,
//                   {
//                     backgroundColor: isDark
//                       ? Colors.bubbleBot
//                       : Colors.bubbleBotLight,
//                     borderColor: isDark ? Colors.border : Colors.borderLight,
//                   },
//                 ]}
//               >
//                 <View style={styles.typingIndicator}>
//                   <View
//                     style={[
//                       styles.typingDot,
//                       { backgroundColor: Colors.primary },
//                     ]}
//                   />
//                   <View
//                     style={[
//                       styles.typingDot,
//                       { backgroundColor: Colors.primary },
//                     ]}
//                   />
//                   <View
//                     style={[
//                       styles.typingDot,
//                       { backgroundColor: Colors.primary },
//                     ]}
//                   />
//                 </View>
//                 <Text
//                   style={[styles.typingText, { color: Colors.textSecondary }]}
//                 >
//                   CyberSaathi is typing...
//                 </Text>
//               </View>
//             </View>
//           )}
//         </ScrollView>

//         {/* Input */}
//         <View
//           style={[
//             styles.inputContainer,
//             {
//               backgroundColor: isDark ? Colors.surface : Colors.surfaceLight,
//               borderTopColor: isDark ? Colors.border : Colors.borderLight,
//               paddingBottom: Platform.OS === 'ios' ? insets.bottom : 16,
//             },
//           ]}
//         >
//           <View
//             style={[
//               styles.inputWrapper,
//               {
//                 backgroundColor: isDark ? '#121218' : '#f2f3f7',
//                 borderColor: isDark ? Colors.border : Colors.borderLight,
//               },
//             ]}
//           >
//             <TextInput
//               style={[
//                 styles.textInput,
//                 {
//                   color: isDark ? Colors.textPrimary : Colors.textPrimaryLight,
//                 },
//               ]}
//               value={inputText}
//               onChangeText={setInputText}
//               placeholder={isRecording ? 'Listening… speak now' : 'Ask me'}
//               placeholderTextColor={Colors.textSecondary}
//               multiline
//               maxLength={1000}
//               onSubmitEditing={handleSend}
//               blurOnSubmit={false}
//               returnKeyType="send"
//               autoCapitalize="sentences"
//               autoCorrect
//               spellCheck
//             />

//             {/* Voice Input Button (press & hold) */}

//             <TouchableOpacity
//               style={[
//                 styles.sendButton,
//                 !inputText.trim() && styles.sendButtonDisabled,
//               ]}
//               onPress={handleSend}
//               disabled={!inputText.trim() || isTyping}
//               activeOpacity={0.8}
//             >
//               <LinearGradient
//                 colors={
//                   !inputText.trim()
//                     ? [Colors.btnDisabled, Colors.btnDisabled]
//                     : Colors.gradientPrimary
//                 }
//                 style={styles.sendGradient}
//               >
//                 <Text style={styles.sendText}>Send</Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: {
//     shadowColor: Colors.shadow,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 8,
//   },
//   headerGradient: {
//     paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight || 0,
//     paddingBottom: 8,
//     paddingHorizontal: 20,
//   },
//   headerContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     minHeight: 56,
//   },
//   headerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
//   headerText: { flex: 1 },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: 'white',
//     letterSpacing: 0.5,
//   },
//   headerSubtitle: {
//     fontSize: 12,
//     color: 'rgba(255, 255, 255, 0.8)',
//     fontWeight: '500',
//     marginTop: 1,
//   },
//   headerRight: { flexDirection: 'row', gap: 8 },
//   headerButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 16,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//   },
//   headerButtonText: { color: 'white', fontSize: 12, fontWeight: '600' },

//   connectionWarning: {
//     backgroundColor: Colors.warning + '20',
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.warning + '30',
//   },
//   connectionText: {
//     fontSize: 13,
//     color: Colors.warning,
//     fontWeight: '600',
//     textAlign: 'center',
//   },

//   messagesContainer: { flex: 1 },
//   messagesContent: { paddingVertical: 20, paddingBottom: 12 },

//   msgRow: { flexDirection: 'row', marginBottom: 16, paddingHorizontal: 16 },
//   rowUser: { justifyContent: 'flex-end' },
//   rowBot: { justifyContent: 'flex-start' },
//   bubble: {
//     maxWidth: width * 0.75,
//     borderRadius: 16,
//     borderBottomLeftRadius: 4,
//     padding: 12,
//     borderWidth: 1,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   msgText: { fontSize: 16, lineHeight: 22 },
//   msgTime: { fontSize: 12, marginTop: 6 },

//   typingContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     marginBottom: 16,
//     paddingHorizontal: 16,
//   },
//   typingBubble: {
//     padding: 12,
//     borderRadius: 16,
//     borderBottomLeftRadius: 4,
//     borderWidth: 1,
//     shadowColor: Colors.shadow,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//     maxWidth: width * 0.75,
//   },
//   typingIndicator: {
//     flexDirection: 'row',
//     gap: 6,
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   typingDot: { width: 8, height: 8, borderRadius: 4, opacity: 0.7 },
//   typingText: { fontSize: 12, fontStyle: 'italic' },

//   inputContainer: {
//     borderTopWidth: 1,
//     padding: 16,
//     shadowColor: Colors.shadow,
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     gap: 8,
//     borderRadius: 24,
//     padding: 4,
//     borderWidth: 1,
//     shadowColor: Colors.shadow,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   textInput: {
//     flex: 1,
//     fontSize: 16,
//     lineHeight: 22,
//     maxHeight: 120,
//     minHeight: 40,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     textAlignVertical: 'top',
//     fontWeight: '400',
//   },
//   micButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 2,
//   },
//   micIndicator: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: 'white',
//   },
//   sendButton: {
//     borderRadius: 20,
//     overflow: 'hidden',
//     shadowColor: Colors.primary,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 4,
//     marginBottom: 2,
//   },
//   sendGradient: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     minWidth: 60,
//   },
//   sendText: { color: 'white', fontSize: 14, fontWeight: '600' },
//   sendButtonDisabled: { shadowOpacity: 0, elevation: 0 },
// });

// -------------------------3rd------------------------------------

import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import { GradientCard } from '@/components/GradientCard';
import api, { formatUrlForScan, isUrlScanRequest } from '@/services/api';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'url-scan' | 'emergency' | 'info';
}

const { width } = Dimensions.get('window');

export default function ChatScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content:
        "Hello! I'm CyberSaathi, your AI-powered cybersecurity assistant. I'm here to help you stay safe online.\n\nI can assist you with:\n• Reporting cyber crimes\n• Providing security tips\n• Emergency cyber help\n\nHow can I help protect you today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'info',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [isRecording, setIsRecording] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);
  const recordingRef = useRef<Audio.Recording | null>(null);

  useEffect(() => {
    checkApiConnection();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
    return () => clearTimeout(t);
  }, [messages, isTyping]);

  const checkApiConnection = async () => {
    try {
      await api.getHealth();
      setIsConnected(true);
    } catch (e) {
      setIsConnected(false);
      console.error('API Connection failed:', e);
    }
  };

  const generateUniqueId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Convert UI messages to server messages (user-first, no info bubbles, keep last 20)
  type ApiMsg = { role: 'user' | 'assistant'; content: string };
  const toApiHistory = (msgs: Message[]): ApiMsg[] => {
    const cleaned = msgs.filter(
      (m) => m.content.trim() !== '' && m.type !== 'info'
    );
    const recent = cleaned.slice(-20);
    const mapped = recent.map<ApiMsg>((m) => ({
      role: m.sender === 'bot' ? 'assistant' : 'user',
      content: m.content,
    }));
    const firstUser = mapped.findIndex((m) => m.role === 'user');
    return firstUser <= 0 ? mapped : mapped.slice(firstUser);
  };

  // URL Scan
  const scanUrl = async (url: string) => {
    try {
      setMessages((p) => [
        ...p,
        {
          id: generateUniqueId(),
          content: `🔍 **Scanning URL**: ${url}\n\n⏳ Analyzing website for potential threats...\nThis may take up to 30 seconds.`,
          sender: 'bot',
          timestamp: new Date(),
          type: 'info',
        },
      ]);

      const res = await api.scanUrl(url);
      if (res.success && res.result) {
        const r = res.result;
        const emoji =
          r.riskLevel === 'dangerous'
            ? '🚨'
            : r.riskLevel === 'suspicious'
            ? '⚠️'
            : r.riskLevel === 'safe'
            ? '✅'
            : '❓';
        const sentence =
          r.riskLevel === 'dangerous'
            ? 'This URL has been flagged as dangerous!'
            : r.riskLevel === 'suspicious'
            ? 'This URL appears suspicious. Exercise caution.'
            : r.riskLevel === 'safe'
            ? 'This URL appears to be safe.'
            : 'Unable to determine risk level.';

        const content = `${emoji} **Security Scan Results**

🔗 **URL**: ${url}
🛡️ **Risk Level**: ${r.riskLevel.toUpperCase()}
📊 **Assessment**: ${sentence}

**Detection Details**:
• Malicious: ${r.details.malicious}
• Suspicious: ${r.details.suspicious}
• Safe: ${r.details.harmless}
• Unrated: ${r.details.undetected}

⏱️ **Scan Time**: ${new Date(r.scanTime).toLocaleTimeString()}

${
  r.riskLevel === 'dangerous'
    ? '\n🚨 **WARNING**: Do not visit this website! It may contain malware or be used for phishing.'
    : r.riskLevel === 'suspicious'
    ? '\n⚠️ **CAUTION**: Be very careful if you choose to visit this website.'
    : '\n✅ **RECOMMENDATION**: While this URL appears safe, always be cautious with personal information.'
}`;

        setMessages((p) => [
          ...p,
          {
            id: generateUniqueId(),
            content,
            sender: 'bot',
            timestamp: new Date(),
            type: 'url-scan',
          },
        ]);
      } else {
        throw new Error(res.error || 'Failed to scan URL');
      }
    } catch (err: any) {
      console.error('URL Scan Error:', err);
      setMessages((p) => [
        ...p,
        {
          id: generateUniqueId(),
          content: `⚠️ **Scan Error**: ${
            err?.message || 'Failed to scan URL'
          }\n\nPlease ensure:\n• The URL is valid and accessible\n• You have an internet connection\n• Try again in a few moments`,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  };

  // Chat send
  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: generateUniqueId(),
      content: inputText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    };
    setMessages((p) => [...p, userMsg]);

    const current = inputText;
    setInputText('');
    setIsTyping(true);

    // URL scan?
    if (isUrlScanRequest(current)) {
      const url = formatUrlForScan(current);
      if (url) {
        await scanUrl(url);
      } else {
        setMessages((p) => [
          ...p,
          {
            id: generateUniqueId(),
            content: `⚠️ **No valid URL found**\n\nPlease provide a URL starting with http:// or https://\n\n**Example:**\n\`scan url https://example.com\``,
            sender: 'bot',
            timestamp: new Date(),
          },
        ]);
      }
      setIsTyping(false);
      return;
    }

    // Chat flow
    try {
      const history = toApiHistory([...messages, userMsg]);
      const response = await api.sendChatMessage(history as any);

      if (response.success) {
        setMessages((p) => [
          ...p,
          {
            id: generateUniqueId(),
            content: response.response,
            sender: 'bot',
            timestamp: new Date(),
          },
        ]);
      } else {
        throw new Error(response.error || 'Failed to get response');
      }
    } catch (e) {
      console.error('Chat API Error:', e);
      setMessages((p) => [
        ...p,
        {
          id: generateUniqueId(),
          content:
            "⚠️ I'm experiencing technical difficulties. Please try again or contact our emergency helpline at **1930** for immediate assistance.",
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const Bubble = ({ m }: { m: Message }) => {
    const isUser = m.sender === 'user';
    const bubbleBg = isUser ? theme.colors.surface : theme.colors.background;
    const borderColor = theme.colors.border;

    return (
      <View style={[styles.msgRow, isUser ? styles.rowUser : styles.rowBot]}>
        <View
          style={[
            styles.bubble,
            {
              backgroundColor: bubbleBg,
              borderColor,
              shadowColor: 'rgba(0,0,0,0.2)',
            },
          ]}
        >
          <Text style={[styles.msgText, { color: theme.colors.text }]}>
            {m.content}
          </Text>
          <Text style={[styles.msgTime, { color: theme.colors.textSecondary }]}>
            {m.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
    );
  };

  const canSend = inputText.trim().length > 0 && !isTyping;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <StatusBar
        barStyle="dark-content"  // Always black content for iOS status bar (iOS only)
  translucent={false}
  backgroundColor={theme.colors.background} // Customize background color
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={insets.bottom }
      >
        {/* Header */}
        <GradientCard useGradient style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.headerText}>
              <Text style={[styles.headerTitle, { color: '#ffffff' }]}>
                Cyber Saathi AI
              </Text>
              <Text
                style={[
                  styles.headerSubtitle,
                  { color: 'rgba(255,255,255,0.9)' },
                ]}
              >
                {isConnected ? '🟢 Online' : '🔴 Offline'}
              </Text>
            </View>

            <View style={styles.headerActions}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => Linking.openURL('tel:1930')}
              >
                <Text style={styles.headerButtonText}>1930</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerButton}
                onPress={() =>
                  Alert.alert('Clear Chat', 'Clear chat history?', [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Clear',
                      style: 'destructive',
                      onPress: () =>
                        setMessages([
                          {
                            id: '1',
                            content:
                              "Hello! I'm CyberSaathi, your AI-powered cybersecurity assistant. How can I help you stay safe online today?",
                            sender: 'bot',
                            timestamp: new Date(),
                            type: 'info',
                          },
                        ]),
                    },
                  ])
                }
              >
                <Text style={styles.headerButtonText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </GradientCard>

        {/* Offline banner */}
        {!isConnected && (
          <View
            style={[
              styles.connectionWarning,
              {
                borderBottomColor: theme.colors.border,
                backgroundColor: (theme.colors.warning + '22') as any,
              },
            ]}
          >
            <Text
              style={{
                color: theme.colors.warning,
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              ⚠️ Limited functionality - Check your connection
            </Text>
          </View>
        )}

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.map((m) => (
            <Bubble key={m.id} m={m} />
          ))}

          {isTyping && (
            <View style={styles.typingContainer}>
              <View
                style={[
                  styles.typingBubble,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}
              >
                <View
                  className="typingIndicator"
                  style={styles.typingIndicator}
                >
                  <View
                    style={[
                      styles.typingDot,
                      { backgroundColor: theme.colors.primary },
                    ]}
                  />
                  <View
                    style={[
                      styles.typingDot,
                      { backgroundColor: theme.colors.primary },
                    ]}
                  />
                  <View
                    style={[
                      styles.typingDot,
                      { backgroundColor: theme.colors.primary },
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.typingText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  CyberSaathi is typing...
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input — themed version of your snippet */}
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.colors.surface,
              borderTopColor: theme.colors.border,
              paddingBottom: Platform.OS === 'ios' ? insets.bottom : 16,
            },
          ]}
        >
          <View
            style={[
              styles.inputWrapper,
              {
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <TextInput
              style={[styles.textInput, { color: theme.colors.text }]}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask me"
              placeholderTextColor={theme.colors.textSecondary}
              multiline
              maxLength={3000}
              onSubmitEditing={handleSend}
              blurOnSubmit={false}
              returnKeyType="send"
              autoCapitalize="sentences"
              autoCorrect
              spellCheck
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={[styles.sendButton, !canSend && styles.sendButtonDisabled]}
              onPress={handleSend}
              disabled={!canSend}
              activeOpacity={0.9}
              accessibilityRole="button"
              accessibilityLabel="Send message"
            >
              {canSend ? (
                <LinearGradient
                  colors={[
                    theme.colors.primary,
                    (theme.colors as any).secondary ?? theme.colors.primary,
                  ]}
                  style={styles.sendGradient}
                >
                  <Text style={[styles.sendText, { color: '#fff' }]}>Send</Text>
                </LinearGradient>
              ) : (
                <View
                  style={[
                    styles.sendGradient,
                    { backgroundColor: theme.colors.border },
                  ]}
                >
                  <Text
                    style={[
                      styles.sendText,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Send
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Header (GradientCard content)
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: { flex: 1, paddingRight: 12 },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  headerSubtitle: { fontSize: 13, marginTop: 2 },
  headerActions: { flexDirection: 'row', gap: 8 },
  headerButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerButtonText: { color: '#fff', fontWeight: '700', fontSize: 12 },

  connectionWarning: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },

  messagesContainer: { flex: 1 },
  messagesContent: { paddingVertical: 20, paddingBottom: 12 },

  msgRow: { flexDirection: 'row', marginBottom: 16, paddingHorizontal: 16 },
  rowUser: { justifyContent: 'flex-end' },
  rowBot: { justifyContent: 'flex-start' },
  bubble: {
    maxWidth: width * 0.75,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    padding: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  msgText: { fontSize: 16, lineHeight: 22 },
  msgTime: { fontSize: 12, marginTop: 6 },

  typingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  typingBubble: {
    padding: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    maxWidth: width * 0.75,
  },
  typingIndicator: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    marginBottom: 4,
  },
  typingDot: { width: 8, height: 8, borderRadius: 4, opacity: 0.7 },
  typingText: { fontSize: 12, fontStyle: 'italic' },

  inputContainer: {
    borderTopWidth: 1,
    padding: 16,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    borderRadius: 24,
    padding: 4,
    borderWidth: 1,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    maxHeight: 120,
    minHeight: 40,
    paddingHorizontal: 16,
    paddingVertical: 10,
    textAlignVertical: 'top',
    fontWeight: '400',
  },
  sendButton: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 2,
  },
  sendButtonDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  sendGradient: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 60,
    borderRadius: 20,
  },
  sendText: { fontSize: 14, fontWeight: '600' },
});
