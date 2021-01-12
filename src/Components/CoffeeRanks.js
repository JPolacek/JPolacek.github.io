import React, { Component } from 'react';

class CoffeeRanks extends Component {
  render() {

    var rankmessage = "Since I started drinking coffee, I've given espressos a shot whenever I could get my hands on one. Check out the 'Espresscapade' espresso rankings thus far!";

    if(this.props.data){
      var coffees = this.props.data.feed.entry.map((row, i) => {
      return <li key={row.gsx$shopname.$t}>
		      {row.gsx$shopname.$t} <span>&bull;</span> <em>{row.gsx$location.$t}</em>
		    </li>
      });
      console.log(coffees);
    }

    return (
      <section id="ranks">
      	<div className="row rank">

          <div className="three columns header-col">
            <h1>Espresso <span>Rankings</span></h1>
          </div>

          <div className="nine columns main-col">
            <p>{rankmessage}</p>
            <ol className="coffees">
              {coffees}
            </ol>
          </div>

      	</div>
   	  </section>
    );
  }
}

export default CoffeeRanks;
