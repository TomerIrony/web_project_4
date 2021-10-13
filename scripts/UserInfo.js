export default class UserInfo {
  constructor(userName, userJob, avatar) {
    this._userName = userName;
    this._userJob = userJob;
    this._avatar = avatar;
  }

  getUserInfo() {
    const userName = this._userName.textContent;
    const userJob = this._userJob.textContent;
    const userInfo = { userName, userJob };
    return userInfo;
  }

  setUserInfo(name, job, avatar) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
    this._avatar.src = avatar;
  }
}
