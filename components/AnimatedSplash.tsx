// import React, { useEffect, useRef } from 'react';
// import { Animated, StyleSheet, Text, Dimensions } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync(); // keep native splash visible until animation finishes

// const { width, height } = Dimensions.get('window');

// export default function AnimatedSplash({ onFinish }: { onFinish: () => void }) {
//   const logoOpacity = useRef(new Animated.Value(0)).current;
//   const logoScale = useRef(new Animated.Value(0.8)).current;
//   const textOpacity = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     // Animate logo + text together in 1.5s
//     Animated.parallel([
//       Animated.timing(logoOpacity, {
//         toValue: 1,
//         duration: 1500,
//         useNativeDriver: true,
//       }),
//       Animated.spring(logoScale, {
//         toValue: 1,
//         friction: 4,
//         useNativeDriver: true,
//       }),
//       Animated.timing(textOpacity, {
//         toValue: 1,
//         duration: 1500,
//         useNativeDriver: true,
//       }),
//     ]).start(async () => {
//       // Short pause ~1.5s to make total ~3s
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       await SplashScreen.hideAsync();
//       onFinish();
//     });
//   }, []);

//   return (
//     <LinearGradient
//       colors={['#ffffff', '#358bee']}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 0, y: 1 }}
//       style={styles.container}
//     >
//       <Animated.Image
//         source={require('../assets/images/logo.png')}
//         style={[
//           styles.logo,
//           {
//             opacity: logoOpacity,
//             transform: [{ scale: logoScale }],
//           },
//         ]}
//         resizeMode="contain"
//       />
//       <Animated.View style={{ opacity: textOpacity, alignItems: 'center', marginTop: 20 }}>
//         <Text style={styles.title}>CyberSaathi</Text>
//         <Text style={styles.subtitle}>Empowering citizens with Cyber Awareness</Text>
//       </Animated.View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width,
//     height,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logo: {
//     width: width * 0.7, // Increased logo size (70% of screen width)
//     height: width * 0.7,
//   },
//   title: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   subtitle: {
//     fontSize: 18,
//     color: '#e0e0e0',
//     marginTop: 8,
//     textAlign: 'center',
//     paddingHorizontal: 20,
//   },
// });
