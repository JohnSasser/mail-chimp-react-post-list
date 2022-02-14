import React, { useState, useEffect } from 'react';
import './style.css';

function Navbar(props) {
  const [searchbarInput, setSearchbarInput] = useState('');

  console.log('searchbarInput: ', searchbarInput);

  const search = () => {
    let usersArray = props.comments.map(j =>
      typeof j.name === 'string' ? j.name.toLowerCase() : null
    );

    let filteredComments = usersArray.filter(x => {
      console.log(x.includes(searchbarInput));
      if (x.includes(searchbarInput.toLowerCase())) {
        return x;
      } else return;
    });

    props.setFilteredComments(filteredComments);

    console.log('filteredComments', filteredComments);
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
