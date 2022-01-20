import MainContainer from './mainContainer';
import Header from './Header';
import LeftSidebar from './Sidebars/LeftSidebar';
import RightSidebar from './Sidebars/RightSidebar';
import { Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="container">
        <LeftSidebar />
        <MainContainer>
          <Outlet />
        </MainContainer>
        {location.pathname === '/roomchat' && <RightSidebar />}
      </div>
    </>
  );
}

export default Layout;
