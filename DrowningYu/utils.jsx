

function createSettings(){
    var settings=
    {
        "menu":0,
        "createNull": {
            "isNullCenter": false,
            "cameraSettings": 0,
        },
        "lyricYu": {
            "isTranslation": true,
            "compFrame": "30",
        },
    };

    return settings;
}




// 判断用户是否选中合成
function getSelectedComp() {
    if (app.project.activeItem && app.project.activeItem instanceof CompItem) {
        return app.project.activeItem; // 返回选中的合成
    } else {
        alert("请选中一个合成");
        return null; // 返回空
    }
}

// 判断用户是否选中图层
function getSelectedLayers() {
    var comp = getSelectedComp(); // 检查合成
    if (comp) {
        var layers = comp.selectedLayers;
        if (layers.length > 0) {
            return layers; // 返回选中的图层
        } else {
            alert("请选中合成中的一个图层");
            return null; // 返回空
        }
    }
    return null; // 返回空
}
//获取当前AE语言
function getLanguageSetting() {
    var languageCode = app.isoLanguage; // 获取 AE 的语言代码
    // alert(languageCode);
    if (languageCode === "zh_CN") {
        return 1; // 中文
    } else if (languageCode === "en_US") {
        return 2; // 英文
    } else {
        return 0; // 其他语言
    }
}

function isAEVersion(targetVersion, alterText) {
    // 获取当前 AE 的版本号（例如 "17.5.1"）
    var aeVersionString = app.version;
    // alert(aeVersionString);
    // 截取前两个数字（主版本和次版本），并转换为数值
    var aeVersion = parseFloat(aeVersionString.substring(0, 2));
    // alert(aeVersion);
    // 比较当前版本和目标版本
    if (aeVersion >= targetVersion) {
        return true; // 当前版本符合要求
    } else {
        if (alterText && alterText !== "") {
            alert(alterText); // 显示提示文本
        }
        return false; // 当前版本低于目标版本
    }
}

function applyPresetToLayer(layer, presetFileName) {

    var scriptFilePath = File($.fileName).path;
    
    // 组合预设文件的完整路径
    var presetFilePath = scriptFilePath + "/" + presetFileName;
    // 检查文件是否存在
    // alert(presetFilePath);
    var presetFile = new File(presetFilePath);
    if (!presetFile.exists) {
        alert("预设文件不存在: " + presetFilePath);
        return;
    }

    // 应用预设
    app.beginUndoGroup("Apply Preset");
    try {
        layer.applyPreset(presetFile);
        // alert("成功应用预设: " + presetFileName);
    } catch (e) {
        alert("应用预设时出错: " + e.toString());
    }
    app.endUndoGroup();
}

function aalert(data){
    alert(data);
}





function creatFolder(rootPath, newFolderName, alertFlag) {
    try {
        if (rootPath.charAt(0) !== "/") {
            rootPath = rootPath.replace(/\\/g, "/");
            rootPath = "/" + rootPath.replace(":", "");
        }
    }
    catch (error) {
        alert(error);
        alert(rootPath + "路径转换有误");
    }
    var rootFolder = new Folder(rootPath);
    var newFolderPath = rootPath + "/" + newFolderName;
    var newFolder = new Folder(newFolderPath);
    if (newFolder.exists) {
        // alert(newFolderName+"已存在");
    }
    else {
        newFolder.create();
        if (alertFlag) {
            alert(newFolderPath + "目录已创建");
        }
    }
    return newFolderPath;
}



function cleanFilesInFolder(path) {
    // 定义 temp 文件夹路径
    var folder = new Folder(path);
    
    // 检查 temp 文件夹是否存在
    if (!folder.exists) {
        alert(path+"目录不存在:");
        return;
    }
    // 获取 temp 文件夹中的所有文件
    var files = folder.getFiles();
    // 遍历并删除所有文件
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        // 检查是否是文件（而不是文件夹）
        if (file instanceof File) {
            var success = file.remove(); // 删除文件
            if (!success) {
                alert("无法删除文件: " + file.fsName);
            }
        }
    }
    // alert("Temp 文件夹中的所有文件已被清除。");
}









function utilsTest() {
    alert("utilsTest");
}




function is3DLayer(layer){
    var flag=false;
    if(layer.threeDLayer){
        // alert("3Dtuceng")
        flag=true;
    }
    if(layer.matchName === "ADBE Light Layer"){
        alert("light");
        flag=true;
    }
    if(layer.matchName === "ADBE Camera Layer"){
        alert("camera");
        flag=true;
    }
    return flag;
}

// 读取 settings.json 文件并返回 JSON 对象
function getSettings() {
    var scriptFile = new File($.fileName);
    var scriptFolder = scriptFile.parent;
    scriptFile.close();
    var settingsPath =scriptFolder.fullName + '/settings.json';
    var filePath = File(settingsPath); 
    if (!filePath.exists) {
        alert("settings.json 文件不存在 进行创建");
        var data=createSettings();
        saveSettings(data);
        return data;
    }

    try {
        filePath.open("r");           // 打开文件以读取模式
        var fileContent = filePath.read(); // 读取文件内容
        filePath.close();              // 关闭文件
        var jsonContent = JSON.parse(fileContent); // 将字符串转换为 JSON 对象
        return jsonContent;
    } catch (e) {
        //alert("settings.json文件内容错误：" + e.message);
        //alert("重新创建settings.json");
        var data=createSettings();
        saveSettings(data);
        return data;
    }
}

