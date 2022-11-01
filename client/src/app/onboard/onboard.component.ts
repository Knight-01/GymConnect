import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';
import { User } from '../_models/user';
import { Member } from '../_models/member';
import { Photo } from '../_models/photo';
import { environment } from 'src/environments/environment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';



@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.css']
})
export class OnboardComponent implements OnInit {
  @Input() registerForm: FormGroup
  @Output() cancelOnboard = new EventEmitter();
  // private stepper: Stepper;
  // uploader: FileUploader;
  onBoardForm: FormGroup;
  user: User;
  member: Member;
  currentMain: Photo;
  baseUrl = environment.apiUrl;
  bsConfig: Partial<BsDatepickerConfig>;
  response: string;
  validationErrors: string[] = [];
  ipAddress: any;
  maxDate: Date;

  constructor(private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private memberService: MembersService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.onBoardForm = new FormGroup({
      dateOfBirth: new FormControl(),
      height: new FormControl(),
      weight: new FormControl(),
      city: new FormControl(),
      country: new FormControl(),
      knownAs: new FormControl()
    })

    // this.getIP();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    // this.stepper = new Stepper(document.querySelector('#stepper1')), {
    //   linear: true,
    //   animation: true,
    // };
    // this.initializeUploader();
    // this.bsConfig = {
    //   containerClass: "theme-green",
    // };
  }

  initializeForm() {
    this.onBoardForm = this.fb.group({
      dateOfBirth: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      knownAS: ['', Validators.required]
    })

  }

  // next() {
  //   this.stepper.next();
  // }

  // initializeUploader() {
  //   this.uploader = new FileUploader({
  //     url: this.baseUrl + '/api/user/add-photo',
  //     authToken: 'Bearer ' + this.user.token,
  //     isHTML5: true,
  //     allowedFileType: ['image'],
  //     removeAfterUpload: true,
  //     autoUpload: false,
  //     maxFileSize: 10 * 1024 * 1024

  //   });

  //   this.response = '';


  //   this.uploader.onAfterAddingFile = (file) => {
  //     file.withCredentials = false;
  //   };

  //   this.uploader.onSuccessItem = (item, response, status, headers) => {
  //     if (response) {
  //       const photo: Photo = JSON.parse(response);
  //       this.member.photos.push(photo);
  //       this.setMainPhoto(photo);
  //        if (photo.isMain) {
  //          this.user.photoUrl = photo.url;
  //          this.member.photoUrl = photo.url;
  //          this.accountService.setCurrentUser(this.user);
  //        }
  //     }
  //   }
  //   this.uploader.response.subscribe(res => this.response = "Photo uploaded. Success!");

  // }

  // deletePhoto(photoId: number) {
  //   this.memberService.deletePhoto(photoId).subscribe(() => {
  //     this.member.photos = this.member.photos.filter(x => x.id !== photoId)
  //   })
  // }

  onBoardUpdate() {
    this.accountService.onboardUser(this.registerForm.value).subscribe(
      (next) => {
        this.toastr.success('Onboard complete', 'Congratulations');
        this.router.navigateByUrl('/members');
      },
      (error) => {
        this.validationErrors = error;
        this.toastr.error('Error')
      }
    );
  }

  cancel() {
    this.cancelOnboard.emit(false);
    this.router.navigateByUrl('/register');
  }

  // getIP() {
  //   this.accountService.getIPAddress().subscribe((res:any)=>{
  //     this.onBoardForm.patchValue({
  //       city: res.city,
  //       state: res.region,
  //     });
  //   })
  // }

  // setMainPhoto(photo: Photo) {
  //   this.memberService.setMainPhoto(photo.id).subscribe(() => {
  //     this.user.photoUrl = photo.url;
  //     this.accountService.setCurrentUser(this.user);
  //     this.member.photoUrl = photo.url;
  //     this.member.photos.forEach(p => {
  //       if (p.isMain) p.isMain = false;
  //       if (p.id === photo.id) p.isMain = true;
  //     })
  //   })
  // }

}





