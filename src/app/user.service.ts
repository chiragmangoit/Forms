import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData:{}[] = [];
  constructor() { }
  dataUpdated = new Subject<{}[]>();
  getData() {
    return this.userData.slice();
  }

  getUserData(id:number) {
    return this.userData[id];
  }
  addData(newUserInfo:object) {
    this.userData.push(newUserInfo);
  }

  updateData(index:number,newUserData:object) {
    this.userData[index] = newUserData;
    this.dataUpdated.next(this.userData.slice());
  }

  activatedEmitter = new Subject<boolean>();
}
