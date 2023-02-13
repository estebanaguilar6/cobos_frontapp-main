import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { User } from 'src/app/Interfaces/user';
import { Rendimiento } from 'src/app/Interfaces/rendimiento';
import { UserService } from 'src/app/services/user.service';
import { RendimientoService } from 'src/app/services/rendimiento.service';
import * as moment from 'moment';
import { ThisReceiver } from '@angular/compiler';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dataA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-dialog-rnd',
  templateUrl: './dialog-rnd.component.html',
  styleUrls: ['./dialog-rnd.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})

export class DialogRndComponent {
  formRnd: FormGroup;
  action: string = "Agregar";
  actionButton: string = "Guardar";
  listUser: User[] = [];

  constructor(
    private dialogReference: MatDialogRef<DialogRndComponent>,
    @Inject(MAT_DIALOG_DATA) public rendimientoData:Rendimiento,
    private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private _rendimientoService: RendimientoService,
    private _userService: UserService
  ){
    this.formRnd = this.fb.group({
      typeinvestment:['',Validators.required],
      rend_mont:['',Validators.required],
      rend_total: ['', Validators.required],
      userId: ['', Validators.required]
    });

    this._userService.getList().subscribe({
      next:(data) => {
        if(data.status)
          this.listUser = data.value
      },
      error: (e) => {

      }
    })
  }

  ngOnInit():void{

  }

  showAlert(msg:string,tittle:string){
    this._snackBar.open(msg,tittle,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    })
  }
  
  addEditRnd(){
    const model: Rendimiento = {
      id:0,
      typeinvestment: this.formRnd.value.typeinvestment,
      userId: this.formRnd.value.userId,
      rend_mont: this.formRnd.value.rend_mont,
      rend_total: this.formRnd.value.rend_total,
      userLastName: "",
      userName:"",
      userRole:""
    }

    this._rendimientoService.add(model).subscribe({
      next:(data)=>{
        if(data.status){
          this.showAlert("Rendimiento creado!","succes");
          this.dialogReference.close('created');
        }
        else{
          this.showAlert("No fue posible crear el Rendimiento","Error"); 
        } 
      },
      error:(e)=>{

      }
    })
  }

  
}


