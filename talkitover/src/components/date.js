import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

function MyApp() {
    const [date,setDate]= useState(new Date());
    const onChange = date => setDate({ date });
 
      return (
        <div>
          <DateTimePicker
            onChange={onChange}
            value={date}
          />
        </div>
      );
 
  }

  export default MyApp;