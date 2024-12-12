# PUBLIC PLUS (공공 체육시설 활성화 플랫폼)
<img width="685" alt="publicplus-light" src="https://github.com/user-attachments/assets/8b342583-d837-4092-b67d-7221841634fb" />


## 프로젝트 소개

PUBLIC PLUS는 공공 체육시설 이용을 높이고, 다양한 사람들이 참여할 수 있도록 하는 공공 플러스 개발 프로젝트입니다. 보다 사용자 친화적으로 프론트엔드를 구현하여 소셜 활동을 활성화하는 것을 목표로 합니다.

### 주요 기능

- **회원 기능**: 회원가입, 로그인, 프로필 관리
- **시설 상세정보**: 공공체육시설 정보 조회 및 관리
- **모임 기능**: 체육시설 기반 모임 생성 및 참여
- **리뷰 기능**: 시설 이용 후기 및 평가

### 기대 효과

- 접근성 확대 및 이용률 증가
- 커뮤니티 활성화
- 공공체육시설 운영 전략 최적화

## 설치 및 실행 방법

### 프론트엔드 설치 및 실행

1. Node.js 설치 (18.x 이상)

2. pnpm 전역 설치 (없는 경우)
```bash
npm install -g pnpm
```

3. 프로젝트 clone
```bash
git clone [repository URL]
cd [project name]
```

4. 패키지 설치
```bash
pnpm install
```

5. 개발 서버 실행
```bash
pnpm dev
```

6. 프로덕션 빌드 (필요시)
```bash
pnpm build
pnpm start
```

프로젝트는 기본적으로 http://localhost:3000 에서 실행됩니다.

## 프로젝트 구조

```
src/
├── app/         # 앱 진입점, 라우팅과 페이지
├── widgets/     # 복합 컴포넌트 (페이지 조각)
├── features/    # 독립적인 기능 모듈
├── entities/    # 비즈니스 엔티티, 순수 도메인 로직
└── shared/      # 공용 컴포넌트, 훅, 유틸
```

## 기술 스택

### Frontend
- Next.js
- Node.js
- TypeScript
- Axios

### Backend
- Java
- Spring Boot
- Spring Framework
- Hibernate
- MySQL
- Redis
- AWS RDS

### 개발 도구
- Git
- GitHub
- Notion
- JIRA

### 외부 API
- Google Calendar
- Kakao MapAPI
- Naver OpenAPI

### 보안
- Spring Security
- JWT
- OAuth 2.0

## 팀 구성

- PM: 김수빈
- 백엔드 팀장: 김병주
- 프론트엔드 팀장: 강선영
- 팀원: 신현우, 위성운, 이진우

## 프로젝트 일정

- 개발 기간: 2023.11.12 ~ 2023.12.09 (총 4주)

### 주요 일정
- 사전 기획: 11/12 ~ 11/15
- 요구사항 분석 및 설계: 11/15 ~ 11/19
- 기능 구현 및 테스트: 11/20 ~ 12/06
- 서비스 구축: 12/07 ~ 12/09

## 라이센스

This project is licensed under the MIT License - see the LICENSE.md file for details
