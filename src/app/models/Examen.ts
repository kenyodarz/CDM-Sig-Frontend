import { Contrato } from '../models/Contrato'

export class Examen {
  constructor(
    public idExamen: number = null,
    public fecha: Date = null,
    public concepto: boolean = null,
    public restriccion: string = null,
    public tipoExamen: string = null,
    public contrato: Contrato = null
  ) {}
}
