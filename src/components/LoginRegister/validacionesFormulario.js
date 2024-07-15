export const validarFormulario = (formData, setErrores) => {
    let formConErrores = false;
  
    console.log("Haciendo validaciones");
    console.log(formData);
  
    const { nombre, apellido, email, cedula, contraseña } = formData;
  
    console.log(nombre.length);
  
    if (nombre.length === 0) {
      setErrores(prevErrores => ({
        ...prevErrores,
        nombre: 'El nombre no puede estar vacío.'
      }));
      formConErrores = true;
    } else if (/\d/.test(nombre)) {
      setErrores(prevErrores => ({
        ...prevErrores,
        nombre: 'El nombre no puede tener números.'
      }));
      formConErrores = true;
    }
  
    if (apellido.length === 0) {
      setErrores(prevErrores => ({
        ...prevErrores,
        apellido: 'El apellido no puede estar vacío.'
      }));
      formConErrores = true;
    } else if (/\d/.test(apellido)) {
      setErrores(prevErrores => ({
        ...prevErrores,
        apellido: 'El apellido no puede tener números.'
      }));
      formConErrores = true;
    }
  
    if (cedula.length === 0) {
      setErrores(prevErrores => ({
        ...prevErrores,
        cedula: 'La cédula no puede estar vacía.'
      }));
      formConErrores = true;
    } else if (!/^\d+$/.test(cedula)) {
      setErrores(prevErrores => ({
        ...prevErrores,
        cedula: 'Este valor debe ser numérico.'
      }));
      formConErrores = true;
    }
  
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W\_]).{8,}/.test(contraseña)) {
      setErrores(prevErrores => ({
        ...prevErrores,
        contraseña: 'La contraseña no tiene la complejidad necesaria.'
      }));
      formConErrores = true;
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrores(prevErrores => ({
        ...prevErrores,
        email: 'Formato de email inválido'
      }));
      formConErrores = true;
    }
  
    return formConErrores;
  };