import React from "react";

var classNames = require('classnames');

class MovieTabs extends React.Component{
    componentWillReceiveProps(nextProps,nextState){
        //console.log("MovieTabs WillReceiveProps");
        //console.log("nextProps sort_by", nextProps.sort_by);
        //console.log("prevProps sort_by", this.props.sort_by);
    }

    shouldComponentUpdate(nextProps,nextState){
        if (nextProps.sort_by !== this.props.sort_by){
            return true;
        } else {
            return false;
        }
        
    }

    render(){
        const {sort_by, updateSortBy} = this.props;
        const handleClick = value  => {
            return event => {  
                updateSortBy(value);
            };
        };
        
        const getClassLink = value => {
            return `nav-link ${sort_by === value ? "active" : ""}`
        }
    
        //console.log("MovieTabs render");
        var class1 = classNames({'tabs':true, 'nav':true, 'nav-pills':true});
        
        return (
         //   <ul className="tabs nav nav-pills">
       
         <ul className={class1}>
                <li className="nav-item">
                    <div className={getClassLink("popularity.desc")}
                        onClick={handleClick("popularity.desc")}
                        >
                        Popularity desc
                    </div>
                </li>
                <li className="nav-item">
                    <div className={getClassLink("revenue.desc")}
                        onClick={handleClick("revenue.desc")}
                        >
                        Revenue desc
                    </div>
                </li>
                <li className="nav-item">
                    <div className={getClassLink("vote_average.desc")}
                        onClick={handleClick("vote_average.desc")}
                        >
                        Vote average desc
                    </div>
                </li>
            </ul>
        )


    }
}


export default MovieTabs;