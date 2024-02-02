// More.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

function More({ navigation }) {
  const handleBackToDashboardPress = () => {
    navigation.navigate('Dashboard');
  };

  const handleOpenLink = (url) => {
    Linking.openURL(url);
  };

  const handleOpenFeedbackForm = () => {
    const feedbackFormUrl = 'https://forms.gle/1P6wD72uCGcoTZUp8';
    Linking.openURL(feedbackFormUrl);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Additional Resources:</Text>
      <TouchableOpacity onPress={() => handleOpenLink('https://raisingchildren.net.au/newborns/safety/cpr/cpr-for-babies')}>
        <Text style={styles.link}>🍼 CPR for babies under 12 months: in pictures</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleOpenLink('https://www.redcross.org/take-a-class/cpr/performing-cpr/child-baby-cpr')}>
        <Text style={styles.link}>👶 Child & Baby CPR - Red Cross</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleOpenLink('https://www.youtube.com/watch?v=tK-gwp4dPmw')}>
        <Text style={styles.link}>🎥 Additional Infant CPR Video Tutorials/Trainings</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Feedback Form:</Text>
      <TouchableOpacity onPress={handleOpenFeedbackForm}>
        <Text style={styles.link}>✉️ Provide your Feedback</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={handleBackToDashboardPress}>
        <Text style={styles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FCE4EC',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    color: '#FF7FAA',
    textAlign: 'center'
  },
  link: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
    textAlign: 'left',
  },
  backButton: {
    backgroundColor: '#FF7FAA',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default More;
