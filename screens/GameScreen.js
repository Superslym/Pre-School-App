import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  BackHandler,
  Alert,
  useColorScheme,
} from 'react-native';
import analytics from '../utils/analytics';

export default function GameScreen({ navigation }) {
  const [score, setScore] = useState(0);
  const [number, setNumber] = useState(Math.floor(Math.random()*10)+1);
  const [feedback, setFeedback] = useState('');
  const [level, setLevel] = useState('basic');
  const [totalCorrect, setTotalCorrect] = useState(0);

  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const maxNumber = level === 'basic' ? 10 : 20;

  const checkAnswer = (answer) => {
    analytics.logEvent('answer_submitted', { answer, number, level });
    if(answer === number) {
      setScore(score+1);
      setTotalCorrect(totalCorrect + 1);
      setFeedback(t('correctFeedback'));
    } else {
      setFeedback(t('wrongFeedback'));
    }
    setTimeout(() => setFeedback(''), 2000);
    setNumber(Math.floor(Math.random()*maxNumber)+1);
  }

  const switchToAdvanced = () => {
    analytics.logEvent('level_unlocked', { from: level, to: 'advanced' });
    setLevel('advanced');
    setScore(0);
    setNumber(Math.floor(Math.random()*20)+1);
  }

  useEffect(() => {
    const onBackPress = () => {
      if (score > 0 || totalCorrect > 0) {
        Alert.alert(
          t('confirmLeaveTitle'),
          t('confirmLeaveMessage'),
          [
            { text: t('cancel'), style: 'cancel' },
            { text: t('yes'), onPress: () => navigation.goBack() },
          ],
          { cancelable: true }
        );
        return true; // prevent default
      }
      return false;
    };
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [score, totalCorrect]);

  const handleBack = () => {
    if (score > 0 || totalCorrect > 0) {
      Alert.alert(
        'Confirm',
        'You have a game in progress. Are you sure you want to leave?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Yes', onPress: () => navigation.goBack() },
        ],
        { cancelable: true }
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.title, isDark && styles.titleDark]}>{t('countStars')} ({level})</Text>
      <Text style={[styles.number, isDark && styles.numberDark]}>{'⭐'.repeat(number)}</Text>
      <View style={styles.buttons}>
        {Array.from({length: maxNumber}, (_,i) => i+1).map(num => (
          <Button
            key={num}
            title={num.toString()}
            onPress={() => checkAnswer(num)}
            accessibilityLabel={`Submit answer ${num}`}
          />
        ))}
      </View>
      <Text style={isDark && styles.textDark}>{t('score')}: {score}</Text>
      <Text style={isDark && styles.textDark}>{t('totalCorrect')}: {totalCorrect}</Text>
      {feedback ? <Text style={[styles.feedback, isDark && styles.feedbackDark]}>{feedback}</Text> : null}
      {level === 'basic' && totalCorrect >= 10 && (
        <Button
          title="Unlock Advanced Level!"
          onPress={switchToAdvanced}
          accessibilityLabel="Unlock advanced mode"
        />
      )}
      <Button title="Back to Home" onPress={handleBack} accessibilityLabel="Go back to home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff' },
  containerDark: { backgroundColor: '#000' },
  title: { fontSize:24, marginBottom:10, color: '#000' },
  titleDark: { color: '#fff' },
  number: { fontSize:48, fontWeight:'bold', marginBottom:20, color: '#000' },
  numberDark: { color: '#fff' },
  buttons: { flexDirection:'row', flexWrap:'wrap', justifyContent:'center' },
  feedback: { fontSize:20, fontWeight:'bold', marginTop:10, color:'#000' },
  feedbackDark: { color: '#fff' },
  textDark: { color: '#fff' },
});