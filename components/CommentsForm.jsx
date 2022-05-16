import React, {useState ,useEffect, useRef} from 'react'
import { submitComment } from '../services';

const CommentsForm = ({slug}) => {

  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

 
  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name');
    emailEl.current.value = window.localStorage.getItem('email');
  
    
  }, []);
  


  // comment buttion fn 
  const handleCommentSubmission =()=>{
    setError(false);
  
    //destructer
    const{ value: comment} = commentEl.current;
    const{ value: name} = nameEl.current;
    const{ value: email} = emailEl.current;
    const{ checked: storeData} = storeDataEl.current;

    //error handle logic
    if(!comment || !name || !email){
      setError(true);
      return;
    }

    const commentObj = {name, email , comment , slug};

    //storing data into local storage if user checked the box
    if(storeData){
  window.localStorage.setItem('name' , name);
  window.localStorage.setItem('email' , email);
    }else{
      window.localStorage.removeItem('name' , name);
      window.localStorage.removeItem('email' , email);
    }

 submitComment(commentObj).then((res) =>{
   setShowSuccessMessage(true);
   setTimeout(() =>{
     setShowSuccessMessage(false);
   },3000);
 })


  }

  return (

    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
 <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
Share your Thoughts here!
 </h3>

{/* Input comment div */}
 <div className='grid grid-cols-1 gap-4 mb-4'>
<textarea 
 ref={commentEl} 
 className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 '
 placeholder='Comment'
 name='comment'
 />
 </div>

{/* Name and Email Input div */}
 <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
   {/* name Input */}
 <input type='text' ref={nameEl}
 className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 '
 placeholder='Name'
 name='name'
 />
 {/* email input */}
 <input type='text' ref={emailEl}
 className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 '
 placeholder='Email'
 name='email'
 />
 </div>
  
  {/* error message */}
  <div className='grid grid-cols-1 gap-4 mb-4'>
     <div >
  <input type="checkbox" ref={storeDataEl} id='storeData' name='storeData' value='true' />
    
    <label className='text-gray-500 cursor-pointer ml-2' htmlFor='storeData'>Save my email and name for NextTime!</label>
     </div>
  </div>
  {error && <p className='text-xs text-red-500'>Please fill All the filed!</p>}

  <div className='mt-8'>
    <button 
    className='transition duration-500 ease hover:bg-pink-900 inline-block bg-blue-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer'
    type='button' onClick={handleCommentSubmission}>
   Post Comment
    </button>

    {showSuccessMessage && <span className='text-xl float-right font-semibold mt-3 text-green-500'>
      Thankyou for your Input! Comment submitted for review!</span>}

  </div>

    </div> 
  )
}

export default CommentsForm