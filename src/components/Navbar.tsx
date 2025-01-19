import { Link } from 'react-router-dom';

const NavBar = () => {

  return (
    <nav className="bg-white">
      <div className="container mx-auto px-4">
        <Link to="/">
          <div className='flex items-center space-x-3'>
            <img className='h-8' src="https://fakestoreapi.com/icons/logo.png" alt="Fake store" />
            <span className='font-bold'>FakeStore</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;