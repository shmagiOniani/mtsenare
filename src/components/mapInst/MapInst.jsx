import React, { useState, useEffect } from "react";
// 16.13.1
import "leaflet/dist/leaflet.css";
import { Map as LeafletMap, Popup, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import avatar from "../../assets/img/avatar.png";

import "./Style.scss";
import { Link } from "react-router-dom";

var myIcon = L.icon({
  iconUrl: avatar,
  iconSize: [70, 94],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  // shadowUrl: "my-icon-shadow.png",
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
  className: "avatar"
});

function MapInst() {
  const [marker, setMarker] = useState([41.565114, 44.990677]);

  const [markers, setMarkers] = useState([
    {
      id: 1,
      lat: 41.565114,
      lng: 44.990677
    }
  ]);

  const handleMarkerDrag = (e) => {
    console.log("drag", e);

    setMarker(e.latlng);
    // setMarkers([
    //   {
    //     id: 1,
    //     lat: e.latlng.lat,
    //     lng: e.latlng.lng
    //   }
    // ]);
  };

  const addMarker = (event) => {
    console.log(event);
    // const prevParams = [e.oldLatLng.lat, e.oldLatLng.lng];
    // if (markers.includes([prevParams])) {
    //   console.log("you drag one");
    // }
    setMarker([event.lat, event.lng]);

    if (markers.length === 1) {
      setMarkers((prev) => [
        {
          id: prev[prev.length - 1].id + 1,
          lat: event.lat,
          lng: event.lng
        }
      ]);
    }
  };

  useEffect(() => {
    console.log(markers);
  }, [markers]);

  return (
    <LeafletMap
      center={[41.565114, 44.990677]}
      zoom={13}
      onclick={(e) => addMarker(e.latlng)}
      ondblclick={(e) => console.log("double click")}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={marker}
        draggable
        ondrag={handleMarkerDrag}
        icon={myIcon}
      >
        <Popup className="pop-up">ეწვიეთ მაღაზიას <Link to={"/shop/2"}>სახელი</Link></Popup>
      </Marker>
      {/* {markers.map((position, i) => (
        <Marker
          key={position.id}
          position={[position.lat, position.lng]}
          draggable
          ondrag={handleMarkerDrag}
          icon={icon}
        >
          <Popup>popup</Popup>
        </Marker>
      ))} */}
    </LeafletMap>
  );
};

export default MapInst