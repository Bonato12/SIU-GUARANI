import Swal from 'sweetalert2'

export function alertSuccess(){
  Swal.fire( 'Exito!','Guardado Correctamente!','success');
}

export function alertEditSuccess(){
  Swal.fire( 'Exito!','Editado Correctamente!','success');
}

export function alertError(){
   Swal.fire( 'Error!','No Se Pudo Guardar Correctamente!','error');
}


export function alertWarningCompletarCampos(){
  Swal.fire('','Completar los Campos Correctamente','warning');
}

