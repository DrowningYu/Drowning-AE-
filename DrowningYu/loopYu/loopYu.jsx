#include "../utils.jsx"
#include "expression.jsx"

function applyLoopYu() {
    // alert("applyLoopYu");
    if (!isAEVersion(17, "此功能要求AE版本不低于2020 因为之前版本没有下拉菜单控件")) {
        return;
    }
    var selectedComp = getSelectedComp();
    if (selectedComp === null) return; // 如果返回 null，则结束方法
    if (getSelectedLayersCount() !== 1 || getSelectedPropertiesCount() !== 1) {
        alert("你选中了" + getSelectedLayersCount() + "个图层" + getSelectedPropertiesCount() + "个属性" + "   只能选中1个图层的1个属性");
        return;
    }
    var selectedLayer = getSelectedLayers()[0];
    var selectedProperty = selectedLayer.selectedProperties[0];
    if (!selectedProperty.canSetExpression) {
        alert("该属性不能打关键帧");
        return;
    }
    if (selectedProperty.numKeys < 2) {
        alert("请打两个以上的关键帧");
        return;
    }
    // alert("所有检查通过，可以继续执行后续操作。");

    // 创建空对象
    var conLayer = selectedComp.layers.addNull();
    conLayer.name = selectedLayer.name + "_" + selectedProperty.name + "_Con"; // 替换为你想要的名称


    var effect = conLayer.property("ADBE Effect Parade").addProperty("ADBE Dropdown Control"); //添加下拉菜单控件

    var dropdownItems = [];
    for (var i = 1; i < selectedProperty.numKeys; i++) { // 从 1 开始，到 numKeys - 1
        dropdownItems.push("Item " + i); // 根据需要生成项目名称
    }

    effect.property(1).setPropertyParameters(dropdownItems);

    var effectNew=conLayer.property("ADBE Effect Parade").property(1);

    var languageSetting = getLanguageSetting();
    var menuName="";
    if (languageSetting === 1) {
        // alert("1");
        effectNew.name = '区间选择'; // 修改效果名称
        menuName="菜单";

    } else {
        
        effectNew.name  = 'Interval Picker';
        menuName="Menu";
    }
    var effectName=effectNew.name;

    effectNew.property(1).setValueAtTime(0, 1); // 在时间 j+1 处设置该选项的值

    applyPresetToLayer(conLayer, "loopYu/FramePickerSettings.ffx"); 

    effectSettings=conLayer.property("ADBE Effect Parade").property(2);

    effectSettings.property("Playback Mode").setValueAtTime(0, 1);
    effectSettings.property("Single Frame Picker").setValueAtTime(0, 0);


    effectSettings.property("Single Frame Picker").setInterpolationTypeAtKey(1, KeyframeInterpolationType.HOLD, KeyframeInterpolationType.HOLD);

    var expressionText=getexPressionText();

    var preExpression = '''var inputCon1=thisComp.layer("''' + conLayer.name +'''").effect("''' + effectName + '''")("'''+menuName+'''");
var inputCon2=thisComp.layer("''' + conLayer.name + '''").effect("Frame Picker Settings")("Playback Mode");
var inputCon3=thisComp.layer("''' + conLayer.name + '''").effect("Frame Picker Settings")("Single Frame Picker");
    ''';
    


    selectedProperty.expression=preExpression+expressionText;


}

function helpLoopYu() {
    var dialog = new Window("dialog");
    dialog.text = "帮助";
    dialog.orientation = "column";
    dialog.alignChildren = ["center", "top"];
    dialog.spacing = 10;
    dialog.margins = 16;

    var statictext1 = dialog.add("statictext", undefined, undefined, { name: "statictext1" });
    statictext1.text = "功能介绍：该功能可以对选定图层的选定属性的关键帧进行绑定 并重复调用";

    var statictext2 = dialog.add("statictext", undefined, undefined, { name: "statictext2" });
    statictext2.text = "使用教程：选中一个图层的一个属性(该属性拥有多个关键帧)然后点击应用";

    var statictext3 = dialog.add("statictext", undefined, undefined, { name: "statictext3" });
    statictext3.text = "点击该按钮跳转b站的视频介绍以及演示";

    var button1 = dialog.add("button", undefined, undefined, { name: "button1" });
    button1.text = "bilibili/[AE表达式] 关键帧区间循环播放选择器 帧选择器";
    button1.onClick = function () {
        var command = 'explorer https://www.bilibili.com/video/BV1LV25YWEJn/';
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
    edittext1.text = "https://www.bilibili.com/video/BV1LV25YWEJn/";


    dialog.show();
}



//获取用户选中的图层数量
function getSelectedLayersCount() {
    var comp = getSelectedComp(); // 检查合成
    if (comp) {
        var selectedLayers = comp.selectedLayers; // 获取选中的图层
        var count = selectedLayers.length; // 统计选中的图层数量
        return count; // 返回选中的图层数量
    }
    return 0; // 如果没有合成，返回 0
}

// 获取用户选中的属性数量
function getSelectedPropertiesCount() {
    var layers = getSelectedLayers(); // 检查图层
    var num = 0;
    for (var i = 0; i < layers.length; i++) {
        var selectedProperties = layers[i].selectedProperties; // 获取选中的属性
        num += selectedProperties.length
    }
    return num; // 如果没有选中图层，返回 0
}



function loopYuTest() {
    alert("loopYuTest");
}






// applyLoopYu();