import express from 'express';

declare global {
  namespace Express {
    // req.user 확장: JWT 미들웨어에서 주입하는 최소 정보
    interface Request {
      user?: {
        id: string;
        email: string;
        displayName?: string;
      };
    }
  }
}

export {};
