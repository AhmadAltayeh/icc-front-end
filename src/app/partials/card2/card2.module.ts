import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card2Component } from './card2.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { AdminViewModule } from 'src/app/pages/admins/admin-view/admin-view.module';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [Card2Component],
  exports: [Card2Component],
  imports: [
    CommonModule,
    NzAvatarModule,
    NzPaginationModule,
    NzFormModule,
    NzRadioModule,
    NzSwitchModule,
    NzTableModule,
    NzDividerModule,
    NzDrawerModule,
    AdminViewModule,
    NzCardModule,
    NzRateModule,
    FormsModule,
  ],
})
export class Card2Module {}
