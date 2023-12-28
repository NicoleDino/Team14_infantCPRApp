import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import OverviewTutorial from './screens/OverviewTutorial/';
import PracticeCPR from './screens/PracticeCPR/';
import MainCPR from './screens/MainCPR/';
import Results from './screens/Results';
import More from './screens/More'; // Import More
import TutorialCPR from './screens/TutorialCPR'; // Import TutorialCPR

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FF7FAA', // Darker pastel pink for the header
          },
          headerTintColor: '#FFFFFF', // White text color for the header
          headerTitleAlign: 'center', // Center the header title
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'INFANTECH: Infant CPR Training', // Change the title here
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: 'Dashboard', // Change the title here
          }}
        />
        <Stack.Screen
          name="OverviewTutorial"
          component={OverviewTutorial}
          options={{
            title: 'What is Infant CPR Training?', // Change the title here if needed
          }}
        />
        {/* New Screen for Tutorial CPR */}
        <Stack.Screen
          name="TutorialCPR"
          component={TutorialCPR}
          options={{
            title: 'Infant CPR Trainings', // Change the title here if needed
          }}
        />
        {/* New Screen for Practice CPR */}
        <Stack.Screen
          name="PracticeCPR"
          component={PracticeCPR}
          options={{
            title: 'Test Your Skills and Practice', // Change the title here if needed
          }}
        />
        {/* New Screen for Main CPR */}
        <Stack.Screen
          name="MainCPR"
          component={MainCPR}
          options={{
            title: 'Perform Infant CPR', // Change the title here if needed
          }}
        />
        {/* New Screen for Results */}
        <Stack.Screen
          name="Results"
          component={Results}
          options={{
            title: 'Your CPR Training Results', // Change the title here if needed
          }}
        />
        {/* New Screen for More */}
        <Stack.Screen
          name="More"
          component={More}
          options={{
            title: 'More Resources', // Change the title here if needed
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
