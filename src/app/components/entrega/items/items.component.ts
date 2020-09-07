// Angular
import { Component, OnInit } from '@angular/core';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
// Services
import { ItemsService } from 'src/app/services/items.service';
// Modelos
import { Item } from 'src/app/models/Item';
import { EntregaService } from 'src/app/services/entrega.service';
import { EntregaDyE } from 'src/app/models/EntregaDyE';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  arrayItems: Item[];
  arrayAddItems: Item[] = [];
  arrayAllItems: Item[];
  selectedItem: Item;
  selectedItems: Item[];
  displayModal = false;
  constructor(
    private itemsService: ItemsService,
    private entregaService: EntregaService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  obtenerItems() {
    this.arrayItems = this.config.data.entrega.items;
    // console.log(this.arrayItems);
  }
  obtenerTodosItems() {
    this.itemsService.getAll().subscribe(
      (array: Item[]) => {
        let items: Item[] = [];
        for (let index = 0; index < array.length; index++) {
          let element = array[index] as Item;
          let i = this.arrayItems.findIndex((e) => e.idItem === element.idItem);
          if (i == -1) {
            if (this.config.data.entrega.tipo === element.tipo) {
              items.push(element);
            }
          }
        }
        this.arrayAllItems = items.sort(function (a, b) {
          if (a.tipo > b.tipo) {
            return 1;
          }
          if (a.tipo < b.tipo) {
            return -1;
          }
          return 0;
        });
      },
      (error) => console.error(error)
    );
  }

  ngOnInit(): void {
    this.obtenerItems();
    this.obtenerTodosItems();
    // console.log(this.config.data.entrega);
  }

  agregarItems() {
    this.ref.close(this.arrayAddItems);
  }

  borrarItem(item: Item) {
    // console.log(item);
    let entrega = this.config.data.entrega as EntregaDyE;
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar el item?',
      accept: () => {
        this.entregaService
          .eliminarItem(entrega.idEntregaDyE, item)
          .subscribe((entrega: EntregaDyE) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Correcto',
              detail: 'Eliminado el Item de la entrega de ' + entrega.tipo,
            });
            this.arrayItems = entrega.items;
            this.obtenerTodosItems()
          });
      },
    });
  }
}
