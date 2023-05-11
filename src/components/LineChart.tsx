import React from "react";
import ReactApexChart from "react-apexcharts";

class LineChart extends React.Component<
    { cases: any; deaths: any; recovered: any },
    any
> {
    constructor(props: any) {
        super(props);

        this.state = {
            series: [
                // cases
                {
                    name: "Cases",
                    data: props.cases,
                    fill: {
                        colors: ["rgba(132, 32, 145, 0.5)"],
                    },
                },
                // recovered
                {
                    name: "recovered",
                    data: props.recovered,
                    fill: {
                        colors: ["rgba(25, 120, 41,0.5)"],
                    },
                },
                // deaths
                {
                    name: "deaths",
                    data: props.deaths,
                    fill: {
                        colors: ["rgba(171, 14, 27, 0.5)"],
                    },
                },
            ],
            options: {
                chart: {
                    id: "area-datetime",
                    type: "datetime",
                    height: 350,
                    zoom: {
                        autoScaleYaxis: true,
                    },
                },
                annotations: {
                    yaxis: [
                        {
                            y: 30,
                            borderColor: "#000",
                            label: {
                                show: true,
                                style: {
                                    color: "#fff",
                                    background: "#00E396",
                                },
                            },
                        },
                    ],
                    xaxis: [
                        {
                            x: new Date("14 Nov 2012").getTime(),
                            borderColor: "#999",
                            yAxisIndex: 0,
                            label: {
                                show: true,
                                style: {
                                    color: "#fff",
                                    background: "#8a287d",
                                },
                            },
                        },
                    ],
                },
                dataLabels: {
                    enabled: false,
                },
                markers: {
                    size: 0,
                    style: "square",
                },
                xaxis: {
                    type: "datetime",
                    tickAmount: 6,
                },
                tooltip: {
                    x: {
                        format: "dd MMM yyyy",
                    },
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        stops: [0, 100],
                    },
                },
            },
        };
    }

    render() {
        return (
            <div>
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                    height={700}
                />
            </div>
        );
    }
}

export default LineChart;
