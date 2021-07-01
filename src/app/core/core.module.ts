import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserService } from './services/user.service';
import { CityService } from './services/city.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  providers: [
    UserService,
    CityService
  ],
  declarations: [
    PageNotFoundComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent
  ],
  imports: [
    RouterModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class CoreModule {}
