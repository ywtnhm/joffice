/*
 * Ext JS Library 3.1.1
 * Copyright(c) 2006-2010 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns("Ext.ux.layout");Ext.ux.layout.RowLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:true,type:"row",allowContainerRemove:false,isValidParent:function(b,a){return this.innerCt&&b.getPositionEl().dom.parentNode==this.innerCt.dom;},getLayoutTargetSize:function(){var b=this.container.getLayoutTarget(),a;if(b){a=b.getViewSize();a.width-=b.getPadding("lr");a.height-=b.getPadding("tb");}return a;},renderAll:function(a,b){if(!this.innerCt){this.innerCt=b.createChild({cls:"x-column-inner"});this.innerCt.createChild({cls:"x-clear"});}Ext.layout.ColumnLayout.superclass.renderAll.call(this,a,this.innerCt);},onLayout:function(f,j){var b=f.items.items,g=b.length,a,c;this.renderAll(f,j);var l=this.getLayoutTargetSize();if(l.width<1&&l.height<1){return;}var d=l.height,e=d;this.innerCt.setSize({height:d});for(c=0;c<g;c++){a=b[c];if(!a.rowHeight){e-=(a.getHeight()+a.getEl().getMargins("tb"));}}e=e<0?0:e;for(c=0;c<g;c++){a=b[c];if(a.rowHeight){a.setSize({height:Math.floor(a.rowHeight*e)-a.getEl().getMargins("tb")});}}if(Ext.isIE){if(c=j.getStyle("overflow")&&c!="hidden"&&!this.adjustmentPass){var k=this.getLayoutTargetSize();if(k.width!=l.width){this.adjustmentPass=true;this.layoutTargetSize=k;this.onLayout(f,j);}}}delete this.adjustmentPass;}});Ext.Container.LAYOUTS["ux.row"]=Ext.ux.layout.RowLayout;