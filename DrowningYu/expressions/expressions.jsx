#include "../utils.jsx"

function renderTab2(tab2){
    // 获取当前脚本目录中的所有 .txt 文件

    var group1 = tab2.add("group", undefined, {name: "group1"}); 
    group1.orientation = "row"; 
    group1.alignChildren = ["left","center"]; 
    group1.spacing = 10; 
    group1.margins = 0; 


    var dropdown1 = group1.add("dropdownlist", undefined, undefined, { name: "dropdown1", items: []});
    dropdown1.selection = -1; 

    dropdown1.size=[150,25]

    var buttonNew = group1.add("button", undefined, undefined, {name: "buttonNew"}); 
    buttonNew.text = "新建"; 

    buttonNew.onClick = function () {
        var newTitle = createNewExpression()
        // alert(newTitle);
        reload(dropdown1,newTitle,-1);
        edittext1.text="记得保存"
        edittextPp.text="";
    };









    var statictext2 = group1.add("statictext", undefined, undefined, {name: "statictext2"}); 
    statictext2.text = "表达式名称"; 

    var edittext2 = group1.add('edittext {size: [120,25],properties: {name: "edittext1"}}'); 
    edittext2.text = "EditText"; 

    reload(dropdown1,null,-1);



    // 添加多行编辑框
    var edittext1 = tab2.add('edittext {size: [450,250], properties: {name: "edittext1", multiline: true}}');
    edittext1.text = "请选择一个表达式文件";


    var group4 = tab2.add("group", undefined, {name: "group2"}); 
    group4.orientation = "row"; 
    group4.alignChildren = ["left","center"]; 
    group4.spacing = 10; 
    group4.margins = 0; 


    var buttonGetPp = group4.add("button", undefined, undefined, {name: "buttonGetPp"}); 
    buttonGetPp.text = "获取将应用的属性"; 



    var edittextPp = group4.add('edittext {size:[300,25],properties: {name: "edittextPp"}}'); 
    edittextPp.text = ""; 

    buttonGetPp.onClick=function(){
        var pps = getLayerExpressionPaths();
        // alert(pps);
        edittextPp.text=pps;
    }






    // 创建按钮组
    var group2 = tab2.add("group", undefined, { name: "group1" });
    group2.orientation = "row";
    group2.alignChildren = ["left", "center"];
    group2.spacing = 10;
    group2.margins = 0;


    var button1 = group2.add("button", undefined, undefined, { name: "button1" });
    button1.text = "保存";
    button1.onClick = function () {
        var selectedFile = dropdown1.selection ? dropdown1.selection.text : null;
        var newTitle = saveExpression(selectedFile, edittext1.text,edittext2.text,edittextPp.text);
        reload(dropdown1,newTitle,-1);
        edittext2.text=newTitle;
    };
    
    var button2 = group2.add("button", undefined, undefined, { name: "button2" });
    button2.text = "删除";
    button2.onClick = function () {
        var selectedFile = dropdown1.selection ? dropdown1.selection.text : null;
        deleteExpression(selectedFile);
        reload(dropdown1,null,-1);
        edittextPp.text="";
    };
    

    var button3 = group2.add("button", undefined, undefined, { name: "button3" });
    button3.text = "应用";

    button3.onClick = function () {
        applyExpression(edittextPp.text,edittext1.text);
    };


    var buttonHelp = group2.add("button", undefined, undefined, { name: "buttonHelp" });
    buttonHelp.text = "?";
    buttonHelp.size = [25, 25]; // 设置帮助按钮大小
    buttonHelp.onClick = function () {
        helpExpression();
    };



    // 为 dropdown1 添加事件监听器，当选择更改时，加载对应文件的内容
    dropdown1.onChange = function () {
        var selectedFile = dropdown1.selection;
        if (selectedFile !== "没有找到文件") {
            edittext1.text = readTextFile(selectedFile,'/');
        }
        edittext2.text=String(dropdown1.selection);
        edittextPp.text=readTextFile(selectedFile,'/propertiyPath/');
    };

    return tab2;
}


