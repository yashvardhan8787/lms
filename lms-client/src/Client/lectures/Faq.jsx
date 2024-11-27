import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "For how many months can I access my purchased course?",
      answer: "For 60 months",
    },
    {
      question: "Are the courses live?",
      answer:
        "No, the courses are pre-recorded and you can access them at any time.",
    },

    {
      question: "For how many months can I access my purchased course?",
      answer: "For 60 months",
    },
    {
      question: "Are the courses live?",
      answer:
        "No, the courses are pre-recorded and you can access them at any time.",
    },
    // Add more questions as needed
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div>
        <h3 className="text-xl font-semibold pb-5 pt-5">FAQ</h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-700 pb-2">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-sm font-medium">{faq.question}</h3>
                <span className="text-lg">
                  {activeIndex === index ? (
                    <FaMinus color="#800080" />
                  ) : (
                    <FaPlus color="#800080" />
                  )}
                </span>
              </div>
              {activeIndex === index && (
                <p className="mt-2 text-gray-900">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Faq;
