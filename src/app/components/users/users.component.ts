import { Component,OnInit,AfterViewInit,ViewChild, inject } from '@angular/core';
import { Observable } from 'rxjs';

//import { User } from 'src/app/Interfaces/user';
import { Rendimiento } from 'src/app/Interfaces/rendimiento';

//import { UserService } from 'src/app/services/user.service';
import { RendimientoService } from 'src/app/services/rendimiento.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserCobosService } from 'src/app/services/user-cobos.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog'

import { DialogRndComponent } from '../dialog-rnd/dialog-rnd.component';
import { DialogUserComponent } from '../dialog-user/dialog-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit,AfterViewInit{
  titles: string [] = [
    'Nombre',
    'Apellido',
    'Tipo de inversion',
    'Rend Mont',
    'Rend Total',
    'Opciones'
  ];

  dataRendimiento = new MatTableDataSource<Rendimiento>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //before jorge's changes!
  UserRendsList$!:Observable<any[]>;
  public users:any = [];
  public role!:string;

  constructor(
    private userCobos:UserCobosService,
    private auth: AuthService,
    private _snackbar:MatSnackBar,
    private _rendimientoService:RendimientoService,
    private dialog: MatDialog
    )
  {

  }

  applyFilter(event:Event)
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataRendimiento.filter = filterValue.trim().toLowerCase();
  }

  showRendimientos()
  {
    this._rendimientoService.getList().subscribe({
      next:(data) => {
        if(data.status){
          this.dataRendimiento.data = data.value;
        }
      },
      error:(e) => {

      }
    })
  }
  
  ngOnInit():void
  {
    this.userCobos.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })

    this.showRendimientos();

    this.UserRendsList$ = this.userCobos.getUserRendsList();
  }

  ngAfterViewInit(): void {
    this.dataRendimiento.paginator = this.paginator;
  }

  addNewRnd(){
    this.dialog.open(DialogRndComponent,{
      disableClose:true,
      width: "350px"
    }).afterClosed().subscribe(result =>{
       if(result === "created"){
        this.showRendimientos();
        }
    })
  }

  addNewUser(){
    this.dialog.open(DialogUserComponent,{
      disableClose: true,
      width: "350px"
    }).afterClosed().subscribe(result =>{
      if (result === "created") {
        this.showRendimientos();
      }
    })
  }
}
