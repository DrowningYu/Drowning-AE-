
if (typeof blurValueInt === 'undefined' || typeof detailScaleInt === 'undefined'|| typeof normalYuPath === 'undefined'||typeof num === 'undefined'||typeof frameRate === 'undefined'|| typeof compName === 'undefined') {
    alert("该脚本只能通过MainNormalYu.jsx脚本在AE中启动 或 接受到的参数不全");
}

var tempPath=normalYuPath+"/temp";

mainFunction();


function mainFunction(){
    // var thisDoc = preOperation();//预处理：新建画布

    var outputPath=creatFolder(normalYuPath,compName,false);

    if(cycleOperation(outputPath)===0){//循环处理图片
        return 0;
    }

    postOperation(outputPath);//删除画布和启动AE脚本
}

function preOperation(){
    alert("preOperation");
    var imagePath = tempPath + "/00000.png";
    var imageInfo=getImageInfo(imagePath);
    var thisDoc = app.documents.add(imageInfo[0], imageInfo[1], 72, compName);
    alert("创建了新的画布，大小为: " + imageInfo[0] + "x" + imageInfo[1] + " 像素");
    return thisDoc;
}




function cycleOperation(outputPath){
    // alert("cycleOperation");
    var cycNum=num;
    
    for (var i = 0; i < cycNum; i++) {
        if(cycNum>100000){
            break;
        }
        var imagePath = tempPath + "/" + zeroPad(i, 5) + ".png";
        // alert("当前图片路径: " + imagePath);
        var imageFile = new File(imagePath);
        if (!imageFile.exists) {
            // alert("图片文件不存在: " + imagePath);
            cycNum++;
            continue;  // 如果文件不存在，跳过本次循环
        }
        var imageDoc = app.open(imageFile);


        if(applyNormalMapFilter()===0){
            return 0;
        }

        var newFileName = zeroPad(i, 5) + ".png";  // 例如 "00000.png", "00001.png" 等

        // 设置输出文件路径
        var outputFilePath = outputPath + "/" + newFileName;
        var outputFile = new File(outputFilePath);

        // 保存为 PNG 文件
        var pngSaveOptions = new PNGSaveOptions();
        pngSaveOptions.compression = 9;  // 设置压缩等级（0-9）

        // 保存图像到输出路径
        imageDoc.saveAs(outputFile, pngSaveOptions, true, Extension.LOWERCASE);
        // alert("保存图片至: " + outputFilePath);

        // 关闭文档，不保存更改
        imageDoc.close(SaveOptions.DONOTSAVECHANGES);
    }

}

function postOperation(outputPath){

    //清理temp临时文件
    cleanFilesInFolder(tempPath);


    // // 获取当前脚本文件的完整路径
    // var scriptFile = File($.fileName);
    // // 获取当前脚本所在的目录
    // var scriptFolder = scriptFile.parent;
    // var scriptFolderPath=scriptFolder.fsName;
    
    // if (BridgeTalk.isRunning("aftereffects")) {
    //     var bt02 = new BridgeTalk();
    //     var aeScriptFilePath=scriptFolderPath+"\\y_aeInput.jsx";
    //     var aeScriptFile = File(aeScriptFilePath); 
    //     aeScriptFile.open("r");
    //     var scriptCode = aeScriptFile.read();
    //     scriptFile.close();
    //     bt02.body = 'var frameRate = ' + frameRate + 
    //             ';\nvar outputPath = "' + outputPath +
    //             '";\nvar compName = "' + compName + '";\n'
    //             +scriptCode;
    //     bt02.target = "aftereffects";
    //     alert(bt02.body);

    //     bt02.send();
    //     // alert(result);
    // } else {
    //     alert("aftereffects未运行或不可用。");
    // }
}


function getImageInfo(imagePath){
    // 创建文件对象
    var imageFile = new File(imagePath);
    // 检查文件是否存在
    if (!imageFile.exists) {
        alert("文件不存在: " + imagePath);
        return;
    }
    // 打开图片文件
    var imageDoc = app.open(imageFile);
    // 获取图片的宽度和高度
    var imageWidth = imageDoc.width.as("px");
    var imageHeight = imageDoc.height.as("px");
    // 关闭打开的图片文档，不保存更改
    imageDoc.close(SaveOptions.DONOTSAVECHANGES);
    return [imageWidth,imageHeight];
}

function zeroPad(num, length) {//辅助函数：用于为文件名生成零填充的数字
    var str = '' + num;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}


function creatFolder(rootPath,newFolderName,alertFlag){
    try{
        if (rootPath.charAt(0) !== "/") {
            rootPath = rootPath.replace(/\\/g, "/");
            rootPath = "/" + rootPath.replace(":", "");
        }
    }
    catch(error){
        alert(error);
        alert(rootPath+"路径转换有误");
    }
    var rootFolder = new Folder(rootPath);
    var newFolderPath = rootPath+"/"+newFolderName;
    var newFolder = new Folder(newFolderPath);
    if(newFolder.exists){
        // alert(newFolderName+"已存在");
    }
    else{
        newFolder.create();
        if(alertFlag){
            alert(newFolderPath+"目录已创建");
        }
    }
    return newFolderPath;
}



function applyNormalMapFilter(){
    try{
        var idPly = charIDToTypeID( "Ply " );
        var desc339 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref15 = new ActionReference();
            var idActn = charIDToTypeID( "Actn" );
            ref15.putName( idActn, "generateNormalMap" );
            var idASet = charIDToTypeID( "ASet" );
            ref15.putName( idASet, "normalYu" );
        desc339.putReference( idnull, ref15 );
        executeAction( idPly, desc339, DialogModes.NO );
        return 1;
    }
    catch(error){
        // alert("在PS的Actions中未找到normalYu的generateNormalMap\n"+error);
        return 1;
    }
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



