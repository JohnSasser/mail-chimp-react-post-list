import React, { useState } from 'react';
import './style.css';

function Navbar(props) {
  const [searchbarInput, setSearchbarInput] = useState('');

  console.log('searchbarInput: ', searchbarInput);

  const search = () => {
    const filteredComments = props.comments.filter(
      x => x.name.includes(searchbarInput)
      // console.log()
    );
    // commentsUserNames.filter(searchbarInput);
    console.log('filteredComments', filteredComments);
    props.setFilteredComments(filteredComments);
  };

  const handleInput = e => {
    setSearchbarInput(e.target.value);

    search();
  };

  return (
    <nav
      className="navbar-dark"
      style={{ justifyContent: 'space-around', padding: '.5em' }}
    >
      <h2 href="/">Comment board</h2>
      <input
        style={{ marginTop: '.5em', height: '70%', width: '250px' }}
        type="search"
        onChange={handleInput}
        placeholder="search"
      />
    </nav>
  );
}

export default Navbar;
