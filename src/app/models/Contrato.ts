import { Empleado } from './Empleado';
export class Contrato{
    constructor(
    public idContrato: number = null,
    public tipoContrato: string = null,
    public fechaInicio: Date = null,
    public fechaFin: Date = null,
    public salario: number = null,
    public empleado: Empleado = null
    ){}
}