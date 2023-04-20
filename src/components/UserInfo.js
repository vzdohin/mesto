export default class UserInfo {
  constructor({nameSelector, aboutInfoSelector}){
    this._userName = document.querySelector(nameSelector);
    this._aboutInfo = document.querySelector(aboutInfoSelector);

  }
  getUserInfo = () => {
    return {
      userName: this._userName.textContent,
      aboutInfo: this._aboutInfo.textContent
    }

  }
  setUserInfo(newUserName, newAboutInfo){
    this._userName.textContent = newUserName;
    this._aboutInfo.textContent = newAboutInfo
  }
}