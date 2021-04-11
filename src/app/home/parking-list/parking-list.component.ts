import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { flatMap, forEach, indexOf, uniqBy } from 'lodash';
import { ParkedCarInterface } from 'src/app/interface/parkedCar.interface';

@Component({
    selector: 'app-parking-list',
    templateUrl: './parking-list.component.html',
    styleUrls: ['./parking-list.component.css']
})

export class ParkingListComponent implements OnInit {
    @Input() parkedCarList!: Array<ParkedCarInterface>;

    @Output() deleteCar = new EventEmitter();

    displayedColumns: string[] = ['Sr No.', 'Car Registration Number', 'Car Color', 'Slot', 'Actions'];
    dataSource = new MatTableDataSource(this.parkedCarList);
    oldParkedCarList: Array<ParkedCarInterface> = [];
    colorList: Array<any> = [];
    slotList: Array<any> = [];
    cityList: Array<any> = [];

    registrationNumber = '';
    carColor = null;
    carSlot = null;
    carCity = null;
    isFilterApplied = false;
    constructor() { }

    ngOnInit(): void {
        this.getDataForFilter();
    }

    getDataForFilter(): void {
        this.colorList = uniqBy(this.parkedCarList, 'carColor');
        this.colorList = this.colorList.map(element => {
            return element.carColor;
        });

        this.slotList = uniqBy(this.parkedCarList, 'carSlotNumber');
        this.slotList = this.slotList.map(element => {
            return element.carSlotNumber;
        });

        this.slotList = this.slotList.filter(element => {
            if (element > 0) {
                return element;
            } else {
                return false;
            }
        });

        this.cityList = uniqBy(this.parkedCarList, 'carRegistrationNumber');
        this.cityList = this.cityList.map(element => {
            return element.carRegistrationNumber.substring(0, 4);
        });
    }

    deleteParkedCar(car: ParkedCarInterface): void {
        if (car.carSlotNumber > 0) {
            this.deleteCar.emit(car);
        }
    }

    applyFilter(): void {
        this.isFilterApplied = false;
        let tempArr = this.parkedCarList;
        if (this.registrationNumber) {
            this.isFilterApplied = true;
            tempArr = tempArr.filter((element: ParkedCarInterface) => {
                if ((element.carRegistrationNumber.indexOf(this.registrationNumber) > -1)
                    || (element.carColor.indexOf(this.registrationNumber) > -1)) {
                    return element;
                } else {
                    return false;
                }
            });
        }

        if (this.carColor) {
            this.isFilterApplied = true;
            tempArr = tempArr.filter((element: ParkedCarInterface) => {
                if (element.carColor === this.carColor) {
                    return element;
                } else {
                    return false;
                }
            });
        }

        if (this.carSlot) {
            this.isFilterApplied = true;
            tempArr = tempArr.filter((element: ParkedCarInterface) => {
                if (element.carSlotNumber === parseInt((this.carSlot || ''), 0)) {
                    return element;
                } else {
                    return false;
                }
            });
        }

        if (this.carCity) {
            this.isFilterApplied = true;
            tempArr = tempArr.filter((element: ParkedCarInterface) => {
                if (element.carRegistrationNumber.substring(0, 4) === this.carCity) {
                    return element;
                } else {
                    return false;
                }
            });
        }

        this.dataSource.data = tempArr;
    }

    // tslint:disable-next-line: use-lifecycle-interface
    ngDoCheck(): void {
        if (this.oldParkedCarList.length !== this.parkedCarList.length) {
            this.oldParkedCarList = this.parkedCarList;
            this.isFilterApplied = false;
            this.registrationNumber = '';
            this.carColor = null;
            this.carSlot = null;
            this.carCity = null;
        }
        if (!this.isFilterApplied) {
            this.dataSource.data = this.parkedCarList;
        }
        this.getDataForFilter();
    }
}
