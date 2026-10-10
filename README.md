# Oryx DataSafe

홍승철 대표가 Oryx System과 별도로 운영하는 IT 중심 회사 Oryx DataSafe의 소프트웨어 소개 사이트입니다. 전자기록·데이터 관리·무결성·보안 및 교정 업무를 다룹니다. React 19, TypeScript, Vite로 구성하며 한국어·영어·러시아어로 같은 제품 내용을 제공합니다. 미확인 법인 형태·설립연도·회사 규모는 표시하지 않습니다.

## 실행과 검증

Node.js 20.19 이상 또는 22.12 이상에서 실행합니다. API 키나 외부 문의 전송 서비스가 필요하지 않습니다.

```sh
npm ci
npm run dev
npm run typecheck
npm test
npm run build
npm run preview
npm run test:e2e
```

클라우드에서는 쓰기 가능한 npm 캐시를 지정할 수 있습니다: `npm ci --cache /tmp/oryx-npm-cache`. 개발 서버 기본 포트는 3000, 프로덕션 미리보기는 4173입니다. Playwright는 `/usr/bin/chromium` 또는 `CHROMIUM_PATH`를 사용합니다. 이미 실행한 빌드를 검사하려면 `E2E_BASE_URL=http://127.0.0.1:4186 npm run test:e2e`로 실행합니다. 브라우저 검증 중에는 해당 빌드를 교체하지 않습니다.

`prebuild`는 [자산 매니페스트](review/production-required-assets.json)의 실제 파일·바이트·SHA256·파일 형식을 확인합니다. 승인 자산이 누락되거나 변경되면 Vite 빌드 전에 중단합니다. `npm test`는 비공개 API 환경변수의 클라이언트 삽입 방지와 메타데이터·favicon·OG 원본을 별도로 검사합니다.

## 주소와 사용자 동작

한 문서에 소개 `#home`, 상세 기능 `#datastation`, 별도 PC 운영 제품 `#lockdown`, 교정 업무 `#calibration`, 자료 `#brochures`, 도입 `#implementation`, 규제·운영 검토 `#validation`, 회사 `#about`, 문의 `#contact`, 문의·개인정보 안내 `#privacy`가 있습니다. 기존 `/#/…` 경로는 해당 섹션으로 연결하며 브라우저 뒤로·앞으로와 직접 접속을 지원합니다. 시연 로그인·예시 영상은 실제 문의 또는 검토 안내로 연결합니다.

헤더의 지구본 메뉴는 KO/EN/RU를 전환하고 읽던 제목·문단의 위치를 보존합니다. 선택 언어는 기기에 저장되는 선택적 표시 설정입니다. 본문 바로가기, 섹션 포커스, 키보드 언어 메뉴, 모바일 모달 메뉴의 Tab 순환·Escape 복귀를 제공합니다. 메뉴 전환 기준은 1200px입니다.

문의는 `mailto:schong@oryxsystem.co.kr`과 `tel:+821065450415`를 제공합니다. 입력 양식·전송 서버·접수 성공 표시가 없습니다. 실제 이메일 발송은 사용자의 메일 앱에서 이루어집니다. 회사 주소는 충청남도 금산군 비호산로 4 1층이며, 관련 회사 사이트는 https://oryxsystem.co.kr 입니다. 대표 홍승철·Founder & CEO와 국내외 현장 경험 20년만 확인된 소개 정보로 사용합니다. 미확인 사업자번호나 개인정보 담당자는 만들지 않습니다.

## 원본 자료와 제품 범위

DataStation, LockDown, Calibration의 한국어·영어 PDF 6개를 `public/downloads`에서 제공합니다. DataStation은 언어별 13쪽, LockDown은 8쪽, 최종 Calibration 소개서는 7쪽입니다. LockDown은 승인된 첫 페이지 브랜딩 수정본으로 교체하고 2–8쪽 본문을 보존합니다. Calibration 두 PDF의 이메일·홈페이지와 전체 원본 SHA256을 대조했습니다. [Calibration 매니페스트](review/calibration-final-manifest.json)와 브라우저 검사는 원본 파일의 바이트·페이지·다운로드 동일성을 구분합니다.

표지는 실제 PDF 첫 페이지의 WebP 이미지이며 즉시 로드하고 두 자료 언어 모두 미리 준비합니다. PDF 본문은 사용자가 미리보기나 다운로드를 누를 때만 요청합니다. 러시아어 PDF는 제공하지 않으며 한국어·영어 자료를 안내합니다. DataStation·Calibration 원본은 변경하지 않습니다. LockDown PDF와 PNG·WebP 표지는 함께 교체해 화면과 다운로드 자료가 일치하도록 유지합니다.

