import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const BASE_URL = 'http://localhost:7000/api'
const INITIAL_VALUES = { alerts: [{}] }

export function getList() {

    const request = axios.get(`${BASE_URL}/alerts/all`)

    return {
        type: 'ALERTS_FETCHED',
        payload: request
    }
}

export function create(values) {
    return submit(values, 'post')
}

export function update(values) {
    return submit(values, 'put')
}

export function remove(values) {
    return submit(values, 'delete')
}

function submit(values, method) {
    return dispatch => {
        const id = values._id ? values._id : ''
        axios[method](`${BASE_URL}/alerts/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(init())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function showUpdate(alert) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('alertForm', alert)
    ]
}

export function showDelete(alert) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('alertForm', alert)
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('alertForm', INITIAL_VALUES)
    ]
}