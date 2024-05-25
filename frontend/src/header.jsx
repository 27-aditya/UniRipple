import Logo from './handshake.svg';
import User from './user.svg';

function Header() {
  return (
    <div>
      <header className=' w-full bg-cutcolor-darkgrey p-2'>  
        <div className='mx-4 flex'>
          <img src={Logo} className="w-8 h-8 mr-4 ml-2" alt="logo" />
          <h1 className='text-2xl font-bold text-gray-300 px-3'>UniVerse</h1>
          <button className="w-7 h-7 ml-auto rounded-md"><img src={User}  alt="usericon" /></button>
        </div>
      </header>
    </div>
  );
}

export default Header;