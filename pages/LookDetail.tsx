import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { PublicLook, Product } from '../types';
import { searchSimilarProductsByItem } from '../services/productService';

export const LookDetail: React.FC = () => {
  const { publicId } = useParams<{ publicId: string }>();
  const navigate = useNavigate();
  
  const getPublicLookById = useStore((s) => s.getPublicLookById);
  const currentUser = useStore((s) => s.currentUser);
  const likedPublicLookIds = useStore((s) => s.likedPublicLookIds);
  const bookmarkedPublicLookIds = useStore((s) => s.bookmarkedPublicLookIds);
  const toggleLikePublicLook = useStore((s) => s.toggleLikePublicLook);
  const toggleBookmarkPublicLook = useStore((s) => s.toggleBookmarkPublicLook);
  const addClothingFromProduct = useStore((s) => s.addClothingFromProduct);

  const [look, setLook] = useState<PublicLook | null>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    if (!publicId) {
      navigate('/app/explore');
      return;
    }

    const foundLook = getPublicLookById(publicId);
    if (!foundLook) {
      alert('코디를 찾을 수 없습니다.');
      navigate('/app/explore');
      return;
    }

    setLook(foundLook);
  }, [publicId, getPublicLookById, navigate]);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${look?.name} - ${look?.ownerName}`,
          text: `${look?.ownerName}님의 코디를 확인해보세요!`,
          url,
        });
      } catch (err) {
        console.error('Web Share API 실패:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert('링크가 클립보드에 복사되었습니다! 📋');
      } catch (err) {
        console.error('클립보드 복사 실패:', err);
        alert('링크 복사에 실패했습니다.');
      }
    }
  };

  const handleViewSimilarProducts = async (index: number) => {
    if (!look) return;
    
    const item = look.items[index];
    setSelectedItemIndex(index);
    setLoadingProducts(true);
    
    try {
      const products = await searchSimilarProductsByItem(item, {
        sortBy: 'recommend',
        limit: 6,
      });
      setSimilarProducts(products);
    } catch (error) {
      console.error('유사 상품 검색 실패:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleAddToCloset = (product: Product) => {
    if (!currentUser) {
      alert('로그인이 필요합니다.');
      navigate('/');
      return;
    }

    try {
      addClothingFromProduct(product);
      alert(`${product.name}이(가) 옷장에 추가되었습니다! 🎉`);
    } catch (err) {
      console.error('옷장 추가 실패:', err);
      alert('옷장에 추가하는 중 오류가 발생했습니다.');
    }
  };

  if (!look) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-400">로딩 중...</div>
      </div>
    );
  }

  const isLiked = likedPublicLookIds.includes(look.publicId);
  const isBookmarked = bookmarkedPublicLookIds.includes(look.publicId);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/app/explore')}
          className="text-gray-600 hover:text-gray-800 font-medium"
        >
          ← 돌아가기
        </button>
        <button
          onClick={handleShare}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
        >
          🔗 공유하기
        </button>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Snapshot */}
        <div className="space-y-4">
          {look.snapshotUrl ? (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img src={look.snapshotUrl} alt={look.name} className="w-full" />
            </div>
          ) : (
            <div className="bg-gray-100 rounded-2xl aspect-[3/4] flex items-center justify-center text-gray-400">
              이미지 없음
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (currentUser) {
                  toggleLikePublicLook(look.publicId);
                } else {
                  alert('로그인이 필요합니다.');
                  navigate('/');
                }
              }}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                isLiked
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              ❤️ {isLiked ? '좋아요 취소' : '좋아요'} ({look.likesCount})
            </button>
            <button
              onClick={() => {
                if (currentUser) {
                  toggleBookmarkPublicLook(look.publicId);
                } else {
                  alert('로그인이 필요합니다.');
                  navigate('/');
                }
              }}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                isBookmarked
                  ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              🔖 {isBookmarked ? '북마크 취소' : '북마크'} ({look.bookmarksCount})
            </button>
          </div>
        </div>

        {/* Right: Info & Items */}
        <div className="space-y-6">
          {/* Look Info */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{look.name}</h1>
            <p className="text-gray-600 mb-4">by {look.ownerName}</p>
            
            {/* Tags */}
            {look.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-4">
                {look.tags.map((tag, idx) => (
                  <span key={idx} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="text-sm text-gray-500">
              {new Date(look.createdAt).toLocaleDateString('ko-KR')}
            </div>
          </div>

          {/* Items List */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">착용 아이템 ({look.items.length}개)</h3>
            <div className="space-y-3">
              {look.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => handleViewSimilarProducts(idx)}
                >
                  <div className="w-16 h-16 bg-white rounded-lg p-1 flex items-center justify-center">
                    <img src={item.imageUrl} alt="" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{item.brand || '브랜드 미상'}</div>
                    <div className="text-sm text-gray-500">{item.category}</div>
                    <div className="text-xs text-gray-400">{item.color}</div>
                  </div>
                  <button className="text-indigo-600 text-sm font-medium hover:underline">
                    유사상품 →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      {selectedItemIndex !== null && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">
            "{look.items[selectedItemIndex]?.brand || '해당 아이템'}"과 유사한 상품
          </h3>

          {loadingProducts ? (
            <div className="text-center text-gray-400 py-8">상품 검색 중...</div>
          ) : similarProducts.length === 0 ? (
            <div className="text-center text-gray-400 py-8">유사 상품을 찾을 수 없습니다.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {similarProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-50 rounded-lg p-3 hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-white rounded-lg mb-2 overflow-hidden">
                    <img
                      src={product.thumbnailUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-sm font-medium text-gray-800 truncate mb-1">
                    {product.name}
                  </div>
                  <div className="text-xs text-gray-500 mb-2">{product.brand}</div>
                  <div className="text-sm font-bold text-gray-900 mb-2">
                    {product.price.toLocaleString()}원
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={product.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs font-medium hover:bg-gray-50"
                    >
                      구매하기
                    </a>
                    <button
                      onClick={() => handleAddToCloset(product)}
                      className="flex-1 text-center bg-indigo-600 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-indigo-700"
                    >
                      + 옷장
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
