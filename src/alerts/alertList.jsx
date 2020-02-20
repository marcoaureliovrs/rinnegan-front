import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete } from './alertActions'
import moment from 'moment';

class AlertList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: "",
            data: this.props.list,
            filteredData: []
          };
          
    }
   

    componentWillMount() {
        this.props.getList()
    }

    renderRows() {
        
        return this.state.data.map(alert => (
            <tr key={alert._id}>
                <td>{alert.server}</td>
                <td>{alert.description}</td>
                <td>{moment(alert.create_date).toISOString()}</td>
                <td>{alert.server_type}</td>
            </tr>
        ))
    }

    handleInputChange(event)   {
        const query = event.target.value;


        if(query.length > 0) {
            this.setState(prevState => {
                const data = prevState.data.filter(alert => {
                    let alertServerAndDescription = {server: alert.server, description: alert.description};
                    alertServerAndDescription = JSON.stringify(alertServerAndDescription).toUpperCase();
      
                  return alertServerAndDescription.toLowerCase().includes(query.toLowerCase());
                });
          
                return {
                  query,
                  data
                };
              });
        } else {

            this.setState({data: this.props.list, query,})
        }
        
      };


    render() {
        return (
            <div>

                <form>
                    <input
                        placeholder="Filtro de Alertas"
                        value={this.state.query}
                        onChange={(event) => this.handleInputChange(event)}
                    />
                </form>

                <table className='table'>
                    <thead>
                        <tr>
                            <th>Servidor</th>
                            <th>Descrição</th>
                            <th>Data de criação</th>
                            <th>Tipo de servidor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({ list: state.Alerts.list })
const mapDispatchToProps = dispatch => bindActionCreators({ getList, showUpdate, showDelete }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AlertList)