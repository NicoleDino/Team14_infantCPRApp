// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import DashboardScreen from "./screens/DashboardScreen";
import OverviewTutorial from "./screens/OverviewTutorial";
//import PracticeCPR from "./screens/PracticeCPR";
import MainCPR from "./screens/MainCPR";
import Results from "./screens/Results";
import More from "./screens/More";
import TutorialCPR from "./screens/TutorialCPR";
import Pre_CPR from "./screens/Pre_CPR";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FF7FAA",
          },
          headerTintColor: "#FFFFFF",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "INFANTECH: Infant CPR Training",
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: "Dashboard",
          }}
        />
        <Stack.Screen
          name="OverviewTutorial"
          component={OverviewTutorial}
          options={{
            title: "What is Infant CPR Training?",
            headerLeft: null
          }}
        />
        <Stack.Screen
          name="TutorialCPR"
          component={TutorialCPR}
          options={{
            title: "Infant CPR Tutorials",
            headerLeft: null
          }}
        />
        {/*
        <Stack.Screen
          name="PracticeCPR"
          component={PracticeCPR}
          options={{
            title: "Test Your Skills and Practice",
          }}
        />*/}
        <Stack.Screen
          name="Pre_CPR"
          component={Pre_CPR}
          options={{
            title: "Prepare for Infant CPR Training",
            headerLeft: null
          }}
        />
        <Stack.Screen
          name="MainCPR"
          component={MainCPR}
          options={{
            title: "Perform Infant CPR",
            headerLeft: null
          }}
        />
        <Stack.Screen
          name="Results"
          component={Results}
          options={{
            title: "Your CPR Training Results",
            headerLeft: null
          }}
        />
        <Stack.Screen
          name="More"
          component={More}
          options={{
            title: "More Resources",
            headerLeft: null
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
