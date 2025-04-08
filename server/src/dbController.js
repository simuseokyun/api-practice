// 이 파일은 db에 있는 데이터들에 접근할 수 있게 하는 파일

import fs from 'fs'; // fs는 node.js에 있는 파일 시스템 메서드들
import { resolve } from 'path'; // resolve는 주어진 경로 인수들을 절대 경로로 변환하는 기능

const basePath = resolve();
// 현재 작업 디렉토리는 터미널에 npm start가 실행되는 곳이다. 혼동하지 말 것

const filenames = {
  messages: resolve(basePath, 'src/db/messages.json'),
  users: resolve(basePath, 'src/db/users.json'),
};

export const readDB = (target) => {
  try {
    return JSON.parse(fs.readFileSync(filenames[target], 'utf-8')); // utf-8 은 인코딩 방식,
    // readFileSync는 동기적으로 실행된다. 초기 설정에 주로 사용
  } catch (err) {
    console.error(err);
  }
};

export const writeDB = (target, data) => {
  try {
    return fs.writeFileSync(filenames[target], JSON.stringify(data)); // db에 값을 추가하는 것이므로 JSON형태로 보내줘야 한다.
  } catch (err) {
    console.error(err);
  }
};
