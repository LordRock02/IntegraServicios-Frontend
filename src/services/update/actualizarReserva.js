const ENDPOINT=`${import.meta.env.VITE_API_URL}/reservas/actualizar`

export function actualizarReserva (data) {
  const token = localStorage.getItem('token');
  console.log(data)

  return (
    fetch(`${ENDPOINT}`, { method: 'PUT',
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
            return { success: true, responseData }
        }).catch(error => {
            return { success: false, error: error.message }
        })
  )
}