export const URL_INFO = {
  SERVER_BASE_URL: "http://localhost:3000",
};

export const TTL_INFO = {
  SESSION_STORAGE_VISITOR: 7 * 24 * 60 * 60,
};

export const RAG_SETTINGS = {
  CHUNK_SIZE: 1000,
  CHUNK_OVERLAP: 200,
  BATCH_SIZE: 100,
};

export const CHATBOT_DFAULT_VALUE = {
  NAME: "데스커 안내원",
  COMPANY_URL: "https://www.naver.com",
  ROLE_DESCRIPTION:
    "데스커는 회사에 관련된 모든 질문에만 답변해주는 안내원이야. 부드럽지만, 자신감있고, 상냥한 말투로 항상 존댓말로 대답해줘.",
  CONVERSATION_RULE:
    "만약 '담당자', '메시지 남겨줘' 와 같은 내용이 질문이 있으면 담당자에게 문의남기기 버튼을 보여줘",
  KEYWORD_REPLY_RULE:
    "회사정보에 벗어난 질문을 하게 되면 '죄송합니다. 자사의 관련된 정보 외에는 답변을 드리기 어렵습니다' 라고 답변해줘",
};

export const ERROR_MESSAGE = {
  NOT_FOUND_BOTID_VISITORID: "해당 봇이나 방문객을 찾을 수 없습니다",
  NOT_FOUND_USERID: "User ID 필수 요청사항 입니다.",
  CHATBOT_NOT_FOUND: "소유한 챗봇을 찾을 수 없습니다",
  SESSION_NOT_FOUND: "조회한 채팅방이 없습니다",
  INVALID_MESSAGES: "유효하지 않는 채팅 메시지 입니다.",
  INTERNAL_SERVER_ERROR_SESSION: "새로운 채팅방 생성하는데 실패했습니다",
  INTERNAL_SERVER_ERROR_CHATBOT: "챗봇 조회하는데 서버 에러가 났습니다",
  INTERNAL_SERVER_ERROR_CHATBOT_CREATION:
    "챗봇 생성하는데 서버 에러가 났습니다",
  INTERNAL_SERVER_ERROR_CHATBOT_UPDATE:
    "챗봇 학습 정보 업데이트하는데 서버 에러가 났습니다",
  LOGIN_REQUIRED: "로그인이 필요합니다.",
  CHAT_LIST_FETCH_FAILURE: "대화목록 조회가 실패하였습니다.",
  MESSAGE_FETCH_FAILURE: "상세 대화 조회가 실패하였습니다.",
  INQUIRIES_LIST_FETCH_FAILURE:
    "방문자 문의 리스트를 불러오는데 서버 에러가 발생했습니다.",
  USER_NOT_FOUND: "사용자 정보를 찾을 수 없습니다.",
  INTERNAL_SERVER_ERROR_USER_UPDATE:
    "사용자 정보 업데이트하는데 서버 에러가 났습니다.",
  CURRENT_PASSWORD_MISMATCH: "현재 비밀번호가 일치하지 않습니다.",
  INVALID_REQUEST: "유효하지 않은 요청입니다.",
  USER_FETCH_FAILURE: "사용자 정보 불러오기 실패:",
  USER_INIT_FAILURE: "사용자 정보 초기화 실패 에러",
  PHONE_UPDATE_ERROR: "전화번호 업데이트 중 에러:",
  PASSWORD_CHANGE_ERROR: "비밀번호 변경 중 에러:",
};

export const SUCCESS_MESSAGE = {
  MESSAGE_FETCH: "대화 조회하였습니다.",
};

export const SIDE_BAR_TOOLTIP_MESSAGE = {
  SESSIONS_LIST: "대화 목록",
  VISITOR_CONTACT: "방문자 연락처",
  AI_SETTING: "AI 설정",
  PERSONAL_SETTINGS: "개인 설정",
};

export const HEADER_BAR_DEATAIL_MESSAGE = {
  SESSIONS_LIST:
    "방문자와 나눈 모든 대화 세션을 확인할 수 있습니다. 필요한 세션을 선택해 상세 메시지를 열람하세요.",
  VISITOR_CONTACT:
    "방문자가 남긴 문의와 연락처 정보를 관리할 수 있습니다. 빠른 대응을 위해 연락처 정보를 확인하세요.",
  AI_SETTING:
    "AI 챗봇의 관련 설정을 할 수 있습니다. URL을 등록해 챗봇이 최신 정보를 학습하도록 설정해 보세요.",
  PERSONAL_SETTINGS:
    "계정과 사용자 정보를 관리할 수 있습니다. 개인 설정을 조정하세요.",
};

export const SIGNUP_STATUS = {
  SUCCESS: {
    CREATED: "회원가입이 성공적으로 완료되었습니다.",
  },
  ERROR: {
    INVALID_INPUT:
      "입력값이 올바르지 않습니다. 이메일, 비밀번호, 전화번호를 다시 확인해주세요.",
    EMAIL_ALREADY_EXISTS: "이미 등록된 이메일입니다.",
    PASSWORD_TOO_SHORT: "비밀번호는 최소 8자 이상이어야 합니다.",
    PHONE_INVALID: "올바른 전화번호 형식이 아닙니다.",
    SERVER_ERROR: "회원가입 처리 중 서버 에러가 발생했습니다.",
    NOT_SEND_EMAIL: "이메일의 발송 처리가 실패하였습니다.",
  },
};

export const AUTH_VALIDATION = {
  MESSAGES: {
    EMAIL_INVALID: "유효한 이메일 주소를 입력해주세요.",

    PASSWORD_TOO_SHORT: "비밀번호는 최소 8자 이상이어야 합니다.",
    PASSWORD_TOO_LONG: "비밀번호는 최대 72자까지 가능합니다.",

    PHONE_TOO_SHORT: "전화번호가 너무 짧습니다.",
    PHONE_TOO_LONG: "전화번호가 너무 깁니다.",
  },
};

export const EMAIL_VERIFY = {
  RANDOM_BYTES_NUMBER: 32,
  HASH_NUMBER: 12,
};

export const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

export const EMAIL_TEMPLATE = {
  TITLE: "Desker AI 이메일 인증",
  DESCRIPTION: "아래 url을 누르면 이메일 인증이 완료됩니다.",
  LINK_TEXT: "이메일 인증",
  AGAIN_AUTH_TEXT: "링크가 동작하지 않으면 회원가입 후 다시 인증해주세요.",
};

export const EMAIL_SEND_ROUTE = {
  FROM: "Desker AI <onboarding@resend.dev>",
  TEST_TO: "taehunkim.builds@gmail.com",
  SUBJECT: "Desker AI 이메일 인증 링크",
};

export const SALT_ROUNDS = 12;
