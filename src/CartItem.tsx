import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, incrementQty, decrementQty } from './store/addCart';
import { productService } from './Services/productService';
import { Container, Row, Col, Card, Button, Spinner, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector((state: any) => state.cart?.items ?? []);

  const [recommended, setRecommended] = useState<any[]>([]);
  const [recLoading, setRecLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const loadRecommended = async () => {
      setRecLoading(true);
      try {
        const data = await productService.getProducts(4);
        if (isMounted) {
          setRecommended(data.products || data || []);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Data fetch error:', err);
        }
      } finally {
        if (isMounted) {
          setRecLoading(false);
        }
      }
    };

    loadRecommended();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalQty = items.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0);
  const subtotal = items.reduce((acc: number, item: any) => acc + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="cart-page-wrapper">
      <Container>
        {items.length > 0 ? (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="fw-bold mb-1">Shopping Cart</h3>
                <p className="text-muted mb-0">Review your selected products</p>
              </div>
              <span className="badge bg-dark px-3 py-2 fs-6 fw-normal">
                {items.length} Products ({totalQty} Items)
              </span>
            </div>

            <Row className="g-4">
              <Col lg={8}>
                {items.map((product: any) => (
                  <Card key={product.id} className="mb-3 border-0 shadow-sm rounded-4 overflow-hidden">
                    <Card.Body className="p-3">
                      <Row className="align-items-center">
                        <Col xs={4} sm={3} md={2}>
                          <div className="cart-item-image-container d-flex align-items-center justify-content-center bg-white rounded-3 p-2 border">
                            <img
                              src={product.thumbnail || product.image}
                              alt={product.title}
                              className="cart-item-img"
                            />
                          </div>
                        </Col>
                        <Col xs={8} sm={4} md={4}>
                          <h6
                            className="mb-1 text-dark fw-semibold text-truncate"
                            title={product.title}
                          >
                            {product.title}
                          </h6>
                          <div className="text-muted small">
                            Unit Price: <span className="text-dark fw-medium">${Number(product.price).toFixed(2)}</span>
                          </div>
                        </Col>

                        <Col xs={6} sm={3} md={3} className="mt-3 mt-sm-0">
                          <ButtonGroup size="sm" className="rounded-pill border overflow-hidden">
                            <Button
                              variant="light"
                              className="px-3 border-0 fw-bold"
                              onClick={() => dispatch(decrementQty(product.id))}
                            >
                              -
                            </Button>
                            <Button variant="white" disabled className="px-3 border-0 fw-bold text-dark">
                              {product.quantity}
                            </Button>
                            <Button
                              variant="light"
                              className="px-3 border-0 fw-bold"
                              onClick={() => dispatch(incrementQty(product.id))}
                            >
                              +
                            </Button>
                          </ButtonGroup>
                        </Col>

                        <Col xs={6} sm={2} md={3} className="text-end mt-3 mt-sm-0">
                          <div className="fw-bold fs-6 text-dark mb-1">
                            ${(product.price * product.quantity).toFixed(2)}
                          </div>
                          <Button
                            variant="link"
                            className="text-danger p-0 text-decoration-none small"
                            onClick={() => dispatch(removeItem(product.id))}
                          >
                            Remove
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </Col>

              <Col lg={4}>
                <Card className="cart-summary-card border-0 shadow-sm rounded-4 p-4 sticky-top-position">
                  <h5 className="fw-bold mb-3">Order Summary</h5>
                  <div className="d-flex justify-content-between mb-2 text-muted">
                    <span>Total Quantity:</span>
                    <span className="text-dark fw-medium">{totalQty}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2 text-muted">
                    <span>Shipping:</span>
                    <span className="text-success fw-medium">Free</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-4 fs-5 fw-bold text-dark">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <Button variant="primary" className="w-100 rounded-pill py-2 fw-semibold shadow-none">
                    Proceed to Checkout
                  </Button>
                </Card>
              </Col>
            </Row>

            <hr className="my-5" />
          </>
        ) : (
          <div className="text-center py-5">
            <h3 className="fw-bold">Your Cart is Empty!</h3>
            <p className="text-muted">Looks like you haven't added anything to your cart yet.</p>
            <Button as={Link as any} to="/" variant="primary" className="rounded-pill px-4 py-2 mt-2">
              Start Shopping
            </Button>
            <hr className="my-5" />
          </div>
        )}

        <div>
          <h4 className="fw-bold mb-3">
            {items.length === 0 ? 'Trending Products' : 'You Might Also Like'}
          </h4>

          {recLoading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <>
              <Row className="g-4">
                {recommended.map((item) => (
                  <Col key={item.id} xs={12} sm={6} md={3}>
                    <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                      <div className="recommended-image-container d-flex align-items-center justify-content-center p-3 bg-white">
                        <Card.Img
                          variant="top"
                          src={item.thumbnail || item.image}
                          alt={item.title}
                          className="recommended-img"
                        />
                      </div>
                      <Card.Body className="d-flex flex-column justify-content-between pt-0 bg-white">
                        <div>
                          <Card.Title
                            className="fs-6 fw-semibold text-dark mb-1 text-truncate"
                            title={item.title}
                          >
                            {item.title}
                          </Card.Title>
                          <div className="fw-bold text-dark mb-3">
                            ${Number(item.price).toFixed(2)}
                          </div>
                        </div>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="w-100 rounded-pill py-2 fw-medium"
                          onClick={() => dispatch(addItem(item))}
                        >
                          + Add to Cart
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Button as={Link as any} to="/" variant="outline-dark" className="mt-3">
                Explore All Products
              </Button>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}