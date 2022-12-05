import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  user: any;
  loggedIn: boolean;
  faCoffee = faCoffee;
  model: any = {};
  demo: any = {username: "lisa", password: "Pa$$w0rd"}


  constructor(public accountService: AccountService,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

  }


  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }


  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigate(['/members']);
      this.toastr.success('You are logged in', 'Welcome!')
    }, error => {
      console.log(error);
    })
  }

  demoLogin() {
    this.accountService.login(this.demo).subscribe(response => {
      this.router.navigateByUrl('/members');
      this.toastr.success('You are logged in');
    }, error => {
      console.log(error);
    })

  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