// 将 JSON 对象保存到 settings.json 文件中
function saveSettings(settings) {
    var scriptFile = new File($.fileName);
    var scriptFolder = scriptFile.parent;
    scriptFile.close();
    var settingsPath =scriptFolder.fullName + '/settings.json';
    var filePath = File(settingsPath);  // 设置文件路径，这里放在桌面上
    try {
        var jsonString = JSON.stringify(settings, null, 4); // 将 JSON 对象转换为字符串
        filePath.open("w");               // 以写入模式打开文件
        filePath.write(jsonString);       // 写入 JSON 字符串
        filePath.close();                 // 关闭文件
        // alert("设置已保存至 settings.json 文件");
    } catch (e) {
        //alert("写入文件时发生错误：" + e.message);
    }
}




function integrateRotation(layer){

    function reValue(value){
        value=value%360;
        if(value<0){
            value+=360;
        }
        return value;
    }
    var ox=layer.property("Transform").property("Orientation").value[0];
    var oy=layer.property("Transform").property("Orientation").value[1];
    var oz=layer.property("Transform").property("Orientation").value[2];
    var rx=layer.property("Transform").property("X Rotation").value;
    var ry=layer.property("Transform").property("Y Rotation").value;
    var rz=layer.property("Transform").property("Z Rotation").value;
    rx=rx%360;
    ry=ry%360;
    rz=rz%360;
    var nox=reValue(ox+rx);
    var noy=reValue(oy+ry);
    var noz=reValue(oz+rz);
    alert(ox+" "+oy+" "+oz);
    alert(rx+" "+ry+" "+rz);
    alert(nox+" "+noy+" "+noz);
    layer.property("Orientation").setValue([0,0,0]);
    layer.property("X Rotation").setValue(nox);
    layer.property("Y Rotation").setValue(noy);
    layer.property("Z Rotation").setValue(noz);
    return layer;
}


function integrateOrientation(layer) {
    // 获取当前的 Orientation 和 Rotation 值
    var orientation = layer.property("Transform").property("Orientation").value;
    var rx = layer.property("Transform").property("X Rotation").value;
    var ry = layer.property("Transform").property("Y Rotation").value;
    var rz = layer.property("Transform").property("Z Rotation").value;

    // 将 Rotation 和 Orientation 合并成新的 Orientation
    // 创建 Rotation 的四元数
    var rotationQuat = quaternionFromEuler(rx, ry, rz);
    var orientationQuat = quaternionFromEuler(orientation[0], orientation[1], orientation[2]);

    // 合并两个四元数
    var newOrientationQuat = multiplyQuaternions(rotationQuat, orientationQuat);

    // 将合并后的四元数转换为欧拉角（新的 Orientation）
    var newOrientation = eulerFromQuaternion(newOrientationQuat);

    // 设置新的 Orientation 并将 Rotation 设为 0
    layer.property("Transform").property("Orientation").setValue(newOrientation);
    layer.property("Transform").property("X Rotation").setValue(0);
    layer.property("Transform").property("Y Rotation").setValue(0);
    layer.property("Transform").property("Z Rotation").setValue(0);

    return layer;
}

// 辅助方法：从欧拉角计算四元数
function quaternionFromEuler(x, y, z) {
    var c1 = Math.cos(x / 2);
    var s1 = Math.sin(x / 2);
    var c2 = Math.cos(y / 2);
    var s2 = Math.sin(y / 2);
    var c3 = Math.cos(z / 2);
    var s3 = Math.sin(z / 2);

    return [
        s1 * c2 * c3 + c1 * s2 * s3, // x
        c1 * s2 * c3 - s1 * c2 * s3, // y
        c1 * c2 * s3 + s1 * s2 * c3, // z
        c1 * c2 * c3 - s1 * s2 * s3  // w
    ];
}

// 辅助方法：四元数相乘
function multiplyQuaternions(q1, q2) {
    return [
        q1[3] * q2[0] + q1[0] * q2[3] + q1[1] * q2[2] - q1[2] * q2[1],
        q1[3] * q2[1] - q1[0] * q2[2] + q1[1] * q2[3] + q1[2] * q2[0],
        q1[3] * q2[2] + q1[0] * q2[1] - q1[1] * q2[0] + q1[2] * q2[3],
        q1[3] * q2[3] - q1[0] * q2[0] - q1[1] * q2[1] - q1[2] * q2[2]
    ];
}

// 辅助方法：从四元数计算欧拉角
function eulerFromQuaternion(q) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var t0 = 2 * (w * x + y * z);
    var t1 = 1 - 2 * (x * x + y * y);
    var X = Math.atan2(t0, t1);

    var t2 = 2 * (w * y - z * x);
    t2 = t2 > 1 ? 1 : t2 < -1 ? -1 : t2;
    var Y = Math.asin(t2);

    var t3 = 2 * (w * z + x * y);
    var t4 = 1 - 2 * (y * y + z * z);
    var Z = Math.atan2(t3, t4);

    return [X * (180 / Math.PI), Y * (180 / Math.PI), Z * (180 / Math.PI)];
}


// 编码函数：将文本转换为十六进制字符串
function encodeText(input) {
    var encoded = "";
    for (var i = 0; i < input.length; i++) {
        var hex = input.charCodeAt(i).toString(16);
        encoded += ("0000" + hex).slice(-4); // 确保长度为4的十六进制数
    }
    return encoded;
}

// 解码函数：将十六进制字符串转换回文本
function decodeText(encoded) {
    var decoded = "";
    for (var i = 0; i < encoded.length; i += 4) {
        var hex = encoded.substr(i, 4);
        decoded += String.fromCharCode(parseInt(hex, 16));
    }
    return decoded;
}








// 示例调用
// var activeComp = checkActiveComp();
// var selectedProjectItem = checkSelectedProjectItem();
// var selectedLayer = checkSelectedLayer();
// var selectedProperty = checkSelectedProperty();
