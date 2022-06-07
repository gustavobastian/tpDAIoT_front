import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,     
    FolderPageRoutingModule,
    NgxEchartsModule.forRoot({echarts: () => import('echarts'), }),
  ],
  declarations: [FolderPage]
})
export class FolderPageModule {}
