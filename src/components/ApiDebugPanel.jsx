import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import BugReportIcon from '@mui/icons-material/BugReport'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import { colors, gradients } from '../constants/colors'



const MAX_LOGS = 100
const methodColor = (method) => {
  const colors = { GET: '#22c55e', POST: '#3b82f6', PUT: '#f59e0b', DELETE: '#ef4444', PATCH: '#8b5cf6' }
  return colors[method] || '#6b7280'
}
const getStatusColor = (status) => {
  if (status === 'error' || (typeof status === 'number' && status >= 500)) return '#ef4444'
  if (typeof status === 'number' && status >= 400) return '#f59e0b'
  if (typeof status === 'number' && status >= 200) return '#22c55e'
  return '#6b7280'
}
const formatJSON = (obj) => {
  try {
    return typeof obj === 'string' ? JSON.stringify(JSON.parse(obj), null, 2) : JSON.stringify(obj, null, 2)
  } catch {
    return String(obj)
  }
}

export default function ApiDebugPanel() {
  const [logs, setLogs] = useState([])
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [selectedLog, setSelectedLog] = useState(null)
  const originalFetchRef = useRef(window.fetch)

  useEffect(() => {
    const originalFetch = window.fetch
    window.fetch = async (...args) => {
      const startTime = performance.now()
      const [url, options = {}] = args
      const method = options.method || 'GET'
      const requestId = Math.random().toString(36).slice(2, 9)
      const timestamp = new Date().toISOString()

      const logEntry = {
        id: requestId,
        timestamp,
        method,
        url: typeof url === 'string' ? url : url?.url || String(url),
        requestBody: options.body ? (typeof options.body === 'string' ? options.body : '[FormData/Blob]') : null,
        requestHeaders: options.headers,
      }

      setLogs(prev => [...prev.slice(-MAX_LOGS + 1), { ...logEntry, status: 'pending' }])

      try {
        const response = await originalFetch.apply(this, args)
        const duration = performance.now() - startTime
        const responseClone = response.clone()
        let responseBody = null
        try {
          const text = await responseClone.text()
          responseBody = text ? JSON.parse(text) : null
        } catch {
          responseBody = null
        }

        setLogs(prev => prev.map(log =>
          log.id === requestId
            ? { ...log, status: response.status, duration: Math.round(duration), responseBody, responseHeaders: Object.fromEntries(response.headers.entries()) }
            : log
        ))

        return response
      } catch (error) {
        const duration = performance.now() - startTime
        setLogs(prev => prev.map(log =>
          log.id === requestId
            ? { ...log, status: 'error', duration: Math.round(duration), error: error.message }
            : log
        ))
        throw error
      }
    }

    return () => {
      window.fetch = originalFetch
    }
  }, [])

  const showPanel = open || logs.length > 0

  const filteredLogs = filter === 'all'
    ? logs
    : logs.filter(log =>
      filter === 'error'
        ? log.status === 'error' || (typeof log.status === 'number' && log.status >= 400)
        : log.method === filter.toUpperCase()
    )

  return (
    <>
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 9999,
          bgcolor: open ? colors.gold : 'rgba(18,18,30,0.9)',
          color: open ? '#12121e' : colors.gold,
          border: `1px solid ${colors.gold}`,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(8px)',
        }}
        aria-label={open ? 'Close API Debug Panel' : 'Open API Debug Panel'}
      >
        <BugReportIcon />
      </IconButton>

      {open && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            left: 0,
            maxHeight: '70vh',
            zIndex: 10000,
            bgcolor: '#0d0d12',
            borderTop: `1px solid ${colors.gold}`,
            boxShadow: '0 -8px 40px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            fontSize: '11px',
            color: '#e0e0e0',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: '8px 16px',
              borderBottom: `1px solid ${colors.gold}`,
              bgcolor: '#12121e',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <BugReportIcon sx={{ color: colors.gold }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: colors.gold }}>
                API Debug Panel
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
                {['all', 'GET', 'POST', 'PUT', 'DELETE', 'error'].map(f => (
                  <Button
                    key={f}
                    size="small"
                    variant={filter === f ? 'contained' : 'outlined'}
                    onClick={() => setFilter(f)}
                    sx={{
                      textTransform: 'none',
                      fontSize: '10px',
                      px: 1.5,
                      bgcolor: filter === f ? colors.gold : 'transparent',
                      color: filter === f ? '#12121e' : colors.gold,
                      borderColor: colors.gold,
                      '&:hover': { bgcolor: filter === f ? '#b8860b' : 'rgba(255, 179, 0,0.1)' },
                    }}
                  >
                    {f}
                  </Button>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                size="small"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(logs, null, 2))
                }}
                aria-label="Copy all logs"
                sx={{ color: colors.gold }}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => setLogs([])}
                aria-label="Clear logs"
                sx={{ color: '#ef4444' }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => setOpen(false)}
                aria-label="Close panel"
                sx={{ color: colors.gold }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 1,
              maxHeight: '60vh',
            }}
          >
            {filteredLogs.length === 0 ? (
              <Typography sx={{ textAlign: 'center', color: '#666', py: 4, fontSize: '12px' }}>
                No API calls yet. Make a request to see logs.
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {filteredLogs.map(log => (
                  <Box
                    key={log.id}
                    sx={{
                      border: `1px solid ${log.status === 'error' || (typeof log.status === 'number' && log.status >= 400) ? '#ef4444' : colors.gold}`,
                      borderRadius: 2,
                      bgcolor: selectedLog?.id === log.id ? 'rgba(255, 179, 0,0.1)' : 'rgba(18,18,30,0.9)',
                      p: 1,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      '&:hover': { bgcolor: 'rgba(255, 179, 0,0.15)' },
                    }}
                    onClick={() => setSelectedLog(selectedLog?.id === log.id ? null : log)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            px: 1,
                            py: 0.2,
                            borderRadius: 1,
                            fontSize: '9px',
                            fontWeight: 700,
                            color: '#fff',
                            background: methodColor(log.method),
                            minWidth: 45,
                            textAlign: 'center',
                          }}
                        >
                          {log.method}
                        </Box>
                        <Typography variant="caption" sx={{ color: '#ccc', fontFamily: 'monospace', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {log.url.replace('http://localhost:3001/api', '')}
                        </Typography>
                        {log.duration && (
                          <Typography variant="caption" sx={{ color: '#888', fontSize: '10px' }}>
                            {log.duration}ms
                          </Typography>
                        )}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {log.status === 'pending' && (
                          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#f59e0b', animation: 'pulse 1s infinite' }} />
                        )}
                        {typeof log.status === 'number' && (
                          <Box
                            sx={{
                              px: 1,
                              py: 0.2,
                              borderRadius: 1,
                              fontSize: '9px',
                              fontWeight: 700,
                              color: '#fff',
                              background: getStatusColor(log.status),
                              minWidth: 35,
                              textAlign: 'center',
                            }}
                          >
                            {log.status}
                          </Box>
                        )}
                        {log.status === 'error' && (
                          <Box sx={{ px: 1, py: 0.2, borderRadius: 1, fontSize: '9px', fontWeight: 700, color: '#fff', background: '#ef4444' }}>
                            ERROR
                          </Box>
                        )}
                      </Box>
                    </Box>
                    {selectedLog?.id === log.id && (
                      <Box sx={{ mt: 1, pt: 1, borderTop: `1px solid ${colors.gold}33`, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {log.requestBody && (
                          <Box>
                            <Typography variant="caption" sx={{ color: colors.gold, mb: 0.5, fontWeight: 600 }}>
                              Request Body
                            </Typography>
                            <Box
                              sx={{
                                fontSize: '10px',
                                color: '#bbb',
                                bgcolor: '#0a0a0f',
                                p: 1,
                                borderRadius: 1,
                                overflow: 'auto',
                                maxHeight: 200,
                                fontFamily: 'monospace',
                                whiteSpace: 'pre-wrap',
                              }}
                            >
                              {formatJSON(log.requestBody)}
                            </Box>
                          </Box>
                        )}
                        {log.responseBody && (
                          <Box>
                            <Typography variant="caption" sx={{ color: getStatusColor(log.status) || colors.gold, mb: 0.5, fontWeight: 600 }}>
                              Response ({log.status})
                            </Typography>
                            <Box
                              sx={{
                                fontSize: '10px',
                                color: '#bbb',
                                bgcolor: '#0a0a0f',
                                p: 1,
                                borderRadius: 1,
                                overflow: 'auto',
                                maxHeight: 300,
                                fontFamily: 'monospace',
                                whiteSpace: 'pre-wrap',
                              }}
                            >
                              {formatJSON(log.responseBody)}
                            </Box>
                          </Box>
                        )}
                        {log.error && (
                          <Box sx={{ color: '#ef4444', fontSize: '10px', fontFamily: 'monospace' }}>
                            Error: {log.error}
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  )
}