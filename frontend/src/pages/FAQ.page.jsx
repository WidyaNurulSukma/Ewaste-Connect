import React from 'react';
import Header from '../components/header/Header.component';
import Footer from '../components/footer/Footer.component';

const faqData = [
  {
    question: 'What is e-waste?',
    answer: 'E-waste refers to electronic products that are no longer useful or working and have been discarded.'
  },
  {
    question: 'Why is e-waste recycling important?',
    answer: 'Recycling e-waste helps to conserve natural resources, reduces pollution, and prevents health hazards.'
  },
  {
    question: 'How can I recycle my e-waste?',
    answer: 'You can recycle your e-waste by requesting a pickup. It works like Uber, where you request for collection and it is at no charge.'
  },
  {
    question: 'What happens to the e-waste we collect?',
    answer: 'We supply the collected e-waste to companies that use it as raw materials.'
  },
  {
    question: 'Is there a maximum number/quantity that one can request to be collected?',
    answer: 'No, you can get rid of as much e-waste as you want for as many times as you want.'
  }
];

const FAQ = () => {
  return (
    <>
      <Header />
      <div className='flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans'>
        <div className='flex-grow flex flex-col justify-center items-center bg-green-50 px-8 py-12'>
          <div className='bg-white p-10 md:p-16 lg:p-20 max-w-3xl w-full rounded-lg shadow-lg'>
            <h1 className='text-4xl md:text-5xl font-bold text-green-600 mb-6 whitespace-nowrap'>
              Frequently Asked Questions
            </h1>
            {faqData.map((item, index) => (
              <div key={index} className='faq-item mb-4 text-left'>
                <h3 className='text-2xl font-semibold mb-2 text-green-600'>
                  <span className='mr-2'>{index + 1}.</span>
                  {item.question}
                </h3>
                <p className='text-lg'>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default FAQ;
