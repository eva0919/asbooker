import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router'

export default class Layout extends Component {
  render() {
    return (
      <div>
			<nav>
				<div className="nav-wrapper">
					<a href="#" className="brand-logo right">說書先生</a>
					<ul id="nav-mobile" className="left hide-on-med-and-down">
						<li><Link to="/book">書評總表</Link></li>
						<li><a href="badges.html">關於我們</a></li>
						<li><a href="collapsible.html"></a></li>
					</ul>
				</div>
			</nav>
			<div>
				{this.props.children}
			</div>
      </div>
    );
  }
}