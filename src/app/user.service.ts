import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://ecommerce.tjcg.in/api/v1/'
  constructor(public http: HttpClient) { }


  login(data: any) {
    return this.http.post(this.url + 'login', data);
  }

  logout(data: any) {
    return this.http.post(this.url + 'logout', data);
  }

  forget_password(data: any) {
    return this.http.post(this.url + 'resetpassword', data);
  }

  getHomeData(data, header) {
    return this.http.post(this.url + 'subcategories', data, header);
  }

  getCategoryData(data, header) {
    return this.http.post(this.url + 'product', data, header);
  }

  getproductDetails(data, header) {
    return this.http.post(this.url + 'product_detail', data, header);
  }

  addTocartItems(data, header) {
    return this.http.post(this.url + 'add_to_cart', data, header);
  }

  viewCart(data, header) {
    return this.http.post(this.url + 'view_cart', data, header);
  }

  updateCart(data, header) {
    return this.http.post(this.url + 'update_cart', data, header);
  }

  placeOrder(data, header) {
    return this.http.post(this.url + 'place_order', data, header);
  }
  pastOrders(data, header) {
    return this.http.post(this.url + 'view_all_orders', data, header);
  }

  pastOrderById(data, header) {
    return this.http.post(this.url + 'view_order', data, header);
  }

  
  reOrderProduct(data, header) {
    return this.http.post(this.url + 'reorder', data, header);
  }

  todayPrice(data, header) {
    return this.http.post(this.url + 'user_last_orders', data, header);
  }

  cancelOrder(data, header) {
    return this.http.post(this.url + 'cancel_order', data, header);
  }

  deleteOrder(data, header) {
    return this.http.post(this.url + 'remove_cart', data, header);
  }

  // happy users

  getHappyUserList(header) {
    return this.http.get(this.url + 'happy_users', header);
  }
} 
