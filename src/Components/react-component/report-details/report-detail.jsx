import React from 'react';
import ReactDOM from 'react-dom';

'use strict';

let styles = {
    containerMargin : {
        marginTop : '8%',
    },
    dataContainer : {
        padding : 15
    }
}

export default class ReleaseDetail extends React.Component {
render(){
    return (
      <div className="container" style={styles.containerMargin}>
      <div className="row z-depth-1" style={styles.dataContainer}>
          <div className="col s12">
          <div className="col s6 row">
            <div className="col s6 releaseDtilLabel" >Project Name : </div>
            <div className="col s6" >Insight</div>
          </div>
          <div className="col s6 row">
              <div className="col s6 releaseDtilLabel" >Project Manager : </div>
              <div className="col s6" >Satish</div>
          </div>
          <div className="col s6 row">
              <div className="col s6 releaseDtilLabel" >Actual Release Date : </div>
              <div className="col s6" >1/09/2016</div>
          </div>
          <div className="col s6 row">
              <div className="col s6 releaseDtilLabel" >Released Date : </div>
              <div className="col s6" >---</div>
          </div>
          </div>
      </div>
      </div>
    );
}
}