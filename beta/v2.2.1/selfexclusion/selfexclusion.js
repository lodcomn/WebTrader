define(["exports","jquery","windows/windows","websockets/binary_websockets","lodash","common/rivetsExtra","moment","text!selfexclusion/selfexclusion.html","jquery-growl","common/util"],function(a,b,c,d,e,f,g,h){"use strict";function i(a){return a&&a.__esModule?a:{"default":a}}function j(){v.exclude_until&&p["default"].utc(v.exclude_until,"YYYY-MM-DD").isAfter(p["default"].utc().startOf("day"))&&n["default"].defer(function(){k["default"].growl.error({message:"You have excluded yourself until ".i18n()+v.exclude_until}),m["default"].invalidate()}),v.timeout_until&&p["default"](v.timeout_until).isAfter(p["default"]().unix().valueOf())&&(k["default"].growl.error({message:"You have excluded yourself until ".i18n()+p["default"].unix(v.timeout_until).utc().format("YYYY-MM-DD HH:mm")+"GMT"}),m["default"].invalidate())}Object.defineProperty(a,"__esModule",{value:!0}),a.init=void 0;var k=i(b),l=i(c),m=i(d),n=i(e),o=i(f),p=i(g),q=i(h),r=null,s=null,t=null,u={max_balance:{limit:1e20,set:!1,name:"Maximum balance".i18n()},max_turnover:{limit:1e20,set:!1,name:"Daily turnover limit".i18n()},max_losses:{limit:1e20,set:!1,name:"Daily limit on losses".i18n()},max_7day_turnover:{limit:1e20,set:!1,name:"7-day turnover limit".i18n()},max_7day_losses:{limit:1e20,set:!1,name:"7-day limit on losses".i18n()},max_30day_turnover:{limit:1e20,set:!1,name:"30-day turnover limit".i18n()},max_30day_losses:{limit:1e20,set:!1,name:"30-day limit on losses".i18n()},max_open_bets:{limit:101,set:!1,name:"Maximum open positions".i18n()},session_duration_limit:{limit:60480,set:!1,name:"Session duration limit".i18n()},exclude_until:{limit:null,set:!1,name:"Exclude time".i18n()},timeout_until:{limit:null,set:!1,name:"Time out until".i18n()}},v={max_balance:null,max_turnover:null,max_losses:null,max_7day_turnover:null,max_7day_losses:null,max_30day_turnover:null,max_30day_losses:null,max_open_bets:null,session_duration_limit:null,exclude_until:null,timeout_until_date:null,timeout_until_time:null,trimString:function(a,b){var c=k["default"](a.target),d=isBTC()?8:2,e=(c.attr("maxlength"),new RegExp("[\\d]{0,20}(\\.[\\d]{1,"+d+"})?","g")),f=(c.val().toString().match(e)||[])[0],g=c.attr("rv-value");b[g]=f},update:function(a,b){var c={set_self_exclusion:1},d=[];if(b.timeout_until_date){var e=p["default"](b.timeout_until_date);if(b.timeout_until_time){var f=p["default"](b.timeout_until_time,"HH:mm");e.add(f.format("HH"),"hours").add(f.format("mm"),"minutes")}e.isAfter(p["default"]().add(6,"weeks"))&&d.push("Please enter a value less than 6 weeks for time out until.".i18n()),e.isAfter(p["default"]())||d.push("Exclude time must be after today.".i18n()),b.timeout_until=e.unix()}else b.timeout_until_time&&d.push("Please select a date for time out until.".i18n());if(k["default"].each(u,function(a,e){if(b[a]=b[a]&&b[a].toString(),b[a]||e.set){if("exclude_until"===a){if(p["default"].utc(b.exclude_until,"YYYY-MM-DD").isBefore(p["default"].utc().startOf("day").add(6,"months")))return void d.push("Exclude until time cannot be less than 6 months.".i18n());if(p["default"].utc(b.exclude_until,"YYYY-MM-DD").isAfter(p["default"].utc().startOf("day").add(5,"years")))return void d.push("Exclude until time cannot be more than 5 years.".i18n())}if(b[a]&&-1!==b[a].indexOf("e"))return void d.push("Please enter a valid value for ".i18n()+e.name);if(!b[a]||b[a]<=0||e.limit&&b[a]>e.limit)return void d.push("Please enter a value between 0 and ".i18n()+e.limit+" for ".i18n()+e.name);c[a]=b[a]}else b[a]=void 0}),d.length>0)return void d.forEach(function(a){k["default"].growl.error({message:a})});if(c.timeout_until||c.exclude_until){var g=window.confirm('When you click "Ok" you will be excluded from trading on the site until the selected date.'.i18n());if(0==g)return}m["default"].send(c).then(function(){k["default"].growl.notice({message:"Your changes have been updated".i18n()}),j(),y()})["catch"](function(a){k["default"].growl.error({message:a.message})})}},w=function(){return require(["css!selfexclusion/selfexclusion.css"]),new Promise(function(a){var b=k["default"](q["default"]).i18n();b.find(".datepicker").datepicker({dateFormat:"yy-mm-dd",minDate:p["default"].utc().toDate(),maxDate:p["default"].utc().add(6,"weeks").toDate()}),b.find(".timepicker").timepicker({timeFormat:"HH:MM"}),r=l["default"].createBlankWindow(k["default"]("<div/>"),{title:"Self-Exclusion Facilities".i18n(),width:900,minHeight:500,height:500,"data-authorized":"true",destroy:function(){r=null}}),b.appendTo(r),o["default"].bind(b[0],v),x(),a()})},x=function(){return k["default"].growl.notice({message:"Loading self-exclusion settings.".i18n()}),m["default"].send({get_self_exclusion:1}).then(function(a){a.get_self_exclusion&&(k["default"].each(u,function(b){v[b]=a.get_self_exclusion[b],a.get_self_exclusion[b]&&(u[b].limit=a.get_self_exclusion[b],u[b].set=!0)}),j())})["catch"](function(a){k["default"].growl.error({message:a.message})})},y=function(){if(!n["default"].isUndefined(v.session_duration_limit)&&!n["default"].isNull(v.session_duration_limit)&&n["default"].isFinite(n["default"].toNumber(v.session_duration_limit))){s&&clearTimeout(s);var a=60*v.session_duration_limit*1e3;a-=n["default"].now()-t,a>Math.pow(2,32)&&(a=Math.pow(2,32)),s=setTimeout(function(){k["default"].growl.warning({message:"Logging out because of self-exclusion session time out!".i18n()}),m["default"].invalidate()},a)}},z=function(){r&&r.dialog("destroy"),r=null,s&&clearTimeout(s),s=null,t=null,v.max_balance=null,v.max_turnover=null,v.max_losses=null,v.max_7day_turnover=null,v.max_7day_losses=null,v.max_30day_turnover=null,v.max_30day_losses=null,v.max_open_bets=null,v.session_duration_limit=null,v.exclude_until=null,k["default"](".resources a.selfexclusion").addClass("disabled")};m["default"].events.on("login",function(){m["default"].cached.authorize().then(function(a){a.authorize.is_virtual?z():(t=n["default"].now(),x().then(function(){y()}),k["default"]("#nav-menu a.selfexclusion").removeClass("disabled"))})["catch"](function(){z()})}),m["default"].events.on("logout",z);var A=a.init=function(a){a.click(function(){k["default"](this).hasClass("disabled")||m["default"].cached.authorize().then(function(){r?(x(),r.moveToTop()):w().then(function(){r.dialog("open")})})["catch"](function(a){})})};a["default"]={init:A}});