import React from 'react'

const formatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
})

const formatDateTime = (date) => {
  const parts = formatter.formatToParts(date)
  const get = (type) => parts.find((p) => p.type === type)?.value ?? ''

  const capitalize = (value) =>
    value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : ''

  const weekday = capitalize(get('weekday'))
  const month = capitalize(get('month'))
  const day = get('day')
  const hour = get('hour')
  const minute = get('minute')
  const dayPeriod = (get('dayPeriod') || '').toUpperCase()

  return `${weekday} ${month} ${day} ${hour}:${minute} ${dayPeriod}`.trim()
}

const DateTime = () => {
  const [now, setNow] = React.useState(() => new Date())

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return <div>{formatDateTime(now)}</div>
}

export default DateTime
