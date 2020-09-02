import { Examen } from './Examen';
export class Recomendacion {
  constructor(
    public idRecomendaciones: number = null,
    public examen: Examen = null,
    public recommendation: string = null,
    public tipoSeguimien: string= null,
    public primeraSeguimiento: string = null,
    public segundaSeguimiento: string = null,
    public terceraSeguimiento: string = null,
    public createAt: Date = null
  ) {}
}
