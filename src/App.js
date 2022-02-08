import React, { useState } from 'react';
import Navbar from './components/Nav';
import FormComponent from './components/Form';
import Comments from './components/Comments';

import './App.css';

function App() {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [formToggle, setFormToggle] = useState(false);

  return (
    <>
      <Navbar
        comments={comments}
        setComments={setComments}
        setFilteredComments={setFilteredComments}
      />
      <div id="root-container" className="container-fluid">
        <div className="col-md-5">
          <FormComponent
            formToggle={formToggle}
            setFormToggle={setFormToggle}
          />
        </div>
        <div className="col-md-7">
          <Comments
            comments={comments}
            setComments={setComments}
            filteredComments={filteredComments}
            formToggle={formToggle}
            setFormToggle={setFormToggle}
          />
        </div>
      </div>
    </>
  );
}

export default App;
