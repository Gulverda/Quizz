import React, { useState, useEffect } from "react";
import styled from "styled-components";

const QuizContainer = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
  margin-top: 20px;
`;

const QuestionText = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
`;

const AnswerButton = styled.button`
  font-size: 18px;
  margin: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #0074cc;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const NavigationButtons = styled.div`
  margin-top: 20px;
`;

const RestartButton = styled.button`
  font-size: 18px;
  margin: 10px;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const PrevButton = styled.button`
  font-size: 18px;
  margin: 10px;
  padding: 10px 20px;
  background-color: #f36f6f;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #d9534f;
  }
`;

const NextButton = styled.button`
  font-size: 18px;
  margin: 10px;
  padding: 10px 20px;
  background-color: #5bc0de;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #46b8da;
  }
`;

const SubmitButton = styled.button`
  font-size: 18px;
  margin: 10px;
  padding: 10px 20px;
  background-color: #5cb85c;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #449d44;
  }
`;

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define the fetchRandomQuizQuestions function outside of useEffect
  async function fetchRandomQuizQuestions() {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=12&category=18&difficulty=medium&type=multiple');
      if (!response.ok) {
        throw new Error('Failed to fetch quiz questions');
      }
      const data = await response.json();
      setQuestions(data.results); // Corrected to use data.results
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    // Call fetchRandomQuizQuestions within useEffect
    fetchRandomQuizQuestions();
  }, []);

  const handleAnswerClick = (answer) => {
    // Check if questions[currentQuestion] is defined
    if (questions[currentQuestion]) {
      const isCorrect =
        questions[currentQuestion].correct_answer === answer;

      if (isCorrect) {
        setScore(score + 1);
      }

      setQuestionsAnswered(questionsAnswered + 1);
      nextQuestion();
    }
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = () => {
    if (score === questions.length) {
      // Quiz submitted
      alert("Congratulations on submitting the Quiz!");
    } else {
      alert("Nice try, Better luck next time");
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0); // Reset the current question to the first question
    setScore(0); // Reset the score to 0
    setQuestionsAnswered(0); // Reset the questions answered count to 0
    setLoading(true);
    fetchRandomQuizQuestions(); // Fetch new random quiz questions
  };

  return (
    <QuizContainer>
      <h1>Quiz App</h1>
      {loading ? (
        <p>Loading quiz questions...</p>
      ) : questions.length > 0 ? (
        <>
          <QuestionText>
            {questions[currentQuestion].question}
          </QuestionText>
          {shuffleArray([
            ...questions[currentQuestion].incorrect_answers,
            questions[currentQuestion].correct_answer,
          ]).map((answer) => (
            <AnswerButton
              key={answer}
              onClick={() => handleAnswerClick(answer)}
              disabled={questionsAnswered >= questions.length}
            >
              {answer}
            </AnswerButton>
          ))}
        </>
      ) : (
        <p>No quiz questions available.</p>
      )}
      <div>
        <span id="user-score">{score}</span>
        <span> / </span>
        <span id="total-score">{questions.length}</span>
      </div>
      <NavigationButtons>
        <RestartButton onClick={restartQuiz}>Restart</RestartButton>
        <PrevButton
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
        >
          Previous
        </PrevButton>
        <NextButton
          onClick={() => {
            nextQuestion();
            fetchRandomQuizQuestions(); // Fetch new questions when moving to the next question
          }}
          disabled={currentQuestion === questions.length - 1}
        >
          Next
        </NextButton>
        <SubmitButton onClick={submitQuiz}>Submit</SubmitButton>
      </NavigationButtons>
    </QuizContainer>
  );
}

export default App;