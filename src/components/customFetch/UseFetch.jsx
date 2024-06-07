import { useEffect, useState } from 'react'

export default function UseFetch(url) {
const[x,setX]=useState([]);
    useEffect(() => {
        fetch(url)
  .then(response => response.json())
  .then(json => setX(json.results))
  .catch(error => console.error(error))
    }, [url]);
    return [x]
}
