/**
 * RegExp /[！-～]/g 頭到尾會比對到的「全形」 Unicode character
 * RegExp /[!-~]/g 頭到尾會比對到的「半形」 Unicode character
 * 0xfee0 「半形頭尾 Unicode character (含空白)」與「全形頭尾 Unicode character (含空白)」之間的差值，為 10進制 65248，這裡再轉成 16 進制
 *
 * String.prototype.codePointAt() 將一個文字符號轉換成 `十進制` 的 Unicode 碼點
 * .toString(16) 將十進制結果轉成 16進制
 * String.prototype.fromCodePoint() 可接受一個指定的 Unicode 值，然後返回一個字元串。
 *
 * @param {*} text
 * @returns
 */

const convertToTextHalfWidth = (text) => {
  const regexp = /[！-～]/g;

  return text.replace(regexp, (fullWidthText) => String.fromCodePoint(fullWidthText.codePointAt(0) - 0xfee0));
};

const convertToTextFullWidth = (text) => {
  const regexp = /[!-~]/g;

  return text.replace(regexp, (halfWidthText) => String.fromCharCode(halfWidthText.charCodeAt(0) + 0xfee0));
};

export { convertToTextHalfWidth, convertToTextFullWidth };
