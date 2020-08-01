import cookie from 'react-cookies';

const axiosConfig = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'cookies': `${cookie.load('remember token')}`,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };


export default axiosConfig;
