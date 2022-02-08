import React, { useEffect } from 'react';
import './style.css';
import axios from 'axios';

const Comments = props => {
  useEffect(() => {
    commentsAPI();
    // randomUserAPI(props.comments.length);

    if (props.formToggle) {
      commentsAPI();
      props.setFormToggle(false);
    }
  }, [props.formToggle]);

  const commentsAPI = () => {
    axios
      .get('/getComments')
      .then(res => {
        props.setComments(res.data);
      })
      .catch(err => console.log(err));
  };

  const deleteComment = id => {
    axios.delete(`/deleteCommentByID/${id}`).catch(err => console.log(err));

    commentsAPI();
  };

  // ****** wanting to assign image url values to props.comments => display over rendered props.comments; ******
  // ISSUE : UPDATING STATE - some useState issue with mutating a stateful object.

  // const randomUserAPI = length => {
  //   axios
  //     .get(`https://randomuser.me/api/?results=${length}&nat=us`)
  //     .then(res => {
  //       let headshotArr = [];
  //       let randomUserData = res.data.results;

  //       randomUserData.forEach(item => {
  //         let newImage = item.picture.medium;
  //         headshotArr.push(newImage);
  //       });
  //       props.comments.map((x, idx) => {
  //         x.image = headshotArr[idx];
  //       });
  //       console.log('comments1: ', props.comments);
  //     })
  //     .catch(err => console.log(err));
  //   return;
  // };
  // console.log('props.comments:', props.comments);

  // console.log(
  //   'props.filteredComments in Comments doc. ',
  //   props.filteredComments
  // );

  return (
    <div className="container" id="comments-container">
      {props.filteredComments > 0
        ? props.filteredComments.map((comment, idx) => {
            if (comment.name) {
              return (
                <div key={idx} className="card" style={{ marginTop: '1.5em' }}>
                  {/* <img
                className="card-img-top"
                src={comment.image}
                alt="user headshot"
              /> */}
                  <div className="card-body">
                    <div
                      className="itsArow"
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                      }}
                    >
                      <h5 className="card-title">{comment.name}</h5>
                      <button
                        onClick={() => deleteComment(comment.id)}
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
                        onClick={() => deleteComment(comment.id)}
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
