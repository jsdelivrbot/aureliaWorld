import React from 'react';
import ReactDOM from 'react-dom';

'use strict';
let styles = {
    tblHeader : {
        backgroundColor: 'rgba(250,250,250,1)',
        color: '#565656',
        fontSize: 13,
    },
    table : {
        marginTop: 40,
        fontSize : 13,
        lineHeight : 1,
        textTransform:'capitalize',
    },
    container : {
         width : '95%'
    }
}

export default class MyReactElement extends React.Component {
    constructor(props) {
        super(props);
    }
   try(key,e) {
       this.props.myfun(key);

   }
    render() {
        if (!this.props.data.length) {
            return null;
        }

        return (
            <div className="container" style={styles.container}>
                  <div className="row">
                      <div className="col s10">
                <table className="bordered z-depth-1" style={styles.table}>
                    <thead>
                    <tr style={styles.tblHeader}>
                        <th data-field="id">Project Name</th>
                        <th data-field="name">Project Manager</th>
                        <th data-field="name">Actual Release Date</th>
                        <th data-field="price">Released Date </th>
                        <th data-field="price">Details </th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        this.props.data.map(item => {
                            return <tr key={item.key}>
                                <td>{item.name}</td>
                                <td>{item.itemname}</td>
                                <td>{item.data}</td>
                                <td>{item.price}</td>
                                <td onClick = {this.try.bind(this,item.key)} ><img className="svgicon-more" src="src/assets/images/svg-icons/movert.svg"/></td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
                          </div>
                      <div className="col s2">

                      </div>
                  </div>
            </div>
        );
    }
}


MyReactElement.defaultProps = { data: [] };