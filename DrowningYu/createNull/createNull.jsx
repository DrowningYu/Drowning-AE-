#include "../utils.jsx"
#include "../reAnchor/reAnchor.jsx"

function applyCreateNull() {
    var settings = getSettings();
    var selectedComp = getSelectedComp();

    var selectedLayers = getSelectedLayers();

    if (selectedLayers === null) {
        return;
    }






    // alert(selectedLayers[0].lightType);//聚光灯代码4413

    if (true) {
        for (var i = 0; i < selectedLayers.length; i++) {
            // 检查图层是否为 3D 图层
            if (selectedLayers[i].matchName === "ADBE Camera Layer" || (selectedLayers[0].matchName === "ADBE Light Layer" && selectedLayers[0].lightType === 4413)) {
                if (selectedLayers.length === 1) {
                    cameraLayer(selectedComp, selectedLayers[i], settings);
                    return;
                }
                else {
                    alert("相机只能单独绑定");
                    return;
                }

            }

        }

    }

    alert("无相机和聚光灯图层");


    if (selectedLayers.length === 1) {
        alert("singleLayer");
        var firstLayerType = is3DLayer(selectedLayers[0]);


        var sumX = 0.0;
        var sumY = 0.0;
        var sumZ = 0.0;
        var averageZ;

        // 检查图层是否为 3D 图层



        var positionProperty = selectedLayers[0].position;

        var currentPosition = positionProperty.value;

        sumX += currentPosition[0];
        sumY += currentPosition[1];

        if (firstLayerType) {
            sumZ += currentPosition[2];
        }



        var averageX = sumX / selectedLayers.length;
        var averageY = sumY / selectedLayers.length;

        if (firstLayerType) {
            var averageZ = sumZ / selectedLayers.length;
        }

        alert("singleLayer123");
        var nullLayer = functionAddNull(selectedComp,settings.createNull.isNullCenter);

        if (firstLayerType) {
            nullLayer.threeDLayer = true;
            nullLayer.position.setValue([averageX, averageY, averageZ]);
        }
        else {
            nullLayer.position.setValue([averageX, averageY]);
        }


        if (firstLayerType) {
            alert("3D单图层设置")
            nullLayer.xRotation.setValue(selectedLayers[0].xRotation.value);
            nullLayer.yRotation.setValue(selectedLayers[0].yRotation.value);
            nullLayer.zRotation.setValue(selectedLayers[0].zRotation.value);
            nullLayer.orientation.setValue(selectedLayers[0].orientation.value);
        }
        else {
            alert("2D单图层")
            nullLayer.rotation.setValue(selectedLayers[0].rotation.value);
        }


        selectedLayers[0].parent = nullLayer;
        return;




    }



    var firstLayerType = is3DLayer(selectedLayers[0]);

    alert(firstLayerType);

    var sumX = 0.0;
    var sumY = 0.0;
    var sumZ = 0.0;

    for (var i = 0; i < selectedLayers.length; i++) {
        // 检查图层是否为 3D 图层
        if (is3DLayer(selectedLayers[i])) {


            var positionProperty = selectedLayers[i].position;

            var currentPosition = positionProperty.value;

            sumX += currentPosition[0];
            sumY += currentPosition[1];
            if (firstLayerType) {
                sumZ += currentPosition[2];
            }

            continue;

        } else {
            alert("2D和3D图层不能混选");
            return;
        }
    }

    var averageX = sumX / selectedLayers.length;
    var averageY = sumY / selectedLayers.length;

    if (firstLayerType) {
        var averageZ = sumZ / selectedLayers.length;
    }


    var nullLayer = functionAddNull(selectedComp,settings.createNull.isNullCenter);
    if (firstLayerType) {
        nullLayer.threeDLayer = true;
        nullLayer.position.setValue([averageX, averageY, averageZ]);
    }
    else {
        nullLayer.position.setValue([averageX, averageY]);
    }

    if (selectedLayers.length === 1) {
        if (firstLayerType) {
            alert("3D单图层设置")
            nullLayer.xRotation.setValue(selectedLayers[0].xRotation.value);
            nullLayer.yRotation.setValue(selectedLayers[0].yRotation.value);
            nullLayer.zRotation.setValue(selectedLayers[0].zRotation.value);
            nullLayer.orientation.setValue(selectedLayers[0].orientation.value);
        }
        else {
            alert("2D单图层")
            nullLayer.rotation.setValue(selectedLayers[0].rotation.value);
        }
    }

    for (var i = 0; i < selectedLayers.length; i++) {
        selectedLayers[i].parent = nullLayer;
    }
    // alert("1");
}
function helpCreateNull() {

    var settings = getSettings();


    var dialog = new Window("dialog");
    dialog.text = "更多";
    dialog.orientation = "column";
    dialog.alignChildren = ["center", "top"];
    dialog.spacing = 10;
    dialog.margins = 16;

    var statictext1 = dialog.add("statictext", undefined, undefined, { name: "statictext1" });
    statictext1.text = "该功能可以对选中图层生成控制空对象";

    var statictext2 = dialog.add("statictext", undefined, undefined, { name: "statictext2" });
    statictext2.text = "可以一次选中多个图层 脚本会对多图层求平均值";

    // PANEL1
    // ======
    var panel1 = dialog.add("panel", undefined, undefined, { name: "panel1" });
    panel1.text = "设置";
    panel1.orientation = "column";
    panel1.alignChildren = ["center", "top"];
    panel1.spacing = 10;
    panel1.margins = 10;

    var checkbox1 = panel1.add("checkbox", undefined, undefined, { name: "checkbox1" });
    checkbox1.text = "空对象锚点居中";
    checkbox1.value = settings.createNull.isNullCenter;
    // GROUP1
    // ======
    var group1 = panel1.add("group", undefined, { name: "group1" });
    group1.orientation = "row";
    group1.alignChildren = ["left", "center"];
    group1.spacing = 10;
    group1.margins = 0;

    var statictext3 = group1.add("statictext", undefined, undefined, { name: "statictext3" });
    statictext3.text = "摄像机和聚光灯绑定";

    var dropdown1_array = ["基于位置", "基于目标点", "基于位置和目标点"];
    var dropdown1 = group1.add("dropdownlist", undefined, undefined, { name: "dropdown1", items: dropdown1_array });
    dropdown1.selection = settings.createNull.cameraSettings;

    // PANEL1
    // ======
    var button1 = panel1.add("button", undefined, undefined, { name: "button1" });
    button1.text = "保存";
    button1.onClick = function () {

        settings.createNull.isNullCenter = checkbox1.value;
        settings.createNull.cameraSettings = dropdown1.selection.index;
        // alert(dropdown1.selection.index);
        // alert(settings.createNull.isNullCenter);
        // alert(settings.createNull.cameraSettings);
        saveSettings(settings);
        alert("保存成功");
    }
    dialog.show();

}


