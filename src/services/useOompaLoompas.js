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
        console.log(list)
        // Update local storage
        setItem(`page${pageNumber}`, list)

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

    const pageList = getItem(`page${pageNumber}`)

    if (pageList !== null) {
      // Found on local storage
      setResponse(pageList)
      setLoading(false)
    } else {
      fetchData()
    }
  }, [fetchData, pageNumber])

  // custom hook returns value
  return { response, error, loading }
}

export default useOompaLoompas
