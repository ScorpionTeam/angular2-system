import {Component, OnInit} from "@angular/core";
declare var BMap;
declare var BMapLib;
declare var BMAPLIB_TAB_SEARCH
declare var BMAPLIB_TAB_TO_HERE
declare var BMAPLIB_TAB_FROM_HERE
@Component({
  moduleId: "baiduMap",
  selector: 'hl-Map',
  template: `
        <div id="l-map"></div>
    `,
  styles: [`
        #l-map{
        height:600px;
        }
    `]
})

export class MapComponent implements OnInit {

  constructor() {
  }
  ngOnInit() {
    var map = new BMap.Map('l-map');
    var point = new BMap.Point(120.22037542, 30.25924446);
    map.centerAndZoom(point, 12);
    map.enableScrollWheelZoom();
    map.addControl(new BMap.NavigationControl());
    var customLayer;
    customLayer = new BMap.CustomLayer({
      geotableId: 155596,
      q: '',
      tags: '',
      filter: ''
    });
    map.addTileLayer(customLayer);
    customLayer.addEventListener('hotspotclick', callback);
    function callback(e)//单击热点图层
    {
      var customPoi = e.customPoi;
      var contentPoi = e.content;
      var content = '<p style="width:280px;margin:0;line-height:20px;">地址：' + customPoi.address + '<br/>';
      var searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
        title: customPoi.title,
        width: 290,
        height: 40,
        panel: "panel",
        enableAutoPan: true,
        enableSendToPhone: true,
        searchTypes: [
          BMAPLIB_TAB_SEARCH,
          BMAPLIB_TAB_TO_HERE,
          BMAPLIB_TAB_FROM_HERE
        ]
      });
      var point = new BMap.Point(customPoi.point.lng, customPoi.point.lat);
      searchInfoWindow.open(point);
    }
  }

}
