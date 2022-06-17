let BASE_URL = ''
const TIME_OUT = 5000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://123.207.32.32:8000'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://www.coderwhy.org/pro'
} else {
  BASE_URL = 'http://www.coderwhy.org/test'
}

export { BASE_URL, TIME_OUT }
