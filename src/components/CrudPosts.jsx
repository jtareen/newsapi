import React, { useEffect, useState } from "react";

function CrudPosts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  // GET Posts
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  // POST Create Post
  const handleAdd = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((newPost) => setPosts([newPost, ...posts]));

    setTitle("");
  };

  // PUT Update Post
  const handleUpdate = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((updatedPost) => {
        setPosts(
          posts.map((p) => (p.id === id ? updatedPost : p))
        );
        setEditId(null);
        setTitle("");
      });
  };

  // DELETE Post
  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    }).then(() => setPosts(posts.filter((p) => p.id !== id)));
  };

  return (
    <div>
      <h2>CRUD Operations (POST / PUT / DELETE)</h2>

      {/* Input */}
      <input
        style={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter post title"
      />

      {editId ? (
        <button style={styles.btn} onClick={() => handleUpdate(editId)}>
          Update
        </button>
      ) : (
        <button style={styles.btn} onClick={handleAdd}>
          Add
        </button>
      )}

      {/* Posts List */}
      <ul>
        {posts.map((p) => (
          <li key={p.id} style={{ margin: "10px 0" }}>
            {p.title}

            <button
              style={styles.smallBtn}
              onClick={() => {
                setEditId(p.id);
                setTitle(p.title);
              }}
            >
              Edit
            </button>

            <button
              style={styles.smallBtnDelete}
              onClick={() => handleDelete(p.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  input: {
    padding: "10px",
    width: "60%",
    borderRadius: "6px",
    border: "1px solid gray",
    marginRight: "10px",
  },
  btn: {
    padding: "10px 18px",
    background: "blue",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  smallBtn: {
    marginLeft: "10px",
    padding: "5px 10px",
    background: "orange",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },
  smallBtnDelete: {
    marginLeft: "10px",
    padding: "5px 10px",
    background: "red",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default CrudPosts;
