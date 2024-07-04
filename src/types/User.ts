export interface IUser {
  login: IUserLogin;
  name: IUserName;
  email: string;
  gender: string;
}

interface IUserName {
  first: string;
  last: string;
}

interface IUserLogin {
  uuid: string;
}
