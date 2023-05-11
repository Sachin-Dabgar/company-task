import { useQuery } from "react-query";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import tileLayer from "../utils/tileLayer";

import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

// center point for the marker
const center = [13.084622, 80.248357] as any;

// default points for the marker
const points = [
    {
        lat: 33,
        lng: 65,
        title: "AF",
    },
    {
        lat: 41,
        lng: 20,
        title: "ALB",
    },
    {
        lat: 28,
        lng: 3,
        title: "DZA",
    },
    {
        lat: 13.084622,
        lng: 80.248357,
        title: "home_",
    },
];

function customMarkerIcon() {
    // marker icon
    const svgTemplate = `
    <svg viewBox="-4 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> <title>map-marker</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Vivid.JS" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Vivid-Icons" transform="translate(-125.000000, -643.000000)"> <g id="Icons" transform="translate(37.000000, 169.000000)"> <g id="map-marker" transform="translate(78.000000, 468.000000)"> <g transform="translate(10.000000, 6.000000)"> <path d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z" id="Shape" fill="#FF6E6E"> </path> <circle id="Oval" fill="#0C0058" fill-rule="nonzero" cx="14" cy="14" r="7"> </circle> </g> </g> </g> </g> </g> </g></svg>`;

    return new Leaflet.DivIcon({
        className: "test",
        html: svgTemplate,
        iconSize: [30, 30],
        iconAnchor: [12, 24],
        popupAnchor: [7, -16],
    });
}

// component for marker
const MyMarkers = ({ data, data2 }: any) => {
    let thisPoints = [] as any;
    data2.map((item: any) =>
        thisPoints.push({
            country: item.country,
            lat: item.countryInfo.lat,
            lng: item.countryInfo.long,
            active: item.active,
            deaths: item.deaths,
            recovered: item.recovered,
        })
    );

    return thisPoints.map(
        ({ lat, lng, country, active, deaths, recovered }: any, index: any) => (
            <Marker
                key={index}
                position={[lat, lng]}
                icon={customMarkerIcon()}
            >
                <Popup>
                    <p className="text-[#323232] font-medium">{country}</p>
                    <p className="text-yellow-800 text-xs">
                        Active: <span className="font-bold">{active}</span>
                    </p>
                    <p className="text-red-800 text-xs">
                        Deaths: <span className="font-bold">{deaths}</span>
                    </p>
                    <p className="text-green-800 text-xs">
                        Recovered:
                        <span className="font-bold">{recovered}</span>
                    </p>
                </Popup>
            </Marker>
        )
    );
};

const LeafletMap = () => {
    // fetching allcovid related data
    const { error, isLoading } = useQuery("getWorldWideData", async () => {
        const res = await fetch("https://disease.sh/v3/covid-19/all");
        return res.json();
    });

    // fetching all country specific data
    const {
        data: data2,
        error: error2,
        isLoading: isLoading2,
    } = useQuery("getCountryData", async () => {
        const res = await fetch("https://disease.sh/v3/covid-19/countries");
        return res.json();
    });

    if (error) return <div>Request Failed</div>;
    if (isLoading) return <div className="spinner"></div>;

    if (error2) return <div>Request Failed</div>;
    if (isLoading2) return <div className="spinner"></div>;

    return (
        <div className="w-[500px]">
            <MapContainer
                className="overflow-auto w-full lg:h-[500px] h-screen lg:w-[700px]"
                center={center}
                zoom={5}
                scrollWheelZoom={true}
            >
                <TileLayer {...tileLayer} />
                <MyMarkers
                    data={points}
                    data2={data2}
                />
            </MapContainer>
        </div>
    );
};

export default LeafletMap;
