const ENDPOINT=`${import.meta.env.VITE_API_URL}/recursos/registrarExternos`

export function registrarRecursosExternos (data) {
  const token = localStorage.getItem('token');
  console.log(data)

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