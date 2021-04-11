import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appNumberOnly]'
})
export class NumberDirective {

    constructor(private el: ElementRef) { }

    @HostListener('input', ['$event']) onInputChange(event: any) {
        const initalValue = this.el.nativeElement.value;
        this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }

}
