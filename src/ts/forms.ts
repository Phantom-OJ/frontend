import {Filter} from "@/ts/interfaces";

export class LoginForm {
  username: string
  password: string

  // timestamp: number

  constructor({username, password, timestamp}: { username: string, password: string, timestamp: number }) {
    this.username = username;
    this.password = password;
    // this.timestamp = timestamp;
  }
}

export class SignUpForm {
  username: string
  password: string
  nickname: string
  vCode: string

  constructor({username, password, nickname, vCode}: { username: string, password: string, nickname: string, vCode: string }) {
    this.username = username;
    this.password = password;
    this.nickname = nickname;
    this.vCode = vCode;
  }
}

export class SignOutForm {

}

export class PageSearchFrom {
  start: number
  end: number
  filter?: Filter

  constructor({start, end, filter}: { start: number, end: number, filter?: Filter }) {
    this.start = start;
    this.end = end;
    this.filter = filter;
  }
}
