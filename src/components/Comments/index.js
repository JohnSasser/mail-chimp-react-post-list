import React, { useEffect } from 'react';
import './style.css';
import axios from 'axios';

const Comments = props => {
  useEffect(() => {
    commentsAPI();

    if (props.formToggle) {
      commentsAPI();
      props.setFormToggle(false);
    }

    randomUserAPI();
  }, [props.formToggle, props.filteredComments]);

  // GET REQUEST FOR COMMENTS FROM SQLITE DB;
  const commentsAPI = () => {
    axios
      .get('/getComments')
      .then(res => {
        props.setComments(res.data);
      })
      .catch(err => console.log(err));
  };

  // DELETE REQUEST BY UNIQUE ID FIELD TO SQLITE DB COMMENTS CLUSTER;
  const deleteCommentByID = id => {
    axios.delete(`/deleteCommentByID/${id}`).catch(err => console.log(err));

    commentsAPI();
  };

  // ****** wanting to assign image url values to props.comments => display over rendered props.comments; ******
  // ISSUE : UPDATING STATE - some useState issue with mutating a stateful object.

  const randomUserAPI = length => {
    axios
      .get(`https://randomuser.me/api/?results=${length}&nat=us`)
      .then(res => {
        let headshotArr = [];
        let randomUserData = res.data.results;

        randomUserData.forEach(item => {
          let newImage = item.picture.medium;
          headshotArr.push(newImage);
        });
        props.comments.map((x, idx) => {
          x.image = headshotArr[idx];
        });
        console.log('comments1: ', props.comments);
      })
      .catch(err => console.log(err));
    return;
  };

  //  RENDER A CONTAINER AND COMMENTS, BOTH FILTERED BY SEARCH-BAR, AND *ALL ON THE MOUNTING COMPONENT INTO THE VIRTUAL DOM;
  return (
    <div className="container" id="comments-container">
      {props.filteredComments.length > 0
        ? props.comments.map((comment, idx) => {
            let user = comment.name.toLowerCase();
            for (let i = 0; i < props.filteredComments.length; i++) {
              if (user === props.filteredComments[i]) {
                return (
                  <div
                    key={idx}
                    className="card"
                  >
                    {/* <img
                className="card-img-top"
                src={comment.image}
                alt="user headshot"
              /> */}
                    <div className="card-body">
                      <div className="title-row">
                        <h5 className="card-title">{comment.name}</h5>
                        <button
                          onClick={() => deleteCommentByID(comment.id)}
                          type="button"
                          className="btn btn-outline-dark btn-sm"
                        >
                          X
                        </button>
                      </div>
                      <p className="card-text">{comment.message}</p>
                    </div>
                  </div>
                );
              }
            }

            return null;
          })
        : props.comments.map((comment, idx) => {
            if (comment.name) {
              return (
                <div key={idx} className="card" style={{ marginTop: '1.5em' }}>
                  {/* <img
              className="card-img-top"
              src={comment.image}
              alt="user headshot"
            /> */}
                  <div className="card-body">
                    <div className="title-row">
                      <h5 className="card-title">{comment.name}</h5>
                      <button
                        onClick={() => deleteCommentByID(comment.id)}
                        type="button"
                        className="btn btn-outline-dark btn-sm"
                      >
                        X
                      </button>
                    </div>
                    <p className="card-text">{comment.message}</p>
                  </div>
                </div>
              );
            }
            return null;
          })}{' '}
    </div>
  );
};

export default Comments;
