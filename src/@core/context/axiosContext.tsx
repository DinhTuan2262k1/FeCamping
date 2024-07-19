import axios, { AxiosError } from 'axios'
import { ReactNode, createContext, useState } from 'react'
import https from 'https'
import BackDrop from 'src/layouts/components/loading/BackDrop'
import { toast } from 'react-toastify'

export type AxiosContextModelValue = {
  loading: boolean
  call: (method: 'get' | 'post' | 'patch' | 'put' | 'delete', url: string, data?: any, loading?: boolean) => any | null
}

const axiosClient = axios.create({
	baseURL: 'https://prn231.vinhuser.one/api/v1',

	// baseURL: 'https://localhost:7245/api/v1',
	httpsAgent: new https.Agent({
		rejectUnauthorized: false // Allow self-signed certificates
	}),
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Methods': '*',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Credentials': 'true',
		'Access-Control-Allow-Origin': '*'
	}
})

export const AuthContextModel = createContext<AxiosContextModelValue>({
  loading: false,
  call: async () => null,
} as AxiosContextModelValue)

export const AxiosProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const call = async (
    method: 'get' | 'post' | 'patch' | 'put' | 'delete',
    url: string,
    data?: any,
    loading?: boolean
  ) => {
    try {
      setLoading(true)
      console.log({ method, url, data, loading })

      if (method === 'get') {
        const response = await axiosClient.get(url, {
          params: {
            ...data,
          },
        })

        return response.data
      }

      if (method === 'delete') {
        const response = await axiosClient.delete(url, {
          params: {
            ...data,
          },
        })

        return response.data
      }

      if (method === 'post') {
        const response = await axiosClient.post(url, { ...data })

        return response.data
      }

      if (method === 'patch') {
        const response = await axiosClient.patch(url, { ...data })

        return response.data
      }

      if (method === 'put') {
        const response = await axiosClient.put(url, { ...data })

        return response.data
      }

      throw new Error('Invalid method: ' + method)
    } catch (error) {
      console.log(error)
      toast.error((error as AxiosError).message)

      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContextModel.Provider value={{ loading, call }}>
      {children}
      <BackDrop open={loading} />
    </AuthContextModel.Provider>
  )
}
