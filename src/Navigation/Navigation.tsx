import { useSelector, useDispatch } from 'react-redux';
import { Navbar as BNavbar, Container, Badge, Nav, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../store/authSlice';


export default function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();

  const items = useSelector((state: any) => state.cart?.items ?? []);
  const { user, isAuthenticated } = useSelector((state: any) => state.auth ?? {});
  const totalQty = items.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0);

  const displayName = user?.name || user?.email?.split('@')[0] || 'User';

  return (
    <BNavbar bg="white" sticky="top" className="app-navbar border-bottom shadow-sm py-2">
      <Container>
        <BNavbar.Brand
          as={Link}
          to={isAuthenticated ? '/' : '/login'}
          className="brand-link d-inline-flex align-items-center gap-2 text-decoration-none m-0 p-0"
        >
          <span className="brand-logo-mark rounded-3 d-inline-flex align-items-center justify-content-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m7.5 4.27 9 5.15" />
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
          </span>

          <span className="d-flex align-items-center gap-1">
            <span className="brand-text-main">E-Store</span>
          </span>
        </BNavbar.Brand>

        {isAuthenticated && (
          <Nav className="me-auto ms-4">
            <Nav.Link
              as={Link}
              to="/"
              className={`px-3 py-1 rounded-pill fw-medium transition-all ${location.pathname === '/' ? 'text-dark fw-bold bg-light' : 'text-secondary'
                }`}
            >
              Products
            </Nav.Link>
          </Nav>
        )}

        <div className="d-flex align-items-center gap-3 ms-auto">
          {isAuthenticated ? (
            <>
              <Link
                to="/cart"
                className={`btn rounded-pill px-3 py-1 d-inline-flex align-items-center gap-2 fw-medium border shadow-none text-decoration-none transition-all navbar-cart-btn ${location.pathname === '/cart'
                    ? 'btn-dark'
                    : 'btn-light bg-white text-dark hover-shadow'
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>

                <span className="small fw-semibold">Cart</span>

                <Badge
                  pill
                  bg={location.pathname === '/cart' ? 'light' : 'dark'}
                  text={location.pathname === '/cart' ? 'dark' : 'white'}
                  className="px-2 py-1 small"
                >
                  {totalQty}
                </Badge>
              </Link>

              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-user-profile"
                  className="navbar-profile-toggle d-flex align-items-center gap-2 px-2 py-1 bg-light rounded-pill border shadow-none"
                >
                  <div className="navbar-avatar-circle text-white rounded-circle d-flex align-items-center justify-content-center fw-bold small text-uppercase">
                    {displayName.charAt(0)}
                  </div>
                  <span className="small fw-medium text-dark pe-1 d-none d-sm-inline">
                    {displayName}
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="navbar-profile-menu shadow-sm border-0 rounded-4 mt-2 p-2">
                  <div className="px-3 py-1">
                    <div className="fw-semibold small text-dark">{displayName}</div>
                    <div className="text-muted user-email-text">
                      {user?.email || 'admin@example.com'}
                    </div>
                  </div>

                  <Dropdown.Divider />

                  <Dropdown.Item
                    as="button"
                    onClick={() => dispatch(logout())}
                    className="rounded-3 text-danger d-flex align-items-center gap-2 py-2 small fw-medium"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <Link
              to="/login"
              className="btn btn-dark rounded-pill px-4 py-1 fw-medium shadow-none text-decoration-none d-inline-flex align-items-center navbar-login-btn"
            >
              Login
            </Link>
          )}
        </div>
      </Container>
    </BNavbar>
  );
}