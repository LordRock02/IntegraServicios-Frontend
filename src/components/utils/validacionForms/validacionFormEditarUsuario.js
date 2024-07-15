
export const validarEditarUsuarioForm = (formData) => {
  const errors = {};

  console.log(formData)

  // Nombre validacion
  if (!formData.fullname || formData.fullname.trim() === '') {
    errors.fullname = 'Nombre es requerido.';
  } else if (formData.fullname.length < 3) {
    errors.fullname = 'Nombre debe tener al menos 3 caracteres';
  }

  // Nombre validacion
  if (!formData.cedula || formData.cedula === '') {
    errors.cedula = 'Cedula es requerido.';
  }
  else if(isNaN(formData.cedula)){
    errors.cedula = 'La cédula debe ser numérica.';
  }
  else if(formData.cedula.length > 10 ){
    errors.cedula = 'La cédula no puede tener más de 10 digitos.';
  }

  // Email validation (required, valid format)
  if (!formData.email || formData.email.trim() === '') {
    errors.email = 'Email es requerido.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Formato de email invalido.';
  }

  // Email validation (required, valid format)
  if(formData.rol == undefined){
    errors.rol = 'Debe especificar un rol.'
  }


    return errors;
  };