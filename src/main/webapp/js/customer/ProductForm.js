ProductForm=Ext.extend(Ext.Window,{formPanel:null,constructor:function(a){Ext.applyIf(this,a);this.initUIComponents();ProductForm.superclass.constructor.call(this,{layout:"fit",id:"ProductFormWin",title:"产品详细信息",iconCls:"menu-product",width:500,height:370,minWidth:499,minHeight:369,items:this.formPanel,maximizable:true,border:false,modal:true,plain:true,buttonAlign:"center",buttons:this.buttons});},initUIComponents:function(){this.formPanel=new Ext.FormPanel({url:__ctxPath+"/customer/saveProduct.do",layout:"form",id:"ProductForm",bodyStyle:"padding:5px;",frame:false,defaults:{width:400,anchor:"98%,98%"},formId:"ProductFormId",defaultType:"textfield",items:[{name:"product.productId",id:"productId",xtype:"hidden",value:this.productId==null?"":this.productId},{xtype:"hidden",name:"product.providerId",id:"providerId",allowBlank:false,blankText:"供应商不能为空!"},{fieldLabel:"产品名称",name:"product.productName",id:"productName",allowBlank:false,blankText:"录入时间不能为空!"},{fieldLabel:"产品型号",name:"product.productModel",id:"productModel",allowBlank:false,blankText:"录入时间不能为空!"},{xtype:"compositefield",fieldLabel:"供应商*",items:[{xtype:"textfield",name:"providerName",id:"providerName",width:230,allowBlank:false,blankText:"供应商不能为空!"},{xtype:"button",text:"选择供应商",iconCls:"menu-provider",handler:function(){ProviderSelector.getView(function(a,b){Ext.getCmp("providerId").setValue(a);Ext.getCmp("providerName").setValue(b);},true).show();}}]},{fieldLabel:"录入时间",name:"product.createtime",id:"createtime",format:"Y-m-d",xtype:"datefield",allowBlank:false,blankText:"录入时间不能为空!"},{fieldLabel:"产品单位",name:"product.unit",id:"unit"},{xtype:"compositefield",fieldLabel:"成本价*",items:[{xtype:"panel",width:30,border:false,html:'<img src="'+__ctxPath+'/images/flag/customer/rmb.png" />：'},{xtype:"numberfield",width:308,name:"product.costPrice",id:"costPrice"}]},{xtype:"compositefield",fieldLabel:"出售价*",items:[{xtype:"panel",width:30,border:false,html:'<img src="'+__ctxPath+'/images/flag/customer/rmb.png" />：'},{xtype:"numberfield",width:308,name:"product.salesPrice",id:"salesPrice"}]},{fieldLabel:"产品描述",name:"product.productDesc",id:"productDesc",xtype:"textarea",height:100}]});if(this.productId!=null&&this.productId!="undefined"){this.formPanel.getForm().load({deferredRender:false,url:__ctxPath+"/customer/getProduct.do?productId="+this.productId,waitMsg:"正在载入数据...",success:function(c,d){var a=d.result.data;var b=getDateFromFormat(a.createtime,"yyyy-MM-dd HH:mm:ss");Ext.getCmp("createtime").setValue(new Date(b));Ext.getCmp("providerId").setValue(a.provider.providerId);Ext.getCmp("providerName").setValue(a.provider.providerName);},failure:function(a,b){Ext.ux.Toast.msg("编辑","载入失败");}});}this.buttons=[{text:"保存",iconCls:"btn-save",handler:function(){var a=Ext.getCmp("ProductForm");if(a.getForm().isValid()){a.getForm().submit({method:"post",waitMsg:"正在提交数据...",success:function(b,c){Ext.ux.Toast.msg("操作信息","成功保存信息！");Ext.getCmp("ProductGrid").getStore().reload();Ext.getCmp("ProductFormWin").close();},failure:function(b,c){Ext.MessageBox.show({title:"操作信息",msg:"信息保存出错，请联系管理员！",buttons:Ext.MessageBox.OK,icon:"ext-mb-error"});window.close();}});}}},{text:"取消",iconCls:"btn-cancel",handler:function(){Ext.getCmp("ProductFormWin").close();}}];}});