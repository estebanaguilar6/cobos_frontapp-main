import { Component } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { UserCobosService } from 'src/app/services/user-cobos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private userCobos: UserCobosService
  ){}

  ngOnInit():void{
    this.loginForm = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required]
    })
  }

  onLogin(){
    if(this.loginForm.valid){
      // Send the obj to database
      //console.log(this.loginForm.value)
      this.auth.login(this.loginForm.value)
      .subscribe({ 
        next:(res)=>{
          console.log(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.auth.decodeToken();
          this.userCobos.setFullNameFromStore(tokenPayload.unique_name);
          this.userCobos.setRoleForStore(tokenPayload.role);
          this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000})
          this.router.navigate(['dashboard'])
        },
        error:(err)=>{
          this.toast.error({detail:"ERROR", summary:"Compruebe su usuario y contraseña", duration: 5000})
          this.loginForm.reset();
          console.log(err);
        }
      })
    }
    else{
      //throw the error using toaster and with required fields
      this.toast.error({detail:"ERROR", summary:"Ingrese datos", duration: 5000})
    }
  }

  private validateAllFormsFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control?.markAsDirty({onlySelf:true});
      }else if(control instanceof FormGroup){
        this.validateAllFormsFields(control)
      }
    })
  }

}
