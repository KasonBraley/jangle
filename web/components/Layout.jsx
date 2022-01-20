import MainContainer from './mainContainer';
import Header from './Header';
import LeftSidebar from './Sidebars/LeftSidebar';
// import RightSidebar from './Sidebars/RightSidebar';

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="container">
        <LeftSidebar />
        <MainContainer>{children}</MainContainer>
        {/* @@@ use next's path detection instead */}
        {/* {location.pathname === '/roomchat' && <RightSidebar />} */}
      </div>
    </>
  );
}

export default Layout;
