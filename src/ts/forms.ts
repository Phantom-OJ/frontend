import {Filter} from "@/ts/interfaces";

export interface LoginForm {
  username: string
  password: string

  // timestamp: number
}

export interface SignUpForm {
  username: string
  password: string
  nickname: string
  verifyCode: string
}

export interface SignOutForm {

}

export interface ResetForm{
  username:string
  password:string
  vCode:string
}

export interface PageSearchFrom {
  start: number
  end: number
  filter?: Filter
}
