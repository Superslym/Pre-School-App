import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { t } from '../i18n';

export default function ProgressScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const progressData = [
    { subject: 'Math', percentage: 70 },
    { subject: 'Letters', percentage: 80 },
    { subject: 'Shapes', percentage: 60 },
    { subject: 'Social Skills', percentage: 50 },
  ];

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.title, isDark && styles.titleDark]}>{t('parentDashboard')}</Text>
      {progressData.map((item, index) => (
        <View key={index} style={styles.progressItem}>
          <Text style={styles.subject}>{item.subject}: {item.percentage}%</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${item.percentage}%` }]} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff' },
  title:{ fontSize:24, marginBottom:20 },
  titleDark:{ color:'#fff' },
  progressItem: { width: '80%', marginBottom: 20 },
  subject: { fontSize: 18, marginBottom: 5 },
  progressBar: { height: 20, backgroundColor: '#e0e0e0', borderRadius: 10 },
  progressFill: { height: '100%', backgroundColor: '#4CAF50', borderRadius: 10 },
  containerDark:{ backgroundColor:'#000' }
});