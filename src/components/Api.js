export default class Api {
  constructor({url, headers}){
    this._url= url;
    // this._id= config.id;
    this._headers = headers
  }

  getAllCards(){
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
      
    })
    .then((res)=> res.json())
  }
  addNewCard(name, link){
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({name,link})
    })
    .then((res)=> {return res.ok
      ? res.json() 
      : Promise.reject(`Ошибка ${res.status}`)
    })
  }
  getUserInfo(){
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then((res)=> res.json())
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
    .then((res)=> res.json())
    
  }
  

  deleteCard(cardId){
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      
    })
    .then((res)=> res.json())
  }
  changeAvatar(data){
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.cardUrlInput,
      })
    })
    .then((res)=> res.json())
   
  }
  likeCard(cardId){
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      
    })
    .then((res)=> res.json())
  }
  removeLikeCard(cardId){
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      
    })
    .then((res)=> res.json())
  }
  
}