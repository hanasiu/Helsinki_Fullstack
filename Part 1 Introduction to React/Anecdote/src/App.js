import { useState } from "react";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Display = ({ anecdotes, selected, vote }) => (
  <div>
    <p>{anecdotes[selected]}</p>
    <p>has {vote} votes</p>
  </div>
);

const MostVote = ({ anecdotes, votes }) => {
  const maxNum = Math.max(...votes);
  const maxIdx = votes.indexOf(maxNum);

  if (maxNum === 0) return <p>Vote not yet start</p>;
  else return (
    <div>
      <p>{anecdotes[maxIdx]}</p>
      <p>has {maxNum} votes</p>
    </div>
  )
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const anecNum = anecdotes.length;

  const [selected, setSelected] = useState(0);
  const [votes, setVoted] = useState(Array(anecNum).fill(0));

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const generateRandom = (newValue) => {
    const randomNum = getRandomInt(newValue);
    setSelected(randomNum);
  };

  const plusVote = (idx, arr) => {
    const copyArr = [...arr];
    copyArr[idx] += 1;
    setVoted(copyArr);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display
        anecdotes={anecdotes}
        selected={selected}
        vote={votes[selected]}
      />
      <Button handleClick={() => plusVote(selected, votes)} text="votes" />
      <Button
        handleClick={() => generateRandom(anecNum)}
        text="next anecdote"
      />
      <h1>Anecdote with most votes</h1>
      <MostVote anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

export default App;
