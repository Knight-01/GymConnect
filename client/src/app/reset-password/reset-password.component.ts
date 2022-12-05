import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  @Output() cancelPasswordReset = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cancel() {
    this.cancelPasswordReset.emit(false);
    this.router.navigate(['/']);
  }

}
