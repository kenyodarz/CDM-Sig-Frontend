import { CIE10 } from './CIE10';
import { Empleado } from './Empleado';

export class Incapacidad {
  constructor(
    public idIncapacidad: number = null,
    public fechaInicio: Date = null,
    public fechaFin: Date = null,
    public entidad: string = null,
    public enfermedad: string = null,
    public cie10: CIE10 = null,
    public empleado: Empleado = null,
    public estado: string = null
  ) {}
}
