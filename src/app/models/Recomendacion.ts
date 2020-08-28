import { Examen } from './Examen';
export class Recomendacion {
  constructor(
    public idRecomendaciones: number = null,
    public examen: Examen = null,
    public primeraSeguimiento: string = null,
    public segundaSeguimiento: string = null,
    public terceraSeguimiento: string = null
  ) {}
}
