import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddQuiz = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    thumbnailPicUrl: '',
    isVideoLecture: false,
    videoUrl: '',
    isQuiz: true,
    duration: '',
    questions: [],
    totalQuestions: 0,
    passingScore: 0,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQuestionChange = (index, e, optionIndex = null) => {
    const { name, value } = e.target;
    const updatedQuestions = [...quizData.questions];

    if (optionIndex !== null) {
      updatedQuestions[index].options[optionIndex] = value;
    } else {
      updatedQuestions[index][name] = value;
    }

    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        { questionText: '', options: ['', '', '', ''], correctAnswer: null },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const quizResponse = await axios.post(import.meta.env.VITE_BASE_API_URL+'quiz/create', {
        questions: quizData.questions,
        totalQuestions: quizData.totalQuestions,
        passingScore: quizData.passingScore,
      });

      if (quizResponse.data.success) {
        const quizId = quizResponse.data.quiz._id;

        const lectureResponse = await axios.post(import.meta.env.VITE_BASE_API_URL+`${courseId}/lecture/add`, {
          title: quizData.title,
          description: quizData.description,
          thumbnailPicUrl: quizData.thumbnailPicUrl,
          isVideoLecture: false,
          isQuiz: true,
          quizId,
          duration: quizData.duration,
        });

        if (lectureResponse.data.success) {
          setLoading(false);
          setSuccess("Quiz created successfully!");
          setTimeout(() => navigate(`/courses/${courseId}`), 1500);
        }
      }
    } catch (err) {
      setError('Failed to add quiz');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-12 border border-gray-300">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Add Quiz to Course</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-600 text-center mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="font-semibold text-gray-700">Quiz Title</label>
          <input
            type="text"
            name="title"
            value={quizData.title}
            onChange={handleChange}
            className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="font-semibold text-gray-700">Description</label>
          <textarea
            name="description"
            value={quizData.description}
            onChange={handleChange}
            className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
            required
          />
        </div>

        <div>
          <label className="font-semibold text-gray-700">Thumbnail Image URL</label>
          <input
            type="text"
            name="thumbnailPicUrl"
            value={quizData.thumbnailPicUrl}
            onChange={handleChange}
            className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="font-semibold text-gray-700">Duration (in minutes)</label>
          <input
            type="number"
            name="duration"
            value={quizData.duration}
            onChange={handleChange}
            className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="font-semibold text-gray-700">Total Questions</label>
          <input
            type="number"
            name="totalQuestions"
            value={quizData.totalQuestions}
            onChange={handleChange}
            className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="font-semibold text-gray-700">Passing Score</label>
          <input
            type="number"
            name="passingScore"
            value={quizData.passingScore}
            onChange={handleChange}
            className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="font-semibold text-gray-700">Questions</label>
          {quizData.questions.map((question, index) => (
            <div key={index} className="border-b pb-4 mb-4">
              <label className="block font-semibold text-gray-600">Question {index + 1}</label>
              <input
                type="text"
                name="questionText"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(index, e)}
                className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter question"
                required
              />

              <div className="grid grid-cols-1 gap-2 mt-2">
                {question.options.map((option, i) => (
                  <div key={i} className="flex items-center">
                    <label className="mr-2 text-gray-700 font-semibold">Option {i + 1}:</label>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleQuestionChange(index, e, i)}
                      className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      placeholder={`Option ${i + 1}`}
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <label className="font-semibold text-gray-700">Correct Option (Number)</label>
                <input
                  type="number"
                  name="correctAnswer"
                  value={question.correctAnswer || ''}
                  onChange={(e) => handleQuestionChange(index, e)}
                  className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter correct option (e.g., 1)"
                  required
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="text-blue-500 font-semibold hover:text-blue-600 transition-all duration-150 mt-2"
          >
            + Add New Question
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Quiz for Lecture'}
        </button>
      </form>
    </div>
  );
};

export default AddQuiz;
