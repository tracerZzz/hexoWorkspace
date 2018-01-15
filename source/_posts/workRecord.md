---
title: 接取送达费率页面实现
author: tracerZzz 
excerpt: <img width="100%" data-original-height='100px' class="lazy" data-original="http://og3vj3jrj.bkt.clouddn.com/js/ext.png"></br>接取送达费率页面实现页面的实现思路，具体细节，以及问题总结；
tags:
- js
categories:
- coding
---



页面实现结果如下图：


<img  src="http://og3vj3jrj.bkt.clouddn.com/js/receive.png" style="width: 100%">
>定义load方法，用来加载费率计算公式，若之前没有设定,创建三条记录，将so,a,b都设置为暂未设定

#### 预加载


```javascript
if(!records||records.length==0){ //暂未设定
$thisObj.list=[];
list=[
         {containerSizeTypeCode:"CONTAINER_SIZE_TYPE_20",containerTypeName:'20英尺集装箱',name:'So',value:'暂未设定',},
         {containerSizeTypeCode:"CONTAINER_SIZE_TYPE_20",value:'暂未设定',name:'A',},
         {containerSizeTypeCode:"CONTAINER_SIZE_TYPE_20",value:'暂未设定',name:'B',},
         {containerSizeTypeCode:"CONTAINER_SIZE_TYPE_40",containerTypeName:'40英尺集装箱',name:'So',value:'暂未设定',},
         {containerSizeTypeCode:"CONTAINER_SIZE_TYPE_40",value:'暂未设定',name:'A',},
         {containerSizeTypeCode:"CONTAINER_SIZE_TYPE_40",value:'暂未设定',name:'B',},
         {containerSizeTypeCode:"CONTAINER_SIZE_TYPE_20",containerTypeName:'20英尺35t箱',name:'So',value:'暂未设定',},
         {containerSizeTypeCode:"CONTAINER_SIZE_TYPE_20",value:'暂未设定',name:'A',},
         {containerSizeTypeCode:"CONTAINER_SIZE_TYPE_20",value:'暂未设定',name:'B',},
    ]
    get('grid').getStore().removeAll();
    get('grid').getStore().add(list);
}
```

>若果返回的请求结果有设定，那么遍历结果，追加没有的设置

```javascript
else{//已经设定参数
$thisObj.list=records;
    //console.log(1);
    let items=[]; //grid items
    for(item of $thisObj.list){
        if(item.containerSizeTypeCode=='CONTAINER_SIZE_TYPE_20'){
        item.containerTypeName='20英尺集装箱';
        items.push({itemId:item.id,containerSizeTypeCode:"CONTAINER_SIZE_TYPE_20",containerTypeName:'20英尺集装箱',name:'So',value:item.initMil,});
        items.push({itemId:item.id,containerSizeTypeCode:"CONTAINER_SIZE_TYPE_20",value:item.initPrice,name:'A'});
        items.push({itemId:item.id,containerSizeTypeCode:"CONTAINER_SIZE_TYPE_20",value:item.milPrice,name:'B'});
        }
        if(item.containerSizeTypeCode=='CONTAINER_SIZE_TYPE_40'){
        item.containerTypeName='40英尺集装箱';
        items.push({itemId:item.id,containerSizeTypeCode:"CONTAINER_SIZE_TYPE_40",containerTypeName:'40英尺集装箱',name:'So',value:item.initMil,});
        items.push({itemId:item.id,containerSizeTypeCode:"CONTAINER_SIZE_TYPE_40",value:item.initPrice,name:'A'});
        items.push({itemId:item.id,containerSizeTypeCode:"CONTAINER_SIZE_TYPE_40",value:item.milPrice,name:'B'});
        }
        if(item.containerSizeTypeCode=='CONTAINER_SIZE_TYPE_25'){
        item.containerTypeName='25英尺35t箱';
        items.push({itemId:item.id,containerSizeTypeCode:"CONTAINER_SIZE_TYPE_25",containerTypeName:'25英尺35t箱',name:'So',value:item.initMil,});
        items.push({itemId:item.id,containerSizeTypeCode:"CONTAINER_SIZE_TYPE_25",value:item.initPrice,name:'A'});
        items.push({itemId:item.id,containerSizeTypeCode:"CONTAINER_SIZE_TYPE_25",value:item.milPrice,name:'B'});
        }
    }
    var count1=0;
    var count2=0;
    var count3=0;
    for(let i of items){
        if(i.containerSizeTypeCode&&i.containerSizeTypeCode=='CONTAINER_SIZE_TYPE_20') count1++;
        if(i.containerSizeTypeCode&&i.containerSizeTypeCode=='CONTAINER_SIZE_TYPE_40') count2++;
        if(i.containerSizeTypeCode&&i.containerSizeTypeCode=='CONTAINER_SIZE_TYPE_25') count3++;
    }
    if(count1==0) {
    items.push({containerSizeTypeCode:"CONTAINER_SIZE_TYPE_20",containerTypeName:'20英尺集装箱',name:'So',value:'暂未设定',});
         items.push({containerSizeTypeCode:"CONTAINER_SIZE_TYPE_20",value:"暂未设定",name:'A'});
        items.push({containerSizeTypeCode:"CONTAINER_SIZE_TYPE_20",value:'暂未设定',name:'B'});
    }
    if(count2==0) {
    items.push({containerSizeTypeCode:"CONTAINER_SIZE_TYPE_40",containerTypeName:'40英尺集装箱',name:'So',value:'暂未设定',});
         items.push({containerSizeTypeCode:"CONTAINER_SIZE_TYPE_40",value:"暂未设定",name:'A'});
        items.push({containerSizeTypeCode:"CONTAINER_SIZE_TYPE_40",value:'暂未设定',name:'B'});
    }
    if(count3==0) {
    items.push({containerSizeTypeCode:"CONTAINER_SIZE_TYPE_25",containerTypeName:'25英尺35t箱',name:'So',value:'暂未设定',});
        items.push({containerSizeTypeCode:"CONTAINER_SIZE_TYPE_25",value:"暂未设定",name:'A'});
        items.push({containerSizeTypeCode:"CONTAINER_SIZE_TYPE_25",value:'暂未设定',name:'B'});
    } 
    get('grid').getStore().removeAll();
    get('grid').getStore().add(items);
}

```

