import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { UserCobosService } from 'src/app/services/user-cobos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})

export class SideNavComponent {
  
  public users:any = [];
  public role!:string;
  public fullName : string = "";
  constructor(private auth: AuthService,private router: Router,private userCobos:UserCobosService
  ){}

  ngOnInit(){
    this.userCobos.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
}

logout(){
  this.auth.singOut();
};
Users(){
  this.router.navigate(['users'])
};
Dashboard(){
  this.router.navigate(['dashboard'])
}
}

