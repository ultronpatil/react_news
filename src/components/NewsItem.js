import React, { Component } from 'react'

export class NewsItem extends Component {


    render() {
        let { title, description, imgurl, newsurl, author, date, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <div style={{
                        display: `flex`,
                        justifyContent: `flex-end`,
                        position: `absolute`,
                        right: `0`
                    }}>
                        <span className="badge rounded-pill bg-danger">{source}
                        </span></div>
                    <img src={imgurl ? imgurl : "https://static.toiimg.com/photo/msid-85939987/85939987.jpg?pl=37494"} className="card-img-top" alt="..." />
                    <div className="card-body">

                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}....</p>
                        <p className="card-text"><samll className="text-muted">By {author ? author : "unknown"} on {new Date(date).toGMTString()}</samll></p>
                        <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-primary btn-sm">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