function helpExpression(){
        // alert("helpLyricYu");
        var dialog = new Window("dialog");
        dialog.text = "帮助";
        dialog.orientation = "column";
        dialog.alignChildren = ["center", "top"];
        dialog.spacing = 10;
        dialog.margins = 16;
    
        // dialog.location = [100, 100];
        var statictext6 = dialog.add("statictext", undefined, undefined, { name: "statictext6" });
        statictext6.text = "该功能可以同时批量运用多个图层的多个属性的表达式";
    
        var statictext1 = dialog.add("statictext", undefined, undefined, { name: "statictext1" });
        statictext1.text = "对于选中的图层 如果选中了其中的某些属性 则会优先给选中的属性应用表达式";
    
        var statictext2 = dialog.add("statictext", undefined, undefined, { name: "statictext2" });
        statictext2.text = "对于选中的图层 如果没有选中该图层的任何属性 则会根据获取的属性路径给图层添加表达式";
    
        var statictext3 = dialog.add("statictext", undefined, undefined, { name: "statictext3" });
        statictext3.text = "点击该按钮跳转b站的视频介绍以及演示";
    
        var button1 = dialog.add("button", undefined, undefined, { name: "button1" });
        button1.text = "bilibili/[AE脚本] 表达式管理_批量应用";
        button1.onClick = function () {
            var command = 'explorer https://www.bilibili.com/video/BV17bUNYuEYP/';
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
        edittext1.text = "https://www.bilibili.com/video/BV17bUNYuEYP/";
    
    
        dialog.show();
}



function applyExpression(path,content){
    var activeComp = app.project.activeItem;
    if (!activeComp || !(activeComp instanceof CompItem)) {
        alert("请确保您已打开一个合成。");
        return "";
    }
    if(path==""){
        alert("无属性路径 点击获取按钮 即可获取将应用的属性");
    }
    var pathList=path.split('&&');
    var alertText="";
    var selectedLayers = activeComp.selectedLayers;

    for(var i=0;i<selectedLayers.length;i++){
        var layer=selectedLayers[i];
        if(layer.selectedProperties.length>0){
            for(var j=0;j<layer.selectedProperties.length;j++){
                var property=layer.selectedProperties[j];
                if(property.canSetExpression){
                    property.expression=content;
                }
                else{
                    alertText=alertText+layer.name+"图层的"+property.name+'''属性 不能设置表达式
''';
                }
            }
        }
        else{
            for (var j = 0; j < pathList.length; j++) {
                var curPath = pathList[j];
                var propertyNames = curPath.split(".");
                var targetProperty=layer;
                for (var k = 0; k < propertyNames.length; k++) {
                    targetProperty = targetProperty[propertyNames[k]];
                    if (targetProperty === undefined) {
                        break;
                    }
                }
                if (targetProperty && targetProperty.canSetExpression) {
                    targetProperty.expression = content;
                } else {
                    alertText += layer.name + "图层的属性路径" + curPath + '''无效
''';
                }
            }
        }
    }
    if(alertText!=""){
        alert(alertText);
    }

}


function getLayerExpressionPaths() {
    // 检查是否有选中图层
    var activeComp = app.project.activeItem;
    if (!activeComp || !(activeComp instanceof CompItem)) {
        alert("请确保您已打开一个合成。");
        return "";
    }

    var selectedLayers = activeComp.selectedLayers;
    if (selectedLayers.length !== 1) {
        alert("请选中一个图层。");
        return "";
    }

    var layer = selectedLayers[0];
    var expressionPaths = "";
    var num = 0;


    // 遍历选中图层的所有属性
    for (var i = 0; i < layer.selectedProperties.length; i++) {
        var property = layer.selectedProperties[i];

        // 检查属性是否可以设置表达式
        if (property.canSetExpression) {
            var propertyPath = getPropertyPath(property);

            if (num == 0) {
                expressionPaths += propertyPath;
            } else {
                expressionPaths += "&&" + propertyPath;
            }
            num++;
        } else {
            alert(property.name + " 不能设置表达式");
        }
    }
if(num==0){
    alert("请选中图层的一个或者多个属性")
}

    return expressionPaths;
}

// 递归函数：获取属性的完整路径
function getPropertyPath(property) {
    var path = property.name;
    var parentProp = property.parentProperty;

    // 递归获取父级属性的路径
    while (parentProp && parentProp.parentProperty !== null) {
        path = parentProp.name + "." + path;
        parentProp = parentProp.parentProperty;
    }

    return path;
}



function reload(dropdown, edittext, index) {

    // 获取 .txt 文件列表
    var newList = getTxtFilesInDirectory();
    dropdown.removeAll();

    // 填充 dropdown 的内容
    for (var i = 0; i < newList.length; i++) {
        dropdown.add('item', String(newList[i]));
    }

    // 如果 edittext 不为空，则查找匹配的项
    if (edittext !== null) {
        var foundIndex = -1;
        var j=0;
        for ( j = 0; j < newList.length; j++) {

            if (newList[j] === edittext) {
                foundIndex = j;
                break;
            }
        }

        // 设置 dropdown.selection 为匹配项的索引
        if (foundIndex !== -1) {
            dropdown.selection = foundIndex;
        } else {
            dropdown.selection = -1; // 如果没有匹配项，则不选择
        }
    }
}

// 获取当前目录中的所有 .txt 文件
function getTxtFilesInDirectory() {
    var folderPath = new Folder($.fileName).parent;
    var files = folderPath.getFiles("*.txt");
    var txtFiles = [];
    for (var i = 0; i < files.length; i++) {
        txtFiles.push(decodeText(files[i].name.replace('.txt', '')));
    }
    return txtFiles;
}

// 读取选中的 .txt 文件的内容
function readTextFile(fileName,addText) {
    var scriptFile = new File($.fileName);
    var scriptFolder = scriptFile.parent;
    var filePath=scriptFolder.fullName  +addText+encodeText(String(fileName))+'.txt';
    var file = new File(filePath);
    if (file.exists) {
        file.open("r");
        var content = file.read();
        file.close();
        return decodeText(content);
    }
    return "文件内容为空";
}

function createNewExpression() {
    var scriptFolder = new Folder($.fileName).parent;
    var fileName = prompt("请输入新建表达式的文件名（不包含.txt扩展名）：", "newExpression");
    if (fileName) {
        var newFile = new File(scriptFolder.fullName + '/' + encodeText(fileName)+'.txt' );
        if (newFile.exists) {
            alert("文件已存在！");
        } else {
            newFile.open("w");
            newFile.write("// 在这里输入您的表达式内容");
            newFile.close();
            alert("文件创建成功！");
        }
        newFile = new File(scriptFolder.fullName + '/propertiyPath/'+ encodeText(fileName)+'.txt' );
        if (newFile.exists) {
            alert("文件已存在！");
        } else {
            newFile.open("w");
            newFile.close();
            return fileName
        }

    }
}



function saveExpression(fileName, content, title,pathContent) {
    // 检查是否选择了有效的文件
    if (!fileName || fileName === "没有找到文件") {
        alert("请选择一个表达式文件！");
        return;
    }
//Content
    var scriptFolder = new Folder($.fileName).parent;
    var oldFilePath = scriptFolder.fullName + '/' + encodeText(String(fileName))+'.txt';
    var oldFile = new File(oldFilePath);

    // 检查旧文件是否存在
    if (!oldFile.exists) {
        alert("文件不存在！");
        return;
    }

    // 创建新的文件路径（重命名）
    var newFilePath = scriptFolder.fullName + '/' + encodeText(String(title)) + '.txt';
    var newFile = new File(newFilePath);

    // 如果新文件存在，则覆盖
    if (newFile.exists) {
        newFile.open("w"); // 直接打开文件进行覆盖
    } else {
        // 如果新文件不存在，则重命名旧文件
        var isRenamed = oldFile.rename(newFilePath);
        if (!isRenamed) {
            alert("文件重命名失败！");
            return;
        }
        newFile = new File(newFilePath);
        newFile.open("w"); // 打开文件进行写入
    }

    // 写入新内容
    newFile.write(encodeText(content));
    newFile.close();







//Path
    scriptFolder = new Folder($.fileName).parent;
    oldFilePath = scriptFolder.fullName + '/propertiyPath/' + encodeText(String(fileName))+'.txt';
    oldFile = new File(oldFilePath);

    // 检查旧文件是否存在
    if (!oldFile.exists) {
        alert("文件不存在！");
        return;
    }

    // 创建新的文件路径（重命名）
    newFilePath = scriptFolder.fullName + '/propertiyPath/' + encodeText(String(title)) + '.txt';
    newFile = new File(newFilePath);

    // 如果新文件存在，则覆盖
    if (newFile.exists) {
        newFile.open("w"); // 直接打开文件进行覆盖
    } else {
        // 如果新文件不存在，则重命名旧文件
        var isRenamed = oldFile.rename(newFilePath);
        if (!isRenamed) {
            alert("文件重命名失败！");
            return;
        }
        newFile = new File(newFilePath);
        newFile.open("w"); // 打开文件进行写入
    }

    // 写入新内容
    newFile.write(encodeText(pathContent));
    newFile.close();




    alert("文件已保存！");
    return title;
}


function deleteExpression(fileName) {
    if (!fileName || fileName === "没有找到文件") {
        alert("请选择要删除的表达式文件！");
        // return;
    }

    var confirmDelete = confirm("确定要删除文件 '" + fileName + "' 吗？");
    if (!confirmDelete) return;

    var scriptFolder = new Folder($.fileName).parent;
    var filePath = scriptFolder.fullName + '/' + encodeText(String(fileName))+'.txt';
    var file = new File(filePath);

    if (file.exists) {
        file.remove();
        // alert("文件已删除！");
        // reload(dropdown1); // 重新加载下拉菜单
    } else {
        alert("文件不存在！");
    }

    filePath = scriptFolder.fullName + '/propertiyPath/' + encodeText(String(fileName))+'.txt';
    file = new File(filePath);

    if (file.exists) {
        file.remove();
        // alert("文件已删除！");
        // reload(dropdown1); // 重新加载下拉菜单
    } else {
        // alert("文件不存在！");
    }
}