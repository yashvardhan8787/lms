import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddQuiz = () => {
  const { courseId } = useParams(); // Get the courseId from URL params
  const navigate = useNavigate(); // Hook to redirect after adding the quiz

  // State for quiz form data
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    thumbnailPicUrl: '',
    isVideoLecture: false,
    videoUrl: '',
    isQuiz: true,
    duration: '',
    questions: [], // Array of quiz questions
    totalQuestions: 0,
    passingScore: 0,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] =useState("");
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle questions input change with an optionIndex to specify which option is being changed
  const handleQuestionChange = (index, e, optionIndex = null) => {
    const { name, value } = e.target;
    const updatedQuestions = [...quizData.questions];

    if (optionIndex !== null) {
      // Update specific option in the options array
      updatedQuestions[index].options[optionIndex] = value;
    } else if (name === "correctAnswer") {
      // Update correctAnswer as a number
      updatedQuestions[index][name] = value;
    } else {
      // Update question text or other fields
      updatedQuestions[index][name] = value;
    }

    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  // Add a new question
  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        { questionText: '', options: ['', '', '', ''], correctAnswer: null },
      ],
    });
  };

  // Handle form submission (create quiz and then add lecture)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Create the quiz using the createQuiz API
      const quizResponse = await axios.post('http://localhost:8080/api/v1/quiz/create', {
        questions: quizData.questions,
        totalQuestions: quizData.totalQuestions,
        passingScore: quizData.passingScore,
      });

      if (quizResponse.data.success) {
        const quizId = quizResponse.data.quiz._id;

       // Step 2: Create the lecture for the quiz using the addLecture API
        const lectureResponse = await axios.post(`http://localhost:8080/api/v1/${courseId}/lecture/add`, {
          title: quizData.title,
          description: quizData.description,
          thumbnailPicUrl: quizData.thumbnailPicUrl,
          isVideoLecture: false, // Since it's a quiz lecture, this will be false
          isQuiz: true,
          quizId,
          duration: quizData.duration,
        });

        if (lectureResponse.data.success) {
          setLoading(false);
          setSuccess("Quiz created successfully ")
        }
      }
    }catch (err) {
      console.error(err);
      setError('Failed to add quiz');
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Quiz to Course</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <p className="text-center">Loading...</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="font-semibold mb-2">Quiz Title</label>
          <input
            type="text"
            name="title"
            value={quizData.title}
            onChange={handleChange}
            className="p-2 w-full border rounded-md"
            required
          />
        </div>

        <div>
          <label className="font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={quizData.description}
            onChange={handleChange}
            className="p-2 w-full border rounded-md"
            required
          />
        </div>

        <div>
          <label className="font-semibold mb-2">Thumbnail Image URL</label>
          <input
            type="text"
            name="thumbnailPicUrl"
            value={quizData.thumbnailPicUrl}
            onChange={handleChange}
            className="p-2 w-full border rounded-md"
            required
          />
        </div>

        <div>
          <label className="font-semibold mb-2">Duration (in minutes)</label>
          <input
            type="number"
            name="duration"
            value={quizData.duration}
            onChange={handleChange}
            className="p-2 w-full border rounded-md"
            required
          />
        </div>

        <div>
          <label className="font-semibold mb-2">Total Questions</label>
          <input
            type="number"
            name="totalQuestions"
            value={quizData.totalQuestions}
            onChange={handleChange}
            className="p-2 w-full border rounded-md"
            required
          />
        </div>

        <div>
          <label className="font-semibold mb-2">Passing Score</label>
          <input
            type="number"
            name="passingScore"
            value={quizData.passingScore}
            onChange={handleChange}
            className="p-2 w-full border rounded-md"
            required
          />
        </div>

        <div>
          <label className="font-semibold mb-2">Questions</label>
          {quizData.questions.map((question, index) => (
            <div key={index} className="border-b pb-4 mb-4">
              <div>
                <label className="font-semibold">Question {index + 1}</label>
                <input
                  type="text"
                  name="questionText"
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(index, e)}
                  className="p-2 w-full border rounded-md"
                  placeholder="Enter question"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-2 mt-4">
                {question.options.map((option, i) => (
                  <div key={i} className="flex items-center">
                    <label className="mr-2 font-semibold">Option {i + 1}:</label>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleQuestionChange(index, e, i)}
                      className="p-2 border rounded-md w-full"
                      placeholder={`Option ${i + 1}`}
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <label className="font-semibold">Correct Option (Number)</label>
                <input
                  type="number"
                  name="correctAnswer"
                  value={question.correctAnswer || ''}
                  onChange={(e) => handleQuestionChange(index, e)}
                  className="p-2 w-full border rounded-md"
                  placeholder="Enter correct option (e.g., 1)"
                  required
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="text-blue-500 mt-2"
          >
            + Add New Question
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
        >
          {loading ? 'Creating...' : 'Create Quiz for Lecture'}
        </button>
      </form>
    </div>
  );
};

export default AddQuiz;
