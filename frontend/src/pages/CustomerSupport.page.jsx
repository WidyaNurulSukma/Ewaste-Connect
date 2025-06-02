import { useState } from 'react';
import supportService from '../services/support.service';
import { useToast } from '@chakra-ui/react';
import Footer from '../components/footer/Footer.component';
import AuthHeader from '../components/header/AuthHeader.component';
import Header from '../components/header/Header.component';
import { useAuth } from '../hooks/auth';

const CustomerSupport = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [textarea, setTextarea] = useState('');
  const toast = useToast();
  const { getUser } = useAuth();
  const user = JSON.parse(getUser());

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { name, email, issue: textarea };
    const resp = await supportService.createSupportTicket(payload);
    console.log(resp);

    if (resp.status === 201) {
      return toast({
        title: 'Support Ticket Created',
        description: 'We have received your support request',
        status: 'success',
        duration: 9000,
        isClosable: true
      });
    }
    console.log(payload);
  };

  return (
    <>
      <div>
        {user ? <AuthHeader /> : <Header />}
        <div className='flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans'>
          <div className='flex-grow flex flex-col justify-center items-center bg-green-50 px-8 py-12'>
            <div className='bg-white p-10 md:p-16 lg:p-20 max-w-3xl w-full rounded-lg shadow-lg text-center'>
              <h1 className='text-5xl md:text-6xl font-bold text-green-600 mb-6'>
                Customer Support Ticket
              </h1>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='text-left'>
                  <label className='block text-sm font-medium text-gray-700'>Enter your name:</label>
                  <input
                    type='text' name='username' value={name} onChange={(e) => setName(e.target.value)}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
                  />
                </div>
                <div className='text-left'>
                  <label className='block text-sm font-medium text-gray-700'>Enter your email address:</label>
                  <input
                    type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
                  />
                </div>
                <div className='text-left'>
                  <label className='block text-sm font-medium text-gray-700'>Describe your issue:</label>
                  <textarea
                    value={textarea} onChange={(e) => {
                      setTextarea(e.target.value);
                    }}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
                  />
                </div>
                <div>
                  <button type='submit' className='w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomerSupport;

// import { useState } from 'react';
// import supportService from '../services/support.service';
// import { useToast } from '@chakra-ui/react';

// const CustomerSupport = () => {
//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [textarea, setTextarea] = useState('');
//   const toast = useToast();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const payload = { name, email, issue: textarea };
//     const resp = await supportService.createSupportTicket(payload);
//     console.log(resp);

//     if (resp.status === 201) {
//       return toast({
//         title: 'Support Ticket Created',
//         description: 'We have received your support request',
//         status: 'success',
//         duration: 9000,
//         isClosable: true
//       });
//     }
//     console.log(payload);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label> Enter your name:
//           <input
//             type='text' name='username' value={name} onChange={(e) => setName(e.target.value)}
//           />
//         </label>
//       </div>
//       <div>
//         <label> Enter your email address:
//           <input
//             type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)}
//           />
//         </label>
//       </div>
//       <div>
//         <textarea
//           value={textarea} onChange={(e) => {
//             setTextarea(e.target.value);
//           }}
//         />
//       </div>
//       <div><button>Submit</button></div>
//     </form>
//   );
// };

// export default CustomerSupport;
