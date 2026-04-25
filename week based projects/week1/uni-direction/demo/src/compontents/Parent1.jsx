
import Child1 from './Child1';

const Parent1 = () => {
  
  const handleMessage = (msg) => {
    alert("Message from Child: "+msg);
  }
  
  return (
    <>
      <h1>Parent Component</h1>
      <Child1 key1 = "hello" key2 = {500} sendData = {handleMessage}></Child1>

    </>
  );
};

export default Parent1;