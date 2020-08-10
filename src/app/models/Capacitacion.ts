import { Empleado } from './Empleado';

export class Capacitacion {
  constructor(
    public idCapacitacion: number = null,
    public tema: string = null,
    public fecha: Date = null,
    public empleados: Array<Empleado> = null
  ) {}
}
