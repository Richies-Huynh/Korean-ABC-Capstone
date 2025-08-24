import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const questions = [
  {
    question: 'Where should you put the metal bottom of a Pringles can in Korea?',
    options: ['Recycling bin', 'Trash', 'Compost'],
    answer: 'Trash',
    explanation: 'In Korea, the metal bottom of a Pringles can should be thrown in the trash.'
  },
  {
    question: 'Can you recycle a clean paper to-go box in the USA?',
    options: ['Yes', 'No'],
    answer: 'Yes',
    explanation: 'If the to-go box is clean and made of paper or cardboard, recycle it in the USA.'
  },
  {
    question: 'How should you dispose of a plastic coat hanger in Korea?',
    options: ['Recycling bin', 'Trash', 'Return to dry cleaner'],
    answer: 'Trash',
    explanation: 'Plastic hangers are difficult to recycle in Korea, so throw them in the trash.'
  },
  {
    question: 'What should you do with the metal parts of an umbrella in the USA?',
    options: ['Trash', 'Scrap metal facility', 'Recycling bin'],
    answer: 'Scrap metal facility',
    explanation: 'Recycle the metal at a scrap metal facility in the USA.'
  },
  {
    question: 'Can you recycle a soiled to-go box in Korea?',
    options: ['Yes', 'No'],
    answer: 'No',
    explanation: 'If the to-go box is soiled with food or has a plastic coating, throw it in the trash in Korea.'
  },
];

function getRandomQuestion(prevIndex: number) {
  let idx;
  do {
    idx = Math.floor(Math.random() * questions.length);
  } while (idx === prevIndex && questions.length > 1);
  return idx;
}

export default function QuizzesScreen() {
  const [questionIndex, setQuestionIndex] = useState(() => getRandomQuestion(-1));
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const current = questions[questionIndex];

  const handleSelect = (option: string) => {
    setSelected(option);
    setShowResult(true);
  };

  const handleNext = () => {
    setQuestionIndex(getRandomQuestion(questionIndex));
    setSelected(null);
    setShowResult(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recycling Quiz</Text>
      <Text style={styles.question}>{current.question}</Text>
      {current.options.map((option: string) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.option,
            selected === option && (option === current.answer ? styles.correct : styles.incorrect)
          ]}
          onPress={() => !showResult && handleSelect(option)}
          disabled={showResult}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
      {showResult && (
        <View style={styles.resultContainer}>
          <Text style={selected === current.answer ? styles.correctText : styles.incorrectText}>
            {selected === current.answer ? 'Correct!' : 'Incorrect!'}
          </Text>
          <Text style={styles.explanation}>{current.explanation}</Text>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next Question</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007AFF',
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    width: 250,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
  },
  correct: {
    backgroundColor: '#d4edda',
    borderColor: '#298D34',
  },
  incorrect: {
    backgroundColor: '#f8d7da',
    borderColor: '#dc3545',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  correctText: {
    color: '#298D34',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  incorrectText: {
    color: '#dc3545',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  explanation: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#298D34',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 