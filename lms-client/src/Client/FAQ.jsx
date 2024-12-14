import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "For how many months can I access my purchased course?",
      answer: "For 60 months",
    },
    {
      question: "Are the courses live?",
      answer: "No, the courses are pre-recorded and you can access them at any time.",
    },
    {
      question: "For how many months can I access my purchased course?",
      answer: "For 60 months",
    },
    {
      question: "Are the courses live?",
      answer: "No, the courses are pre-recorded and you can access them at any time.",
    },
    {
      question: "For how many months can I access my purchased course?",
      answer: "For 60 months",
    },
    {
      question: "Are the courses live?",
      answer: "No, the courses are pre-recorded and you can access them at any time.",
    },
    {
      question: "For how many months can I access my purchased course?",
      answer: "For 60 months",
    },
    {
      question: "Are the courses live?",
      answer: "No, the courses are pre-recorded and you can access them at any time.",
    },
    // Add more questions as needed
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-16 min-h-screen overflow-scroll">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-sm sm:text-4xl md:text-5xl font-bold mb-8 text-center text-black">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300 pb-4">
              <div 
                className="flex justify-between items-center cursor-pointer py-3" 
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-sm sm:text-xl md:text-2xl font-medium text-gray-800">{faq.question}</h3>
                <span className="text-sm sm:text-xl md:text-2xl">
                  {activeIndex === index ? <FaMinus color='#800080' /> : <FaPlus color='#800080' />}
                </span>
              </div>
              {activeIndex === index && (
                <p className="mt-2 text-gray-700 text-base sm:text-lg md:text-xl font-light">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
