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
  // email: string = '';
  // password: string = '';
  registerMode = false;
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
      this.router.navigateByUrl('/members');
      this.toastr.success('You are logged in', 'Congratulations!')
    }, error => {
      console.log(error);
    })
  }

  // signInWithGoogle() {
  //   this.auth.googleSignIn();
  // }

  // login() {
  //   if (this.email == '') {
  //     alert('Please enter email');
  //     return;
  //   }

  //   if (this.password == '') {
  //     alert('Please enter password');
  //     return;
  //   }

  //   this.auth.login(this.email, this.password);

  //   this.email = '';
  //   this.password = '';
  // }

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
