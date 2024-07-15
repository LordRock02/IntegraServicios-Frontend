const ENDPOINT = `${import.meta.env.VITE_API_URL}/reservas/recurso`

export default function getReservasRecurso(recursoId) {
    const token = localStorage.getItem('token');


    return (
        fetch(`${ENDPOINT}/${recursoId}`, { method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(async res => {
                console.log(res)
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