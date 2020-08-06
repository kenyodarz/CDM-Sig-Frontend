import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Prime NG
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';

const myModule = [
  ToolbarModule,
  ButtonModule,
  SplitButtonModule,
  TabViewModule,
  ToastModule,
  MessagesModule,
  MessageModule,
  ConfirmDialogModule,
  PanelModule,
  InputTextModule,
  MenubarModule,
];


@NgModule({
  declarations: [],
  imports: [CommonModule, myModule],
  exports: [myModule],
  providers: [],
})
export class PrimengModule {}
