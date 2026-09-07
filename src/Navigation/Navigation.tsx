import { useSelector } from 'react-redux';
import { Navbar as BNavbar, Container, Badge, Nav, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const count = useSelector((state: any) => state.counter?.count ?? 0);
  const items = useSelector((state: any) => state.cart?.items ?? []);

  // Total quantity count (agar ek item 2 baar hai toh 2 count karega)
  const totalQty = items.reduce(
    (acc: number, item: any) => acc + (item.quantity || 1),
    0
  );

  return (
    <BNavbar bg="white" sticky="top" className="border-bottom shadow-sm py-2">
      <Container>
        <BNavbar.Brand as={Link} to="/" className="fw-bold fs-4 text-dark d-flex align-items-center gap-2">EShop</BNavbar.Brand>
        <Nav className="mr-auto gap-2">
          <Nav.Link as={Link} to="/" className={`px-3 py-1 fw-medium ${ location.pathname === '/' ? 'text-dark fw-bold' : 'text-secondary'}`}>Products</Nav.Link>
        </Nav>

        <div className="d-flex align-items-center gap-2">
          {/* {count > 0 && ( <Badge bg="secondary" className="rounded-pill px-3 py-2 fw-normal">Clicks: {count}</Badge>)} */}

          <Button
            as={Link as any}
            to="/cart"
            variant={location.pathname === '/cart' ? 'dark' : 'outline-dark'}
            className="rounded-pill px-3 py-1 d-flex align-items-center gap-2 fw-medium shadow-none"
            style={{ textDecoration: 'none' }}
          >
            <span>Cart</span>
            <Badge
              bg={location.pathname === '/cart' ? 'light' : 'dark'}
              text={location.pathname === '/cart' ? 'dark' : 'light'}
              className="rounded-pill px-2 py-1"
            >
              {totalQty}
            </Badge>
          </Button>
        </div>
      </Container>
    </BNavbar>
  );
}