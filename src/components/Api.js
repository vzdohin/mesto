export default class Api {
  constructor({url, headers}){
    this._url= url;
    // this._id= config.id;
    this._headers = headers
  }
  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
}
  getAllCards(){
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
      
    })
    .then((res)=>this._getResponseData(res))
  }
  addNewCard(name, link){
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({name,link})
    })
    .then((res)=>this._getResponseData(res))
  }
  getUserInfo(){
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then((res)=>this._getResponseData(res))
  }
  addNewUserInfo(userInfo){
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about
      })
    })
    .then((res)=>this._getResponseData(res))
    
  }
  

  deleteCard(cardId){
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      
    })
    .then((res)=>this._getResponseData(res))
  }
  changeAvatar(data){
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatarUrlInput,
      })
    })
    .then((res)=>this._getResponseData(res))
   
  }
  likeCard(cardId){
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
    .then((res)=>this._getResponseData(res))
  }
  removeLikeCard(cardId){
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then((res)=>this._getResponseData(res))
  }
  
}