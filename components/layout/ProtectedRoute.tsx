import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute - 로그인이 필요한 페이지를 보호하는 라우트 가드
 * 
 * currentUser가 없으면 로그인 페이지(/)로 리다이렉트
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const currentUser = useStore((state) => state.currentUser);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
