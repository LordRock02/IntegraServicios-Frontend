const ENDPOINT=`${import.meta.env.VITE_API_URL}/reservas/registrar`

export function registrarReserva (data) {
const token = localStorage.getItem('token');

const hoy = new Date();

const anio = hoy.getFullYear();
const mes = String(hoy.getMonth() + 1).padStart(2, '0');
const dia = String(hoy.getDate()).padStart(2, '0');

const horas = String(hoy.getHours()).padStart(2, '0');
const minutos = String(hoy.getMinutes()).padStart(2, '0');
const segundos = String(hoy.getSeconds()).padStart(2, '0');

let fechaHoy = `${anio}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;

data.fechaCreacion = fechaHoy;

return (
    fetch(`${ENDPOINT}`, { method: 'POST',
        headers: {
        "Content-Type": "application/json",
        'Authorization': `${token}`
        },
        body: JSON.stringify(data)
    })
        .then(async res => {
            const responseData = await res.json()
            console.log(responseData)
            if (!res.ok) {
                throw new Error(responseData.message || 'Error en la solicitud')
            }
            return { succes: true, responseData }
        }).catch(error => {
            return { succes: false, error: error.message }
        })
)
}