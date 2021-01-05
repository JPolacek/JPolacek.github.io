import React, { Component } from 'react';

class CoffeeRanks extends Component {
  render() {

    if(this.props.data){
      var rankmessage = this.props.data.ranksmessage;
      var coffees = this.props.data.coffees.map(function(coffees){
        return <li key="coffee">
		            {coffees.name} <span>&bull;</span> <em>{coffees.city}</em>
		           </li>
	  })
    }

    return (
      <section id="ranks">
      	<div className="row rank">

          <div className="three columns header-col">
            <h1>Espresso <span>Rankings</span></h1>
          </div>

          <div className="nine columns main-col">
            <p>{rankmessage}</p>
            <ol class="coffees">
              {coffees}
            </ol>
          </div>

      	</div>
   	  </section>
    );
  }
}

export default CoffeeRanks;
