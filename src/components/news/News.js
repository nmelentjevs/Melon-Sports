import React, { Component, Fragment } from 'react';

import axios from 'axios';
import keys from '../../config/keys';
import moment from 'moment';

import NewsItem from './NewsItem';

import Container from 'react-bootstrap/Container';

class News extends Component {
  constructor() {
    super();
    this.state = {
      news: []
    };
  }
  componentDidMount() {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=Football&from=${moment().format(
          'YYYY-MM-DD'
        )}sortBy=popularity&apiKey=${keys.newsAPI}`
      )
      .then(res => {
        console.log(res.data);
        this.setState({ news: res.data.articles });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { news } = this.state;
    return (
      <Container>
        <div className="news-grid">
          {news.map(one => {
            return <NewsItem info={one} key={one.title} />;
          })}
        </div>
      </Container>
    );
  }
}

export default News;
