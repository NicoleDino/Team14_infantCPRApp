import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import DashboardScreen from "./screens/DashboardScreen";
import OverviewTutorial from "./screens/OverviewTutorial";
import MainCPR from "./screens/MainCPR";
import PracticeCPR from "./screens/PracticeCPR";
import Pre_PracCPR from "./screens/Pre_PracCPR";
import Results from "./screens/Results";
import More from "./screens/More";
import TutorialCPR from "./screens/TutorialCPR";
import Pre_CPR from "./screens/Pre_CPR";
import Countdown from "./screens/Countdown";
import QuizScreen from "./screens/QuizScreen";
import PreQuizScreen from "./screens/PreQuizScreen";
import FourPicsGame from "./screens/FourPicsGame";
import PreFourPics from "./screens/PreFourPics";

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
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="TutorialCPR"
          component={TutorialCPR}
          options={{
            title: "Infant CPR Tutorials",
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Pre_PracCPR"
          component={Pre_PracCPR}
          options={{
            title: "Practice Infant CPR Training",
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="PracticeCPR"
          component={PracticeCPR}
          options={{
            title: "Perform Infant CPR Training: Practice",
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Pre_CPR"
          component={Pre_CPR}
          options={{
            title: "Prepare for Infant CPR Training",
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="MainCPR"
          component={MainCPR}
          options={{
            title: "Perform Infant CPR",
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Results"
          component={Results}
          options={{
            title: "Your CPR Training Results",
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="More"
          component={More}
          options={{
            title: "About Us and More Resources",
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Countdown"
          component={Countdown}
          options={{
            title: "Be Ready for Training",
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{
            title: "Check your Understanding!",
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="PreQuiz"
          component={PreQuizScreen}
          options={{
            title: "Quiz Mechanics",
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="PreFourPics"
          component={PreFourPics}
          options={{
            title: "How to Play?",
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="FourPicsGame"
          component={FourPicsGame}
          options={{
            title: "Let's Play 4-Pics 1-Word!",
            headerLeft: null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
