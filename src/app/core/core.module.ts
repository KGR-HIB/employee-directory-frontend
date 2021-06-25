import { NgModule } from '@angular/core';

import { UserService } from './services/user.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  providers: [
    UserService
  ],
  declarations: [
    PageNotFoundComponent
  ]
})
export class CoreModule {}
