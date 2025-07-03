import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setAddFriend] = useState(false);
  const [selectFriend, setSelectFriend] = useState(null);
  const [friends, setFriends] = useState(initialFriends);

  const toggleAddFriend = () => setAddFriend((prev) => !prev);
  function selectFriendHandler(friend) {
    setSelectFriend((curr) => {
      setSelectFriend(curr?.id === friend?.id ? null : friend);
      setAddFriend(false);
    });
  }
  function addFriend(newFriend) {
    setFriends((prev) => [...prev, newFriend]);
    setAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelectFriend={selectFriendHandler}
          selectFriend={selectFriend}
        />
        {showAddFriend && <AddFriend onAddFriend={addFriend} />}
        <Button onClick={toggleAddFriend}>
          {!showAddFriend ? `Add Friend` : `Close`}
        </Button>
      </div>
      {selectFriend && <FormSplitBill selectFriend={selectFriend} />}
    </div>
  );
}

function FriendsList({ friends, onSelectFriend, selectFriend }) {
  return (
    <ul>
      {friends.map((friend) => {
        return (
          <Friend
            key={friend.id}
            friend={friend}
            onSelectFriend={onSelectFriend}
            selectFriend={selectFriend}
          />
        );
      })}
    </ul>
  );
}

function Friend({ friend, onSelectFriend, selectFriend }) {
  const isSelected = selectFriend && selectFriend?.id === friend?.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${friend.balance}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even.</p>}
      <Button onClick={() => onSelectFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function AddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name && !image) {
      return;
    }

    const newFriend = {
      id: Date.now(),
      name,
      image: image || `https://i.pravatar.cc/48?u=${Date.now()}`,
      balance: 0,
    };
    console.log("New Friend Added:", newFriend);

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  };

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="name">🧑‍🤝‍🧑 Friend Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="image">🖼️ Image URL</label>
      <input
        type="text"
        name="image"
        id="image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectFriend }) {
  return (
    <form className="form-split-bill">
      <h2>💸 Split a bill with {selectFriend.name}</h2>
      <label htmlFor="bill-amount">💰 Bill Amount</label>
      <input type="text" name="bill-amount" id="bill-amount" />
      <label htmlFor="bill-amount">🧍‍♂️ Your Expense</label>
      <input type="text" name="bill-amount" id="bill-amount" />
      <label htmlFor="bill-amount">🧑‍🤝‍🧑 {selectFriend.name}'s Expense</label>
      <input type="text" name="bill-amount" id="bill-amount" />
      <label htmlFor="select-friend">🤑 Who is paying the bill</label>
      <select name="select-friend" id="select-friend">
        <option value="">Select a friend</option>
        <option value="118836">Clark</option>
        <option value="933372">Sarah</option>
        <option value="499476">Anthony</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
