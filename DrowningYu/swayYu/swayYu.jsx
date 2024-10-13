#include "../utils.jsx"


function applySwayYu(){
    // alert("applySwayYu");

   // 检查是否选中了图层
   var selectedLayers = app.project.activeItem.selectedLayers;
   if (selectedLayers.length === 0) {
     alert("请先选择一个图层");
     return ;
   }
   //选中图层
   var selLayer = app.project.activeItem.selectedLayers[0];
   //选中效果栏
   var controlGroup = selLayer.property("ADBE Effect Parade");
   // var curConPoint = controlGroup.property("ADBE FreePin3").property("ADBE FreePin3 ARAP Group").property("ADBE FreePin3 Mesh Group").property("ADBE FreePin3 Mesh Atom").property("ADBE FreePin3 PosPins");
   //检查是否有网格效果
   var effect = controlGroup.property("ADBE FreePin3");
   if (effect == null) {
     alert("请给图层打上操纵点");
     return ;
   }
   //检查是否有操纵点
   var posPinsGroup = effect.property("ADBE FreePin3 ARAP Group").property("ADBE FreePin3 Mesh Group").property("ADBE FreePin3 Mesh Atom").property("ADBE FreePin3 PosPins");
   if (posPinsGroup == null) {
     alert("没有没有操纵点");
     return ;
   }



    var pointName="";
    var conName="";
    var meshName="";
    var conPointName="";

   if(getLanguageSetting()===1){
    pointName="点";
    conName="操控";
    meshName="网格 1";
    conPointName="操控点";
   }
   else{
    pointName="Point";
    conName="Puppet";
    meshName="Mesh 1";
    conPointName="Puppet Pin";
   }
   var pointNum=posPinsGroup.numProperties;



   for(var j=1;j<=pointNum;j++){//给操纵点添加表达式
     var conPiontExpression = posPinsGroup.property(pointNum-j+1).property("ADBE FreePin3 PosPin Position").expression='''

     //操纵点表达式
     function distance(p1,p2){
       dx = p2[0] - p1[0];
       dy = p2[1] - p1[1];
       dis = Math.sqrt(dx*dx + dy*dy);
       return dis;
     }
     
     function delay_time(p1,p2,dis){
       level=dis*effect("SwayControl")("Level")*0.0001;
       t=level;
       return t;
     }
     fa_sta_pos=effect("SwayControl")("FatherLayer").transform.position.valueAtTime(0);
     this_sta_pos=valueAtTime(0);
     dis=distance(fa_sta_pos,this_sta_pos);
     
     delay_t=delay_time(fa_sta_pos,this_sta_pos,dis);
     
     effect("p'''+j+'''")("''' + pointName + '''").valueAtTime(time-delay_t);''';
   }
   

   //添加效果
//    var layerControl = controlGroup.addProperty("ADBE Layer Control");//图层
//    layerControl.name="father";
//    fatherSelLayer=layerControl.property("ADBE Layer Control-0001").setValue(0);
//    var levelControl = controlGroup.addProperty("ADBE Slider Control");//滑块
//    levelControl.name = "level";
//    levelValue = levelControl.property("ADBE Slider Control-0001").setValue(0.1);

   applyPresetToLayer(selLayer,"/swayYu/SwayControl.ffx");
   
   
   for(var i=0;i<pointNum;i++){//点控制
     var pointControl = controlGroup.addProperty("ADBE Point Control");
     pointControl.name="p"+(i+1);
     var pointExpression=pointControl.property("ADBE Point Control-0001").expression='''


     //原点表达式
     function distance(p1,p2){
       dx = p2[0] - p1[0];
       dy = p2[1] - p1[1];
       dis = Math.sqrt(dx*dx + dy*dy);
       return dis;
     }
     function angle(degrees_a,dis){
       radians_a=degreesToRadians(degrees_a);
       vactor=[Math.sin(radians_a),Math.cos(radians_a)];
       add=[-vactor[0]*dis,vactor[1]*dis];
       return add;
     }
     //变量声明
     fa_sta_pos=effect("SwayControl")("FatherLayer").transform.position.valueAtTime(0);
     
     fa_cur_pos=effect("SwayControl")("FatherLayer").transform.position;
     
     this_sta_pos=effect("'''+conName+'''").arap.mesh("'''+ meshName +'''").deform("'''+ conPointName +''' '''+(i+1)+'''").position.valueAtTime(0);
     
     ang=effect("SwayControl")("FatherLayer").transform.rotation;//父级旋转角度
     
     
     sub_pos=this_sta_pos-fa_sta_pos;
     
     dis=distance(fa_sta_pos,this_sta_pos);//两点距离
     
     sta_ang=-radiansToDegrees(Math.atan2(sub_pos[0],sub_pos[1]));//起始位置角度
     
     add_pos=angle(ang+sta_ang,dis);//相对父级位置
     
     this_cur_pos=fa_cur_pos+add_pos;//当前位置 
     
     this_cur_pos;
     
     
     
     ''';
   }
   alert("请设置本图层的SwayControl下的FatherLayer图层 如果显示有bug可以清空一下缓存");


}
function helpSwayYu(){
    // alert("helpSwayYu");

    var dialog = new Window("dialog");
    dialog.text = "帮助";
    dialog.orientation = "column";
    dialog.alignChildren = ["center", "top"];
    dialog.spacing = 10;
    dialog.margins = 16;

    var statictext1 = dialog.add("statictext", undefined, undefined, { name: "statictext1" });
    statictext1.text = "功能介绍:可以将图层的图钉绑定到一个控制对象上 使其拥有跟随控制对象的随动效果";

    var statictext2 = dialog.add("statictext", undefined, undefined, { name: "statictext2" });
    statictext2.text = "使用教程：给一个图层打几个图钉 选中该图层然后点击应用";

    var statictext3 = dialog.add("statictext", undefined, undefined, { name: "statictext3" });
    statictext3.text = "点击该按钮跳转b站的演示";

    var button1 = dialog.add("button", undefined, undefined, { name: "button1" });
    button1.text = "bilibili[动态]/本效果展示";
    button1.onClick = function () {
        var command = 'explorer https://www.bilibili.com/opus/799925547339612199?spm_id_from=333.999.0.0';
        var code = system.callSystem(command);
    }

    var group1 = dialog.add("group", undefined, { name: "group1" });
    group1.orientation = "row";
    group1.alignChildren = ["left", "center"];
    group1.spacing = 10;
    group1.margins = 0;

    var statictext4 = group1.add("statictext", undefined, undefined, { name: "statictext4" });
    statictext4.text = "如果点按钮没反应 可以粘贴该链接到浏览器打开";

    var edittext1 = group1.add('edittext {properties: {name: "edittext1"}}');
    edittext1.text = "https://www.bilibili.com/opus/799925547339612199?spm_id_from=333.999.0.0";


    dialog.show();
}


// applySwayYu();