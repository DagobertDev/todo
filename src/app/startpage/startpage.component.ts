import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html'
})
export class StartpageComponent implements OnInit {
  user: User

  constructor(private authService: AuthenticationService) {
    this.authService.user.subscribe(u => this.user = u);
  }

  ngOnInit() {
  }

}
