import React, { useState, useEffect } from 'react';
import './style.css';

function Navbar(props) {
  const [searchbarInput, setSearchbarInput] = useState('');

  const search = () => {
    // FILTER ARRAY OF NAMES FROM POSTED COMMENTS **BY** VALUE IN SEARCH-BAR, UPDATE GLOBAL STATE OF FILTEREDCOMMENTS;
    let usersArray = props.comments.map(j =>
      typeof j.name === 'string' ? j.name.toLowerCase() : null
    );

    let filteredComments = usersArray.filter(x => {
      if (x.includes(searchbarInput.toLowerCase())) {
        return x;
      } else return;
    });

    props.setFilteredComments(filteredComments);
  };

  useEffect(() => {
    search();
  }, [searchbarInput]);

  return (
    <nav
      className="navbar-dark"
      style={{ justifyContent: 'space-around', padding: '.5em' }}
    >
      <h2 href="/">Comment board</h2>
      <input
        style={{ marginTop: '.5em', height: '70%', width: '250px' }}
        type="search"
        onChange={e => setSearchbarInput(e.target.value)}
        placeholder="search"
      />
    </nav>
  );
}

export default Navbar;
