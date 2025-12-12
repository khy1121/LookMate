
import { BodyType, Gender, Category, AvatarGenerationResponse, BackgroundRemovalResponse } from '../types';
import { apiClient } from './apiClient';
import { useUiStore } from '../store/useUiStore';

/**
 * AI Service - Backend/Mock Toggle
 * 
 * Feature Flag:
 * - VITE_API_BASE_URL이 설정되어 있으면 백엔드 AI API 호출
 * - 설정되지 않았으면 기존 Mock 로직 사용
 * 
 * 백엔드 연동 시에도 에러 발생하면 graceful fallback to Mock
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const USE_BACKEND_AI = !!API_BASE;

// 더미 딜레이 유틸
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 백엔드 호출 에러 시 Toast 표시 및 Mock으로 fallback
 */
const handleBackendError = (error: any, fallbackFn: () => Promise<string>) => {
  console.error('[AI Service] Backend error, falling back to Mock:', error);
  const showToast = useUiStore.getState().showToast;
  showToast('AI 서버와 통신할 수 없어 Mock 모드로 동작합니다.', 'info');
  return fallbackFn();
};

export const aiService = {
  /**
   * 이미지 배경 제거
   * Backend: POST /api/ai/remove-background (multipart/form-data)
   * Mock: URL.createObjectURL
   */
  removeBackground: async (file: File): Promise<string> => {
    console.log(`[AI] Removing background for ${file.name}...`);

    if (USE_BACKEND_AI) {
      try {
        const formData = new FormData();
        formData.append('clothImage', file);

        const response = await apiClient.upload<BackgroundRemovalResponse>(
          '/api/ai/remove-background',
          formData
        );

        console.log('[AI] Backend background removal success:', response);
        return response.imageUrl;
      } catch (error) {
        return handleBackendError(error, async () => {
          await delay(1500);
          return URL.createObjectURL(file);
        });
      }
    }

    // Mock mode
    await delay(1500);
    return URL.createObjectURL(file);
  },

  /**
   * 아바타 생성
   * Backend: POST /api/ai/avatar (multipart/form-data)
   * Mock: Placeholder or uploaded image
   */
  generateAvatar: async (options: {
    faceImage?: File | null;
    fullBodyImage?: File | null;
    height?: number;
    bodyType?: BodyType;
    gender?: Gender;
  }): Promise<string> => {
    console.log('[AI] Generating avatar with options:', options);

    // Simple SVG placeholder generator to avoid external requests
    const svgPlaceholder = (w: number, h: number, text: string, bg = '4F46E5', fg = 'FFFFFF') => {
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>` +
        `<rect width='100%' height='100%' fill='#${bg}'/>` +
        `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial, Helvetica, sans-serif' font-size='${Math.floor(Math.min(w, h) / 10)}' fill='#${fg}'>${text}</text>` +
        `</svg>`;
      return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    };

    if (USE_BACKEND_AI && options.faceImage) {
      try {
        const formData = new FormData();
        formData.append('faceImage', options.faceImage);
        formData.append('height', String(options.height || 170));
        formData.append('bodyType', options.bodyType || 'normal');
        formData.append('gender', options.gender || 'unisex');

        const response = await apiClient.upload<AvatarGenerationResponse>(
          '/api/ai/avatar',
          formData
        );

        console.log('[AI] Backend avatar generation success:', response);
        return response.avatarUrl;
      } catch (error) {
        return handleBackendError(error, async () => {
          await delay(2000);
          if (options.fullBodyImage) {
            return URL.createObjectURL(options.fullBodyImage);
          }
          const genderPath = options.gender === 'female' ? 'woman' : 'man';
          return svgPlaceholder(400, 800, `${genderPath} ${options.bodyType || 'normal'} Avatar`);
        });
      }
    }

    // Mock mode
    await delay(2000);

    if (options.fullBodyImage) {
      return URL.createObjectURL(options.fullBodyImage);
    }

    const genderPath = options.gender === 'female' ? 'woman' : 'man';
    return svgPlaceholder(400, 800, `${genderPath} ${options.bodyType || 'normal'} Avatar`);
  },

  /**
   * 옷 자동 태깅/분석 Mock
   * (백엔드 연동은 향후 확장)
   */
  detectAttributes: async (file: File) => {
    console.log(`[AI] Analyzing clothing attributes for ${file.name}...`);
    await delay(800);
    return {
      category: 'top' as Category,
      color: 'black',
      tags: ['casual', 'summer'],
    };
  },

  /**
   * 가상 피팅 이미지 생성 (미래용 Stub)
   * Backend: POST /api/ai/try-on
   */
  generateTryOnImage: async (
    avatarUrl: string,
    clothingUrls: string[]
  ): Promise<string> => {
    console.log('[AI] Try-on request:', { avatarUrl, clothingUrls });

    if (USE_BACKEND_AI) {
      try {
        const response = await apiClient.post<{ tryOnImageUrl: string }>(
          '/api/ai/try-on',
          {
            avatarImageUrl: avatarUrl,
            clothingImageUrls: clothingUrls,
          }
        );

        console.log('[AI] Backend try-on success:', response);
        return response.tryOnImageUrl;
      } catch (error) {
        console.error('[AI] Try-on failed:', error);
        // Fallback: 현재는 수동 레이어 방식 유지
        return avatarUrl;
      }
    }

    // Mock: 아직 구현되지 않음, 기존 수동 레이어 방식 사용
    await delay(1000);
    return avatarUrl;
  },
};
