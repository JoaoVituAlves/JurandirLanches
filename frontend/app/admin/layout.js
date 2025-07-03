'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const [usuarioNome, setUsuarioNome] = useState('');
  const router = useRouter();

  useEffect(() => {
    const nome = localStorage.getItem('usuarioNome');
    if (nome) {
      setUsuarioNome(nome);
    }
  }, []);

  function logout() {
    localStorage.removeItem('usuarioNome');
    router.push('/login');
  }

  return (
    <>
      <div id="wrapper">

        <ul className="navbar-nav sidebar" id="accordionSidebar">

          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/admin">
            <div className="sidebar-brand-icon">
              <i className="fas fa-hamburger"></i>
            </div>
            <div className="sidebar-brand-text mx-3">Jurandir Lanches </div>
          </a>

          <hr className="sidebar-divider my-0" />

          <li className="nav-item active">
            <a className="nav-link" href="/admin">
              <i className="fas fa-home"></i>
              <span>Início</span>
            </a>
          </li>

          <hr className="sidebar-divider" />

          <div className="sidebar-heading">Menu</div>

          <li className="nav-item">
            <a className="nav-link" href="/admin/usuarios">
              <i className="fas fa-user"></i>
              <span>Usuários</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/admin/pedidos">
              <i className="fas fa-utensils"></i>
              <span>Pedidos</span>
            </a>
          </li>

        </ul>

        <div id="content-wrapper" className="d-flex flex-column">

          <div id="content">

            <nav className="navbar topbar">

              <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" aria-label="Toggle sidebar">
                <i className="fa fa-bars"></i>
              </button>

              <ul className="navbar-nav ml-auto">

                <div className="topbar-divider d-none d-sm-block"></div>

                <li className="nav-item dropdown no-arrow">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="mr-2 d-none d-lg-inline user-name">
                      {usuarioNome || "Jurandir"}
                    </span>
                    <img
                      className="img-profile rounded-circle"
                      src="/avatar.png"
                      alt="Avatar"
                    />
                  </a>

                  <div
                    className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="userDropdown"
                  >
                    <div className="dropdown-divider"></div>
                    <button
                      className="dropdown-item logout-btn"
                      type="button"
                      onClick={logout}
                    >
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-muted"></i>
                      Logout
                    </button>
                  </div>
                </li>

              </ul>

            </nav>

            <main className="container-fluid content-main">
              {children}
            </main>

          </div>

          <footer className="sticky-footer">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; Jurandir Lanches 2023</span>
              </div>
            </div>
          </footer>

        </div>

      </div>

      <a className="scroll-to-top rounded" href="#page-top" aria-label="Scroll to top">
        <i className="fas fa-angle-up"></i>
      </a>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

        * {
          box-sizing: border-box;
        }

        body, html, #wrapper, #content-wrapper, #content {
          margin: 0;
          padding: 0;
          height: 100%;
          font-family: 'Montserrat', sans-serif;
          background: #fff;
          color: #444;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        #wrapper {
          display: flex;
          min-height: 100vh;
        }

        /* Sidebar */
        .sidebar {
          background: #c62828;
          width: 240px;
          display: flex;
          flex-direction: column;
          padding-top: 1.5rem;
          color: #fff;
          box-shadow: 3px 0 12px rgba(198, 40, 40, 0.4);
          position: fixed;
          height: 100vh;
          overflow-y: auto;
          z-index: 1030;
          transition: width 0.3s ease;
        }

        .sidebar:hover {
          width: 260px;
        }

        .sidebar .sidebar-brand {
          font-weight: 700;
          font-size: 1.6rem;
          text-align: center;
          padding: 1rem 0;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          user-select: none;
        }

        .sidebar .sidebar-brand-icon {
          font-size: 2rem;
          transform: rotate(-15deg);
          color: #fff;
        }

        .sidebar-divider {
          border-top: 1px solid rgba(255,255,255,0.3);
          margin: 0.75rem 0;
        }

        .sidebar-heading {
          padding: 0 1.25rem;
          font-weight: 600;
          font-size: 0.85rem;
          text-transform: uppercase;
          color: #f8bbd0;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          letter-spacing: 1px;
        }

        .nav-item {
          list-style: none;
          margin: 0.2rem 0;
        }

        .nav-link {
          color: #fce4ec;
          display: flex;
          align-items: center;
          padding: 0.8rem 1.5rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 8px;
          transition: background-color 0.3s ease, color 0.3s ease;
          gap: 1rem;
          font-size: 1rem;
        }
        .nav-link:hover,
        .nav-item.active > .nav-link {
          background: #ef9a9a;
          color: #6a1b1b;
          box-shadow: 0 3px 10px rgba(239,154,154,0.5);
        }

        .nav-link i {
          font-size: 1.3rem;
          color: #ffcdd2;
          transition: color 0.3s ease;
        }

        .nav-link:hover i,
        .nav-item.active > .nav-link i {
          color: #6a1b1b;
        }

        /* Content wrapper */
        #content-wrapper {
          margin-left: 240px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: #fafafa;
          box-shadow: inset 0 0 25px #ffebee;
          transition: margin-left 0.3s ease;
        }

        /* Topbar */
        .navbar.topbar {
          background: #fff;
          padding: 0.7rem 1.5rem;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          color: #555;
          position: sticky;
          top: 0;
          z-index: 1050;
        }

        #sidebarToggleTop {
          color: #c62828;
          font-size: 1.25rem;
          border: none;
          background: transparent;
          cursor: pointer;
          margin-right: auto;
        }

        .navbar-nav {
          display: flex;
          align-items: center;
          gap: 1rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .topbar-divider {
          width: 1px;
          background: #ddd;
          height: 30px;
          margin: 0 0.8rem;
          display: inline-block;
        }

        .nav-item.dropdown {
          position: relative;
        }

        .nav-link.dropdown-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #666;
          cursor: pointer;
          font-weight: 600;
          user-select: none;
          text-decoration: none;
        }

        .nav-link.dropdown-toggle:hover {
          color: #c62828;
        }

        .user-name {
          color: #444;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .img-profile {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 0 8px #ef9a9aaa;
          border: 2px solid #c62828;
          transition: transform 0.2s ease;
        }
        .img-profile:hover {
          transform: scale(1.1);
        }

        /* Dropdown menu */
        .dropdown-menu {
          position: absolute;
          top: 110%;
          right: 0;
          min-width: 180px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
          padding: 0.5rem 0;
          display: none;
          flex-direction: column;
          z-index: 1100;
        }
        .nav-item.dropdown:hover .dropdown-menu {
          display: flex;
        }

        .dropdown-menu a.dropdown-item,
        .dropdown-menu button.logout-btn {
          padding: 0.5rem 1.2rem;
          font-size: 0.9rem;
          color: #555;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          transition: background-color 0.2s ease;
          font-weight: 600;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          border-radius: 0;
        }
        .dropdown-menu a.dropdown-item:hover,
        .dropdown-menu button.logout-btn:hover {
          background: #f8bbd0;
          color: #b71c1c;
        }

        .dropdown-divider {
          height: 1px;
          background: #eee;
          margin: 0.4rem 0;
        }

        /* Main content container */
        .container-fluid.content-main {
          padding: 2rem 2.5rem;
          background: #fff;
          min-height: 800px;
          box-shadow: 0 3px 12px rgba(198, 40, 40, 0.1);
          border-radius: 12px;
          margin: 1rem 1.5rem 2rem 1.5rem;
        }

        /* Footer */
        footer.sticky-footer {
          background: #fff;
          padding: 1rem 0;
          box-shadow: 0 -5px 15px rgba(0,0,0,0.04);
          font-size: 0.9rem;
          color: #777;
          text-align: center;
          font-weight: 600;
          margin-top: auto;
          user-select: none;
        }

        /* Scroll to top button */
        .scroll-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 45px;
          height: 45px;
          background: #c62828;
          color: white;
          border-radius: 50%;
          text-align: center;
          line-height: 45px;
          font-size: 22px;
          box-shadow: 0 5px 15px rgba(198,40,40,0.5);
          cursor: pointer;
          transition: background-color 0.3s ease;
          z-index: 1100;
          text-decoration: none;
        }
        .scroll-to-top:hover {
          background: #b71c1c;
        }

        /* Responsive */
        @media (max-width: 992px) {
          #wrapper {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            height: auto;
            position: relative;
            box-shadow: none;
          }
          #content-wrapper {
            margin-left: 0;
          }
          .navbar.topbar {
            justify-content: space-between;
          }
        }

        @media (max-width: 576px) {
          .nav-link span {
            display: none;
          }
          .sidebar .sidebar-brand-text {
            font-size: 1.2rem;
          }
          .container-fluid.content-main {
            margin: 1rem;
            padding: 1.2rem 1rem;
          }
        }
      `}</style>
    </>
  );
}
