# 최종 production build 브라우저 검증

검증 시각: 2026-10-10 06:39–06:42 UTC. 대상: `/workspace/HomPage-final`의 고정된 production build, `http://127.0.0.1:4186/`. 검증 중 앱 소스·CSS·빌드를 변경하지 않았습니다. 기존 자산 확보 대기 단계의 증거는 `review/pending-assets-qa/`에 보존했습니다.

## 결과

**Playwright 75개 중 74개 통과, 1개 의도적 제외, 실패·재시도 0개**입니다. 제외는 1440px에서 모바일 메뉴 대신 데스크톱 메뉴가 표시되는 경우입니다. 360×800, 390×844, 768×1024, 1024×768, 1440×1000 화면에서 실제 Chromium 렌더링을 확인했습니다.

- 10개 섹션을 같은 문서에서 표시하고, 앵커·직접 URL·새로고침·이전/다음 이동을 검사했습니다. 제목은 고정 헤더 아래 표시되고 문서 가로 넘침은 없었습니다.
- 모바일 메뉴의 키보드 포커스 유지, Escape 복귀, 앵커 이동, 화면 폭 전환과 44px 버튼 크기를 확인했습니다.
- KO/EN/RU 본문 전체에 한국어 잔류·넘침이 없었습니다. 언어 메뉴의 키보드 선택·Escape 복귀와 설정 유지도 확인했습니다. Calibration 제목과 DataStation 상세 중간 문단은 언어 전환 후 같은 읽기 요소의 화면 내 위치 차이가 2px 이하였습니다.
- 문의 폼이 없고, 직접 메일 버튼이 `mailto:schong@oryxsystem.co.kr`을 요청했습니다. 문의 서버 전송과 허위 성공 표시는 없었습니다. 실제 메일 발송 여부는 브라우저 검사 범위에 포함되지 않습니다.
- 이미지·메타데이터 자산이 정상 응답했고, 각 화면의 browser error·console error·실패 요청·HTTP 오류 검사는 통과했습니다.

## 실제 브로셔 6개

DataStation·LockDown·Calibration 각각 KO/EN 원본을 검사했습니다. 언어마다 실제 이미지 표지 3개가 즉시 디코딩되어 표시됐고, 초기 화면과 브로셔 언어 변경에서 **PDF 요청은 0건**이었습니다. PDF는 미리보기·다운로드 동작에서만 요청했습니다.

6개 문서 × 5개 화면 폭에서 **원본 HTTP/MIME/파일 크기/SHA-256 검사 30건, 브라우저 다운로드 30건, 새 탭 미리보기 30건**이 통과했습니다. Calibration 국문 파일의 한글 파일명도 보존됐습니다. 독립 원본 근거와 기대값은 `tests/brochures.spec.ts`, `review/production-required-assets.json`, `review/calibration-final-manifest.json`에 있습니다.

## 히어로 효과

승인 WebP의 실제 HTTP 응답이 47,474바이트·SHA-256 `ebb0810a322815d0acce1d6a13d34f18d5cc3652972ab0fc32de23ee02fc8566`과 일치했고 1536×1024 이미지로 디코딩됐습니다. SVG viewBox는 `660 80 880 850`입니다. 원본에는 방패가 하나 있으며, 효과는 같은 비트맵을 동일 좌표에서 제한된 마스크로 밝힙니다.

5개 화면 폭 모두 **방패·DATA SECURITY 라벨을 포함한 빛 그룹만 4.4초 주기로 변하고 모니터는 정지**했습니다. 최대·최소 밝기에서 모니터의 bounding rectangle은 같았습니다. 실제 PNG의 픽셀 비교에서도 방패·라벨과 마스크의 feather 영역 밖에서 변한 픽셀은 0개였습니다. 모션 감소 설정에서는 그룹 애니메이션 0개·불투명도 0이 되었고 원본 모니터는 계속 표시됐습니다.

근거: `tests/hero.spec.ts`, `hero-pixel-comparison.json`, `screenshots/*-hero-evidence.json`, `screenshots/*-hero-min.png`, `*-hero-max.png`, `*-hero-reduced.png`. 휴대폰·태블릿·PC의 실제 캡처를 직접 검토했고, 흰 설명 상자나 중복 방패는 보이지 않았습니다.

## 접근성

axe 4.14로 **5개 화면 폭 × 3개 언어, 총 15개 상태에서 확정 위반 0건**입니다. KO 상태에서는 KO 표지 3개, EN/RU 상태에서는 EN 표지 3개를 표시했습니다. 가로 넘침·깨진 이미지도 0건입니다.

자동 대비 판정 보류는 통과로 계산하지 않았습니다. hero 그라디언트·가로 스크롤 비교표 등은 계산된 색상과 실제 배경으로 수동 검토했으며, 검토한 조합의 최저 대비는 **6.18:1**입니다. 상세 대상·보류 근거는 `accessibility-results.json`, 계산 근거는 `manual-contrast.json`에 있습니다.

## 검증한 빌드와 산출물

검사 전후 다음 SHA-256이 같았습니다.

| 자산 | SHA-256 |
| --- | --- |
| `dist/index.html` | `190de5cde6df7fe1b1b3809e7f452ed3a46a783e37bf934bb8c1bc4688f92744` |
| `index-BWx-SOL-.js` | `c789749401c9998010bf989ee6fa056feb2ea72e1c2bc8ede567b9190232cc6a` |
| `index-CpvS-GFA.css` | `fa804e587953048109e57163eb5837bf6d820547dbbd6967e1d9d46a7c5fb7ae` |

테스트 파일 3개의 strict TypeScript 검사는 통과했습니다. E2E 결과는 `test-results.json`, 열람용 보고서는 `html-report/index.html`, 화면 증거 79개는 `screenshots/`에 있습니다. 이 보고서는 로컬 최종 빌드를 검증한 근거이며, GitHub main 푸시·GitHub Pages 배포·운영 도메인 확인은 루트 담당자가 별도로 수행합니다.
