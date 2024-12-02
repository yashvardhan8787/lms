import React, { useEffect, useState } from 'react';
import './QuizSection.css';

const QuizSection = ({ quizId, lectureId, userId, courseId, onQuizPass }) => {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BASE_API_URL+`quiz/${quizId}`);
        const data = await response.json();
        if (data.success) {
          setQuiz(data.quiz);
          setAnswers(Array(data.quiz.questions.length).fill(null));
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(`Failed to load quiz`);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleSelectAnswer = (questionIndex, optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const evaluateQuiz = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BASE_API_URL+'quiz/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizId, answers }),
      });
      const data = await response.json();
      if (data.success) {
        setResult(data.result);

        // Check if the user passed
        if (data.result.scorePercentage > 33.33) {
          await fetch(import.meta.env.VITE_BASE_API_URL+'update-progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId,
              courseId,
              lectureId,
              isCompleted: true,
              progressPercentage: 100, // Mark as completed
            }),
          });
          onQuizPass(); // Notify parent about progress update
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error('Failed to evaluate quiz:', err);
      setError('Failed to evaluate quiz');
    }
  };

  if (error) return <div className="text-red-600 font-semibold">{error}</div>;

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-xl h-screen mx-auto mt-12 w-1/2">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Quiz Section</h2>
      {quiz ? (
        <div className="quiz-content h-3/4 overflow-y-scroll scrollbar-hide">
          {quiz.questions.map((question, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">{question.questionText}</h3>
              <div className="grid gap-2">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`cursor-pointer transition-all duration-300 p-3 rounded-lg border ${
                      answers[index] === optionIndex
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
                    }`}
                    onClick={() => handleSelectAnswer(index, optionIndex)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={evaluateQuiz}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg mt-6 transition-all duration-300"
          >
            Submit Quiz
          </button>
          {result && (
            <div className="mt-6 p-6 border rounded-lg bg-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Quiz Results</h3>
              <p className="text-lg">Total Questions: {result.totalQuestions}</p>
              <p className="text-lg">Correct Answers: {result.correctAnswers}</p>
              <p className="text-lg font-semibold">
                Score: <span className="text-blue-600">{result.scorePercentage}%</span>
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500 font-semibold">Loading quiz...</p>
      )}
    </div>
  );
};

export default QuizSection;
