
export const validarSignUpForm = (formData) => {
    const errors = {};
  
    // Fullname validation (required, minimum length)
    if (!formData.fullname || formData.fullname.trim() === '') {
      errors.fullname = 'Fullname es requerido.';
    } else if (formData.fullname.length < 3) {
      errors.fullname = 'Fullname debe tener al menos 3 caracteres';
    }
  
    // Email validation (required, valid format)
    if (!formData.email || formData.email.trim() === '') {
      errors.email = 'Email es requerido.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Formato de email invalido.';
    }
  
    // contraseña validation (required, minimum length)
    if (!formData.contraseña || formData.contraseña.trim() === '') {
      errors.contraseña = 'contraseña es requerida.';
    } else if (formData.contraseña.length < 8) {
      errors.contraseña = 'contraseña debe tener al menos 8 caracteres.';
    }

    // Cedula validation (required, numeric, maximum length)
    if (!formData.cedula || formData.cedula.trim() === '') {
      errors.cedula = 'Cedula es requerida.';
    } else {
    // Check if cedula is a string containing only numbers
    if (!/^[0-9]+$/.test(formData.cedula)) {
      errors.cedula = 'Cedula debe contener solo números.';
    } else {
      // Check if cedula length is within the maximum limit
      if (formData.cedula.length > 10) {
        errors.cedula = 'Cedula debe tener un máximo de 10 caracteres.';
      }
    }
    }

  
    return errors;
  };


export const validarSignInForm = (formData) => {
    const errors = {};

    // Email validation (required, valid format)
    if (!formData.email || formData.email.trim() === '') {
      errors.email = 'Email es requerido.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Formato de email invalido.';
    }
  
    // contraseña validation (required, minimum length)
    if (!formData.contraseña || formData.contraseña.trim() === '') {
      errors.contraseña = 'contraseña es requerida.';
    } else if (formData.contraseña.length < 8) {
      errors.contraseña = 'contraseña debe tener al menos 8 caracteres.';
    }

    return errors;
  };