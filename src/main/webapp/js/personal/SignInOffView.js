var SignInOffView = function () {
    var a = new Ext.grid.ColumnModel({
        defaults: {sortable: false, menuDisabled: true, width: 100},
        columns: [new Ext.grid.RowNumberer(), {dataIndex: "sectionId", hidden: true}, {
            dataIndex: "signInFlag",
            hidden: true
        }, {dataIndex: "signOffFlag", hidden: true}, {
            dataIndex: "allowSignIn",
            hidden: true
        }, {dataIndex: "allowSignOff", hidden: true}, {header: "班次名称", dataIndex: "systemName"}, {
            header: "上班规定时间",
            dataIndex: "dutyStartTime"
        }, {header: "签到时间", dataIndex: "signInTime"}, {
            header: "签到",
            dataIndex: "signInTime",
            renderer: function (j, h, f) {
                var i = f.data.sectionId;
                var e = f.data.signInFlag;
                if (e != "") {
                    if (e == 1) {
                        return '<img src="' + __ctxPath + '/images/flag/personal/signNormal.gif" title="正常"/>';
                    } else {
                        if (e == 2) {
                            return '<img src="' + __ctxPath + '/images/flag/personal/signLateEarly.gif" title="迟到"/>';
                        }
                    }
                } else {
                    var g = f.data.allowSignIn;
                    if (g == "1") {
                        return '<button class="btn-signIn" title="签到" onclick="SignInOffView.signIn(' + i + ');">&nbsp;</button>';
                    } else {
                        if (g == "-1") {
                            return "尚未到签到时间";
                        } else {
                            return "<font color='red'>已过签到时间</font>";
                        }
                    }
                }
            }
        }, {header: "下班规定时间", dataIndex: "dutyEndTime"}, {header: "签退时间", dataIndex: "signOffTime"}, {
            header: "签退",
            dataIndex: "signOffTime",
            renderer: function (j, g, f) {
                var h = f.data.sectionId;
                var e = f.data.signOffFlag;
                if (e != "") {
                    if (e == 1) {
                        return '<img src="' + __ctxPath + '/images/flag/personal/signNormal.gif" title="正常"/>';
                    } else {
                        if (e == 3) {
                            return '<img src="' + __ctxPath + '/images/flag/personal/signLateEarly.gif" title="早退"/>';
                        }
                    }
                } else {
                    var i = f.data.allowSignOff;
                    if (i == "1") {
                        return '<button class="btn-signOff" title="签退" onclick="SignInOffView.signOff(' + h + ');">&nbsp;</button>';
                    } else {
                        if (i == "-1") {
                            return "尚未到签退时间";
                        } else {
                            return "<font color='red'>已过签退时间</font>";
                        }
                    }
                }
            }
        }]
    });
    var c = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: __ctxPath + "/personal/todayDutyRegister.do"}),
        reader: new Ext.data.JsonReader({
            root: "result",
            fields: ["sectionId", "systemName", "dutyStartTime", "signInTime", "signInFlag", "dutyEndTime", "signOffTime", "signOffFlag", "allowSignIn", "allowSignOff"]
        })
    });
    c.load();
    var d = new Ext.grid.GridPanel({
        id: "SignInOffGrid",
        margins: "0",
        border: false,
        store: c,
        tbar: new Ext.Toolbar({
            height: 28, items: [{
                text: "刷新", iconCls: "btn-refresh", handler: function () {
                    c.reload();
                }
            }, {
                text: "请假登记", iconCls: "menu-holiday", handler: function () {
                    App.clickTopTab("ErrandsRegisterView");
                }
            }, {
                text: "外出登记", iconCls: "menu-errands", handler: function () {
                    App.clickTopTab("ErrandsRegisterOutView");
                }
            }, {
                text: "个人考勤查询", iconCls: "menu-person", handler: function () {
                    App.clickTopTab("DutyRegisterPersonView");
                }
            }]
        }),
        height: 200,
        cm: a
    });
    var b = new Ext.Panel({
        title: "考勤--签到、签退",
        iconCls: "menu-signInOff",
        id: "SignInOffView",
        layout: "anchor",
        items: [d, {
            xtype: "panel",
            height: 250,
            border: false,
            bodyStyle: "padding-top:20px;padding-left:20px;text-align:center",
            html: '<h1>请按规定的时间进行上下班签到签退</h1><img src="' + __ctxPath + '/images/clock.jpg"/>'
        }]
    });
    return b;
};
SignInOffView.signIn = function (a) {
    Ext.Ajax.request({
        url: __ctxPath + "/personal/signInDutyRegister.do",
        method: "POST",
        params: {sectionId: a},
        success: function (b, c) {
            Ext.getCmp("SignInOffGrid").getStore().reload();
            Ext.ux.Toast.msg("操作信息", "成功签到！");
        }
    });
};
SignInOffView.signOff = function (a) {
    Ext.Ajax.request({
        url: __ctxPath + "/personal/signOffDutyRegister.do",
        method: "POST",
        params: {sectionId: a},
        success: function (b, c) {
            Ext.getCmp("SignInOffGrid").getStore().reload();
            Ext.ux.Toast.msg("操作信息", "成功签退！");
        }
    });
};