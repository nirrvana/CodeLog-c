import React, { Component } from 'react';
import PortfolioImg from '../../images/portfolio.png';

export default class Portfolio extends Component {
  render() {
    return (
      <div className="cl_Portfolio">
        <img src={PortfolioImg} alt="Portfolio" />
      </div>
    );
  }
}
