//以 GeoJSON 格式读取和写入数据的特征格式。
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
//设置矢量特征的圆形样式、设置矢量特征的填充样式、设置矢量特征的笔触样式、矢量特征渲染样式的容器。
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
// 为矢量图层提供特征源
import {OSM, Vector as VectorSource} from 'ol/source';
//对于在按特定分辨率的缩放级别组织的网格中提供预渲染的平铺图像的图层源；矢量数据在客户端呈现为矢量。
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

/** @type {VectorSource<import("../src/ol/geom/SimpleGeometry.js").default>} */
const source = new VectorSource({
    url: "data/geojson/switzerland.geojson",
    format: new GeoJSON(),
});

const style = new Style({
    fill: new Fill({
        color: 'rgba(255, 255, 255, 0.6)',
    }),
    stroke: new Stroke({
        color: '#319FD3',
        width: 1,
    }),
    image: new CircleStyle({
        radius: 5,
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.6)',
        }),
        stroke: new Stroke({
            color: '#319FD3',
            width: 1,
        }),
    }),
});
const vectorLayer = new VectorLayer({
    source: source,
    style: style,
});
const view = new View({
    center: [0, 0],
    zoom: 1,
});
const map = new Map({
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
        vectorLayer,
    ],
    target: 'map',
    view: view,
});

const zoomtoswitzerland = document.getElementById('zoomtoswitzerland');
zoomtoswitzerland.addEventListener(
    'click',
    function () {
        const feature = source.getFeatures()[0];
        const polygon = feature.getGeometry();
        view.fit(polygon, {padding: [170, 50, 30, 150]});
    },
    false
);

const zoomtolausanne = document.getElementById('zoomtolausanne');
zoomtolausanne.addEventListener(
    'click',
    function () {
        const feature = source.getFeatures()[1];
        const point = feature.getGeometry();
        view.fit(point, {padding: [170, 50, 30, 150], minResolution: 50});
    },
    false
);

const centerlausanne = document.getElementById('centerlausanne');
centerlausanne.addEventListener(
    'click',
    function () {
        const feature = source.getFeatures()[1];
        const point = feature.getGeometry();
        const size = map.getSize();
        view.centerOn(point.getCoordinates(), size, [570, 500]);
    },
    false
);