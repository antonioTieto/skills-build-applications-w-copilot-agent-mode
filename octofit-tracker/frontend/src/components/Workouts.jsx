import { useEffect, useState } from 'react'

const extractItems = (payload) => {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []
  if (Array.isArray(payload.items)) return payload.items
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.data)) return payload.data
  if (payload.data && typeof payload.data === 'object') {
    if (Array.isArray(payload.data.items)) return payload.data.items
    if (Array.isArray(payload.data.results)) return payload.data.results
  }
  return []
}

function Workouts() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const codespaceEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  const fallbackEndpoint = 'http://localhost:8000/api/workouts/'
  const endpoint = import.meta.env.VITE_CODESPACE_NAME ? codespaceEndpoint : fallbackEndpoint

  useEffect(() => {
    const controller = new AbortController()

    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await fetch(endpoint, { signal: controller.signal })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        setItems(extractItems(data))
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError('Unable to load workouts right now.')
        }
      } finally {
        setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [endpoint])

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>
        <p className="text-body-secondary small mb-3">Endpoint: {endpoint}</p>
        {loading && <p>Loading workouts...</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
          <ul className="list-group list-group-flush">
            {items.map((workout) => (
              <li key={workout._id ?? workout.title} className="list-group-item px-0">
                <strong>{workout.title ?? 'Workout'}</strong>
                <div className="small text-body-secondary">
                  {workout.category ?? 'general'} • {workout.durationMinutes ?? 0} min
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default Workouts
