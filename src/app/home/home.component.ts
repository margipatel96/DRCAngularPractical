import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ParkedCarInterface } from '../interface/parkedCar.interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    slotSize: number;
    parkedCarList: Array<ParkedCarInterface> = [];
    parkingSlotForm = new FormGroup({
        slot: new FormControl(undefined, [Validators.required]),
    });

    parkingCarForm = new FormGroup({
        carRegistrationNumber: new FormControl(undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
        carColor: new FormControl(undefined, [Validators.required]),
    });

    constructor() {
        this.slotSize = 0;
    }

    ngOnInit(): void {
    }

    resetSlots(): void {
        this.parkingSlotForm.reset();
        this.slotSize = 0;
        this.parkedCarList.length = 0;
    }

    createSlot(): void {
        if (this.parkingSlotForm.invalid) {

        } else {
            this.slotSize = this.parkingSlotForm.value.slot;
            if (this.slotSize !== this.parkedCarList.length) {
                this.addSlot();
            }
        }
    }

    addSlot(): void {
        if (this.slotSize === 0) {
            this.parkedCarList.length = 0;
        } else if (this.parkedCarList.length === 0) {
            const newSlotsCount = this.slotSize - this.parkedCarList.length;
            for (let i = 0; i < newSlotsCount; i++) {
                this.parkedCarList.push({
                    carRegistrationNumber: '',
                    carColor: '',
                    carSlotNumber: 0
                });
            }
        } else {
            Swal.fire('Please reset to add a new slots');
        }
    }

    parkCar(): void {
        if (this.parkingCarForm.invalid) {

        } else {
            if (this.parkedCarList.length > 0) {
                let isCarParked = false;
                for (let i = 0; i < this.parkedCarList.length; i++) {
                    if (this.parkedCarList[i].carRegistrationNumber === '') {
                        this.parkedCarList[i].carRegistrationNumber = this.parkingCarForm.value.carRegistrationNumber;
                        this.parkedCarList[i].carColor = this.parkingCarForm.value.carColor;
                        this.parkedCarList[i].carSlotNumber = i + 1;
                        isCarParked = true;
                        break;
                    }
                }
                if (isCarParked) {
                    this.parkingCarForm.reset();
                    Swal.fire('Car Parked Successfully');
                } else {
                    Swal.fire('No empty slots available');
                }
            }
        }
    }

    deleteCar(car: ParkedCarInterface): void {
        this.parkedCarList[car.carSlotNumber - 1].carRegistrationNumber = '';
        this.parkedCarList[car.carSlotNumber - 1].carColor = '';
        this.parkedCarList[car.carSlotNumber - 1].carSlotNumber = 0;
        Swal.fire('Car removed from parking.');
    }
}
