export default class UserInfo {
  constructor(userName, userJob) {
    this._userName = userName;
    this._userJob = userJob;
  }

  getUserInfo() {
    const userName = this._userName.textContent;
    const userJob = this._userJob.textContent;
    const userInfo = { userName, userJob };
    return userInfo;
  }

  setUserInfo(name, job) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
  }
}
