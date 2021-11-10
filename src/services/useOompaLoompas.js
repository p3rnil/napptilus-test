import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { getItem, setItem } from '../utils/localStorage'

axios.defaults.baseURL =
  'https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas'

const useOompaLoompas = (pageNumber) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(() => {
    axios
      .get(null, {
        params: {
          page: pageNumber,
        },
      })
      .then((res) => {
        const list = res.data.results.map((element) => {
          return {
            name: element.first_name,
            image: element.image,
            profession: element.profession,
            gender: element.gender,
          }
        })

        // Update local storage
        const localStorageList = getItem(`OompaLoompas`)

        if (localStorageList !== null) {
          setItem(`OompaLoompas`, [
            ...localStorageList,
            { page: pageNumber, timestamp: new Date(), list },
          ])
        } else {
          setItem(`OompaLoompas`, [
            { page: pageNumber, timestamp: new Date(), list },
          ])
        }

        setResponse(list)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [pageNumber])

  useEffect(() => {
    // Check local storage
    const oompaLoompasList = getItem(`OompaLoompas`)

    if (oompaLoompasList !== null) {
      const pageList = oompaLoompasList.find(
        (element) => element.page === pageNumber
      )

      if (pageList) {
        // Found on local storage
        setResponse(pageList.list)
        setLoading(false)
      } else {
        // Fetch api
        fetchData()
      }
    } else {
      // Fetch api
      fetchData()
    }
  }, [fetchData, pageNumber])

  // custom hook returns value
  return { response, error, loading }
}

export default useOompaLoompas
