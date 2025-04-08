function formatToKST(date) {
  if (!date) return null;

  // 한국 시간 기준으로 변환
  const kstDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));

  // YYYY-MM-DD 형식으로 변환
  const year = kstDate.getFullYear();
  const month = String(kstDate.getMonth() + 1).padStart(2, "0");
  const day = String(kstDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

module.exports = formatToKST;
