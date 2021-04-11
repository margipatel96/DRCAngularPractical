import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ParkingListComponent } from './parking-list/parking-list.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './home-routing.module';
import { AlphabetOnlyDirective } from '../directives/alphabet-only.directive';
import { NumberDirective } from '../directives/numbers-only.directive';


@NgModule({
  declarations: [
    HomeComponent,
    ParkingListComponent,
    AlphabetOnlyDirective,
    NumberDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class HomeModule { }
