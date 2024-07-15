const API_URL = import.meta.env.VITE_API_URL;
const ENDPOINT_RECOURSE = `${API_URL}/reservas/cancelar/`;

export default function cancelReserva(idReserva) {
    const token = localStorage.getItem('token');

    return fetch(`${ENDPOINT_RECOURSE}${idReserva}`, {
        method: 'DELETE',
        headers: {
            'Authorization': token
        }
    })
    .then(async res => {
        console.log(res)
        const responseData = await res.json();
        if (!res.ok) {
            throw new Error(responseData.message || 'Error al cancelar la recurso');
        }
        return { success: true, responseData };
    })
    .catch(error => {
        return { success: false, error: error.message };
    });
}
