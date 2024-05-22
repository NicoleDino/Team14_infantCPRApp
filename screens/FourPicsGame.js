import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons

const FourPicsGame = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [enteredAnswer, setEnteredAnswer] = useState('');
    const navigation = useNavigation();

    const quizData = [
        {
            images: [
                require('../images/1.png'),
                require('../images/2.png'),
                require('../images/3.png'),
                require('../images/4.png')
            ],
            correctAnswers: ['infant', 'baby']
        },
        {
            images: [
                require('../images/5.png'),
                require('../images/6.png'),
                require('../images/7.png'),
                require('../images/8.png')
            ],
            correctAnswers: ['chest compressions', 'compressions']
        },
        {
            images: [
                require('../images/9.png'),
                require('../images/10.png'),
                require('../images/11.png'),
                require('../images/12.png')
            ],
            correctAnswers: ['ventilations', 'rescue breaths']
        },
        {
            images: [
                require('../images/13.png'),
                require('../images/14.png'),
                require('../images/15.png'),
                require('../images/16.png')
            ],
            correctAnswers: ['infant cpr training']
        },
        {
            images: [
                require('../images/17.png'),
                require('../images/18.png'),
                require('../images/19.png'),
                require('../images/20.png')
            ],
            correctAnswers: ['infant mannequin', 'infant manikin']
        },
        {
            images: [
                require('../images/21.png'),
                require('../images/22.png'),
                require('../images/23.png'),
                require('../images/24.png')
            ],
            correctAnswers: ['emergency responders', 'response teams']
        },
        {
            images: [
                require('../images/25.png'),
                require('../images/26.png'),
                require('../images/27.png'),
                require('../images/28.png')
            ],
            correctAnswers: ['two thumb technique']
        },
        {
            images: [
                require('../images/29.png'),
                require('../images/30.png'),
                require('../images/31.png'),
                require('../images/32.png')
            ],
            correctAnswers: ['two finger technique']
        },
    ];    

    const handleBackToDashboardPress = () => {
        Alert.alert(
            'Back to Dashboard',
            'Do you wish to proceed?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Proceed',
                    onPress: () => navigation.navigate('Dashboard')
                }
            ],
            { cancelable: false }
        );
    };

    const handleQuitGame = () => {
        Alert.alert(
            'Quit Game',
            'Are you sure you want to quit the game?',
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

    const handleAnswer = () => {
        const currentQuestion = quizData[currentQuestionIndex];
        let isCorrect = false;
        if (currentQuestion.correctAnswers) {
            isCorrect = currentQuestion.correctAnswers.some(answer =>
                enteredAnswer.toLowerCase() === answer.toLowerCase()
            );
        } else if (typeof currentQuestion.correctAnswers === 'string') {
            isCorrect = enteredAnswer.toLowerCase() === currentQuestion.correctAnswers.toLowerCase();
        }
        if (isCorrect) {
            setScore(score + 1);
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setEnteredAnswer('');
    };
    
    const renderGameQuestion = () => {
        const imageSize = 180;
        const currentQuestion = quizData[currentQuestionIndex];
        if (!currentQuestion) {
            return (
                <ScrollView contentContainerStyle={styles.container}>
                    <Image
                        source={require('../images/fourpicsgame.png')}
                        style={styles.resultImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.resultText}>Congratulations! The game's done!</Text>
                    <Text style={styles.resultText}>Here's your score: {score}/{quizData.length}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.backButton} onPress={handleBackToDashboardPress}>
                            <Text style={styles.backButtonText}>Back to Dashboard</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            );
        }
        const questionNumber = currentQuestionIndex + 1;
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleQuitGame}>
                            <FontAwesome name="window-close" size={40} color="#FF7FAA4D" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.questionNumber}>Picture Set {questionNumber}</Text>
                    <View style={styles.imageContainer}>
                        <View style={styles.row}>
                            {currentQuestion.images.slice(0, 2).map((image, index) => (
                                <View key={index} style={styles.imageWrapper}>
                                    <Image
                                        source={image}
                                        style={[styles.image, { width: imageSize, height: imageSize }]}
                                        resizeMode="contain"
                                    />
                                </View>
                            ))}
                        </View>
                        <View style={styles.row}>
                            {currentQuestion.images.slice(2, 4).map((image, index) => (
                                <View key={index} style={styles.imageWrapper}>
                                    <Image
                                        source={image}
                                        style={[styles.image, { width: imageSize, height: imageSize }]}
                                        resizeMode="contain"
                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.answerInput}
                            onChangeText={(text) => setEnteredAnswer(text)}
                            placeholder="Your answer is..."
                            value={enteredAnswer}
                        />
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleAnswer}
                        >
                            <Text style={styles.submitButtonText}>Submit Answer</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    };
    
    return renderGameQuestion();
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
    },
    backButton: {
        backgroundColor: "#FF7FAA",
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        marginHorizontal: 10,
    },
    backButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    questionNumber: {
        color: "#FF7FAA",
        padding: 15,
        marginHorizontal: 10,
        fontSize: 25,
        fontWeight: 'bold'
    },
    imageContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    imageWrapper: {
        borderWidth: 4,
        borderColor: '#FF7FAA',
        borderRadius: 8,
        overflow: 'hidden', 
        backgroundColor: '#FF7FAA4D', 
        margin: 3
    },
    image: {
        width: 180, 
        height: 180, 
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    answerInput: {
        height: 50,
        width: 220,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    submitButton: {
        backgroundColor: '#FF7FAA',
        padding: 14,
        borderRadius: 8,
        marginLeft: 10,
        marginBottom: 20
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    resultText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    resultImage: {
        width: 280, 
        height: 280, 
        marginBottom: 20,
        borderRadius: 20
    }
});

export default FourPicsGame;