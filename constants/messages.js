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

  // 성공
  QUESTION_PROVIDED: "질문 제공 성공",
  ALL_QUESTIONS_ANSWERED: "모든 질문에 답변했습니다",
  // 500
  QUESTION_PROVIDE_FAILED: "질문 제공 중 예기치 않은 오류 발생",

  // Answer

  // 성공
  ANSWER_CREATED: "응답 저장 완료",
  ANSWER_FETCHED_ALL: "응답 목록 조회 성공",
  ANSWER_LIST_EMPTY: "응답 목록이 비어 있습니다.",
  ANSWER_MONTHLY_FETCHED: "월별 응답 목록 조회 성공",
  ANSWER_THIS_MONTH_LIST_EMPTY: "해당 월에는 응답이 없습니다.",
  ANSWER_SUMMARY_FETCHED: "응답 간단 조회 성공",
  ANSWER_FETCHED_DETAIL: "응답 상세 조회 성공",
  ANSWER_UPDATED: "응답 수정 완료",
  ANSWER_NO_UPDATE_FIELD: "수정할 필드가 없어 기존 응답을 반환합니다.",
  ALL_QUESTIONS_ANSWERED: "모든 질문에 답변했습니다.",
  QUESTION_PROVIDED: "질문 제공 성공",
  ANSWER_FETCHED_TODAY: "오늘의 질문과 응답 조회 성공",
  ANSWER_DRAFT_SAVED: "임시 응답 저장 완료",
  // 400
  ANSWER_VALIDATION_FAILED: "필수 입력값이 누락되었습니다.",
  ANSWER_QUERY_VALIDATION_FAILED: "year 또는 month가 누락되었습니다.",
  ANSWER_NOT_FOUND: "해당 응답을 찾을 수 없습니다.",
  // 500
  ANSWER_CREATE_FAILED: "응답 저장 중 예기치 않은 오류 발생",
  ANSWER_FETCH_ALL_FAILED: "응답 조회 중 예기치 않은 오류 발생",
  ANSWER_FETCH_MONTHLY_FAILED: "월별 응답 목록 조회 중 예기치 않은 오류 발생",
  ANSWER_FETCH_SUMMARY_FAILED: "응답 간단 조회 중 예기치 않은 오류 발생",
  ANSWER_FETCH_DETAIL_FAILED: "응답 상세 조회 중 예기치 않은 오류 발생",
  ANSWER_UPDATE_FAILED: "응답 수정 중 예기치 않은 오류 발생",
  ANSWER_DELETE_FAILED: "응답 삭제 중 예기치 않은 오류 발생",
  ANSWER_DRAFT_SAVE_FAILED: "응답 저장 중 예기치 않은 오류 발생",
  ANSWER_FETCH_TODAY_FAILED: "오늘의 응답 조회 중 예기치 않은 오류 발생",

  // Auth

  // 성공
  AUTH_KAKAO_SUCCESS: "카카오 로그인 성공",
  // 401
  AUTH_KAKAO_UNAUTHORIZED: "카카오 인증에 실패했습니다.",
  AUTH_UNAUTHORIZED: "인증되지 않은 사용자입니다.",
  // 500
  AUTH_KAKAO_FAILED: "카카오 로그인 처리 중 예기치 않은 오류 발생",

  // Photo

  // 성공
  PHOTO_PROFILE_UPLOADED: "프로필 사진 업로드 완료",
  PHOTO_ANSWER_UPLOADED: "응답 사진 업로드 완료",
  PHOTO_PAR_FETCHED: "사진 보기 링크(PAR) 발급 성공",
  // 400
  PHOTO_VALIDATION_FAILED: "사진 파일이 필요합니다.",
  // 404
  PHOTO_NOT_FOUND: "사진을 찾을 수 없습니다.",
  // 500
  PHOTO_UPLOAD_FAILED: "사진 업로드 중 오류가 발생했습니다.",
  PHOTO_PAR_FAILED: "사진 보기 링크(PAR) 발급 실패",
};
