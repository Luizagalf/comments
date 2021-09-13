import React from 'react';
import './App.css';
export default class App extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        allComments: [],
        comment: "",
    };
    }
  
    componentDidMount() {
      if (localStorage.getItem("state")) {
        this.setState({ ...JSON.parse(localStorage.getItem("state")) })
      }
    }

    localSetItem = () => {
      localStorage.setItem("state", JSON.stringify(this.state));
    }

    min = 1;
    max = 300;
  
    addNewComment = () => {
      this.setState({
        allComments: [
          ...this.state.allComments,
          {
            id: Math.round(this.min + (Math.random() * (this.max - this.min))),
            comment: this.state.comment,
          }
        ],
          comment: ""
      }, () => this.localSetItem())
    }
  
    removeComment = (id) => {
      this.setState({
        allComments: this.state.allComments.filter(comment => comment.id !== id)
      }, () => this.localSetItem())
    }
  
    handleChange = (val) => {
      this.setState({
          ...this.state,
          [val.target.name]: val.target.value,
      })
    }
  
    render() {
      return (
        <div>

          <div className="form">
            <h4>Your comment</h4>
            <textarea
              name="comment"
              placeholder="Comment..."
              value={this.state.comment}
              onChange={this.handleChange}></textarea>
            <button onClick={this.addNewComment} className="btn mainbutton">Add Comment</button>
          </div>
          
          <div className="row">
          {this.state.allComments.reverse().map((comment, i) =>
          <>
            { (i==0)
              ? 
              <div className="comment newcomment" key={comment.id}>
              <span>{comment.comment}</span>
              <button onClick={() => this.removeComment(comment.id)} className="btn clearbutton">Delete</button>
              </div>
              :
              <div className="comment" key={comment.id}>
              <span>{comment.comment}</span>
              <button onClick={() => this.removeComment(comment.id)} className="btn clearbutton">Delete</button>
              </div>
            }
            </>
          )}
          </div>
        </div>
      )
    }
}

