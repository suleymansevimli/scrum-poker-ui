import React, { useEffect } from "react";
import * as socket from 'socket.io-client';

const ExampleWrapper = () => {

  const AUTH = socket.io(`${process.env.REACT_APP_SOCKET_URI}/auth`);

  
  useEffect(() => {
    AUTH.on('testEvent', data => {
      console.log('***-testEvent', data, `/auth`)
    });

    return () => AUTH.disconnect();
  }, [AUTH]);

  return <></>;
}

export default ExampleWrapper;