import L from 'leaflet';

const iconExclamation = new L.Icon({
    iconUrl: `${process.env.PUBLIC_URL}/img/Exclamation_yellow_flat_icon.svg`,
    iconRetinaUrl: `${process.env.PUBLIC_URL}/img/Exclamation_yellow_flat_icon.svg`,
    iconSize: new L.Point(30, 30),
    className: 'leaflet-exclamation-icon'
});
const iconStart = new L.Icon({
    iconUrl: `${process.env.PUBLIC_URL}/img/Go_sign.svg`,
    iconRetinaUrl: `${process.env.PUBLIC_URL}/img/start.svg`,
    iconSize: new L.Point(30, 30),
    className: 'leaflet-exclamation-icon'
});

const iconFinish = new L.Icon({
    iconUrl: `${process.env.PUBLIC_URL}/img/finish.svg`,
    iconRetinaUrl: `${process.env.PUBLIC_URL}/img/finish.svg`,
    iconSize: new L.Point(30, 30),
    className: 'leaflet-exclamation-icon'
});

const iconPerson = new L.Icon({
    iconUrl: `${process.env.PUBLIC_URL}/img/person.svg`,
    iconRetinaUrl: `${process.env.PUBLIC_URL}/img/person.svg`,
    iconSize: new L.Point(70, 70),
    className: 'leaflet-person-icon'
});

const iconExclamationActive = new L.Icon({
    iconUrl: `${process.env.PUBLIC_URL}/img/Exclamation_yellow_flat_icon_active.svg`,
    iconRetinaUrl: `${process.env.PUBLIC_URL}/img/Exclamation_yellow_flat_icon_active.svg`,
    iconSize: new L.Point(50, 50),
    className: 'leaflet-exclamation-icon'
});

const iconStartActive = new L.Icon({
    iconUrl: `${process.env.PUBLIC_URL}/img/Go_sign.svg`,
    iconRetinaUrl: `${process.env.PUBLIC_URL}/img/start.svg`,
    iconSize: new L.Point(50, 50),
    className: 'leaflet-exclamation-icon'
});

const iconFinishActive = new L.Icon({
    iconUrl: `${process.env.PUBLIC_URL}/img/finish.svg`,
    iconRetinaUrl: `${process.env.PUBLIC_URL}/img/finish.svg`,
    iconSize: new L.Point(50, 50),
    className: 'leaflet-exclamation-icon'
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
};

export default MarkerIcons;