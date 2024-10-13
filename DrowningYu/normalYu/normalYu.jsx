#include "../utils.jsx"
function applyNormalYu(){
    // alert("applyNormalYu");



    if(!BridgeTalk.isRunning("photoshop")){
        alert("该功能需要同时打开PS并进行一些设置才能正常工作 请点击右边的问号帮助查看更多");
        return;
    }



    var thisComp = app.project.activeItem;


    // 获取当前脚本文件的完整路径
    var scriptFile = File($.fileName);
    // 获取当前脚本所在的目录
    var scriptFolder = scriptFile.parent;
    
    var scriptFolderPath=scriptFolder.fsName;



    if (!(thisComp instanceof CompItem)) {
        alert("请选择一个合成。");
        return 0;
    } 

    

    //获取工程路径
    try{
        var projectPath = app.project.file.path;
        var projectFolder = new Folder(projectPath);
        projectPath = projectFolder.fsName;    
    }
    catch (error){
        alert(error);
        alert("开发者注:当前工程文件没有目录，请保存一下项目（该脚本会在工程目录旁生成相应素材文件夹）");
    }
    
    //创建脚本目录
    var normalYuPath=creatFolder(projectPath,"normalYu",true);
    //创建临时文件目录
    var tempPath=creatFolder(normalYuPath,"temp",false);
    cleanFilesInFolder(tempPath);

    //AE导出选中合成为PNG序列
    exportPNGs(thisComp,tempPath);

    var tempFolder=new Folder(tempPath);
    var tempData = tempFolder.getFiles();

    //运行PS脚本
    runScriptInPS(normalYuPath,tempData.length)


    // aeInput(normalYuPath);



}
function helpNormalYu(){
    // alert("helpNormalYu");

    var dialog = new Window("dialog");
    dialog.text = "帮助";
    dialog.orientation = "column";
    dialog.alignChildren = ["center", "top"];
    dialog.spacing = 10;
    dialog.margins = 16;

    var statictext1 = dialog.add("statictext", undefined, undefined, { name: "statictext1" });
    statictext1.text = "功能介绍：该功能通过PS里面的生成法线效果";

    var statictext2 = dialog.add("statictext", undefined, undefined, { name: "statictext2" });
    statictext2.text = "使用教程：同时开打AE和PS 在PS中设置好normalYu目录下的generateNormalMap的动作 选中AE中的一个合成点击运行即可";

    var statictext2 = dialog.add("statictext", undefined, undefined, { name: "statictext2" });
    statictext2.text = "运行过程：脚本会在工程文件目录新建文件夹 将当前合成导出 在PS中一帧一帧的处理 并重新导入AE";

    var statictext3 = dialog.add("statictext", undefined, undefined, { name: "statictext3" });
    statictext3.text = "设置讲不清楚 建议看视频";

    var button1 = dialog.add("button", undefined, undefined, { name: "button1" });
    button1.text = "bilibili/[AE脚本]PS批量生成法线图";
    button1.onClick = function () {
        var command = 'explorer https://www.bilibili.com/video/BV1LV25YWEJn?p=2';
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
    edittext1.text = "https://www.bilibili.com/video/BV1LV25YWEJn?p=2";


    dialog.show();

}




function runScriptInPS(normalYuPath,num){
    // var blurValueInt=parseInt(blurValue.text);
    // var detailScaleInt=parseInt(detailScale.text);

    var thisComp = app.project.activeItem;


    // 获取当前脚本文件的完整路径
    var scriptFile = File($.fileName);
    // 获取当前脚本所在的目录
    var scriptFolder = scriptFile.parent;
    
    var scriptFolderPath=scriptFolder.fsName;




    var blurValueInt=14;
    var detailScaleInt=114;


    if (BridgeTalk.isRunning("photoshop")) {
        var bt = new BridgeTalk();
        psScriptFilePath=scriptFolderPath+"\\psOperation.jsx";
        var psScriptFile = File(psScriptFilePath); 
        psScriptFile.open("r");
        var scriptCode = psScriptFile.read();
        scriptFile.close();
        bt.body = 'var blurValueInt = ' + blurValueInt + 
                ';\nvar detailScaleInt = ' + detailScaleInt +
                ';\nvar normalYuPath = "' + normalYuPath +
                '";\nvar num = ' + num +
                ';\nvar frameRate = ' + thisComp.frameRate +
                ';\nvar compName = "' + thisComp.name + '";\n'
                +scriptCode;

        bt.target = "photoshop";

        bt.onResult = function( result ) { 
            // alert(result.body);
            aeInput(normalYuPath);
        }
        //If anything goes wrong, error message
        bt.onError = function( inBT ) {alert(inBT.body); }
        bt.send();
        // alert(result);
    } else {
        alert("Photoshop未运行或不可用。");
    }
}




function zeroPad(num, length) {//辅助函数：用于为文件名生成零填充的数字
    var str = '' + num;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}


function aeInput(normalYuPath){

    var thisComp = app.project.activeItem;


    // 获取当前脚本文件的完整路径
    var scriptFile = File($.fileName);
    // 获取当前脚本所在的目录
    var scriptFolder = scriptFile.parent;
    
    var scriptFolderPath=scriptFolder.fsName;



    // alert("3");
    var outputPath=normalYuPath+"/"+thisComp.name;
    // alert(outputPath);
    // 获取项目中的当前合成
    var currentComp = thisComp;

    var importOptions = new ImportOptions();
    for (i=0;i<100000;i++){
        try{
            fileName=zeroPad(i)+".png";
            // 打开文件对话框选择 PNG 序列的第一个文件 (00000.png)
            importOptions.file = new File(outputPath + "/"+fileName);
            break;
        }
        catch(e){
            continue;
        }
    }

    
    // 确认这是一个 PNG 序列
    importOptions.sequence = true;  // 设置为导入图像序列
    importOptions.forceAlphabetical = true;

    // 导入 PNG 序列
    var importedFootage = app.project.importFile(importOptions);
    
    if (importedFootage == null) {
        alert("无法导入 PNG 序列");
        return;
    }

    // 设置帧率
    var desiredFrameRate = thisComp.frameRate;  // 设置你想要的帧率
    importedFootage.mainSource.conformFrameRate = desiredFrameRate;

    // 添加 PNG 序列到当前合成
    var layer = currentComp.layers.add(importedFootage);
    layer.startTime = 0;  // 设置起始时间
    
    alert("PNG 序列已导入，并帧率设置为 " + desiredFrameRate + " fps");

}


function exportPNGs(comp,outputPath){
    var renderQueue = app.project.renderQueue;
    renderQueue.items.add(comp);
    var thisItem = renderQueue.item(renderQueue.items.length);
    var outputModule = thisItem.outputModule(1);
    // 设置渲染输出文件名和路径
    var outputFile = new File(outputPath + "/" + "[#####].png"); // PNG 序列
    outputModule.file = outputFile;
    outputModule.applyTemplate("_HIDDEN X-Factor 8 Premul");
    
    // 确保渲染队列项处于激活状态
    thisItem.render = true;
    
    // 开始渲染
    app.project.renderQueue.render();
    
    // alert("渲染完成");
}
