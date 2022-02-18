import React, { useEffect, useState } from 'react';
import './style.css';
import { PacmanLoader } from 'react-spinners';
import axios from 'axios';

const Comments = props => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    commentsAPI();

    if (props.formToggle) {
      commentsAPI();
      props.setFormToggle(false);
    }
  }, [props.formToggle, props.filteredComments, props.setComments]);

  // GET REQUEST FOR COMMENTS FROM SQLITE DB, adding a user headshot to each comment from randomUser/api;
  function commentsAPI() {
    let DBcomments;
    let headshotArr = [];

    axios
      .get('/getComments')
      .then(res => {
        DBcomments = res.data;
      })
      .then(async () => {
        let length = DBcomments.length;
        let r = await axios
          .get(`https://randomuser.me/api/?results=${length}&nat=us`)
          .catch(err => console.log(err));

        let randomUserData = r.data.results;

        randomUserData.forEach(item => {
          let newImage = item.picture.medium;
          headshotArr.push(newImage);
        });

        // Spread the array of comments, map over array;
        // Spread each object and rewrite each objects current contents, to include a random headshot;
        props.setComments(
          [...DBcomments].map(({ ...obj }, idx) => {
            return {
              id: obj.id,
              name: obj.name,
              message: obj.message,
              created: obj.created,
              image: headshotArr[idx],
            };
          })
        );
        setTimeout(() => {
          setLoaded(true);
        }, 1000);
      })
      .catch(err => console.log(err));
  }

  // DELETE REQUEST BY UNIQUE ID FIELD TO SQLITE DB COMMENTS CLUSTER;
  const deleteCommentByID = id => {
    axios
      .delete(`/deleteCommentByID/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    commentsAPI();
  };


  //  RENDER A CONTAINER AND COMMENTS, BOTH FILTERED BY SEARCH-BAR, AND *ALL ON THE MOUNTING COMPONENT INTO THE VIRTUAL DOM;
  return (
    <>
      {loaded === true ? (
        <div className="container" id="comments-container">
          {props.filteredComments.length > 0
            ? props.comments.map((comment, idx) => {
                let user = comment.name.toLowerCase();
                for (let i = 0; i < props.filteredComments.length; i++) {
                  if (user === props.filteredComments[i]) {
                    return (
                      <div key={idx} className="card">
                        <div className="card-body">
                          <div className="title-row">
                            <>
                              {' '}
                              {comment.image ? (
                                <img
                                  className="card-image"
                                  src={comment.image}
                                  alt="user headshot"
                                />
                              ) : null}
                              <h5 className="card-title">{comment.name}</h5>
                            </>
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
                    <div
                      key={idx}
                      className="card"
                      style={{ marginTop: '1.5em' }}
                    >
                      <div className="card-body">
                        <div className="title-row">
                          {' '}
                          <>
                            {comment.image ? (
                              <img
                                className="card-image"
                                src={comment.image}
                                alt="user headshot"
                              />
                            ) : null}
                            <h5 className="card-title">{comment.name}</h5>
                          </>
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
      ) : (
        <PacmanLoader size={100} color={'#FFC107'} />
      )}{' '}
    </>
  );
};

export default Comments;
