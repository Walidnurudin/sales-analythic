/* eslint-disable */
import axios from 'axios'
import { useState, useEffect } from 'react'

const useDataFetching = (url, { initialParams = {}, token = '', onSuccess, onError, enable = true }) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = async (params, isString = false) => {
        setIsLoading(true)
        try {
            const config = {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            }

            if (isString) delete config.params
            else config.params = params || initialParams

            const response = await axios.get(`${process.env.REACT_APP_API_URL}${url}${isString ? `?${params}` : ''}`, config)
            setData(response.data)
            onSuccess && onSuccess(response.data)
            return response.data
        } catch (error) {
            onError && onError(error)
            return error
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (enable) fetchData(initialParams, false)

        return () => {

        }
    }, [url, enable])


    return { data, isLoading, refetch: (payload, isString) => fetchData(payload, isString) }
}

export default useDataFetching
