import React, { Component } from "react";
import Table from "./Table";
import { Input, DatePicker } from 'antd';
import axios from "axios";
import BackendURL, { createCols, searchInObject } from "../Constants";
class Purchases extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            cols: [],
            isOpen: false,
            loading: true,
            user: {},
            dateRange: []
        };
    }

    componentDidMount() {
        this.load()
    }

    load = async () => {
        let { data } = await axios.get(`${BackendURL}/purchase/get`)
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
        let { search, data, cols, loading, dateRange } = this.state
        if (typeof dateRange[0] === "object" && typeof dateRange[1] === "object") {
            let condition = (d) => {
                return new Date(d.createdAt) >= new Date(dateRange[0]) && new Date(d.createdAt) <= new Date(dateRange[1])
            }
            data = data.filter(d => condition(d))
        }
        if (search)
            data = searchInObject(search, data)
        return (
            <div className="ml-2 mr-2">
                <Input.Search placeholder="input search text" onChange={({ target: { value: search } }) => this.setState({ search })} style={{ width: 450 }} />
                <DatePicker.RangePicker
                    className="ml-2"
                    onChange={dateRange => this.setState({ dateRange: [dateRange[0]?.startOf("day")?.toDate(), dateRange[1]?.endOf("day")?.toDate()] })}
                />
                <Table dataSource={data} columns={cols} loading={loading} />
            </div>
        );
    }
}

export default Purchases;

