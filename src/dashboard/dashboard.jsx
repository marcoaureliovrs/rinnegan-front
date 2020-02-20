import React, { Component } from 'react'
import axios from 'axios'

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import ValueBox from '../common/widget/valueBox'
import Row from '../common/layout/row'

const BASE_URL = 'http://localhost:7000/api'

export default class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            credit: 0,
            debt: 0,
            topAlerts: [
                {
                    server: '',
                    count: 0
                },
                {
                    server: '',
                    count: 0
                },
                {
                    server: '',
                    count: 0
                },
            ]
        }
    }

    componentWillMount() {
        axios.get(`${BASE_URL}/alerts/top`)
            .then(resp => {
                this.setState({ topAlerts: resp.data.payload })
                console.log(resp)
            }).catch(e => {
                console.log(e)
            })
    }

    render() {
        const { topAlerts } = this.state
        return (
            <div>
                <ContentHeader title='Dashboard' />
                <Content>
                    <Row>
                        <ValueBox cols='12 4' color='red' icon='bank'
                            value={`${topAlerts[0].count} Alertas`} text={`${topAlerts[0].server}`} />
                        <ValueBox cols='12 4' color='red' icon='credit-card'
                            value={`${topAlerts[1].count} Alertas`} text={`${topAlerts[1].server}`} />
                        <ValueBox cols='12 4' color='red' icon='money'
                            value={`${topAlerts[2].count} Alertas`} text={`${topAlerts[2].server}`} />
                    </Row>
                </Content>
            </div>
        )
    }
}