import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidations } from './custom-validations';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  status: [string, string, string] = ['stable', 'critical', 'finished'];
  project: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.project = new FormGroup({
      projectName: new FormControl(
        null,
        [Validators.required, CustomValidations.invalidProjectName],
        CustomValidations.asyncInvalidProjectName
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl('stable'),
    });
  }

  onSaveProject() {
    console.log(this.project.value);
  }
}
