
import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';

const Root = () => {
  return (
    <div className=' flex flex-col justify-center  min-h-screen'>
      <nav>
        <Header></Header>
      </nav>
      <main className=' flex-1'>
      <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Root;