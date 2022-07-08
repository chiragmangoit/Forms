import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "./data.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  userData: User[] = [];
  constructor(private http: HttpClient) {}
  dataUpdated = new Subject<User[]>();
  getData() {
    this.http
      .get<{ [key: string]: User }>(
        "https://getting-started-http-default-rtdb.firebaseio.com/posts.json"
      )
      .pipe(
        map((responseData) => {
          const user:User[] = []
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              user.push({ ...responseData[key], id: key });
            }
          }
          return user;
        })
      )
      .subscribe((data) => {
        this.userData = data;
      });
    return this.userData;
  }

  getUserData(id: number) {
    return this.userData[id];
  }
  addData(newUserInfo: User) {
    this.http
      .post(
        "https://getting-started-http-default-rtdb.firebaseio.com/posts.json",
        newUserInfo
      )
      .subscribe();
  }

  updateData(index: number, newUserData: User) {
    this.userData[index] = newUserData;
    this.dataUpdated.next(this.userData.slice());
  }

  deleteData(index: number) {
    this.userData.splice(index, 1);
    this.dataUpdated.next(this.userData.slice());
  }

  activatedEmitter = new Subject<boolean>();
}
