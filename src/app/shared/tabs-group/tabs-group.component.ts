import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tabs-group',
  templateUrl: './tabs-group.component.html',
  styleUrls: ['./tabs-group.component.scss']
})
export class TabsGroupComponent implements OnInit {
  public show = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUserStatus().subscribe(isSignIn => {
      console.log('User status published', isSignIn);
      this.show = isSignIn;
    });
  }

}
