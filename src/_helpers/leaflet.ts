import L from 'leaflet';

const iconExclamation = new L.Icon({
    iconUrl: `${process.env.PUBLIC_URL}/img/Exclamation_yellow_flat_icon.svg`,
    iconRetinaUrl: `${process.env.PUBLIC_URL}/img/Exclamation_yellow_flat_icon.svg`,
    iconSize: new L.Point(30, 30),
    className: 'leaflet-exclamation-icon'
});

const iconStart = new L.Icon({
    // iconUrl: `${process.env.PUBLIC_URL}/img/Go_sign.svg`,
    // iconRetinaUrl: `${process.env.PUBLIC_URL}/img/start.svg`,
    iconUrl: `${process.env.PUBLIC_URL}/img/House_christoph_brill_01.svg`,
    iconRetinaUrl: `${process.env.PUBLIC_URL}/img/House_christoph_brill_01.svg`,
    iconSize: new L.Point(30, 30),
    className: 'leaflet-start-icon'
});

const iconFinish = new L.Icon({
    iconUrl: `${process.env.PUBLIC_URL}/img/finish.svg`,
    iconRetinaUrl: `${process.env.PUBLIC_URL}/img/finish.svg`,
    iconSize: new L.Point(40, 40),
    className: 'leaflet-finish-icon'
});

const iconPerson = new L.Icon({
    // iconUrl: `${process.env.PUBLIC_URL}/img/person.svg`,
    // iconRetinaUrl: `${process.env.PUBLIC_URL}/img/person.svg`,
    iconUrl: `https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg`,
    iconRetinaUrl: `https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg`,
    iconSize: new L.Point(40, 40),
    className: 'leaflet-avatar-icon'
});

const iconExclamationActive = new L.Icon({
    iconUrl: `${process.env.PUBLIC_URL}/img/Exclamation_yellow_flat_icon_active.svg`,
    iconRetinaUrl: `${process.env.PUBLIC_URL}/img/Exclamation_yellow_flat_icon_active.svg`,
    iconSize: new L.Point(40, 40),
    className: 'leaflet-exclamation-icon active'
});

const iconStartActive = new L.Icon({
    // iconUrl: `${process.env.PUBLIC_URL}/img/Go_sign.svg`,
    // iconRetinaUrl: `${process.env.PUBLIC_URL}/img/start.svg`,
    iconUrl: `${process.env.PUBLIC_URL}/img/House_christoph_brill_01.svg`,
    iconRetinaUrl: `${process.env.PUBLIC_URL}/img/House_christoph_brill_01.svg`,
    iconSize: new L.Point(50, 50),
    className: 'leaflet-start-icon active'
});

const iconFinishActive = new L.Icon({
    iconUrl: `${process.env.PUBLIC_URL}/img/finish.svg`,
    iconRetinaUrl: `${process.env.PUBLIC_URL}/img/finish.svg`,
    iconSize: new L.Point(50, 50),
    className: 'leaflet-finish-icon active'
});

const iconCache = new L.Icon({
    iconUrl: `${process.env.PUBLIC_URL}/img/Exclamation_yellow_flat_icon.svg`,
    iconRetinaUrl: `${process.env.PUBLIC_URL}/img/Exclamation_yellow_flat_icon.svg`,
    iconSize: new L.Point(30, 30),
    className: 'leaflet-cache-icon'
});

const iconCacheActive = new L.Icon({
    iconUrl: `${process.env.PUBLIC_URL}/img/Exclamation_yellow_flat_icon_active.svg`,
    iconRetinaUrl: `${process.env.PUBLIC_URL}/img/Exclamation_yellow_flat_icon_active.svg`,
    iconSize: new L.Point(40, 40),
    className: 'leaflet-cache-icon active'
});

const iconTreasure = new L.Icon({
    // iconUrl: `https://upload.wikimedia.org/wikipedia/commons/7/7b/Treasure_chest.svg`,
    // iconRetinaUrl: `https://upload.wikimedia.org/wikipedia/commons/7/7b/Treasure_chest.svg`,
    iconUrl: `${process.env.PUBLIC_URL}/img/schatzkiste.svg`,
    iconRetinaUrl: `${process.env.PUBLIC_URL}/img/schatzkiste.svg`,
    iconSize: new L.Point(40, 40),
    className: 'leaflet-treasure-icon'
});

const iconTreasureActive = new L.Icon({
    // iconUrl: `https://upload.wikimedia.org/wikipedia/commons/7/7b/Treasure_chest.svg`,
    // iconRetinaUrl: `https://upload.wikimedia.org/wikipedia/commons/7/7b/Treasure_chest.svg`, 
    iconUrl: `${process.env.PUBLIC_URL}/img/schatzkiste.svg`,
    iconRetinaUrl: `${process.env.PUBLIC_URL}/img/schatzkiste.svg`,
    iconSize: new L.Point(50, 50),
    className: 'leaflet-treasure-icon active'
});

type iconList =  {
    [type: string]: {active: any, regular: any}
}
const MarkerIcons: iconList = {
    avatar: {
        active: iconPerson,
        regular: iconPerson,
    },
    exclamation: {
        active: iconExclamationActive,
        regular: iconExclamation,
    },
    start: {
        active: iconStartActive,
        regular: iconStart,
    }, 
    finish: {
        active: iconFinishActive,
        regular: iconFinish,
    },
    cache: {
        active: iconCacheActive,
        regular: iconCache,
    },
    treasure: {
        active: iconTreasureActive,
        regular: iconTreasure,
    },
};

export default MarkerIcons;