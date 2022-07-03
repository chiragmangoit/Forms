import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserService } from '../user.service';
import { CustomValidations } from './custom-validations';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  regForm:FormGroup;
  editMode: boolean = false;
  id: number;
  dropdownList: string[] = [];
  dropdownSettings: IDropdownSettings = {};
  genders: string[] = ['male', 'female'];
  hobbies: any = [
    {
      id: 1,
      name: 'singing',
      selected: false,
    },
    {
      id: 2,
      name: 'dancing',
      selected: false,
    },
    {
      id: 3,
      name: 'reading',
      selected: false,
    },
  ];
  profession: string[] = [
    'Chiropractor',
    'Dentist',
    'Optometrist',
    'Developer',
    'Tester',
  ];
  contact: any = [
    {
      id: 1,
      contactName: '',
      contactNumber: '',
    },
  ];

  user: object = {
    name: '',
    email: '',
    gender: '',
    dob: '',
    dp: '',
    hobbies: [],
    phoneNum: '',
    qualification: [],
    profession: '',
    description: '',
    contacts: [] ,
  };

  constructor(
    private userDataService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dropdownList = ['MCA', 'BCA', 'B.tech', 'M.tech', 'B.Com'];
    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: false,
    };
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });

    this.regForm = new FormGroup({
      userDataOne: new FormGroup({
        name: new FormControl(null,Validators.required),
        email: new FormControl(null,[Validators.required, Validators.email]),
        gender: new FormControl(null,Validators.required),
        dob: new FormControl(null,Validators.required)
      }),
      userDataTwo:new FormGroup({
        dp:new FormControl(null, Validators.required),
        hobbies:new FormArray(null, Validators.required),
        phoneNum:new FormControl(null, Validators.required),
      }),
      userDataThree:new FormGroup({
        qualification:new FormArray(null, Validators.required),
        description:new FormControl(null, Validators.required),
        contacts:new FormArray(null, Validators.required),
      })
    })
  }

  initForm() {
    if (this.editMode) {
      const newUserData = this.userDataService.getUserData(this.id);
      const selectedHobby: string[] = newUserData['hobbies'];
      this.fetchSelectedHobby(selectedHobby);
      this.user['name'] = newUserData['name'];
      this.user['email'] = newUserData['email'];
      this.user['gender'] = newUserData['gender'];
      this.user['dob'] = newUserData['dob'];
      this.user['phoneNum'] = newUserData['phoneNum'];
      this.user['qualification'] = newUserData['qualification'];
      this.user['profession'] = newUserData['profession'];
      this.user['description'] = newUserData['description'];
      this.contact = newUserData['contacts'];
    }
  }

  getSelectedHobby(): string[] {
    const selectedHobby = [];
    for (let e of this.hobbies) {
      if (this.regForm.value.userDataTwo[e.id]) {
        selectedHobby.push(e.name);
      }
    }
    return selectedHobby;
  }

  fetchSelectedHobby(selectedHobby: string[]) {
    for (let e of selectedHobby) {
      for (let f of this.hobbies) {
        if (e == f['name']) {
          f['selected'] = true;
        }
      }
    }
  }

  onAddContacts() {
    this.contact.push({
      id: this.contact.length + 1,
      contactName: '',
      contactNumber: '',
    });
  }

  onRemoveContacts(index: number) {
    this.contact.splice(index, 1);
  }
  onSubmit() {
    this.user['hobbies'] = this.getSelectedHobby();
    this.user['contacts'] = this.contact
    if (!this.editMode) {
      this.userDataService.addData(this.user);
    } else {
      this.userDataService.updateData(this.id, this.user)
    }
    this.router.navigate(['/home'], { relativeTo: this.route });
  }
}
