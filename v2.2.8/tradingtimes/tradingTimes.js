define(["exports","jquery","windows/windows","websockets/binary_websockets","navigation/menu","lodash","moment","datatables","jquery-growl"],function(a,b,c,d,e,f,g){"use strict";function h(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(a,"__esModule",{value:!0}),a.init=void 0;var i=h(b),j=h(c),k=h(d),l=h(e),m=(h(f),h(g)),n=null,o=null,p=function(a){a=a||[];var b=[],c={};return a.filter(function(a){var b=(local_storage.get("authorize")||{}).loginid||"";return/MF/gi.test(b)&&"Volatility Indices"!==a.name||/MLT/gi.test(b)&&"Volatility Indices"===a.name||/MX/gi.test(b)&&"Volatility Indices"===a.name||!/MF/gi.test(b)&&!/MLT/gi.test(b)&&!/MX/gi.test(b)}).forEach(function(a){b.push(a.display_name),c[a.display_name]=[],a.submarkets.forEach(function(b){return c[a.display_name].push(b.display_name)})}),{market_names:b,submarket_names:c,getRowsFor:function(b,c){var d=a.filter(function(a){return a.display_name==b})[0],e=d&&d.submarkets.filter(function(a){return a.display_name==c})[0].instruments,f=(e||[]).map(function(a){return[a.display_name,a.times.open[0],a.times.close[0],a.times.settlement||a.settlement||"-",a.events&&a.events.length>0?a.events.map(function(a){var b=a.descrip,c=a.dates;return b+": "+c}).join("<br>"):"-"]});return f}}},q=a.init=function(a){require(["css!tradingtimes/tradingTimes.css"]),a.click(function(){o?o.moveToTop():(o=j["default"].createBlankWindow(i["default"]("<div/>"),{title:"Trading Times".i18n(),dialogClass:"tradingTimes",width:800,height:400}),o.track({module_id:"tradingTimes",is_unique:!0,data:null}),o.dialog("open"),require(["text!tradingtimes/tradingTimes.html"],r))})},r=function(a){a=i["default"](a).i18n();var b=a.filter(".trading-times-sub-header");n=a.filter("table"),a.appendTo(o),n=n.dataTable({data:[],columnDefs:[{className:"dt-body-center dt-header-center",targets:[0,1,2,3,4]}],paging:!1,ordering:!1,searching:!0,processing:!0}),n.parent().addClass("hide-search-input"),n.api().columns().every(function(){var a=this;i["default"]("input",this.header()).on("keyup change",function(){a.search()!==this.value&&a.search(this.value).draw()})});var c=null,d=null,e=null,f=function(a){var f=i["default"]("#"+n.attr("id")+"_processing").show(),g=function(a,b,c){var d=a.getRowsFor(b,c);n.api().rows().remove(),n.api().rows.add(d),n.api().draw()},h=function(a){function h(){var a=i["default"](this).val();k.submarket_names[a]&&d.update_list(k.submarket_names[a]),g(k,c.val(),d.val())}var k=p(l["default"].extractFilteredMarkets(a));if(null==c){var m=i["default"]("<select />");m.appendTo(b),c=j["default"].makeSelectmenu(m,{list:k.market_names,inx:0}),c.off("selectmenuchange",h),c.on("selectmenuchange",h)}else c.update_list(k.market_names),c.off("selectmenuchange",h),c.on("selectmenuchange",h);if(null==d){var n=i["default"]("<select />");n.appendTo(b),d=j["default"].makeSelectmenu(n,{list:k.submarket_names[c.val()],inx:0,changed:e}),d.off("selectmenuchange",h),d.on("selectmenuchange",h)}else d.update_list(k.submarket_names[c.val()]),d.off("selectmenuchange",h),d.on("selectmenuchange",h);g(k,c.val(),d.val()),f.hide()},m=function(){return k["default"].cached.send({trading_times:a}).then(function(a){return h(a)})["catch"](function(a){i["default"].growl.error({message:a.message}),h({})})};m(),require(["websockets/binary_websockets"],function(a){a.events.on("login",m),a.events.on("logout",m)})};f(m["default"].utc().format("YYYY-MM-DD"));var g=m["default"].utc().add(1,"years").toDate();o.addDateToHeader({title:"Date: ",date:m["default"].utc().toDate(),changed:f,maxDate:g})};a["default"]={init:q}});