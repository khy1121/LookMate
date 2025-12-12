<!-- STEP 39: External placeholder removal and production warning clean-up -->
# STEP39_STATE

요약
- 목표: 개발/프로덕션 콘솔에 남아 있는 외부 리소스 관련 경고 및 DNS 요청을 제거하여 빌드 로그/런타임 콘솔을 깨끗하게 유지.

배경
- `via.placeholder.com`에 대한 다수의 참조로 인해 개발 환경에서 외부 DNS 요청과 일부 콘솔 경고가 발생했습니다.
- 또한 PWA manifest 아이콘 및 Tailwind CDN 경고가 빌드/런타임 로그에서 문제로 지적될 수 있어 확인이 필요했습니다.

이번 변경사항 (핵심)
- `services/aiService.ts`: 아바타 placeholder 반환 시 외부 URL 대신 인라인 SVG data-URI를 생성하도록 변경
- `services/productService.ts`: mock thumbnail에 사용하던 `via.placeholder.com` URL을 인라인 SVG data-URI로 변경
- `services/publicLookService.ts`: mock public look의 item/snapshot URL을 인라인 SVG data-URI로 변경
- `backend/src/seed.ts`: 시드 데이터의 avatar/image/snapshot URL들을 인라인 SVG data-URI로 교체하여 DB 시드 시 외부 네트워크 요청 발생을 방지

변경된 파일
- services/aiService.ts
- services/productService.ts
- services/publicLookService.ts
- backend/src/seed.ts

검증 방법
- 개발 서버를 시작하거나 `npm run build`를 실행한 뒤 콘솔에서 `via.placeholder.com` 관련 네트워크 요청과 경고가 더 이상 발생하지 않는지 확인
- 브라우저에서 앱을 열고 네트워크 탭에서 외부 placeholder 도메인 요청이 없는지 확인

후속 권장사항
- (선택) `public/placeholders/` 폴더에 실제 PNG/JPEG 파일을 추가하고, inline SVG 대신 해당 로컬 파일을 참조하도록 전환하면 더 일관된 이미지 렌더링 결과를 얻을 수 있음
- 빌드 환경(배포)의 정적 파일 제공 설정(예: `public/` 폴더 라우팅)이 올바른지 검증

작성자: GitHub Copilot (작업 에이전트)
날짜: 2025-12-12
