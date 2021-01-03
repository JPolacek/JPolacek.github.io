import React, { Component } from 'react';

class CoffeeRanks extends Component {
  render() {

    if(this.props.data){
      var rankmessage = this.props.data.ranksmessage;
      var coffees = this.props.data.coffees.map(function(coffees){
        return <li key={coffees.name}>
		  <h4>{coffees.name}</h4>
          <p className="city">{coffees.city}</p>
		</li>
	  })
    }

    return (
      <section id="ranks">
      	<div className="row rank">

          <div className="three columns header-col">
            <h1><span>Coffee Rankings</span></h1>
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
