import axios from 'axios';


const instanceAxios= axios.create({
    baseURL:process.env.REACT_APP_PUBLIC_URL,
    responseType:'json'
});

export const CustomAxios= async (url = '', bodyData = {}, method = 'post', contentType = 'application/json')=>{
    return await instanceAxios({
        method: method,
      url: url,
      data: bodyData,
      headers: {
        'Content-Type': contentType
      }
    })
}