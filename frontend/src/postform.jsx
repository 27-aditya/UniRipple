function PostForm(){
  return (
    <div className="bg-gray-900 p-5">
    <div className='flex border border-none p-2 bg-cyan-400 mx-4 rounded-md'>
      <form className='rounded w-full flex-grow mr-4 ml-4 pt-2 pb-2 rounded-md '>
        <input className='rounded w-full py-2 px-3 text-teal-700 rounded-md bg-gray-400' type='text' placeholder='Post' />
      </form>
    </div>
    </div>
  );
}

export default PostForm;