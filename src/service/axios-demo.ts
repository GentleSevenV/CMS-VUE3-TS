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

axios
  .request({
    url: 'http://123.207.32.32:8000/home/multidata',
    method: 'get'
    // ...
  })
  .then((res) => {
    console.log(res.data)
  })

axios
  .all([
    axios.get('http://httpbin.org/get', { params: { name: 'Lilei', age: 18 } }),
    axios.post('http://httpbin.org/post', { data: { name: 'Hanmeimei', age: 19 } })
  ])
  .then((res) => {
    console.log(res) //因为当前一次性发送了2个请求，打印出res是一个数组
    console.log(res[0].data) //从res数组中取出第1个请求结果
    console.log(res[1].data) //从res数组中取出第2个请求结果
  })
