import * as fs from 'node:fs';
import { convertToDate } from './date-formatter.js';

const jsonParser = (data, filename = 'text') => {
  console.log(filename);
  // fs.writeFileSync(`${filename}.json`, JSON.stringify(data));
};

const simpleLogger = (msg, tagArray) => {
  const dir = './logs';

  if (!fs.existsSync(dir)) {
    // 如果沒有這個路徑，建立建資料夾
    fs.mkdir('logs', function (err) {
      console.error(err);
    });
  }

  let logTagName = `[${tagArray.join('][')}]`;
  const {
    Y: years,
    M: month,
    D: date,
    h: hour,
    m: minute,
    s: second,
  } = convertToDate(new Date());

  // 寫入 log
  fs.writeFile(
    `logs/${years}${month}${date}.log`,
    `[${hour}:${minute}:${second}]${logTagName} ${msg}\n`,
    {
      flag: 'a',
    },
    (error) => {
      if (error) {
        console.error(err);
      } else {
        console.log('Write operation complete.');
      }
    }
  );
};

export { jsonParser, simpleLogger };
