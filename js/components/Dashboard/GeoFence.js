
import React, {Component} from 'react';
import {Image, View, StatusBar, TouchableOpacity, WebView,Text, Alert,ActivityIndicator} from "react-native";
import styles from "../../../js/themes/styles"
import {Header, Left, Right, Body, Title, Container, Content, Button} from 'native-base'
import MapView,{Polygon} from 'react-native-maps';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons'
import {getGeoFence} from '../../../js/services/getGeoFence'

export default class GeoFence extends Component {
    constructor(){
        super();
    }

 componentWillMount()
 {
     this.props.geoFenceCoords=[];
   //  this.props.openUntilText='';
 }


    render() {
        return(
        this.props.geoFenceCoords.map(coordinates => (
            <MapView.Polygon
                coordinates={coordinates}
                strokeColor={PolylineBlue}
                strokeWidth={5}
                />
        )
));
    }  
}
module.export = GeoFence;