import { CajaComFamiliar } from './CajaComFamiliar';
import { Arl } from './Arl';
import { Afp } from './Afp';
import { Eps } from './Eps';

export class Empleado {
  constructor(
    public cedula: string = null,
    public nombres: string = null,
    public apellidos: string = null,
    public genero: string = null,
    public fechaNacimiento: string = null,
    public tipoSangre: string = null,
    public direccion: string = null,
    public municipio: string = null,
    public telefono: string = null,
    public eps: Eps = null,
    public afp: Afp = null,
    public arl: Arl = null,
    public cajaComFamiliar: CajaComFamiliar = null,
    public alergia: string = null,
    public medicamentos: string = null,
    public enCasoEmergencia: string = null,
    public parentesco: string = null,
    public telEmergencia: string = null,
    public fotoHashCode: number = null
  ) {}
}