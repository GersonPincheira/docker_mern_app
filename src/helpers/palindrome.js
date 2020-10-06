const isPalindrome = (str) => {
  if (str.length == 1) return false;
  const s = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[\W_]/g, "");
  return s === [...s].reverse().join("");
};

module.exports = isPalindrome;
