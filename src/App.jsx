import { Routes, Route, useLocation } from 'react-router-dom';
import {publicLinks} from './data/navbarPublicLinks';
import {adminLinks} from './data/navbarAdminLinks';

import Navbar from './components/organisms/Navbar';

// Páginas
import Home from './pages/user/Home';
import Login from './pages/auth/login';
import CreateUser from './pages/auth/create-user';
import HomeAdmin from './pages/admin/HomeAdmin';

function Layout() {
  const location = useLocation();

  // Rutas donde NO se muestra el NavbarPublic
  const hideNavbarRoutes = ['/login', '/create-user'];

  const isAdminRoute = location.pathname.startsWith('/admin');
  const shouldShowNavbarPublic = !isAdminRoute && !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {isAdminRoute ? (
        <Navbar links={adminLinks} title="Admin Naves Front"/>
      ) : (
        shouldShowNavbarPublic && <Navbar links={publicLinks}  title="Naves Front"/>
      )}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/admin/dashboard" element={<HomeAdmin />} />
          <Route path="*" element={<div>404 - Página no encontrada</div>} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return <Layout />;
}

export default App;