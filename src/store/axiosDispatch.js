import { api } from '@/plugins/axios'

const axiosDispatch = (params) => {
  return new Promise((resolve, reject) => {
    if (!params.url) {
      return reject(new Error('Missing URL parameter.'))
    }

    const opt = {
      method: params.method || 'get',
      url: params.url,
      headers: params.headers || {},
      data: params.data || null,
      params: params.params || null
    }

    api(opt) // Usa a instância configurada
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export default axiosDispatch
