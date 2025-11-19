import React, { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { LuArrowUpRight } from "react-icons/lu";

const faqData = [
  {
    question: "How does this posture corrector work?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. It helps keep your body aligned without restricting movement.",
  },
  {
    question: "Is it suitable for all ages and body types?",
    answer:
      "Yes, the posture corrector is designed to fit different body types with adjustable straps, making it comfortable for a wide range of users.",
  },
  {
    question: "Does it really help with back pain and posture improvement?",
    answer:
      "Regular use can help reduce back pain by promoting proper spinal alignment and improving overall posture over time.",
  },
  {
    question: "Does it have smart features like vibration alerts?",
    answer:
      "Some models include vibration alerts to remind you when you slouch, helping you maintain correct posture consistently.",
  },
  {
    question: "How will I be notified when the product is back in stock?",
    answer:
      "You can opt in for email or SMS notifications and you’ll be alerted as soon as the product is available again.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className=" p-20 text-center shadow-2xl ">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked Question <span className="text-primary">(FAQ)</span>
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-10">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro. 
        Achieve proper alignment, reduce pain, and strengthen your body with ease!
      </p>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`border rounded-xl transition-all ${
              activeIndex === index
                ? "bg-[#D3F4EF] border-[#9ADFD6]"
                : "bg-white border-gray-200"
            }`}
          >
            {/* Question */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left"
            >
              <span className="font-semibold text-gray-800">
                {faq.question}
              </span>

              {activeIndex === index ? (
                <IoChevronUp size={22} className="text-gray-600" />
              ) : (
                <IoChevronDown size={22} className="text-gray-600" />
              )}
            </button>

            {/* Answer */}
            {activeIndex === index && (
              <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="mt-10">
        <button className="bg-lime-400 hover:bg-lime-500 px-6 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto transition">
          See More FAQ's
          <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">
            <LuArrowUpRight />
          </span>
        </button>
      </div>
    </section>
  );
};

export default FAQ;
