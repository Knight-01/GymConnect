import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/members'])
    }, err => {
      alert(err.message);
      this.router.navigate(['/home']);
    })
  }

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      alert('Registration successful');
      this.router.navigate(['/home']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/home']);
    },err => {
      alert(err.message);
    })
  }

  // googleSignIn() {
  //   return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
  //     this.router.navigate(['/home']);
  //     localStorage.setItem('token', JSON.stringify(res.user?.uid));
  //   }, err => {
  //     alert(err.message)
  //   })
  // }
}
