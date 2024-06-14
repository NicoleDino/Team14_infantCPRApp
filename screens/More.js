// More.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert, Image, FlatList } from 'react-native';

function More({ navigation }) {
  const handleBackToDashboardPress = () => {
    Alert.alert(
      'Back to Dashboard',
      'Do you want to go back?',
      [
        {
          text: 'No',
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => navigation.navigate('Dashboard')
        }
      ],
      { cancelable: false }
    );
  };

  const handleOpenLink = (url) => {
    Linking.openURL(url);
  };

  const handleOpenFeedbackForm = () => {
    const feedbackFormUrl = 'https://forms.gle/1P6wD72uCGcoTZUp8';
    Linking.openURL(feedbackFormUrl);
  };

  const content = [
    { key: 'aboutTitle', type: 'title', text: 'About Us' },
    { key: 'groupImage', type: 'image', src: require("../assets/groupie.png") },
    { key: 'aboutText', type: 'text', text: 'InfanTech was founded to revolutionize infant CPR training. Our team consists of five dedicated Computer Engineers: Nicole Rosae Diño, Emmanuel Pascua, Azzelle Leira Rodil, and Ervin Yano. Each member brings unique expertise in Systems Administration, Technopreneurship, and Railway Engineering., who are proud students of the Technological Institute of the Philippines, Quezon City.' },
    { key: 'separator1', type: 'separator' },
    { key: 'resourcesTitle', type: 'title', text: 'Additional Resources:' },
    { key: 'resource1', type: 'link', text: '🍼 CPR for babies under 12 months: in pictures', url: 'https://raisingchildren.net.au/newborns/safety/cpr/cpr-for-babies' },
    { key: 'resource2', type: 'link', text: '👶 Child & Baby CPR - Red Cross', url: 'https://www.redcross.org/take-a-class/cpr/performing-cpr/child-baby-cpr' },
    { key: 'resource3', type: 'link', text: '🎥 Additional Infant CPR Video Tutorial/Training', url: 'https://www.youtube.com/watch?v=tK-gwp4dPmw' },
    { key: 'separator2', type: 'separator' },
    { key: 'feedbackTitle', type: 'title', text: 'Feedback Form:' },
    { key: 'feedbackLink', type: 'link', text: '✉️ Provide your App Feedback', url: 'https://forms.gle/1P6wD72uCGcoTZUp8' },
    { key: 'backButton', type: 'button', text: 'Back to Dashboard' },
  ];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'title':
        return <Text style={styles.title}>{item.text}</Text>;
      case 'image':
        return <Image source={item.src} style={styles.groupImage} />;
      case 'text':
        return <Text style={styles.aboutText}>{item.text}</Text>;
      case 'separator':
        return <View style={styles.separator} />;
      case 'link':
        return (
          <TouchableOpacity onPress={() => handleOpenLink(item.url)}>
            <Text style={styles.link}>{item.text}</Text>
          </TouchableOpacity>
        );
      case 'button':
        return (
          <TouchableOpacity style={styles.backButton} onPress={handleBackToDashboardPress}>
            <Text style={styles.backButtonText}>{item.text}</Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={content}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FCE4EC',
  },
  aboutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    color: '#FF7FAA',
    textAlign: 'center',
  },
  groupImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 15,
  },
  aboutText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
    textAlign: 'justify',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 23,
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
