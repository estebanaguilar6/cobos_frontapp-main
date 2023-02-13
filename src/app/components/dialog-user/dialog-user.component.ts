import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { User } from 'src/app/Interfaces/user';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.scss']
})
export class DialogUserComponent {
  formUser: FormGroup;
  action: string = "Agregar";
  actionButton: string = "Guardar";

  constructor(
    private dialogReference: MatDialogRef<DialogUserComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: User,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _userService: UserService
  ){
    this.formUser = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  showAlert(msg: string, tittle: string) {
    this._snackBar.open(msg, tittle, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    })
  }

  addEditUser(){
    const model: User = {
      id:0,
      name: this.formUser.value.name,
      lastName: this.formUser.value.lastName,
      userName: this.formUser.value.userName,
      password: this.formUser.value.password,
      token: "",
      role: this.formUser.value.role
    }

    this._userService.add(model).subscribe({
      next: (data) => {
        if (data.status) {
          this.showAlert("Usuario creado!", "OK");
          this.dialogReference.close('created');
        }
        else {
          this.showAlert("No fue posible crear el Usuario", "Error");
        }
      },
      error: (e) => {
      }
    })
  }
}

