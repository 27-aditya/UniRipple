function PostForm(){
  return (
    <div className="bg-cutcolor-lightgrey p-5">
    <div className='flex border border-none p-2 bg-cutcolor-lightgrey-400 mx-4 rounded-md'>
      <form className='rounded w-full flex-grow mr-4 ml-4 pt-2 pb-2 rounded-md '>
        <input className='rounded w-full py-2 px-3 bg-gray-400 text-cutcolor-blue placeholder-cutcolor-blue rounded-md' type='text' placeholder='Post' />
      </form>
    </div>
    </div>
  );
}

export default PostForm;