import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from './store/authSlice';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state: any) => state.auth?.isAuthenticated);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const from = (location.state as any)?.from?.pathname || '/';

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^\d{6}$/;
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email address (e.g. user@example.com).');
      return;
    }
    if (!passwordRegex.test(trimmedPassword)) {
      setError('Password must be exactly 6 digits (numbers only).');
      return;
    }
    dispatch(
      loginSuccess({
        email: trimmedEmail,
        name: trimmedEmail.split('@')[0],
      })
    );

    navigate(from, { replace: true });
  };

  return (
    <div className="login-page-wrapper d-flex align-items-center">
      <Container className="login-card-container">
        <Card className="border-0 shadow-sm rounded-4 p-4">
          <div className="text-center mb-4">
            <div className="login-lock-circle d-inline-flex align-items-center justify-content-center rounded-circle border mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <circle cx="12" cy="16" r="1" />
              </svg>
            </div>
            <h4 className="fw-bold mb-1 text-dark">Welcome Back</h4>
            <p className="text-muted small mb-0">Please sign in to your account</p>
          </div>

          {error && (
            <Alert variant="danger" className="py-2 small">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold text-secondary">
                Please enter any valid email address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                className="rounded-pill px-3 py-2 border"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="small fw-semibold text-secondary">
                Password (6 Digits)
              </Form.Label>
              <Form.Control
                type="password"
                maxLength={6}
                placeholder="123456"
                className="rounded-pill px-3 py-2 border"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="w-100 rounded-pill py-2 fw-semibold shadow-none"
            >
              Login
            </Button>
          </Form>

          <div className="mt-3 text-center text-muted small">
            Enter any valid email &amp; a 6-digit numeric password.
          </div>
        </Card>
      </Container>
    </div>
  );
}