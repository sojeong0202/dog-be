function formatToKST(date) {
  if (!date) return null;
  return new Date(date).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
  });
}

module.exports = formatToKST;
