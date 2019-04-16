import React, { Fragment } from 'react';

export default function NewsItem({ info }) {
  return (
    <Fragment>
      <div className="news-item">
        <img className="news-image" src={info.urlToImage} alt="news" />
        <div className="news-content">
          <h5 className="news-title">{info.title}</h5>
          <p className="news-text">
            {info.content === null
              ? 'The article has no text'
              : info.content.length > 200
              ? (info.content = info.content.substring(0, 200) + '...')
              : info.content}
          </p>
          <button>
            <a target="_blank" rel="noopener noreferrer" href={info.url}>
              Full Story <span>-></span>
            </a>
          </button>
        </div>
      </div>
    </Fragment>
  );
}
