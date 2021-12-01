import React, { useEffect, useState } from 'react';
import * as socket from 'socket.io-client';
import { AUTH_EVENT_ENUMS } from '../constants/user-management-event-enums';

const ExampleWrapper = () => {
  const [socketObj, setSocketObj] = useState(null);

  useEffect(() => {
    setSocketObj(socket.io(`${process.env.REACT_APP_SOCKET_URI}/auth`));
  }, []);

  useEffect(() => {
    if (socketObj) {
      socketObj.on('testEvent', data => {
        console.log('***-testEvent', data, `/auth`);
      });

      socketObj.on(AUTH_EVENT_ENUMS.LOGIN_REQUEST_ACCEPTED, () => {
        console.log('login Request accepted');
      });
    }

    return () => {
      socketObj && socketObj.disconnect();
    };
  }, [socketObj]);

  return <></>;
};

export default ExampleWrapper;
