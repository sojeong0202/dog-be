module.exports = {
  // Dog

  // 성공
  DOG_CREATED: "강아지 등록 완료",
  DOG_UPDATED: "강아지 수정 완료",
  DOG_FETCHED: "강아지 조회 성공",
  // 400
  DOG_CREATE_VALIDATION_FAILED: "입력값이 올바르지 않습니다.",
  // 404
  DOG_NOT_FOUND: "등록된 강아지가 없습니다.",
  DOG_NOT_FOUND_FOR_UPDATE: "수정할 강아지 정보가 없습니다.",
  DOG_NOT_FOUND_FOR_DELETE: "삭제할 강아지 정보가 없습니다.",
  // 500
  DOG_CREATE_FAILED: "강아지 추가 중 예기치 않은 오류 발생",
  DOG_FETCHED_FAILED: "강아지 정보 조회 중 예기치 않은 오류 발생",
  DOG_UPDATE_FAILED: "강아지 수정 중 예기치 않은 오류 발생",
  DOG_DELETE_FAILED: "강아지 삭제 중 예기치 않은 오류 발생",

  // User

  // 성공
  USER_UPDATED: "프로필 수정 완료",
  USER_FETCHED: "사용자 정보 조회 성공",
  // 404
  USER_NOT_FOUND: "사용자를 찾을 수 없습니다.",
  // 500
  USER_FETCHED_FAILED: "사용자 정보 조회 중 예기치 않은 오류 발생",
  USER_UPDATE_FAILED: "프로필 수정 중 예기치 않은 오류 발생",

  // Question

  QUESTION_PROVIDE_FAILED: "질문 제공 중 예기치 않은 오류 발생",
  QUESTION_PROVIDED: "질문 제공 성공",
  ALL_QUESTIONS_ANSWERED: "모든 질문에 답변했습니다!",

  // Auth

  // 성공
  AUTH_KAKAO_SUCCESS: "카카오 로그인 성공",
  // 401
  AUTH_KAKAO_UNAUTHORIZED: "카카오 인증에 실패했습니다.",
  AUTH_UNAUTHORIZED: "인증되지 않은 사용자입니다.",
  // 500
  AUTH_KAKAO_FAILED: "카카오 로그인 처리 중 예기치 않은 오류가 발생했습니다.",
};
