ProcessRunStart = Ext.extend(Ext.Panel, {
    formPanel: new Ext.form.FormPanel(), constructor: function (a) {
        Ext.applyIf(this, a);
        this.buttonsArr = [{text: "提交并启动流程", iconCls: "btn-ok", scope: this, handler: this.saveAndStart}, {
            text: "重置表单",
            scope: this,
            iconCls: "btn-reset",
            handler: this.reset
        }, "-", {
            text: "流程示意图", scope: this, iconCls: "btn-flow-chart", handler: function () {
                new ProcessImageWindow({defId: a.defId}).show();
            }
        }];
        ProcessRunStart.superclass.constructor.call(this, {
            autoScroll: true,
            layout: "hbox",
            tbar: new Ext.Toolbar({height: 26, items: this.buttonsArr}),
            layoutConfig: {padding: "5", pack: "center", align: "middle"},
            defaults: {margins: "0 5 10 0"},
            title: "流程启动-" + this.flowName,
            iconCls: "btn-flow-start"
        });
    }, saveAndStart: function () {
        var b = this;
        var a = b.formPanel;
        if (a.save) {
            result = a.save.call(a);
            if (!result) {
                return;
            }
        }
        /*if (a.getForm().isValid()) {
            a.getForm().submit({
                url: __ctxPath + "/flow/saveProcessActivity.do",
                waitMsg: "正在提交流程表单信息...",
                params: {defId: this.defId, runId: this.runId, activityName: this.activityName, startFlow: true},
                success: function (c, d) {
                    Ext.ux.Toast.msg("操作信息", "成功保存信息！");
                    AppUtil.removeTab(b.getId());
                    var e = Ext.getCmp("ProcessRunGrid");
                    if (e != null) {
                        e.getStore().reload();
                    }
                }
            });
        }*/
    }, reset: function () {
        this.formPanel.getForm().reset();
    }, initComponent: function () {
        var msgPanel = new Ext.Panel({
            border: false,
            autoHeight: true,
            layout: "column",
            items: [{
                xtype: "checkbox",
                name: "sendMail",
                inputValue: "true",
                boxLabel: "发送邮件",
                columnWidth: 0.2
            }, {xtype: "checkbox", name: "sendMsg", inputValue: "true", boxLabel: "发送短信", columnWidth: 0.2}]
        });
        ProcessRunStart.superclass.initComponent.call(this);
        var topPanel = this;
        var activityName = this.activityName;
        var defId = this.defId;
        $request({
            url: __ctxPath + "/flow/getProcessActivity.do",
            params: {activityName: activityName, defId: this.defId, runId: this.runId},
            success: function (response, options) {
                var isFormPanel = true;
                if (response.responseText.trim().indexOf("[") == 0) {
                    if (activityName == "" || activityName == "undefined" || activityName == null) {
                        activityName = "开始";
                    }
                    eval('topPanel.formPanel = new Ext.FormPanel({title:"任务表单-' + activityName + '",defaults:{border:false},width:600,bodyStyle:"padding:8px 8px 8px 8px;",autoHeight:true,items:' + response.responseText + "});");
                } else {
                    if (response.responseText.indexOf("Ext.extend(Ext.Panel") != -1) {
                        isFormPanel = false;
                    }
                    eval("topPanel.formPanel= new (" + response.responseText + ")();");
                }
                topPanel.formPanel.defId = defId;
                if (!isFormPanel) {
                    topPanel.getTopToolbar().removeAll();
                    topPanel.getTopToolbar().setHeight(0);
                }
                topPanel.formPanel.add(msgPanel);
                topPanel.add(topPanel.formPanel);
                topPanel.doLayout();
            }
        });
    }
});
ProcessImageWindow = Ext.extend(Ext.Window, {
    constructor: function (a) {
        Ext.applyIf(this, a);
        ProcessImageWindow.superclass.constructor.call(this, {
            autoScroll: true,
            iconCls: "btn-flow-chart",
            bodyStyle: "background-color:white",
            maximizable: true,
            title: "流程示意图",
            width: 600,
            height: 500,
            modal: true,
            layout: "fit",
            html: '<img src="' + __ctxPath + "/jbpmImage?defId=" + this.defId + "&rand=" + Math.random() + '"/>'
        });
    }
});