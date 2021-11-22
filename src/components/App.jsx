import React, { useState , useEffect } from "react";
import ToDoItem from "./ToDoItem";

const getLocalStorage =() =>{
  let items =localStorage.getItem("items");
  if(items){
    return (items=JSON.parse(localStorage.getItem("items")));
  }else{
    return [];
  }
};

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState(getLocalStorage());


  useEffect(() => {
    localStorage.setItem("items",JSON.stringify(items));
  }, [items]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem() {
    setItems(prevItems => {
      return [...prevItems, inputText];
    });
    setInputText("");
  }

  function deleteItem(id) {
    setItems(prevItems => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={inputText} />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ol>
          {items.map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={index}
              text={todoItem}
              onChecked={deleteItem}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
