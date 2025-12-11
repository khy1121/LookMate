import React, { useState, ChangeEvent } from 'react';
import { ImageSearchResult, Product } from '../types';
import { searchSimilarProductsByImage, ProductSearchOptions } from '../services/productService';

type SortOption = 'recommend' | 'priceAsc' | 'priceDesc' | 'sales';

export const Discover: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<ImageSearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('recommend');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setSearchResult(null);
    }
  };

  const handleSearch = async () => {
    if (!imageFile) return;

    setLoading(true);
    try {
      const result = await searchSimilarProductsByImage(imageFile, {
        sortBy: sortBy === 'recommend' ? 'recommend' : sortBy,
        limit: 20,
      });
      setSearchResult(result);
    } catch (error) {
      console.error('Search failed', error);
      alert('검색 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = async (newSort: SortOption) => {
    setSortBy(newSort);
    if (searchResult && imageFile) {
      setLoading(true);
      try {
        const result = await searchSimilarProductsByImage(imageFile, {
          sortBy: newSort === 'recommend' ? 'recommend' : newSort,
          limit: 20,
        });
        setSearchResult(result);
      } catch (error) {
        console.error('Re-sort failed', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">📷 이미지로 상품 찾기</h2>
        <p className="text-gray-500">
          캡처한 이미지를 업로드하면 유사한 상품을 추천해드립니다.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Upload Area */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">이미지 업로드</h3>

          <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {previewUrl ? (
              <div className="flex flex-col items-center">
                <img src={previewUrl} alt="Preview" className="max-h-64 object-contain rounded-lg shadow-sm" />
                <p className="mt-3 text-sm text-indigo-600 font-medium">다른 이미지 선택하기</p>
              </div>
            ) : (
              <div className="py-12">
                <span className="text-5xl block mb-3">📸</span>
                <span className="font-medium text-gray-600 block mb-2">클릭하여 이미지 업로드</span>
                <p className="text-xs text-gray-400">JPG, PNG 파일 지원</p>
              </div>
            )}
          </div>

          {imageFile && (
            <button
              onClick={handleSearch}
              disabled={loading}
              className={`mt-4 w-full py-3 rounded-xl font-bold text-white transition-all ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading ? '검색 중...' : '🔍 유사 상품 검색하기'}
            </button>
          )}

          {searchResult?.detectedCategory && (
            <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-700">
                <strong>감지된 카테고리:</strong> {searchResult.detectedCategory}
              </p>
            </div>
          )}
        </div>

        {/* Right: Search Results */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">검색 결과</h3>
            {searchResult && searchResult.products.length > 0 && (
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="recommend">추천순</option>
                <option value="priceAsc">가격 낮은순</option>
                <option value="priceDesc">가격 높은순</option>
                <option value="sales">판매량순</option>
              </select>
            )}
          </div>

          {!searchResult ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <span className="text-4xl mb-3">🔍</span>
              <p>이미지를 업로드하고 검색해보세요.</p>
            </div>
          ) : loading ? (
            <div className="flex justify-center items-center py-20 text-gray-400">
              <div>검색 중...</div>
            </div>
          ) : searchResult.products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <span className="text-4xl mb-3">🤷</span>
              <p>검색 결과가 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 max-h-[600px] overflow-y-auto">
              {searchResult.products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img src={product.thumbnailUrl} alt="" className="w-full aspect-[3/4] object-cover" />
                  <div className="p-3">
                    <p className="text-sm font-semibold text-gray-800 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500 truncate">{product.brand}</p>
                    <p className="text-base font-bold text-gray-900 mt-1">
                      ₩{product.price.toLocaleString()}
                    </p>
                    {product.similarityScore && (
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-gray-500">유사도:</span>
                        <span className="text-xs font-medium text-indigo-600">
                          {Math.round(product.similarityScore * 100)}%
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => window.open(product.productUrl, '_blank', 'noopener,noreferrer')}
                      className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-2 rounded transition-colors font-medium"
                    >
                      구매하러 가기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
