import axios from 'axios'
import { message } from 'antd'
import { stringify } from 'qs'
message.config({
  top: 50,
})

axios.defaults.baseURL = "http://139.199.64.249:8080/museum-0.0.1-SNAPSHOT"
const fetch = (url, options) => {
  const { method = 'get', data } = options;
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, data)
    case 'post':
      return axios.post(url, stringify(data))
  }
}

function handelData(res) {
  if(res){
    if (res.data.code == 200) {
      return res.data
    } else {
      message.error('请求失败');
    }
  }
}

export default function request(url, options) {
  return fetch(url, options)
    .then(handelData)
}

