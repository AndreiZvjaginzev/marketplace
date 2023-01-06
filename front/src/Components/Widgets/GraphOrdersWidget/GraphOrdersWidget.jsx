import React, { PureComponent } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrip } from '@fortawesome/free-solid-svg-icons';

import Requests from '../../Requests';

import Styles from './GraphOrdersWidget.module.scss';


function GraphOrdersWidgets() {
    const title = 'Graph orders';
    // let chartdiv = React.useRef();
    let [data, setData] = useState([]);

    useEffect(()=>{
        Requests({
            method: 'get',
            url: '/orders',
            callback: requestGraphData
        })
    }, []);

    function requestGraphData(request){
        let copy = Object.assign([], data);
        copy = request.data;
        setData(copy);

    }




    return (
        <div className={Styles.GraphOrdersWidget}>
            {/* <FontAwesomeIcon icon={faGrip} /> */}
            <p className={Styles.GraphOrdersWidget__title}>{title}</p>
            <LineChart
                width={370}
                height={150}
                data={data}
                margin={{
                    top: 40,
                    right: 30,
                    left: 20,
                    bottom: -30
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                /> */}
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" name="Orders" />
            </LineChart>

        </div>

    );
}

export default GraphOrdersWidgets;


