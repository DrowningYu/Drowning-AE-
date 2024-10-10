

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









function utilsTest() {
    alert("utilsTest");
}























// 示例调用
// var activeComp = checkActiveComp();
// var selectedProjectItem = checkSelectedProjectItem();
// var selectedLayer = checkSelectedLayer();
// var selectedProperty = checkSelectedProperty();