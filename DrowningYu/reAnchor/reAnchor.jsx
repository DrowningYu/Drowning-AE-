#include "../utils.jsx"


function applyReAnchor(n) {
    var settings = getSettings();
    var selectedComp = getSelectedComp();

    var selectedLayers = getSelectedLayers();

    if (selectedLayers === null) {
        return;
    }
    for (var i = 0; i < selectedLayers.length; i++) {
        var layer = functionReAnchor(n, selectedLayers[i]);

    }
}


function functionReAnchor(n, layer) {
    if (layer instanceof ShapeLayer) {
        alert("当前图层是形状图层");
        alert("形状图层还没写")
        var w = layer.width;
        var h = layer.height;
    
        return layer;
    } 




    var w = layer.width;
    var h = layer.height;
    var x = 0;
    var y = 0;
    var z = 0;

    switch (n) {
        case 1:
            x = 0;
            y = 0;
            break;
        case 2:
            x = 0;
            y = h / 2;
            break;
        case 3:
            x = 0;
            y = h;
            break;
        case 4:
            x = w / 2;
            y = 0;
            break;
        case 5:
            x = w / 2;
            y = h / 2;
            break;
        case 6:
            x = w / 2;
            y = h;
            break;
        case 7:
            x = w;
            y = 0;
            break;
        case 8:
            x = w;
            y = h / 2;
            break;
        case 9:
            x = w;
            y = h;
            break;
        default:
            alert("操作指令错误")
            return;
    }

    var ox = layer.anchorPoint.value[0];
    var oy = layer.anchorPoint.value[1];
    var px = layer.position.value[0];
    var py = layer.position.value[1];
    var sx = layer.scale.value[0];
    var sy = layer.scale.value[1];


    if (is3DLayer(layer)) {
        var oz = layer.anchorPoint.value[2];
        var pz = layer.position.value[2];
        var sz = layer.scale.value[2];

        var rx=layer.xRotation.value;
        var ry=layer.yRotation.value;
        var rz=layer.zRotation.value;
        

        var orx=layer.orientation.value[0]* Math.PI / 180;
        var ory=layer.orientation.value[1]* Math.PI / 180;
        var orz=layer.orientation.value[2]* Math.PI / 180;
        



    
        // 更新锚点位置
        layer.anchorPoint.setValue([x, y, z]);
    
        // 将旋转角度转换为弧度
        var radiansX = rx * Math.PI / 180;
        var radiansY = ry * Math.PI / 180;
        var radiansZ = rz * Math.PI / 180;
    
        // 计算缩放和旋转后的偏移量
        var dx = (x - ox) * sx / 100;
        var dy = (y - oy) * sy / 100;
        var dz = (z - oz) * sz / 100;
    
        // // 计算绕 Z 轴旋转的变换
        // var rotatedX = dx * Math.cos(radiansZ) - dy * Math.sin(radiansZ);
        // var rotatedY = dx * Math.sin(radiansZ) + dy * Math.cos(radiansZ);
    
        // // 计算绕 Y 轴旋转的变换
        // var rotatedZ = dz * Math.cos(radiansY) - rotatedX * Math.sin(radiansY);
        // rotatedX = dz * Math.sin(radiansY) + rotatedX * Math.cos(radiansY);
    
        // // 计算绕 X 轴旋转的变换
        // var finalY = rotatedY * Math.cos(radiansX) - rotatedZ * Math.sin(radiansX);
        // var finalZ = rotatedY * Math.sin(radiansX) + rotatedZ * Math.cos(radiansX);
    
        var finalList=transPosition(radiansX,radiansY,radiansZ,dx,dy,dz);

        var finalList=transPosition(orx,ory,orz,finalList[0],finalList[1],finalList[2]);


        finalList=[finalList[0]+px,finalList[1]+py,finalList[2]+pz];





        // 设置新位置，使图层位置保持相对不变
        layer.position.setValue(finalList);

    }
    else {
        var r = layer.rotation.value;

        layer.anchorPoint.setValue([x, y]);
        var xx = sx / 100 * (x - ox);
        var yy = sy / 100 * (y - oy);





        // 将旋转角度转换为弧度
        var radians = r * Math.PI / 180;

        // 计算旋转后新锚点的偏移量
        var dx = (x - ox) * sx / 100;
        var dy = (y - oy) * sy / 100;

        // 应用旋转矩阵转换偏移量
        var xx = dx * Math.cos(radians) - dy * Math.sin(radians);
        var yy = dx * Math.sin(radians) + dy * Math.cos(radians);


        layer.position.setValue([px + xx, py + yy])
    }
    return layer;



}

function transPosition(rx,ry,rz,dx,dy,dz){
    

    // 计算绕 Z 轴旋转的变换
    var rotatedX = dx * Math.cos(rz) - dy * Math.sin(rz);
    var rotatedY = dx * Math.sin(rz) + dy * Math.cos(rz);

    // 计算绕 Y 轴旋转的变换
    var rotatedZ = dz * Math.cos(ry) - rotatedX * Math.sin(ry);
    rotatedX = dz * Math.sin(ry) + rotatedX * Math.cos(ry);


    // 计算绕 X 轴旋转的变换
    var finalY = rotatedY * Math.cos(rx) - rotatedZ * Math.sin(rx);
    var finalZ = rotatedY * Math.sin(rx) + rotatedZ * Math.cos(rx);


    return [rotatedX,finalY,finalZ];
}
