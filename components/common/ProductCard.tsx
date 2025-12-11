import React from 'react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCloset?: () => void;
  onOpenLink?: () => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCloset,
  onOpenLink,
  className = ''
}) => {
  return (
    <div className={`bg-gray-50 rounded-lg p-3 hover:shadow-md transition-shadow ${className}`}>
      <div className="aspect-square bg-white rounded-lg mb-2 overflow-hidden">
        <img
          src={product.thumbnailUrl}
          alt={`${product.brand || ''} ${product.name} 상품 이미지`}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="text-sm font-medium text-gray-800 truncate mb-1">
        {product.name}
      </div>
      
      {product.brand && (
        <div className="text-xs text-gray-500 mb-2">{product.brand}</div>
      )}
      
      <div className="text-sm font-bold text-gray-900 mb-3">
        {product.price.toLocaleString()}원
      </div>
      
      <div className="flex gap-2">
        {onOpenLink && (
          <a
            href={product.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onOpenLink}
            className="flex-1 text-center bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs font-medium hover:bg-gray-50 transition-colors"
            aria-label={`${product.name} 구매 페이지로 이동`}
          >
            구매하기
          </a>
        )}
        {onAddToCloset && (
          <button
            onClick={onAddToCloset}
            className="flex-1 text-center bg-indigo-600 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-indigo-700 transition-colors"
            aria-label={`${product.name} 옷장에 추가`}
          >
            + 옷장
          </button>
        )}
      </div>
    </div>
  );
};
