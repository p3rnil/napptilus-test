import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { getItem, setItem } from '../utils/localStorage'

axios.defaults.baseURL =
  'https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas'

const useOompaLoompas = (id) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(() => {
    setLoading(true)
    axios
      .get(`/${id}`)
      .then((res) => {
        // Filter the needed fields + id
        const oompaLoompa = {
          id,
          image: res.data.image,
          name: res.data.first_name,
          gender: res.data.gender,
          profession: res.data.profession,
          description: res.data.description,
        }

        // Update local storage
        const localStorageList = getItem(`OompaLoompasSelected`)

        if (localStorageList !== null) {
          // Search if Oompa Loompa exists
          const found = localStorageList.find(
            (element) => element.info.id === id
          )

          if (found) {
            // Replace the oompa loompa
            const index = localStorageList.findIndex(
              (element) => element.info.id === id
            )

            localStorageList[index].info = oompaLoompa
            localStorageList[index].timestamp = Date.now()

            setItem(`OompaLoompasSelected`, localStorageList)
          } else {
            // Add new oompa loompa
            setItem(`OompaLoompasSelected`, [
              ...localStorageList,
              { timestamp: Date.now(), info: oompaLoompa },
            ])
          }
        } else {
          // Does not exist anything
          setItem(`OompaLoompasSelected`, [
            { timestamp: Date.now(), info: oompaLoompa },
          ])
        }
        setResponse(oompaLoompa)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  useEffect(() => {
    // Check local storage
    const oompaLoompasList = getItem(`OompaLoompasSelected`)

    if (oompaLoompasList !== null) {
      const found = oompaLoompasList.find((element) => element.info.id === id)

      if (found) {
        // Found oompa on local storage
        const daysPassed = Math.floor(
          (Date.now() - found.timestamp) / (1000 * 60 * 60 * 24)
        )

        // Check days
        if (daysPassed < 1) {
          setResponse(found.info)
          setLoading(false)
        } else {
          // Fetch api
          fetchData()
        }
      } else {
        // Not found oompa in local storage
        // Fetch api
        fetchData()
      }
    } else {
      // Fetch api
      fetchData()
    }
  }, [fetchData, id])

  // custom hook returns value
  return { response, error, loading }
}

export default useOompaLoompas
