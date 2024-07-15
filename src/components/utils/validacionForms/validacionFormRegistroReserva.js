
export const validarReservaForm = (formData,recursoReservar) => {
    const errors = {};

    console.log(formData)
    console.log(recursoReservar)

    // Validar si la fecha no es vacia
    if (!formData.fechaReserva || formData.fechaReserva.trim() === '') {
        errors.fechaReserva = 'Nombre es requerido.';
    }

    const fechaCompararDate = new Date(formData.fechaReserva);
    fechaCompararDate.setDate(fechaCompararDate.getDate()+1);
    fechaCompararDate.setHours(0, 0, 0, 0);

    const fechaActualDate = new Date(new Date().getTime() - (5 * 60 * 60 * 1000));
    fechaActualDate.setHours(0, 0, 0, 0);
    console.log(fechaActualDate)

    //Validar si la fecha no es antes del presente
    if (fechaCompararDate < fechaActualDate) {
        errors.fechaReserva = 'La fecha no puede anterior al día de hoy.';  
    }

    const diasRecurso = recursoReservar.horarioDisponible.map((horario)=>horario.dia.id);
    let diaSeleccionado = fechaCompararDate.getDay();
    if(diaSeleccionado == 0){
        diaSeleccionado=7;
    }

    console.log(fechaCompararDate.getDay())
    console.log(diaSeleccionado)
    //Validar si el recurso está disponible el día seleccionado
    if(!diasRecurso.includes(diaSeleccionado)){
        errors.fechaReserva = 'Recurso no disponible el día seleccionado';  
    }

    //Validacion de horas
    //Horarios validación
    const horaInicioDate = new Date();
    horaInicioDate.setFullYear(formData.fechaReserva.split("-")[0])
    horaInicioDate.setMonth(formData.fechaReserva.split("-")[1]-1)
    horaInicioDate.setDate(formData.fechaReserva.split("-")[2])
    horaInicioDate.setHours(formData.horaInicio.split(':')[0], formData.horaInicio.split(':')[1], 0);

    const horaFinDate = new Date();
    horaFinDate.setFullYear(formData.fechaReserva.split("-")[0])
    horaFinDate.setMonth(formData.fechaReserva.split("-")[1]-1)
    horaFinDate.setDate(formData.fechaReserva.split("-")[2])
    horaFinDate.setHours(formData.horaFin.split(':')[0], formData.horaFin.split(':')[1], 0);
    
    const fechaHoraActual = new Date();

    console.log(horaInicioDate)
    console.log(fechaHoraActual)



    // Comparar las horas
    if(!errors.fechaReserva){
        if(formData.horaInicio == '' || formData.horaFin == ''){
            errors.horario = 'Debe especificar hora de inicio y fin.';
        }
        else if(horaFinDate < horaInicioDate) {
            errors.horario = 'La hora de fin no puede ser antes de la hora inicio.';
        }
        
        if(horaInicioDate < fechaHoraActual) {
            console.log("hora antes")
            errors.horario = 'La hora de inicio no puede ser antes de la hora actual';
        }
    }


    return errors;
};