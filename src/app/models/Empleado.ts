export class Empleado {
         constructor(
           public cedula: string = null,
           public nombres: string = null,
           public apellidos: string = null,
           public genero: string = null,
           public fechaNacimiento: string = null,
           public direccion: string = null,
           public telefono: string = null,
           public eps: string = null,
           public afp: string = null,
           public arl: string = null,
           public cajaComFamiliar: string = null,
           public alergia: string = null,
           public medimentos: string = null,
           public enCasoEmergencia: string = null,
           public fotoHashCode: number = null
         ) {}
       }