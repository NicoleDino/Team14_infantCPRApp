import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
            correctAnswer: 'infant'
        },
        {
            images: [
                require('../images/5.png'),
                require('../images/6.png'),
                require('../images/7.png'),
                require('../images/8.png')
            ],
            correctAnswer: 'chest compressions'
        },
        {
            images: [
                require('../images/9.png'),
                require('../images/10.png'),
                require('../images/11.png'),
                require('../images/12.png')
            ],
            correctAnswer: 'rescue breaths'
        },
        // {
        //     images: [
        //         require('../images/13.png'),
        //         require('../images/14.png'),
        //         require('../images/15.png'),
        //         require('../images/16.png')
        //     ],
        //     correctAnswer: 'family'
        // },
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

    const handleAnswer = () => {
        const currentQuestion = quizData[currentQuestionIndex];
        if (enteredAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()) {
            setScore(score + 1);
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setEnteredAnswer('');
    };

    const renderGameQuestion = () => {
        const currentQuestion = quizData[currentQuestionIndex];
        if (!currentQuestion) {
            return (
                <View style={styles.container}>
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
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <View style={styles.row}>
                        {currentQuestion.images.slice(0, 2).map((image, index) => (
                            <View key={index} style={styles.imageWrapper}>
                                <Image
                                    source={image}
                                    style={styles.image}
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
                                    style={styles.image}
                                    resizeMode="contain"
                                />
                            </View>
                        ))}
                    </View>
                </View>
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
        );
    };

    return renderGameQuestion();
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
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
        borderWidth: 2,
        borderColor: '#FF7FAA',
        borderRadius: 8,
        overflow: 'hidden', 
        backgroundColor: '#FF7FAA4D', 
    },
    image: {
        width: 160, 
        height: 160, 
    },
    answerInput: {
        height: 50,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    submitButton: {
        backgroundColor: '#FF7FAA',
        padding: 15,
        borderRadius: 8,
        width: '80%',
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
