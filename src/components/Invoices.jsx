import React, { Component } from "react";
import Table from "./Table";
import { Input } from 'antd';
import axios from "axios";
import BackendURL, { createCols, searchInObject } from "../Constants";
class Invoices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isOpen: false,
            loading: true,
            user: {}
        };
    }

    componentDidMount() {
        this.load()
    }

    load = async () => {
        let { data } = await axios.get(`${BackendURL}/invoice/get`)
        data = data.map(d => {
            Object.keys(d).forEach(key => {
                if (Array.isArray(d[key])) {
                    delete d[key]
                }
            })
            return d
        })
        let cols = createCols(data[0])
        data = data.map((d, key) => ({ ...d, key: key + "" }))
        this.setState({ data, cols, loading: false })
    }

    render() {
        let { search, data, cols,loading } = this.state
        if (search)
            data = searchInObject(search, data)
        return (
            <div className="ml-2 mr-2">
                <Input.Search placeholder="input search text" onChange={({ target: { value: search } }) => this.setState({ search })} style={{ width: 450 }} />
                <Table dataSource={data} columns={cols} loading={loading} />
            </div>
        );
    }
}

export default Invoices;

