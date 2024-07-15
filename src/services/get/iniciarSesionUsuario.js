const ENDPOINT=`${import.meta.env.VITE_API_URL}/auth/login`

export default function inicioSesion(data) {

  console.log(JSON.stringify(data));

  return fetch(`${ENDPOINT}`, {
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then(async res => {
      console.log(res)
      const responseData = await res.json()
      
      if (!res.ok) {
          throw new Error(responseData.mensaje)
      }
      return { succes: true, responseData }
  }).catch(error => {
      console.log(error)
      return { succes: false, error: error.message }
  })
}