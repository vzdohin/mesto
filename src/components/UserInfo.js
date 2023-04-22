export default class UserInfo {
  constructor({nameSelector, aboutInfoSelector}){
    this._userName = document.querySelector(nameSelector);
    this._aboutInfo = document.querySelector(aboutInfoSelector);

  }
  getUserInfo () {
    return {
      name: this._userName.textContent,
      info: this._aboutInfo.textContent
    }

  }
  setUserInfo({name, info}){
    this._userName.textContent = name;
    this._aboutInfo.textContent = info
  }
}