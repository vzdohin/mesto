export default class UserInfo {
  constructor({nameSelector, aboutInfoSelector, userAvatarSelector}){
    this._userName = document.querySelector(nameSelector);
    this._aboutInfo = document.querySelector(aboutInfoSelector);
    this._userAvatar = document.querySelector(userAvatarSelector)
  }
  getUserInfo () {
    return {
      name: this._userName.textContent,
      info: this._aboutInfo.textContent
    }

  }
  setUserInfo(data){
    this._userName.textContent = data.name;
    this._aboutInfo.textContent = data.about;
    
  }
  setUserAvatar(data){
    // this._userAvatar.style.backgroundImage = `url(${userAvatar})`
  this._userAvatar.src = data.avatar
  }
}