import { useEffect } from 'react'

export function usePageMeta(title, description) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title ? `${title} · MGM Cultural Navratri` : 'MGM Cultural Navratri · Ten Nights of Garba'

    let prevMeta = null
    if (description) {
      prevMeta = document.querySelector('meta[name="description"]')
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = description
      if (prevMeta) {
        document.head.replaceChild(meta, prevMeta)
      } else {
        document.head.appendChild(meta)
      }
    }

    return () => {
      document.title = prevTitle
      if (description && prevMeta) {
        const existing = document.querySelector('meta[name="description"]')
        if (existing) document.head.removeChild(existing)
        if (prevMeta) document.head.appendChild(prevMeta)
      }
    }
  }, [title, description])
}
