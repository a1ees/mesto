
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

  setUserInfo(inputName, inputInfo) {
    this._userName.textContent = inputName.value;
    this._userProfession.textContent = inputInfo.value;
  }
  
}