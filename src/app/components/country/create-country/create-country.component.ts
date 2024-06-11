import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Country } from '../../../models/country';
import { CountryService } from '../../../services/country.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-country',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './create-country.component.html',
  styleUrl: './create-country.component.css'
})
export class CreateCountryComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  countrY: Country = new Country();

  constructor(private formBuilder: FormBuilder,
    private ctS: CountryService,
    private router:Router,
    public _matDialogRef: MatDialogRef<CreateCountryComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any // aqui se obtiene los datos del parametro    
) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.countrY.nameCountry=this.form.value.nombre
      this.ctS.insert(this.countrY).subscribe((data)=>{
        this.ctS.list().subscribe((data)=>{
          this.ctS.setList(data)
        })
      })
      this.router.navigate(['paises'])
    }
  }

}
