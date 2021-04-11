import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DRCAngularPractical';

  isExpanded: any = false;

  constructor(private router: Router) { }

  goToList() {
    this.router.navigate(['home/list']);
  }

}
