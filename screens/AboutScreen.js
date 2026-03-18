import React from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { t } from '../i18n';

export default function AboutScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return (
    <ScrollView contentContainerStyle={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.title, isDark && styles.titleDark]}>{t('aboutTitle')}</Text>
      <Text style={styles.paragraph}>
        {t('privacyInfo')}
      </Text>
      <Text style={styles.paragraph}>
        LearnPlay is a simple educational game for preschoolers. All functionality runs
        entirely on-device; we do not transmit or store any personal information.
      </Text>
      <Text style={styles.paragraph}>
        Version 1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  containerDark: { backgroundColor: '#000' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#000' },
  titleDark: { color: '#fff' },
  paragraph: { fontSize: 16, marginBottom: 15, color: '#000' },
});
