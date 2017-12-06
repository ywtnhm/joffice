FormDefView = Ext.extend(Ext.Panel, {
    searchPanel: null,
    gridPanel: null,
    store: null,
    topbar: null,
    constructor: function (a) {
        Ext.applyIf(this, a);
        this.initUIComponents();
        FormDefView.superclass.constructor.call(this, {
            id: "FormDefView",
            title: "[FormDef]管理",
            region: "center",
            layout: "border",
            items: [this.searchPanel, this.gridPanel]
        });
        new Ext.Toolbar();
    },
    initUIComponents: function () {
        this.searchPanel = new Ext.FormPanel({
            layout: "column",
            region: "north",
            bodyStyle: "padding:6px 10px 6px 10px",
            border: false,
            defaults: {border: false, anchor: "98%,98%"},
            items: [{
                columnWidth: 0.3,
                layout: "form",
                items: {fieldLabel: "表单名称", name: "Q_formName_S_LK", xtype: "textfield"}
            }, {
                columnWidth: 0.3,
                layout: "form",
                items: {fieldLabel: "总列数", name: "Q_columns_S_LK", xtype: "textfield"}
            }, {
                columnWidth: 0.3,
                layout: "form",
                items: {fieldLabel: "是否可用", name: "Q_isEnabled_S_LK", xtype: "textfield"}
            }, {
                columnWidth: 0.3,
                layout: "form",
                items: {fieldLabel: "节点名称", name: "Q_activityName_S_LK", xtype: "textfield"}
            }, {
                columnWidth: 0.3,
                layout: "form",
                items: {fieldLabel: "Jbpm流程发布ID", name: "Q_deployId_S_LK", xtype: "textfield"}
            }, {
                columnWidth: 0.3,
                layout: "form",
                items: {xtype: "button", text: "查询", iconCls: "search", handler: this.search.createCallback(this)}
            }]
        });
        this.store = new Ext.data.JsonStore({
            url: __ctxPath + "/flow/listFormDef.do",
            root: "result",
            totalProperty: "totalCounts",
            remoteSort: true,
            fields: [{name: "formDefId", type: "int"}, "formName", "columns", "isEnabled", "activityName", "deployId"]
        });
        this.store.setDefaultSort("formDefId", "desc");
        this.store.load({params: {start: 0, limit: 25}});
        this.rowActions = new Ext.ux.grid.RowActions({
            header: "管理",
            width: 80,
            actions: [{iconCls: "btn-del", qtip: "删除", style: "margin:0 3px 0 3px"}, {
                iconCls: "btn-edit",
                qtip: "编辑",
                style: "margin:0 3px 0 3px"
            }]
        });
        var b = new Ext.grid.CheckboxSelectionModel();
        var a = new Ext.grid.ColumnModel({
            columns: [b, new Ext.grid.RowNumberer(), {
                header: "formDefId",
                dataIndex: "formDefId",
                hidden: true
            }, {header: "表单名称", dataIndex: "formName"}, {header: "总列数", dataIndex: "columns"}, {
                header: "是否可用",
                dataIndex: "isEnabled"
            }, {header: "节点名称", dataIndex: "activityName"}, {
                header: "Jbpm流程发布ID",
                dataIndex: "deployId"
            }, this.rowActions],
            defaults: {sortable: true, menuDisabled: false, width: 100}
        });
        this.topbar = new Ext.Toolbar({
            height: 30,
            bodyStyle: "text-align:left",
            items: [{
                iconCls: "btn-add",
                text: "添加[FormDef]",
                xtype: "button",
                handler: this.createRecord
            }, {iconCls: "btn-del", text: "删除[FormDef]", xtype: "button", handler: this.delRecords, scope: this}]
        });
        this.gridPanel = new Ext.grid.GridPanel({
            id: "FormDefGrid",
            region: "center",
            stripeRows: true,
            tbar: this.topbar,
            store: this.store,
            trackMouseOver: true,
            disableSelection: false,
            loadMask: true,
            autoHeight: true,
            cm: a,
            sm: b,
            plugins: this.rowActions,
            viewConfig: {forceFit: true, autoFill: true, forceFit: true},
            bbar: new Ext.PagingToolbar({
                pageSize: 25,
                store: this.store,
                displayInfo: true,
                displayMsg: "当前页记录索引{0}-{1}， 共{2}条记录",
                emptyMsg: "当前没有记录"
            })
        });
        this.gridPanel.addListener("rowdblclick", function (d, c, f) {
            d.getSelectionModel().each(function (e) {
                new FormDefForm(e.data.formDefId).show();
            });
        });
        this.rowActions.on("action", this.onRowAction, this);
    },
    search: function (a) {
        if (a.searchPanel.getForm().isValid()) {
            $search({searchPanel: a.searchPanel, gridPanel: a.gridPanel});
        }
    },
    createRecord: function () {
        new FormDefForm().show();
    },
    delByIds: function (a) {
        Ext.Msg.confirm("信息确认", "您确认要删除所选记录吗？", function (b) {
            if (b == "yes") {
                Ext.Ajax.request({
                    url: __ctxPath + "/flow/multiDelFormDef.do",
                    params: {ids: a},
                    method: "POST",
                    success: function (c, d) {
                        Ext.ux.Toast.msg("操作信息", "成功删除该[FormDef]！");
                        Ext.getCmp("FormDefGrid").getStore().reload();
                    },
                    failure: function (c, d) {
                        Ext.ux.Toast.msg("操作信息", "操作出错，请联系管理员！");
                    }
                });
            }
        });
    },
    delRecords: function () {
        var c = Ext.getCmp("FormDefGrid");
        var a = c.getSelectionModel().getSelections();
        if (a.length == 0) {
            Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
            return;
        }
        var d = Array();
        for (var b = 0; b < a.length; b++) {
            d.push(a[b].data.formDefId);
        }
        this.delByIds(d);
    },
    editRecord: function (a) {
        new FormDefForm({formDefId: a.data.formDefId}).show();
    },
    onRowAction: function (c, a, d, e, b) {
        switch (d) {
            case"btn-del":
                this.delByIds(a.data.formDefId);
                break;
            case"btn-edit":
                this.editRecord(a);
                break;
            default:
                break;
        }
    }
});