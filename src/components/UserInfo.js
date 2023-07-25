
export default class UserInfo {
  constructor({name, about, avatar}) {
    this._userName = document.querySelector(name);
    this._userProfession = document.querySelector(about);
    this._userAvatar = document.querySelector(avatar)
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userProfession.textContent,
    }
  }

  setUserInfo(values) {
    this._userName.textContent = values.name;
    this._userProfession.textContent = values.about;
  }

  setUserAvatar(values) {
    this._userAvatar.src = values.avatar;
  }
}