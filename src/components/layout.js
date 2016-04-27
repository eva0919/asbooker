import React from 'react';
import { Component } from 'react';


export default class Layout extends Component {
  render() {
    return (
      <div>
			<nav>
				<div className="nav-wrapper">
					<a href="#" className="brand-logo right">問書</a>
					<ul id="nav-mobile" className="left hide-on-med-and-down">
						<li><a href="sass.html">書評總表</a></li>
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