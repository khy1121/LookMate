# STEP38 상태 요약

- 제목: 프론트엔드 Auth — JWT 로그인/회원가입 연동 + 토큰만료 UX 개선
- 목표: 백엔드 활성화 시 프론트엔드 `authService`가 `/api/auth`로 등록/로그인하도록 전환하고, 401 발생 시 alert이 아닌 toast로 알리고 중앙 로그아웃 처리
- 구현 요약:
  - `services/authService.ts`: 백엔드 모드에서 `register`, `login`, `logout`, `getCurrentUser`가 백엔드 API 호출로 동작하도록 구현
    - `login` 성공 시 `localStorage.lm_token` 저장 및 `/api/auth/me` 호출로 사용자 정보 획득
    - `register`는 백엔드로 등록 후 `login`을 호출하여 토큰을 얻음
    - `logout`은 토큰 삭제 및 `lm:logout` 이벤트 디스패치
  - `services/apiClient.ts`: 401 핸들링을 alert에서 toast로 변경, 토큰 삭제, `lm:unauthorized` 이벤트 발생, 리다이렉트(지연)로 UX 개선
  - `store/useStore.ts`: `logout()`을 중앙화하여 토큰 제거 및 상태 초기화 수행, `lm:unauthorized`와 `lm:logout` 이벤트 수신하여 자동 로그아웃
- 변경된 파일 (주요):
  - `services/authService.ts`
  - `services/apiClient.ts`
  - `store/useStore.ts`
- 완료 기준:
  - 백엔드 ON 시 로그인/회원가입이 토큰을 받아 `localStorage.lm_token`에 저장
  - 토큰 만료/401 발생 시 한 번만 한글 토스트(`로그인이 만료되었습니다. 다시 로그인해주세요.`)가 보이고, 토큰이 제거되며 스토어가 초기화되어 `/`로 리다이렉트됨
  - 백엔드 OFF 시 기존 Mock 인증 동작 유지

