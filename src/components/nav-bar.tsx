import { Link } from 'react-router-dom';

const NavBar = () => {

  return (
    <nav className="bg-white">
      <div className="container mx-auto px-4">
        <div className="grid h-16 grid-cols-12 items-center space-x-6">
          <div className="col-span-2">
            <Link to="/">
              <div className='flex items-center space-x-3'>
                <img className='h-8' src="https://fakestoreapi.com/icons/logo.png" alt="Fake store" />
                <span className='font-bold'>FakeStore</span>
              </div>
            </Link>
          </div>
          <div className="col-span-7">
            <div className='grow'>
              

            </div>
          </div>
          <div className="col-span-3">
            
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;