DataStation의 CSV→DB→PDF, 원본 보호·해시 비교·Audit Trail·역할별 서명과 백업·보관을 실제 지원 범위로 설명합니다. 전자서명은 Professional·Enterprise, Enterprise의 원격 범위는 사무실에서 보관 기록의 조회·검토입니다. LockDown의 앱·접근 경로 제한은 구성에 따라 달라지며 모든 우회를 차단한다고 보장하지 않습니다.

Calibration은 접수·배정, 측정 기록, 별도 검토·승인, 성적서 발행·고객 조회를 설명합니다. 고객 공개 여부·권한별 COPY 조회를 구분합니다. 온라인 사진·업로드 뒤 서버 OCR 결과를 사용자가 확인하며, 오프라인 사진·수기 입력값은 재연결 후 업로드합니다. 오프라인 즉시 자동 OCR을 지원한다고 표시하지 않습니다.

21 CFR Part 11·ALCOA는 지원 기능과 사용 조직의 절차·교육·설정·검증 및 운영 책임을 함께 설명합니다. 제품 도입만으로 인증·준수·감사 통과를 보장하지 않습니다.

## 디자인과 배포

기존 DataSafe 로고와 블루·화이트 팔레트·여백·타이포그래피를 사용합니다. OryxSystem_Web는 읽기 전용 디자인 근거로만 참고했습니다. 언어 선택기는 관련 사이트의 지구본 SVG와 133px 폭을 사용하며, 320px에서도 세 언어의 이름과 화살표를 표시합니다. 모니터는 승인된 `viewBox="660 80 880 850"` 범위를 유지합니다. DATA SECURITY 문구는 방패 중심축의 연장선 아래에 정렬하고 모니터 화면의 원근에 맞춰 기울입니다. 원본에 포함된 잠금쇠와 내부 광원을 가리고 방패 안쪽 화면을 정적 그라데이션으로 복원합니다. 방패 모양을 따라 경계를 부드럽게 이어 사각 패치와 잠금쇠 잔상을 없애며, 원본 잠금쇠의 독립 레이어는 전체 3초 주기로 opacity 0→1→0을 반복합니다. 방패 윤곽과 DATA SECURITY 문구, 모니터 본체는 정적으로 유지하며 모션 감소 설정에서는 잠금쇠도 opacity 1로 정적 유지합니다. 원본 이미지 파일은 변경하지 않습니다. 보이는 이미지 설명 문구는 제거하고 접근 가능한 SVG 대체 설명은 보존했습니다. Footer도 기존 DataSafe 로고를 사용합니다.

일반 본문은 PC 17px·휴대폰 16px을 기준으로 사용하며, 필수 안내·역할명·표·메뉴도 읽기 쉬운 크기로 제공합니다. 제목의 과한 음수 자간을 완화하고 행간·문단 길이·카드 여백을 함께 조정합니다. 한국어·영어·러시아어의 긴 문구와 헤더 반응형 경계를 확인합니다.

하단 회사 소개는 회사 관계·대표·20년 현장 경험·소재지만 간추립니다. 실제 이메일·전화는 주 문의 영역에서 각각 한 번 표시하며, 개인정보 안내는 연락처를 반복하지 않는 두 문단입니다. Footer에는 회사 사이트·내부 메뉴·저작권을 제공합니다.

기존 `.github/workflows/deploy.yml`이 main push로 빌드한 `dist`를 GitHub Pages에 게시하며 `public/CNAME`은 `oryxdatasafe.com`입니다. 운영 반영은 사용자에게 승인된 범위이며 기존 호스팅과 보안 설정을 사용합니다. OryxSystem_Web는 변경하지 않습니다. 이전 비공개 Sites v3 배포, 로컬 `7e466ce` 소스와 기존 작업 경로는 별도로 보존했습니다.

운영 도메인 검증은 배포 후 `Verify live GitHub Pages deployment` 작업에서 수행합니다. 실제 도메인의 HTML·메타데이터·모든 배포 자산의 바이트와 해시를 비교한 뒤 320/360/390/768/1024/1440px Chromium 검사를 실행합니다. 결과와 화면 캡처는 해당 작업의 아티팩트에 보존합니다. 이전 릴리스의 로컬 검증 기록은 `review/production-final-qa`에 있으며 후속 작업의 검증 기록은 별도로 보존합니다.
