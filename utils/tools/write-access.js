import * as fs from 'node:fs';

export const jsonParser = (data, filename = 'text') => {
  fs.writeFileSync(`${filename}.json`, JSON.stringify(data));
};
