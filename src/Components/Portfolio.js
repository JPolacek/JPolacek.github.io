import React, { Component } from 'react';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ScrollMenu from 'react-horizontal-scrolling-menu';
import HorizontalScroll from 'react-scroll-horizontal';

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};
Arrow.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string
};

export const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
export const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

class Portfolio extends Component {
  state = {
    alignCenter: true,
    clickWhenDrag: false,
    dragging: true,
    hideArrows: true,
    hideSingleArrow: true,
    scrollToSelected: false,
    translate: 0,
    transition: 0.3,
    wheel: true
  };

  render() {

    if(this.props.data){
      var projects = this.props.data.projects.map(function(projects){
        var projectImage = 'images/portfolio/'+projects.image;
        return <div key={projects.title} className="columns portfolio-item">
           <div className="item-wrap">
            <a href={projects.url} title={projects.title}>
               <img alt={projects.title} src={projectImage} />
               <div className="overlay">
                  <div className="portfolio-item-meta">
                 <h5><i>{projects.title}</i> by {projects.author}</h5>
                     <p>{projects.category}</p>
                  </div>
                </div>
              <div className="link-icon"><i className="fa fa-link"></i></div>
            </a>
          </div>
        </div>
      })
    }

    return (
      <section id="portfolio">

      <div className="row">

         <div className="twelve columns collapsed">

            <h1>Check out what I've been reading.</h1>

            <ScrollMenu 
              arrowLeft={ArrowLeft}
              arrowRight={ArrowRight}
              alignCenter={this.state.alignCenter}
              data={projects}
              hideArrows={false}
            />

          </div>
      </div>
   </section>
    );
  }
}

export default Portfolio;
