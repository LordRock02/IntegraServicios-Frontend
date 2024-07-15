
export const validarUnidadForm = (formData) => {
  const errors = {};

  console.log(formData)

  // Nombre validacion
  if (!formData.nombre || formData.nombre.trim() === '') {
    errors.nombre = 'Nombre es requerido.';
  } else if (formData.nombre.length < 3) {
    errors.nombre = 'Nombre debe tener al menos 3 caracteres';
  }

  //Unidad validacion
  if (!formData.tipo || formData.tipo === undefined) {
    errors.tipo = 'Debe seleccionar una un tipo';
  }
  
  
  //Horarios validación
  const horaInicioDate = new Date();
  horaInicioDate.setHours(formData.horaInicio.split(':')[0], formData.horaInicio.split(':')[1], 0);
  const horaFinDate = new Date();
  horaFinDate.setHours(formData.horaFinal.split(':')[0], formData.horaFinal.split(':')[1], 0);
  // Comparar las horas
  if(formData.horaInicio == "" || formData.horaFinal == ""){
    errors.horario = 'Debe especificar hora de apertura y cierre.';
  }
  if (horaFinDate < horaInicioDate) {
    errors.horario = 'La hora de fin no puede ser antes de la hora inicio.';
  }

  if (formData.tiempoMinimo == 0 || formData.tiempoMaximo == 0) {
    errors.prestamo = 'Debe especificar el minimo y máximo.'
  }

  //Dias disponibles validacion
  if(formData.diasDisponibles.every((horario)=>horario==null)){
    errors.dias = 'Debe especificar al menos un dia.'
  }


    return errors;
  };