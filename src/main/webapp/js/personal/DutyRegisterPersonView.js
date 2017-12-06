Ext.ns("DutyRegisterPersonView");var DutyRegisterPersonView=function(){return new Ext.Panel({id:"DutyRegisterPersonView",title:"个人考勤查询列表",iconCls:"menu-person",autoScroll:true,items:[new Ext.FormPanel({id:"PersonDutyRegisterSearchForm",height:40,frame:false,border:false,layout:"hbox",layoutConfig:{padding:"5",align:"middle"},defaults:{xtype:"label",margins:{top:0,right:4,bottom:4,left:4}},items:[{text:"请输入查询条件:"},{text:"登记时间从"},{xtype:"datefield",format:"Y-m-d",name:"Q_registerDate_DL_GE"},{text:"至"},{xtype:"datefield",format:"Y-m-d",name:"Q_registerDate_DG_LE"},{text:"上下班"},{hiddenName:"Q_inOffFlag_SN_EQ",xtype:"combo",width:100,mode:"local",editable:true,triggerAction:"all",store:[["1","上班"],["2","下班"]]},{xtype:"button",text:"查询",iconCls:"search",handler:function(){var a=Ext.getCmp("PersonDutyRegisterSearchForm");var b=Ext.getCmp("DutyRegisterPersonGrid");if(a.getForm().isValid()){$search({searchPanel:a,gridPanel:b});}}}]}),this.setup()]});};DutyRegisterPersonView.prototype.setup=function(){return this.grid();};DutyRegisterPersonView.prototype.grid=function(){var b=["周日","周一","周二","周三","周四","周五","周六"];var a=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),{header:"registerId",dataIndex:"registerId",hidden:true},{header:"登记时间",dataIndex:"registerDate"},{header:"登记人",dataIndex:"fullname"},{header:"登记标识",dataIndex:"regFlag",renderer:function(e){if(e==1){return'<font color="green">√</font>';}else{if(e==2){return'<font color="red">迟到</font>';}else{if(e==3){return'<font color="red">早退</font>';}}}}},{header:"周几",dataIndex:"dayOfWeek",renderer:function(e){return b[e-1];}},{header:"上下班标识",dataIndex:"inOffFlag",renderer:function(e){if(e==1){return"上班";}else{return"下班";}}}],defaults:{sortable:true,menuDisabled:false,width:100}});var c=this.store();c.load({params:{start:0,limit:25}});var d=new Ext.grid.GridPanel({id:"DutyRegisterPersonGrid",store:c,trackMouseOver:true,disableSelection:false,loadMask:true,height:400,cm:a,viewConfig:{forceFit:true,enableRowBody:false,showPreview:false},bbar:new Ext.PagingToolbar({pageSize:25,store:c,displayInfo:true,displayMsg:"当前显示{0}至{1}， 共{2}条记录",emptyMsg:"当前没有记录"})});return d;};DutyRegisterPersonView.prototype.store=function(){var a=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:__ctxPath+"/personal/personDutyRegister.do"}),reader:new Ext.data.JsonReader({root:"result",totalProperty:"totalCounts",id:"id",fields:[{name:"registerId",type:"int"},"registerDate","fullname","regFlag","regMins","reason","dayOfWeek","inOffFlag"]}),remoteSort:true});a.setDefaultSort("registerId","desc");return a;};