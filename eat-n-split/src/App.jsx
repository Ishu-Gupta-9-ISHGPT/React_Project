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

  function handleSplitBill(value) {
    setFriends((prev) =>
      prev.map((friend) =>
        friend.id === selectFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectFriend(null);
    setAddFriend(false);
    console.log("Split Bill Value:", value);
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
      {selectFriend && (
        <FormSplitBill
          friends={friends}
          selectFriend={selectFriend}
          onSpltBill={handleSplitBill}
        />
      )}
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

function FormSplitBill({ friends, selectFriend, onSpltBill }) {
  const [billAmount, setBillAmount] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const friendExpense = billAmount
    ? Number(billAmount) - Number(yourExpense)
    : "";

  function handleSubmit(e) {
    e.preventDefault();

    if (!billAmount || !yourExpense) {
      return;
    }

    onSpltBill(whoIsPaying === "user" ? friendExpense : -yourExpense);

    // Reset form fields
    setBillAmount("");
    setYourExpense("");
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>💸 Split a bill with {selectFriend.name}</h2>
      <label htmlFor="bill-amount">💰 Bill Amount</label>
      <input
        type="text"
        name="bill-amount"
        id="bill-amount"
        value={billAmount}
        onChange={(e) => setBillAmount(Number(e.target.value))}
      />
      <label htmlFor="bill-amount">🧍‍♂️ Your Expense</label>
      <input
        type="text"
        name="bill-amount"
        id="bill-amount"
        value={yourExpense}
        onChange={(e) =>
          setYourExpense(
            Number(e.target.value) > billAmount
              ? yourExpense
              : Number(e.target.value)
          )
        } // Prevents yourExpense from exceeding billAmount
      />
      <label htmlFor="bill-amount">🧑‍🤝‍🧑 {selectFriend.name}'s Expense</label>
      <input
        type="text"
        name="bill-amount"
        id="bill-amount"
        value={friendExpense > 0 ? friendExpense : ""}
        disabled
      />
      <label htmlFor="select-friend">🤑 Who is paying the bill</label>
      {
        <select
          name="select-friend"
          id="select-friend"
          value={whoIsPaying}
          onChange={(e) => setWhoIsPaying(e.target.value)}
        >
          <option value="user">You</option>
          {friends.map((friend) => (
            <option key={friend.id} value={friend.id}>
              {friend.name}
            </option>
          ))}
        </select>
      }
      <Button>Split Bill</Button>
    </form>
  );
}