function cameraLayer(comp, layer, settings) {
    alert("cameraLayer绑定摄像机功能暂时不支持还没做完");
    return;
    if (settings.createNull.cameraSettings === 0) {//摄像机位置创建        alert(settings.createNull.cameraSettings);

        var nullLayer = functionAddNull(selectedComp,settings.createNull.isNullCenter);
        nullLayer.threeDLayer = true;
        nullLayer.position.setValue(layer.position.value);
        nullLayer.xRotation.setValue(layer.xRotation.value);
        nullLayer.yRotation.setValue(layer.yRotation.value);
        nullLayer.zRotation.setValue(layer.zRotation.value);
        alert(layer.orientation.value);
        nullLayer.orientation.setValue(layer.orientation.value);
        alert("123445")
        layer.xRotation.setValue(0);
        layer.yRotation.setValue(0);
        layer.zRotation.setValue(0);
        layer.orientation.setValue([0, 0, 0]);




        layer.parent = nullLayer;

    }
    else
        if (settings.createNull.cameraSettings === 1) {//目标点位置创建
            alert("2");
        }
        else
            if (settings.createNull.cameraSettings === 2) {//两个位置创建
                alert("3");
            }





    if (selectedLayers[0].matchName === "ADBE Camera Layer") {

    }
    return;
}


function functionAddNull(comp,flag){
    var nullLayer = comp.layers.addNull();
    if(flag){
        nullLayer = functionReAnchor(5,nullLayer);
    }
    return nullLayer;
}


// applyCreateNull();

