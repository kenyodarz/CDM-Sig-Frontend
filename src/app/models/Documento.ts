import { Empleado } from './Empleado';
export class Documento {
  constructor(
    public idDocumento: number = null,
    public empleado: Empleado = null,
    public tipo: string = null,
    public nombre: string = null,
    public createAt: Date = null,
    public archivoHashCode: number = null
  ) {}
}
