import React, { Component } from 'react';

import axios from 'axios';
import keys from '../../config/keys';
import moment from 'moment';
import './news.css';

import NewsItem from './NewsItem';

import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

class News extends Component {
  constructor() {
    super();
    this.state = {
      news: [],
      newsLoading: false
    };
  }
  componentDidMount() {
    this.setState({ newsLoading: true });
    const { category } = this.props.match.params;
    console.log(category);
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${category}&from=${moment().format(
          'YYYY-MM-DD'
        )}sortBy=popularity&apiKey=${keys.newsAPI}`
      )
      .then(res => {
        console.log(res.data);
        this.setState({ news: res.data.articles, newsLoading: false });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { news, newsLoading } = this.state;
    const newsGrid = [];
    for (let i = 0; i < 4; i++) {
      if (news.length > 0) {
        newsGrid.push([news[i * 3], news[i * 3 + 1], news[i * 3 + 2]]);
      }
    }

    if (newsLoading) {
      let content = (
        <Container>
          <Spinner animation="grow" /> <Spinner animation="grow" />
          <Spinner animation="grow" />
        </Container>
      );
      return content;
    } else {
      let content = (
        <Container>
          <div className="news-grid">
            {newsGrid.map((news, i) => {
              return (
                <div className="trio" key={i}>
                  <NewsItem info={news[0]} key={news[0].title} />
                  <NewsItem info={news[1]} key={news[1].title} />
                  <NewsItem info={news[2]} key={news[2].title} />
                </div>
              );
            })}
          </div>
        </Container>
      );
      return content;
    }
  }
}

export default News;
