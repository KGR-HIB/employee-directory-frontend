import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '@share/angular-material.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CityService } from './services/city.service';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';


@NgModule({
  providers: [
    UserService,
    CityService,
    RoleService
  ],
  declarations: [
    PageNotFoundComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent
  ],
  imports: [
    RouterModule,
    AngularMaterialModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class CoreModule {}
