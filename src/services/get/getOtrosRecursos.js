const ENDPOINT = `${import.meta.env.VITE_API_URL}/recursos/listarExternos`

export default function geOtrosRecursos() {
    const token = localStorage.getItem('token');


    return (
        fetch(`${ENDPOINT}`, { method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
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