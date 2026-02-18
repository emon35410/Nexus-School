import { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Who can use this School Management Platform?",
      answer:
        "Our platform is designed for school administrators, teachers, students, and parents with role-based access control.",
    },
    {
      question: "Is the platform secure?",
      answer:
        "Yes, we use secure authentication and role-based authorization to ensure that data is protected and accessible only to authorized users.",
    },
    {
      question: "Can parents track student performance?",
      answer:
        "Absolutely. Parents can monitor attendance, exam results, assignments, and receive real-time notifications.",
    },
    {
      question: "Does it support attendance and exam management?",
      answer:
        "Yes, teachers can manage attendance, create exams, publish results, and track student academic progress easily.",
    },
    {
      question: "Is the system accessible from mobile devices?",
      answer:
        "Yes, the platform is fully responsive and works seamlessly across desktop, tablet, and mobile devices.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 mb-12">
          Find answers to common questions about our School Management Platform.
        </p>

        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="font-semibold text-gray-800">
                  {faq.question}
                </span>
                <span className="text-blue-600 text-xl">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </button>

              {activeIndex === index && (
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
