import { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './store/addCart';
import { productService } from './Services/productService';
import { Container, Row, Col, Card, Button, Spinner, Form, InputGroup } from 'react-bootstrap';

export default function Product() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addedId, setAddedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');

  useEffect(() => {
    productService.getProducts(12)
      .then((data) => {
        setProducts(data.products || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (item: any) => {
    dispatch(addItem(item));
    setAddedId(item.id);

    setTimeout(() => {
      setAddedId(null);
    }, 500);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
        if (sortBy === 'low-high') return a.price - b.price;
        if (sortBy === 'high-low') return b.price - a.price;
        if (sortBy === 'a-z') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [products, selectedCategory, searchTerm, sortBy]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading products...</p>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '30px 0' }}>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold mb-1">Featured Products</h3>
            <p className="text-muted mb-0">Browse and filter our catalog</p>
          </div>
          <span className="badge bg-dark px-3 py-2 fs-6 fw-normal">
            Showing: {filteredProducts.length} Items
          </span>
        </div>

        <Card className="border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
          <Row className="g-3 align-items-center">
            <Col xs={12} md={6} lg={5}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search products by title..."
                  className="rounded-pill px-3 py-2 border"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>

            <Col xs={12} sm={6} md={3} lg={3} className="ms-auto">
              <Form.Select
                className="rounded-pill px-3 py-2 border"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Sort: Default</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="a-z">Name: A to Z</option>
              </Form.Select>
            </Col>
          </Row>
        </Card>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 shadow-sm my-3">
            <h5>No Products Found!</h5>
            <p className="text-muted mb-3">Try changing your search term or category filter.</p>
            <Button
              variant="outline-dark"
              size="sm"
              className="rounded-pill px-4"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSortBy('default');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <Row className="g-4">
            {filteredProducts.map((item: any) => (
              <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
                <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden product-card">
                  <div className="d-flex align-items-center justify-content-center p-3 bg-white" style={{ height: '220px' }}>
                    <Card.Img
                      variant="top"
                      src={item.thumbnail || item.image}
                      alt={item.title}
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </div>

                  <Card.Body className="d-flex flex-column justify-content-between bg-white pt-0">
                    <div>
                      {item.category && (
                        <span className="text-uppercase text-muted fw-semibold" style={{ fontSize: '0.75rem' }}>
                          {item.category}
                        </span>
                      )}
                      <Card.Title className="fs-6 fw-semibold text-dark mt-1 mb-2" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '2.5rem' }} title={item.title}>
                        {item.title}
                      </Card.Title>

                      <div className="fs-5 fw-bold text-dark mb-3">
                        ${Number(item.price).toFixed(2)}
                      </div>
                    </div>

                    <Button
                      variant={addedId === item.id ? 'success' : 'primary'}
                      disabled={addedId === item.id}
                      className="w-100 rounded-pill py-2 fw-medium shadow-none" style={{ backgroundColor: addedId === item.id ? '#198754' : '#0d6efd', border: 'none', transition: 'all 0.2s ease' }}
                      onClick={() => handleAddToCart(item)}
                    >
                      {addedId === item.id ? '✓ Added' : '+ Add to Cart'}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}