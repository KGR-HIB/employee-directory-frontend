
import { Component, OnInit } from '@angular/core';
import { LoaderService } from "@services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'employee-directory-frontend';
  isLoading!: boolean;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.isLoading.subscribe(load => {
      /* setTimeout for prevent error
         ExpressionChangedAfterItHasBeenCheckedError:
         Expression has changed after it was checked.
         Previous value: 'ngIf: false'. Current value: 'ngIf: true'
         this.isLoading = load
      */
      setTimeout(() => (this.isLoading = load));
    });
  }
}
