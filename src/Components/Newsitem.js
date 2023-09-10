import React, { Component } from 'react'

export default class Newsitem extends Component {

    render() {
        let {title,description,imageUrl,newsUrl,author,date,source}=this.props;
        return (
            <div className="my-1" >
                <div className="card align-center" style={{width: "20.2rem",marginRight:"0px",justifyContent:"space-around"}}>
                    <img src={imageUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title"><b>{title}</b> <span className="badge rounded-pill text-bg-success">{source}</span></h5>
                            <p className="card-text">{description?description:"Click below to read more about this news"}</p>
                            <p className="card-text"><i>By {author?author:"Unknown"} on {new Date(date).toGMTString()}</i></p>
                            <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-dark">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}
