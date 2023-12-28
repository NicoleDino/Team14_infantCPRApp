// More.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

function More({ navigation }) {
  const handleBackToDashboardPress = () => {
    // Navigate back to the Dashboard
    navigation.navigate('Dashboard');
  };

  const handleOpenLink = (url) => {
    // Open the provided link
    Linking.openURL(url);
  };

  const handleOpenFeedbackForm = () => {
    // Open the feedback form link (replace with your actual feedback form link)
    const feedbackFormUrl = 'https://example.com/feedback-form';
    Linking.openURL(feedbackFormUrl);
  };

  return (
    <View style={styles.container}>
      {/* Links to Resources */}
      <Text style={styles.title}>Additional Resources:</Text>
      <TouchableOpacity onPress={() => handleOpenLink('https://www.example.com/printable-guide')}>
        <Text style={styles.link}>Printable CPR Guide - manual</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleOpenLink('https://www.example.com/additional-videos')}>
        <Text style={styles.link}>Additional CPR Videos</Text>
      </TouchableOpacity>

      {/* Feedback Form */}
      <Text style={styles.title}>Feedback Form:</Text>
      <TouchableOpacity onPress={handleOpenFeedbackForm}>
        <Text style={styles.link}>Provide Feedback - add link to form</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackToDashboardPress}>
        <Text style={styles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCE4EC',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF7FAA',
  },
  link: {
    fontSize: 16,
    color: '#4285F4', // Example link color
    marginBottom: 10,
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
