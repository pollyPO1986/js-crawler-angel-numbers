/**
 * 指定撈取的數字 mapping list
 */

function _getRepeatString(int, length = 10) {
  return Array(length)
    .fill(0)
    .map((item, index) => (index + '').repeat(int));
}

const angelNumberCategory = {
  oneDigits: _getRepeatString(1),
  twoDigit: _getRepeatString(2),
  threeDigits: _getRepeatString(3),
  fourDigit: _getRepeatString(4),
};

const angelNumberList = Object.values(angelNumberCategory).reduce((result, current) => {
  return result.concat(current);
});

export default angelNumberList;
