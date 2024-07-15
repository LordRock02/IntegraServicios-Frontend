
export const validarRecursoForm = (formData) => {
const errors = {};

console.log(formData)

// Nombre validacion
if (!formData.nombre || formData.nombre.trim() === '') {
  errors.nombre = 'Nombre es requerido.';
} else if (formData.nombre.length < 3) {
  errors.nombre = 'Nombre debe tener al menos 3 caracteres';
}

//Unidad validación
if(!formData.unidad || formData.unidad==undefined){
  errors.unidad = 'Unidad debe ser especificada';
}


// Validacion dias
if (formData.horarioDisponible.length < 1) {
  errors.horario = 'Debe seleccionar al menos un día.';
}

formData.horarioDisponible.forEach(horario => {
  // Convertir las horas a formato Date
  const horaInicioDate = new Date();
  horaInicioDate.setHours(horario.horaInicio.split(':')[0], horario.horaInicio.split(':')[1], 0);
  const horaFinDate = new Date();
  horaFinDate.setHours(horario.horaFin.split(':')[0], horario.horaFin.split(':')[1], 0);
  // Comparar las horas
  if(horario.horaInicio == '' || horario.horaFin==''){
    errors.horario = 'Debe especificar hora de inicio y fin.';
  }
  else if (horaFinDate < horaInicioDate) {
    errors.horario = 'La horas de fin no pueden ser antes de la hora inicio.';
  }
  else if(horario.horaInicio == horario.horaFin){
    errors.horario = 'Las horas no pueden ser iguales';
  }
});

  return errors;
};