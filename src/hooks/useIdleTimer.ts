import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateActivity } from '../store/authSlice';

const INACTIVITY_LIMIT = 30 * 60 * 1000; 

export function useIdleTimer() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  const timerRef = useRef<any>(null);
  useEffect(() => {
    if (!isAuthenticated) return;
    const resetTimer = () => {
      dispatch(updateActivity());
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        alert('Session expired due to 30 minutes of inactivity. Please log in again.');
        dispatch(logout());
      }, INACTIVITY_LIMIT);
    };
    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [isAuthenticated, dispatch]);
}