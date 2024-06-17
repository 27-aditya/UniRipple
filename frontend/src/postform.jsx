function PostForm({onClick}){
  return (
    <div className="bg-cutcolor-lightgrey p-5">
    <div className='flex border border-none p-2 bg-cutcolor-lightgrey-400 mx-4 rounded-md'>
      <button className="bg-color-teal-900" onClick={onClick}>Post Something</button>
    </div>
    </div>
  );
}

export default PostForm;