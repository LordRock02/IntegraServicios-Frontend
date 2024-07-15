const API_URL = import.meta.env.VITE_API_URL;
const ENDPOINT_RECOURSE = `${API_URL}/unidades/eliminar/`;

export default function deleteUnidad(idUnidad) {
    const token = localStorage.getItem('token');

    return fetch(`${ENDPOINT_RECOURSE}${idUnidad}`, {
        method: 'DELETE',
        headers: {
            'Authorization': token
        }
    })
    .then(async res => {
        console.log(res)
        const responseData = await res.json();
        if (!res.ok) {
            throw new Error(responseData.message || 'Error al eliminar la unidad');
        }
        return { success: true, responseData };
    })
    .catch(error => {
        return { success: false, error: error.message };
    });
}
