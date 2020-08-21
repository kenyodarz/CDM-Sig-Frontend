import { Empleado } from './Empleado';
import { Item } from './Item';

export class EntregaDyE {
  constructor(
    public idEntregaDyE: number = null,
    public fechaEntregaDyE: Date = null,
    public descripcion: string = null,
    public tipo: string = null,
    public empleado: Empleado = null,
    public items: Array<Item> = null
  ) {}
}
