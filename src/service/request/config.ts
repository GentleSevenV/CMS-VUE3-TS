let BASE_URL = ''
let TIME_OUT = 0

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://www.coderwhy.org/dev'
  TIME_OUT = 1000
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://www.coderwhy.org/pro'
  TIME_OUT = 2000
} else {
  BASE_URL = 'http://www.coderwhy.org/test'
  TIME_OUT = 3000
}

export { BASE_URL, TIME_OUT }
