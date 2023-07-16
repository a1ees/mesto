
export default class UserInfo {
  constructor({userName, userProfession}) {
    this._userName = document.querySelector(userName);
    this._userProfession = document.querySelector(userProfession);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      profession: this._userProfession.textContent
    }
  }

  setUserInfo(name, profession) {
    this._userName.textContent = name.value;
    this._userProfession.textContent = profession.value;
  }
}