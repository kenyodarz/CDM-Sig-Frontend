import {Contrato} from './Contrato';
 
export class Vacaciones {
  constructor(
    public idVacaciones: number = null,
    public fechaInicio: Date = null,
    public fechaFin: Date = null,
    public contrato: Contrato = null
  ) {}
}
