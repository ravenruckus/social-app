import React, { Component } from 'react'
import './ProjectComments.css'
import './CommentBox.css'

export default class ProjectComments extends Component {
  render(){
    return(

      <div className="container">
        <div className="col-sm-8">
            <div className="panel panel-white post panel-shadow">
                  <div className="post-footer">
                      <div className="input-group">
                          <input className="form-control" placeholder="Add a comment" type="text" />
                          <span className="input-group-addon">
                              <a href="#"><i className="fa fa-edit"></i></a>
                          </span>
                      </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-8">
                <div className="panel panel-white post panel-shadow">
                  <div className="post-heading">
                    <div className="pull-left image">
                        <img src="http://bootdey.com/img/Content/user_1.jpg" className="img-circle avatar" alt="user profile image" />
                    </div>
                    <div className="pull-left meta">
                        <div className="title h5">
                            <a href="#"><b>Ryan Haywood</b></a>
                            made a post.
                        </div>
                        <h6 className="text-muted time">1 minute ago</h6>
                    </div>
                </div>
                <div className="post-description">
                    <p>Bootdey is a gallery of free snippets resources templates and utilities for bootstrap css hmtl js framework. Codes for developers and web designers</p>
                    <div className="stats">
                        <a href="#" className="btn btn-default stat-item">
                            <i className="fa fa-thumbs-up icon"></i>2
                        </a>
                        <a href="#" className="btn btn-default stat-item">
                            <i className="fa fa-share icon"></i>12
                        </a>
                    </div>
                </div>
                <div className="post-footer">
                    <div className="input-group">
                        <input className="form-control" placeholder="Add a comment" type="text" />
                        <span className="input-group-addon">
                            <a href="#"><i className="fa fa-edit"></i></a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }
}
