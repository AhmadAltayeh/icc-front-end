// import { NgModule } from '@angular/core';
// import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

// import {
//   MenuFoldOutline,
//   MenuUnfoldOutline,
//   FormOutline,
//   DashboardOutline
// } from '@ant-design/icons-angular/icons';

// const icons = [MenuFoldOutline, MenuUnfoldOutline, DashboardOutline, FormOutline];

// @NgModule({
//   imports: [NzIconModule],
//   exports: [NzIconModule],
//   providers: [
//     { provide: NZ_ICONS, useValue: icons }
//   ]
// })
// export class IconsProviderModule {
// }

import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';


import {
  StepBackwardOutline,
  CaretLeftOutline,
  SettingOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline
} from '@ant-design/icons-angular/icons';
const icons: IconDefinition[] = [
  StepBackwardOutline,
  CaretLeftOutline,
  SettingOutline,
  MenuFoldOutline, 
  MenuUnfoldOutline, 
  DashboardOutline, 
  FormOutline
];

@NgModule({
  imports: [
    NzIconModule.forChild(icons),
  ],
  exports: [NzIconModule],
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class IconsProviderModule {

}
