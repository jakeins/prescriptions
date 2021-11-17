import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public form = this.formBuilder.group({
    email: ['', Validators.required],
    pwd: ['', Validators.required],
  });


  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

}
