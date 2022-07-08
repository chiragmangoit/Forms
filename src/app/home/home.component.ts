import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { interval, observable, Observable, Subscription } from 'rxjs';
import { count } from 'rxjs-compat/operator/count';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { User } from '../data.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  usersData:User[];
  subscription: Subscription;
  editMode: boolean = false;
  constructor(
    private userservice: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userservice.dataUpdated.subscribe((data) => {
      this.usersData = data;
    });
    this.usersData = this.userservice.getData();    
  }
  onDelete(index: number) {
    this.userservice.deleteData(index);
  }
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
} 
