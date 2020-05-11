var styles= [{
            elementType: 'geometry',
            stylers: [{
                color: '#242f3e'
            }]
        },
        {
            elementType: 'labels.text.stroke',
            stylers: [{
                color: '#242f3e'
            }]
        },
        {
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#746855'
            }]
        },
        {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#d59563',
                // visibility: "off"
            }]
        },
        {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [{
                color: '#ff0000',
                strokWeight: 10
                // visibility: "off"
            }]
        },
        //remove point of interest
        {
            featureType: "poi",
            stylers: [{
                visibility: "off"
            }]
        },
        //remove landscape
        {
            elementType: "labels.icon",
            stylers: [{
                visibility: "off"
            }]
        },
        //remove road
        {
            featureType: "road",
            stylers: [{
                visibility: "off"
            }]
        },
        //remove transit
        {
            featureType: 'transit',
            stylers: [{
                visibility:'off'
            }]
        },
        //style water colour
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{
                color: '#17263c'
            }]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#515c6d'
            }]
        },
]