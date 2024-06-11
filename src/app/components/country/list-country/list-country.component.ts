import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Country } from '../../../models/country';
import { CountryService } from '../../../services/country.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { CreateCountryComponent } from '../create-country/create-country.component';
import { MatDialog } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-list-country',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatPaginator, MatButtonModule],
  templateUrl: './list-country.component.html',
  styleUrl: './list-country.component.css'
})
export class ListCountryComponent implements OnInit{
  displayedColumns: string[] = [
    'codigoPais',
    'nombrePais',
  ];

  @ViewChild(MatPaginator,{static:true}) paginator !: MatPaginator
  dataSource: MatTableDataSource<Country> = new MatTableDataSource();
  constructor(private cS: CountryService, private _matDialog: MatDialog) { }

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.cS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data)
    })
    this.dataSource.paginator = this.paginator
  }

  OpenModalRegister(){
    this._matDialog.open(CreateCountryComponent,{
      width:'900px' // parametros
    });
  }
}
