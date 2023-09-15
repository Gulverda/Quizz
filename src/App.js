import React, { useState } from "react";
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

  const questions = [
    {
      question: "Is Coding Ninjas the best online learning platform?",
      answers: [
        { option: "For Sure!", answer: true },
        { option: "No, not at all.", answer: false },
      ],
    },
    {
      question: "Is Coding Ninjas the best learning platform?",
      answers: [
        { option: "Hard Work", answer: false },
        { option: "Smart Work", answer: true },
      ],
    },
    {
      question: "Complete the phrase: Time and ___ wait for none.",
      answers: [
        { option: "Batman", answer: false },
        { option: "Tide", answer: true },
      ],
    },
  ];

  const handleAnswerClick = (answer) => {
    const isCorrect = questions[currentQuestion].answers.find(
      (ans) => ans.option === answer
    ).answer;

    if (isCorrect && score < 3) {
      setScore(score + 1);
    }

    setQuestionsAnswered(questionsAnswered + 1);
    nextQuestion();
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
      alert("Please answer all questions before submitting.");
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0); // Reset the current question to the first question
    setScore(0); // Reset the score to 0
    setQuestionsAnswered(0); // Reset the questions answered count to 0
  };

  return (
    <QuizContainer>
      <h1>Quiz App</h1>
      <QuestionText>{questions[currentQuestion].question}</QuestionText>
      {questions[currentQuestion].answers.map((answer) => (
        <AnswerButton
          key={answer.option}
          onClick={() => handleAnswerClick(answer.option)}
          disabled={questionsAnswered >= 3} // Disable answer buttons after 3 questions answered
        >
          {answer.option}
        </AnswerButton>
      ))}
      <div>
        <span id="user-score">{score}</span>
        <span> / </span>
        <span id="total-score">{questions.length}</span>
      </div>
      <NavigationButtons>
        <RestartButton onClick={restartQuiz}>Restart</RestartButton>
        <PrevButton onClick={prevQuestion} disabled={currentQuestion === 0}>
          Previous
        </PrevButton>
        <NextButton
          onClick={nextQuestion}
          disabled={currentQuestion === questions.length - 1}
        >
          Next
        </NextButton>
        <SubmitButton onClick={submitQuiz}>
          Submit
        </SubmitButton>
      </NavigationButtons>
    </QuizContainer>
  );
}

export default App;
