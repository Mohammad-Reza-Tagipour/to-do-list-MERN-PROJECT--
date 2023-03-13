import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [itemText, setItemText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [updateItemText, setUpdateItemText] = useState("");
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://to-do-backend-llbe.onrender.com/api/item",
        {
          item: itemText,
        }
      );
      setListItems((prev) => [...prev, res.data]);
      setItemText("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get(
          "https://to-do-backend-llbe.onrender.com/api/items"
        );
        setListItems(res.data);
        console.log("render");
      } catch (err) {
        console.log(err);
      }
    };
    getItemsList();
  }, []);

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(
        `https://to-do-backend-llbe.onrender.com/api/item/${id}`
      );
      const newListItems = listItems.filter((item) => item._id !== id);
      setListItems(newListItems);
    } catch (error) {
      console.log(error);
    }
  };
  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://to-do-backend-llbe.onrender.com/${isUpdating}`,
        {
          item: updateItemText,
        }
      );
      setIsUpdating("");
      setUpdateItemText("");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  //UPDATE
  let renderUpdateForm = () => {
    <form
      className="update-form "
      onSubmit={(e) => {
        updateItem(e);
      }}
    >
      <input
        className="update-new-input"
        type="text"
        placeholder="New item"
        onChange={(e) => {
          setUpdateItemText(e.target.value);
        }}
        value={updateItemText}
      >
        <button className="update-new-btn" type="sumbit">
          Update
        </button>
      </input>
    </form>;
  };

  return (
    <div className="App">
      <h1>Todo List </h1>
      <form className="form" onSubmit={(e) => addItem(e)}>
        <input
          type="text"
          placeholder="Add Todo Item"
          onChange={(e) => {
            setItemText(e.target.value);
          }}
          value={itemText}
        ></input>
        <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        {listItems.map((item) => (
          <div className="todo-item">
            {isUpdating === !item._id ? (
              renderUpdateForm()
            ) : (
              <>
                <p className="item-content">{item.item}</p>
                <button
                  className="update-item"
                  onClick={() => {
                    setIsUpdating(item._id);
                  }}
                >
                  Update
                </button>
                <button
                  className="delete-item"
                  onClick={() => {
                    deleteItem(item._id);
                  }}
                >
                  Remove
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
