# Desker

<p align="center">
<img width="30%" height="30%" alt="Image" src="https://github.com/user-attachments/assets/536564e3-934e-4bdd-89e3-5b3de8401b08" />
</p>

<p align="center">
Desker는 웹사이트를 둘러보며 필요한 정보를 찾기 어려운 방문객에게, AI 안내원이 실시간으로 맞춤형 답변을 제공하는 서비스입니다. 
복잡한 페이지를 일일이 탐색하지 않아도, 궁금한 점을 물으면 바로 답을 얻고 상담으로 연결할 수 있어 방문 경험이 훨씬 간편해집니다.
</p>


<br>

# 🔗 Link
<div align="center">

[Desker Team Repository](https://github.com/Team-Desker/inform-me-desker-ai/tree/develop) |
[Desker Team Pull Request](https://github.com/Team-Desker/inform-me-desker-ai/pulls?q=is%3Aopen+is%3Apr) |
[Desker Team Issues](https://github.com/Team-Desker/inform-me-desker-ai/issues)

</div>

<br>

# 📖 CONTENTS 

* [🤖 Preview](#-preview)

* [💡 Motivation](#motivation)

* [🛠️ Tech Stacks](#️-tech-stacks)
  * [Frontend](#frontend)
  * [Backend](#backend)
  * [AI / RAG](#ai--rag)
  * [Widget / Infra](#widget--infra)
  * [Tools](#tools)
  
* [🎯 Feature](#-feature)

* [🖥️ Development](#️-development)
  * [1. 사용자 친화적인 랜딩 페이지와 대시보드 UI는 어떻게 구성할까?](#1-사용자-친화적인-랜딩-페이지와-대시보드-ui는-어떻게-구성할까)
  * [2. 로그인, 회원가입 흐름을 어떻게 설계·연결했나?](#2-로그인-회원가입-흐름을-어떻게-설계연결했나)
  * [3. 챗봇과의 대화 및 DB 메시지를 어떻게 불러올까?](#3-챗봇과의-대화-및-db-메시지를-어떻게-불러올까)
  * [4. 크롤러 기능을 어떻게 구현했을까?](#4-크롤러-기능을-어떻게-구현했을까)

* [⚠️ Suggestions](#️-suggestions)
  * [UI 개선](#ui-개선)
  * [UX 개선](#ux-개선)
  * [기능 개선](#기능-개선)

* [📆 Schedule](#-schedule)
  * [프로젝트 기간: 2025.08.18(월) ~ 2025.09.11(목)](#프로젝트-기간-20250818월--20250911목)
  
* [📝 Review](#-review)
  
<br>


# 🤖 Preview

<p align="center" style="display: flex; justify-content: center; gap: 60px;">

| 로그인 후 대시보드에서 챗봇을 관리 | 사장님 홈페이지에 챗봇을 꼽아 사용 |
|:--:|:--:|
| <img width="450" height="280" alt="Dashboard" src="https://github.com/user-attachments/assets/88727deb-c4ed-41c4-8fbb-959c82f9fb4a" /> | <img width="450" height="280" alt="Widget" src="https://github.com/user-attachments/assets/80049874-76aa-4712-aee8-327d8dfdc728" /> |

</p>



<br>

# <a id="motivation">💡 Motivation</a>
이번 팀 프로젝트의 출발점은 방문객이 웹사이트에서 필요한 정보를 놓치지 않게 하자는 문제의식에서 비롯되었습니다.
많은 소상공인과 전문 블로거들이 홈페이지를 운영하지만, 방문객들은 복잡한 메뉴 구조와 긴 설명 속에서 원하는 정보를 찾지 못하고 이탈하는 경우가 많습니다.

따라서 저희는 Desker라는 웹 기반 AI 안내원 서비스를 기획했습니다. Desker 서비스는 홈페이지를 운영하는 사장님들은 자신의 홈페이지 URL을 Desker 서비스에 입력하면 해당 홈페이지 정보를 가진 챗봇 <script> 한줄의 데이터를 얻으실 수 있습니다.
홈페이지를 운영하시는 사장님들은 챗봇에 대한 전문적인 코드 레벨 지식이 없더라도 이 <script> 한줄을 자신에 홈페이지에 연결하면 그 내용을 자동으로 학습한
AI 챗봇이 홈페이지 내에 설치되어 방문객의 질문에 실시간으로 답변하고, 필요할 경우 상담·문의로 자연스럽게 연결해 줍니다.


<br>


---

### 👩‍💼 서비스 이용자(사장님)의 관점
Desker를 이용하는 사장님은 개발 지식 없이도 AI 안내원을 설치할 수 있습니다. 제공되는 <script> 한 줄만 복사해 붙이면 즉시 적용되며 홈페이지의 속도 저하 없이 24시간 자동 문의 시스템을 구축할 수 있습니다.
이를 통해 반복적인 문의 대응 부담을 줄이고 방문객의 질문 데이터를 기반으로 제품 이해도나 관심도를 분석해 더 효율적인 마케팅과 고객 응대 및 회사와 홈페이지 방문자와의 연결을 가능하게 합니다.

또한 Desker를 이용하는 사장님은 Desker의 대시보드를 통해 방문자가 어떤 정보를 얻고 싶어 했는지와 방문자가 원할경우 상담 연결 기능을 통해 방문자가 문의한 내용과 함께 이메일, 전화번호등을
사장님이 확인 할 수 있습니다. 

<br>

### 🧑‍💻 방문자(홈페이지 이용자)의 관점
홈페이지를 찾은 방문자는 더 이상 긴 페이지를 탐색하거나 원하는 정보를 찾기 위해 시간을 낭비하지 않아도 됩니다.

“이 제품은 어떤 기능을 지원하나요?”
“가격 정책이 어떻게 되나요?”
와 같은 질문을 AI 안내원에게 직접 물으면 해당 웹사이트의 콘텐츠를 학습한 AI가 홈페이지 정보 기반으로 즉시 맞춤형 답변을 제공합니다.
필요할 경우 문의 창으로 연결되어 방문자의 이메일과 전화번호를 입력하고 방문자는 상담 경험을 얻을 수 있습니다.


<br>


---
# 🛠️ Tech Stacks

#### Frontend
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000)
&nbsp;
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=fff)
&nbsp;
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=000)
&nbsp;
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=fff)
&nbsp;
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=fff)
&nbsp;
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-18181B?style=flat-square&logo=shadcnui&logoColor=fff)
&nbsp;
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=fff)
&nbsp;


#### Backend  
![Next.js API Route](https://img.shields.io/badge/Next.js_API_Route-000000?style=flat-square&logo=nextdotjs&logoColor=fff)
&nbsp;
![Auth.js](https://img.shields.io/badge/Auth.js-3B82F6?style=flat-square&logo=auth0&logoColor=fff)
&nbsp;
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=fff)
&nbsp;
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=fff)
&nbsp;


#### AI / RAG  
![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=flat-square&logo=google&logoColor=fff)
&nbsp;
![RAG](https://img.shields.io/badge/RAG_(Retrieval_Augmented_Generation)-22C55E?style=flat-square&logo=brain&logoColor=fff)
&nbsp;


#### Widget / Infra  
![Chatbot Widget](https://img.shields.io/badge/Chatbot_Widget_(loader.js_&_widget.js)-FFB300?style=flat-square&logo=javascript&logoColor=000)
&nbsp;
![iframe Chat Window](https://img.shields.io/badge/iframe_Chat_Window-38B2AC?style=flat-square&logo=html5&logoColor=fff)
&nbsp;
![CDN Loading Script](https://img.shields.io/badge/CDN_Loading_Script-F97316?style=flat-square&logo=cdn&logoColor=fff)


#### Tools  
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=fff)
&nbsp;
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=000)
&nbsp;


<br>


# 🎯 Feature

* 로그인 및 회원가입 UI

  * 로그인 UI
    * 사용자는 이메일과 비밀번호 입력을 통해 본인의 계정으로 로그인할 수 있습니다.
    * 로그인·세션 관리·OAuth 인증 등을 쉽게 도와주는 Next.js 라이브러리인 Auth.js 와 데이터베이스인 Prisma를 연동하여 인증된 사용자만 대시보드에 접근하도록 설계되었습니다.
  
  * 회원 가입 UI
    * 이메일, 비밀번호, 전화번호를 입력하여 간단히 회원가입할 수 있습니다.
    * 비밀번호는 안전하게 해시 처리되며 Prisma DB에 저장됩니다.
    * 회원가입 후 자동으로 로그인 페이지로 리다이렉트되어 로그인 절차를 이어갈 수 있습니다.

* 사장님 관리 페이지 UI

  * 대화 목록
    * 방문자와 챗봇 간의 모든 대화 세션이 시간순으로 정리되어 표시됩니다.
    * 각 메세지 세션들은 방문자의 고유 visitorId로 식별됩니다.
    * 각 메세지 세션 클릭 시, 해당 방문자와의 상세 대화 내용이 오른쪽 영역에 렌더링됩니다.
    * 대화 내역은 Prisma DB에서 실시간으로 불러오며, 세션별로 자동 분리되어 관리됩니다.
    
  * AI 설정
    * 데스커 기본 설정 
      * 챗봇의 이름
        * 회사 이름으로 챗봇 이름을 설정할 수 있습니다. 챗봇 이름을 설정하면 바로 옆 UI에서 실시간으로 확인할 수 있습니다.
      * 회사 홈페이지 URL
        * 회사의 공식 홈페이지 주소를 입력하면, 해당 URL의 콘텐츠를 자동으로 크롤링 및 벡터화하여 학습합니다.
        * 학습 과정은 RAG(Retrieval Augmented Generation) 파이프라인으로 처리됩니다.
      * 역할 설명
        * 챗봇이 어떤 역할을 수행해야 하는지 서술할 수 있습니다. 
      * 키워드 답변 규칙
        * 특정 키워드가 포함된 질문에 대해 챗봇이 어떤 방식으로 응답할지를 정의할 수 있습니다.
      * 대화 규칙 설정
        * 챗봇의 전체적인 말투, 어조, 금지어 등을 설정합니다.
      * 데스커 AI 학습 버튼
        * 설정값 입력 후 ‘학습’ 버튼을 클릭하면 RAG 기반 크롤링 및 임베딩 프로세스가 시작됩니다.
        * 학습 상태는 “처리 중 → 완료”로 표시됩니다.
      
    * 간단 안내원 챗봇 설치
      * Web 설치하기
        * 학습이 완료되면 홈페이지 URL에 맞는 챗봇이 생성이 됩니다.
        * 챗봇 설치는 <script> 한 줄만 복사하여 자신의 웹사이트에 붙여넣으면 됩니다.
        * 챗봇은 data-bot-id 속성으로 구분되어, 각 사장님별 맞춤형 AI가 웹사이트에 표시됩니다.


* 챗봇 AI 
  * 웹사이트 챗봇 AI 설치
    * 관리자가 발급받은 <script> 한 줄을 자신의 웹사이트에 삽입하면 자동으로 챗봇 위젯이 활성화됩니다.
    * data-bot-id 속성을 기반으로 개별 챗봇이 연결되며, 방문자마다 고유한 세션이 생성됩니다.
    
  * 동작 구조
    * 실제 대화 UI
      * 홈페이지 방문자가 홈페이지에 설치 되어있는 챗본을 클릭하면 iframe 형태의 헤더, 메시지 목록, 입력창을 갖춘 실제 채팅창(ChatWindow)이 나타납니다.
    
    * 이전 대화 복원
      * 기존 대화 기록이 있는 방문객의 경우, 채팅창이 열릴 때 이전 메시지들이 자동으로 로드되어 표시됩니다.
    
    * 실시간 AI 대화
      * 메시지를 입력하고 전송하면, 실제 AI 모델(Gemini)이 생성하는 답변이 스트리밍으로 표시되고, 대화 내용은 DB에 저장됩니다.
  


<br>


# 🖥️ Development

### 1. 랜딩 페이지와 대시보드 UI 구조는 어떻게 설계, 구현했는가?
---
랜딩 페이지와 대시보드는 Next.js 기반의 라우팅 구조와 shadcn/ui 컴포넌트 시스템을 활용해 일관된 사용자 흐름과 재사용 가능한 UI로 설계·구현했습니다.

Desker 프로젝트는 홈페이지에 쉽게 챗봇을 붙일 수 있는 서비스를 목표로 했기 때문에 처음 접속한 사용자가 서비스를 이해하고 가입 → 로그인 → 챗봇 설정까지 빠르게 이어질 수 있는
명확하고 직관적인 UI 흐름이 필요했습니다.

하지만 초기에 UI를 구현할 때는 기능 구현 우선순위에 집중하다 보니 사용자 경험(UX)과 디자인 일관성 측면에서는 미흡한 부분이 있었습니다.
프로젝트 주요 기능(회원가입, 로그인, 챗봇 생성, 세션 관리 등)을 먼저 완성한 뒤 팀 회의에서 사용자 피드백을 바탕으로 UI·UX 개선 작업을 진행하기로 했습니다.

이에 따라 shadcn/ui를 도입하여 버튼, 카드, 사이드바, 입력폼 등 공통 디자인 시스템을 통일했고 전체적인 레이아웃 구조를 재정비했습니다.

#### 💬 사용자 피드백 요약

*	전반적인 레이아웃 및 공통 컴포넌트의 일관성 부족
  *	어드민 대시보드와 채팅방 간 디자인 톤앤매너 불일치
*	직관적이지 않은 버튼명 및 용어 사용
  *	데스커 AI 학습하기, AI 버튼, 수신함 등의 단어가 사용자 입장에서 명확하지 않음
*	로그아웃 버튼 노출 위치 개선 필요
  *	상단에 노출되어 있어 시각적 집중도가 분산됨 → 사이드바 설정 메뉴 내부로 이동 예정

#### 🎨 UI 개선 전후 비교

| Before | After |
|:--:|:--:|
| <img width="1426" height="739" alt="Before" src="https://github.com/user-attachments/assets/d5ad7178-c932-4b4b-9b8a-1b501c2745e9" /> | <img width="1300" height="743" alt="After" src="https://github.com/user-attachments/assets/e9e2b584-a20e-4c92-a48e-02d8a447b3fb" /> |

UI 통일 작업 이후, 사용자는 한눈에 각 메뉴의 역할을 구분할 수 있었고 대시보드 내 이동 경로 또한 훨씬 단순해졌습니다.
또한 디자인 통일을 시켜 동일한 색상, 간격, 그림자 규칙 적용을 하였습니다. 

<br>


### 2. 인증 흐름은 어떻게 설계하고, Edge 런타임 제약을 해결했는가?
---
Desker의 로그인·회원가입 기능은 단순히 로그인 후 대시보드로 이동하는 수준이 아니라 사장님 계정 → 챗봇 → 대화 세션 → 개별 메시지로 이어지는 데이터를 안전하게 연결해야 하는 구조로 설계되었습니다.
즉, 사용자가 로그인하면 자신의 챗봇과 그 안의 모든 대화 내역에만 접근할 수 있어야 하기 때문에 정확하고 안전한 인증 흐름이 매우 중요했습니다.

이를 위해 Next.js의 Auth.js 라이브러리를 사용해 로그인과 세션 관리를 구현했습니다. Auth.js는 로그인 상태 유지, OAuth 지원 등 인증에 필요한 로직을 자동으로 처리해 주어, 서버 코드를 간결하게 유지할 수 있습니다.
```tsx
import { signIn } from "@/auth"
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("Desker", { redirectTo: "/http://localhost:3000//dashboard/{user_id}/invoices/chatroom-sessions"})
      }}
    >
      <button type="submit">Sign in</button>
    </form>
  )
}
```

회원가입 시에는 입력된 이메일·전화번호의 중복 여부를 DB에서 검증하고, 비밀번호는 bcrypt로 암호화하여 안전하게 저장합니다.
또한 Zod를 통해 입력값 형식을 검증해 잘못된 데이터가 저장되지 않도록 했습니다.
회원가입이 완료되면 로그인 화면으로 자동 이동하여 즉시 새 계정으로 로그인할 수 있습니다.

개발 과정에서 예상치 못한 문제가 하나 있었습니다.
로그인 동작 중, 아래와 같은 Prisma 관련 오류(500 Internal Server Error) 가 발생한 것입니다.

```log
GET http://localhost:3000/ 500 (Internal Server Error)Understand this error
index.js:644 Uncaught Error: PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in ``).
If this is unexpected, please open an issue...
```


이 문제는 Edge 런타임 환경에서 Prisma가 실행되면서 생긴 충돌이었습니다.
Next.js 미들웨어는 “Edge 런타임”(브라우저와 유사한 경량 서버 환경)에서 실행되는데, Prisma는 “Node.js 전용”이기 때문에 Edge 환경에 포함되면 동작하지 않습니다.

이 문제를 해결하기 위해 인증 로직을 두 개의 파일로 분리했습니다. 
 - auth.server.ts → 로그인 검증, DB 조회 등 서버 전용 로직 담당
 - auth.edge.ts → 미들웨어에서 세션 토큰 확인 등 Edge 환경 전용 로직 담당
 
이렇게 역할을 나누면서, Edge 런타임에서도 충돌 없이 동작하고 안정적으로 로그인과 세션을 유지할 수 있는 인증 구조를 완성했습니다.

<br>



### 3. 챗봇 학습을 위한 크롤러는 왜 구현했는가?
---

Desker의 챗봇은 단순히 미리 정해진 문장만 대답하는 것이 아니라 사장님 홈페이지의 실제 내용을 이해하고 답변하는 AI 챗봇을 목표로 했습니다.
이를 위해서는 챗봇이 홈페이지의 여러 페이지(소개, 메뉴, 문의, 공지 등)를 모두 읽고 그 안의 정보를 스스로 학습할 수 있어야 했습니다.
이 역할을 담당하는 것이 바로 크롤러(Crawler) 입니다.

처음에는 외부에서 제공하는 크롤링 도구를 검토했지만 홈페이지 구조가 제각각이어서 원하는 정보만 정확히 추출하기 어려웠습니다.
그래서 Desker에서는 크롤러 기능을 직접 구현하게 되었습니다. 




<br>


# ⚠️ Suggestions

### UI 개선
	
*	현재 진행 상태를 시각적으로 표시하는 요소가 없습니다.
*	학습 중임을 나타내는 로딩 UI, 유효성 검사 시 에러 메시지 표시, 데이터 처리 중 로딩 인디케이터 등을 추가할 필요가 있습니다.

### UX 개선

* 회원가입 시 입력한 이메일이 본인 소유인지 확인할 수 있는 인증 절차가 필요합니다.
* 등록된 회사 홈페이지 URL이 실제 해당 사용자의 소유 도메인인지 검증하는 과정이 필요합니다.
* 챗봇 메시지 창이 초기 로딩 시 반응 속도가 느려, 사용자가 즉시 대화를 시작할 수 있도록 최초 렌더링 속도 개선이 필요합니다.

### 기능 개선
	
*	챗봇 위젯을 CDN 방식으로 배포하여, 외부 웹사이트에서도 간단히 삽입·적용할 수 있도록 해야 합니다.
* 이와 함께 정적 파일 전달 로직의 효율화가 필요합니다.
* 크롤링 시간이 짧아 일부 콘텐츠를 수집하지 못할 가능성이 있으므로, 크롤링 프로세스의 정확성과 지속성 검증이 필요합니다.
*	현재는 RAG 기반의 답변을 제공하지만, 홈페이지 내의 전체 정보를 더 포괄적으로 학습·응답할 수 있는 구조로 개선해야 합니다.
* 사용자가 챗봇 대화 중에 담당자에게 문의를 남길 수 있는 Form 작성 기능을 추가해야 합니다.



<br>




# 📆 Schedule

### 프로젝트 기간: 2025.08.18(월) ~ 2025.09.11(목)

* 1주차: 프로젝트 기획 및 설계  
* 2주차: 보일러플레이트, 대시보드 공통 레이아웃 UI, 데이터베이스 설정 및 스키마, AI SDK 설정 및 모델 연동
* 3주차: 챗봇 UI, 채팅방 API 연동, 웹 크롤링 API
* 4주차: 회원가입 API 구현,로그인 API 구현, 회원가입 UI, 로그인 UI


<br>


# 📝 Review

이번 Desker 프로젝트를 통해, 단순한 서비스 구현을 넘어 “서비스를 어떻게 구조화하고 확장 가능한 형태로 설계할 것인가” 에 대해 깊이 고민할 수 있었습니다.

백엔드와 프론트엔드가 유기적으로 연결되는 전체 구조를 직접 설계하면서, 단순 API 호출을 넘어 데이터 흐름과 상태 관리의 중요성을 체감했습니다. 또한 팀 프로젝트로서 어떻게 데이터의 형태나 방식이 오고가는지 미리 상의합의를 하면
프로젝트 진행 속도가 빨라질 것을 깨달았습니다.
또한 UI 컴포넌트 일관화하여 디자인 시스템을 통일시키고 컴포넌트를 재사용할 수 있게 기획하면 사용자 입장에서도 홈페이지에 대한 인식이 편할 것이라 생각했습니다

조금 아쉬운점은 프로젝트 초반에는 기능 구현 우선으로 진행하다 보니, UI/UX 측면에서 사용자 경험이 충분히 고려되지 못했습니다. 또한 백엔드와 프론트엔드의 주고 받는 데이터의 구조를 파악하는데 있어서
이해하는데 시간을 소모하여 나중에 프로젝트를 합칠때 연결하는 작업의 시간이 많이 소모되었습니다. 
그리고 사용자는 해피케이스로만 사용을 하는게 아니라는 것을 매우 느끼며 모든 오류처리 및 잘못된 접근들을 막아두고 이에 해당하는 메세지를 사용자에게 전달해야 한다고 생각했습니다.


  
<br>



