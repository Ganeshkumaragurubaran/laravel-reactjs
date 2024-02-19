import React from 'react';
import AuthUser from './components/AuthUser';
import Guest from './navbar/guest';
import Auth from './navbar/auth';

const App = () => {
  
    const {getToken} = AuthUser();
    if(!getToken()){
      return <Guest />
    }
    return (
        <Auth />
    );
}

export default App;
