import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { from } from 'rxjs';
import {NgxAutoScrollModule } from 'ngx-auto-scroll';
import {PickerModule} from '@ctrl/ngx-emoji-mart';

//Phần của NGhĩa
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'



//*************************** */


import { DialogaddComponent } from './components/search/dialogadd/dialogadd.component';
import { GroupComponent} from './components/search/group/group.component';
import {ChatBoxComponent} from './components/chat-box/chat-box.component';
import {ListfriendComponent} from './components/listfriend/listfriend.component';
import {ChangePasswordComponent} from './components/menu/change-pass/change-pass.component';
import {MenuComponent} from './components/menu/menu.component';
import {SearchComponent} from './components/search/search.component';
import {UpdateinfoComponent} from './components/updateinfo/updateinfo.component';




import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminComponent } from './components/admin/admin.component';
import { AdminDialogComponent } from '../app/components/admin-dialog/admin-dialog.component';
import { LoginService } from 'src/app/services/login.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AdminService } from 'src/app/services/admin.service'
import { RegsiterService } from 'src/app/services/regsiter.service'
import { CommonModule } from '@angular/common'
import { SharedDataService } from 'src/app/services/sharedataservice.service'
import { AuthGuard } from './guard/auth.guard';
import { AdminAuthGuard } from './guard/admin-auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FriendService } from './services/friend.service';
import {ContactService} from "./services/contact.service"
import {UserService} from "./services/user.service"
import { ChatSocketService } from '../app/services/chat-socket.service';
import { DialogYesNoComponent } from './components/dialog-yes-no/dialog-yes-no.component';
import { NotifyPanelComponent } from './components/notification/notification.component';
import {MessageConventionService} from './services/message-convention.service'


@NgModule({
  declarations: [
    
    MenuComponent,
    SearchComponent,
    UpdateinfoComponent,
    ChatBoxComponent,
    ListfriendComponent,
    ChangePasswordComponent,
    DialogaddComponent,
    GroupComponent,


    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    AdminDialogComponent,
    DashboardComponent,
    DialogYesNoComponent,
    NotifyPanelComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatStepperModule, MatTabsModule, ReactiveFormsModule, MatRadioModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatNativeDateModule, MatBadgeModule, MatPaginatorModule, MatSelectModule,
    MatSidenavModule, MatTableModule, MatToolbarModule, MatSlideToggleModule,
    MatDialogModule, FormsModule, MatDividerModule, MatListModule, MatMenuModule,
    FontAwesomeModule,MatSnackBarModule,NgxAutoScrollModule, PickerModule
  ],

  providers: [
    MessageConventionService,
    ContactService, 
    FriendService ,
    AdminAuthGuard, 
    AuthGuard, 
    SharedDataService, 
    LoginService, 
    AdminService, 
    RegsiterService,
    UserService,
    ChatSocketService

/*  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
