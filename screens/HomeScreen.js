import React, { useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Animated, useColorScheme } from 'react-native';
import { t } from '../i18n';

export default function HomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.section1}></View>
      <View style={styles.section2}></View>
      <View style={styles.section3}></View>
      <View style={styles.content}>
        <Animated.Text style={[styles.title, { opacity: fadeAnim }, isDark && styles.titleDark]}>{t('welcome')}</Animated.Text>
        <Button
          title={t('startAdventure')}
          onPress={() => navigation.navigate('Game')}
          color="red"
          accessibilityLabel={t('startAdventure')}
        />
        <Button
          title={t('parentDashboard')}
          onPress={() => navigation.navigate('Progress')}
          color="red"
          accessibilityLabel={t('parentDashboard')}
        />
        <Button
          title={t('aboutTitle')}
          onPress={() => navigation.navigate('About')}
          color="red"
          accessibilityLabel={t('aboutTitle')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section1: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  section2: {
    flex: 1,
    backgroundColor: '#ADD8E6', // baby blue
  },
  section3: {
    flex: 1,
    backgroundColor: 'pink',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    backgroundColor: 'navy',
    color: 'white',
    padding: 10,
  },
  titleDark: {
    backgroundColor: '#333',
    color: '#fff',
  }
});