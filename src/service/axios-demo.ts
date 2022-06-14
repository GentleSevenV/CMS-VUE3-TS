import axios from 'axios'

axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log(res)
})

axios
  .get('http://httpbin.org/get', {
    params: {
      name: 'Lilei',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })

axios
  .post('http://httpbin.org/post', {
    data: {
      name: 'Hanmeimei',
      age: 19
    }
  })
  .then((res) => {
    console.log(res.data)
  })
