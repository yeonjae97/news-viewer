import React, { useState } from 'react';
import axios from '../node_modules/axios/index';

const App = () => {
  const [data, setData] = useState(null);
  const onClick = async () => {
    // axios.get("https://jsonplaceholder.typicode.com/todos/1")
    // .then(response => {
    //   setData(response.data)
    // });
    try{

      const response = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=kr&apiKey=95dd9e7aee234b2595c98eb9a7fa59c5"
      )
      setData(response.data);
    }catch(e){
      console.log(e);
    }
  };
  return (
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && <textarea rows={7} value={JSON.stringify(data, null, 2)} readOnly={true} />} 
    </div>
  );
};

export default App;