#### 变更费率
>校验输入

```javascript
   var inputValue=[];
   var inputCount=0;
   var validflag=0;
   $("input").each(function(){
       if($(this).val()==''||$(this).val()==null){
       inputCount++;
       $(this).focus();
       }else{
       var r1= /^[0-9]*[1-9][0-9]*$/　　//正整数 
       if(!r1.exec($(this).val())){
       validflag++;
       }
       }
       inputValue.push($(this).val());
   });
   if(inputCount==inputValue.length){
       showMsgBox({text:"请填写一条变更值！" ,  msgType:'s'});
       return;
   }
   if(validflag!=0){
       showMsgBox({text:"请输入整数类型！" ,  msgType:'s'});
       return;
   }
```

>变更费率
将数据格式化（将九条记录转换为三条记录），并且如果是首次设定，那么必须三个参数同时填写。


```javascript
   var gridItem=get('grid').getStore().data.items;
       var updateList=[];
    for(let i=0;i<gridItem.length;i++){
        if(gridItem[i].data.containerTypeName){//存在名称
            updateList[parseInt(i/3)]={};
            updateList[parseInt(i/3)].containerTypeName=gridItem[i].data.containerTypeName;
            updateList[parseInt(i/3)].initMil=gridItem[i].data.value;//so
            updateList[parseInt(i/3)].initMilBefore=gridItem[i].data.value;//so
                if(gridItem[i].data.setValue!=''&&gridItem[i].data.setValue!=undefined){
                updateList[parseInt(i/3)].initMil=gridItem[i].data.setValue;//so
                }
            updateList[parseInt(i/3)].containerSizeTypeCode=gridItem[i].data.containerSizeTypeCode;//so
            if(gridItem[i].data.itemId){//存在id
             updateList[parseInt(i/3)].id=gridItem[i].data.itemId;//so
            }
        }
        if(gridItem[i].data.name=='A'){
        updateList[parseInt(i/3)].initPrice=gridItem[i].data.value
        updateList[parseInt(i/3)].initPriceBefore=gridItem[i].data.value
        if(gridItem[i].data.setValue!=''&&gridItem[i].data.setValue!=undefined){
         updateList[parseInt(i/3)].initPrice=gridItem[i].data.setValue
        }
        }
        if(gridItem[i].data.name=='B'){
        updateList[parseInt(i/3)].milPrice=gridItem[i].data.value
        updateList[parseInt(i/3)].milPriceBefore=gridItem[i].data.value
        if(gridItem[i].data.setValue!=''&&gridItem[i].data.setValue!=undefined){
         updateList[parseInt(i/3)].milPrice=gridItem[i].data.setValue
        }
        }
    }
   var removeList=[];
   for(let item of updateList){
       if(!item.id&&item.initMilBefore=="暂未设定"&&item.milPriceBefore=='暂未设定'&&item.initPriceBefore=='暂未设定'){//若之前未设定
       var count=0;
       if(item.initMil=="暂未设定")count++;
       if(item.milPrice=="暂未设定")count++;
       if(item.initPrice=="暂未设定")count++;
        if(count!=0&&count!=3){
         showMsgBox({text:"由于之前"+item.containerTypeName+'未进行计费公式设定，请填写完整数值（so,A,B）! ' ,  msgType:'s',timer:7000});
            return;
        }
        if(count==3){
         removeList.push(item);
         
        }
        
        
       }
   }
   for(item of removeList){
       updateList.remove(item);
   }
   $thisObj.updatelist=updateList;
```

#### 总结

 - grid追加输入框
 ```javascript
  renderer: function (value, meta, record, rowIndex, colIndex) {
        return '<input type="text" value="" onchange="var s = Ext.getCmp(\'grid\').store; s.getAt(s.findExact(\'id\',\'' + record.get('id') + '\')).set(\'setValue\', this.value)" />';
                           }}
 ```
 - 加载完页面调用预加载函数
```javascript
listeners:{
    'afterrender':load
}
```
 - 请求参数为json格式(1.修改header,2.格式化请求参数-JSON.stringify())
```javascript
    var headers={'Content-Type':'application/json'};
                    var params={};
                    params.receiveFees=$thisObj.updatelist;
                    params=JSON.stringify(params);
                    Ajax.request({
                    url:basePath + '/receive_fee/update',
                    hide:true,
                    headers: headers,
                    params:params,
                    execute: function (result , success) {
                        changeWindow.hide();
                        showMsgBox({text:"变更成功！" ,  msgType:'s'});
                        load();
                    }
                    })
```
 - 后台接收方法
```java
@RequestMapping("/update")
public @ResponseBody ResultBean update(@RequestBody Map<String,Object> params){
    //List<ReceiveFee> receiveFees
    ResultBean resultBean = null;
    try {
        List<ReceiveFee> receiveFees =  BaseConvertUtil.mapToBean((List<Map<String,Object>>)params.get("receiveFees"),ReceiveFee.class);
        resultBean = this.receiveFeeService.update(receiveFees);
    } catch (ServiceException e) {
        resultBean = BaseResultBeanUtil.getResultBean(e);
    }
    return resultBean;
}
```


