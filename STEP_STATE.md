<!-- STEP_STATE: LookMate 단계 추적 -->
# STEP_STATE

- 현재 진행 Step: 39

## Step 30 완료 요약
- 목표: 대시보드에 "빠른 시작 가이드" 카드 추가
- 구현 요약: 빠른 안내 불릿과 `시작하기` 버튼을 포함한 카드 추가
- 수정 파일: `src/pages/Dashboard.tsx`

## Step 31 목표 및 범위
- 목표: Step 문서를 정리하여 정본 문서화
- 범위: 문서(마크다운)만 생성/수정 — 코드 변경 금지

## 완료 조건 (체크리스트)
- [x] `STEP_STATE.md` 작성: 현재 Step 표기 및 요약
- [x] `docs/STEP30_STATE.md` 생성/검토
- [x] `docs/STEP31_STATE.md` 생성/검토
- [x] `README.md` 최소 문구 업데이트

## 관련 문서
- [docs/STEP23_STATE.md](docs/STEP23_STATE.md)
- [docs/STEP30_STATE.md](docs/STEP30_STATE.md)
- [docs/STEP31_STATE.md](docs/STEP31_STATE.md)
- [docs/STEP32_STATE.md](docs/STEP32_STATE.md)

## Step 32 요약
- 목표: Step 30/31 이후 린트 및 빌드 통과 검증(문서화 중심)
- 결과 문서: [docs/STEP32_STATE.md](docs/STEP32_STATE.md)

## 최근 진행 요약 (STEP33 ~ STEP38)

- Step 33: 백엔드 JWT 인증 도입 (기초)
	- 목표: JWT 기반 인증 추가 및 토큰 발급/검증 구현
	- 주요 변경: `backend/src/routes/auth.ts`, `backend/src/middleware/requireAuth.ts`, `backend/src/types/express.d.ts`
	- 비고: bcrypt + jsonwebtoken 사용, 한글 오류 메시지 유지

- Step 34: 쓰기 API 소유권 검증 적용
	- 목표: 모든 쓰기(POST/PUT/DELETE) 엔드포인트에서 토큰 기반 요청자 확인 및 소유권 검증 적용
	- 주요 변경: `backend/src/routes/data.ts` (closet/looks/public-looks 쓰기 엔드포인트에 `requireAuth` 적용 및 소유권 검사)

- Step 35: 프론트엔드 토큰 주입 및 초기 데이터 동기화
	- 목표: `apiClient`가 `localStorage.lm_token`을 `Authorization: Bearer` 헤더로 자동 주입
	- 주요 변경: `services/apiClient.ts`, `services/dataService.ts` (쓰기 함수 토큰 의존으로 전환)

- Step 36: 프론트엔드 레거시 파라미터 제거
	- 목표: 프론트엔드에서 이메일/유저ID를 쓰기 요청에 포함시키지 않도록 리팩터링
	- 주요 변경: `services/dataService.ts` (레거시 wrapper 제거), `store/useStore.ts`, `pages/Dashboard.tsx`, `pages/Explore.tsx` 등 호출부 수정

- Step 37: 토큰 전용 읽기 API로 전환
	- 목표: 사용자 전용 읽기 엔드포인트(`GET /api/data/closet`, `/api/data/looks`, `/api/data/my-public-looks`)를 토큰 전용으로 변경
	- 주요 변경: `backend/src/routes/data.ts` (읽기 핸들러에 `requireAuth` 적용 및 `req.user` 사용), `services/dataService.ts` 및 `store/useStore.ts` 호출부 수정
	- 비고: 공용 피드(`/api/data/public-looks`)는 인증 불필요

- Step 38: 프론트엔드 로그인/회원가입 → 백엔드 연동 + 토큰만료 UX 개선
	- 목표: `authService`가 백엔드 `/api/auth`를 사용하도록 전환(백엔드 활성화 시), 401 발생 시 alert 대신 toast로 한 번만 알리고 중앙 로그아웃 처리
	- 주요 변경: `services/authService.ts`, `services/apiClient.ts`, `store/useStore.ts` (logout 통합 및 lm:unauthorized 이벤트 수신)

	- Step 39: 프로덕션 콘솔 경고 제거 및 외부 placeholder 제거
		- 목표: 빌드/런타임 콘솔에 남는 경고(외부 Tailwind CDN 경고, manifest 아이콘 문제, via.placeholder.com DNS 요청)를 제거
		- 주요 변경: `services/aiService.ts`, `services/productService.ts`, `services/publicLookService.ts`, `backend/src/seed.ts` — 외부 `via.placeholder.com` 참조를 인라인 SVG data-URI 또는 로컬 대체로 교체
		- 비고: PWA manifest 아이콘은 `public/icon-192.png`, `public/icon-512.png`로 이미 존재함을 확인함

