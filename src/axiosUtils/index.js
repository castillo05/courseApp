import axios from 'axios';

const URI=process.env.REACT_APP_PUBLIC_URL;

const instanceAxios= axios.create({
    baseURL:URI,
    responseType:'json'
});

export const CustomAxios= async (url = '', bodyData = {}, method = 'post', contentType = 'application/json')=>{
    return await instanceAxios({
        method: method,
      url: URI + url,
      data: bodyData,
      headers: {
        'Content-Type': contentType
      }
    })
}