import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

export default function NewsItem({ info }) {
  const NewsGrid = styled.div`
    display: grid;
    grid-template-columns: 350px 1fr;
    grid-gap: 20px;
  `;

  const NewsImage = styled.img`
    width: 350px;
    height: 200px;
  `;

  const NewsInfo = styled.div`
    display: flex;
    flex-direction: column;
  `;

  return (
    <Card style={{ height: '100%', width: '100%' }}>
      <Card.Body>
        <NewsGrid>
          <NewsImage src={info.urlToImage} alt="" />
          <NewsInfo className="news-info" style={{ overflow: 'auto' }}>
            <div className="news-title">{info.title}</div>
            <div className="news-content">{info.content}</div>{' '}
            <a style={{ color: 'black', display: 'block' }} href={info.url}>
              Full Story ->
            </a>{' '}
          </NewsInfo>
        </NewsGrid>
      </Card.Body>
    </Card>
  );
}
