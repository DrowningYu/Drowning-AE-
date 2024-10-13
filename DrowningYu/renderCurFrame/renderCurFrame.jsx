#include "../utils.jsx"

function applyRenderCurFrame(){
    // alert("applyRenderCurFrame");
    var selectedComp = getSelectedComp();
    if (selectedComp === null) return;
    var desktopPath = Folder.desktop.fullName;
    exportPNG(selectedComp,desktopPath);
    // app.activeViewer.setActive();
    selectedComp.openInViewer();
}
function helpRenderCurFrame(){
    var dialog = new Window("dialog");
    dialog.text = "帮助";
    dialog.orientation = "column";
    dialog.alignChildren = ["center", "top"];
    dialog.spacing = 10;
    dialog.margins = 16;

    var statictext1 = dialog.add("statictext", undefined, undefined, { name: "statictext1" });
    statictext1.text = "选中一个合成 点击渲染 渲染当前帧到桌面";


    dialog.show();
}

function exportPNG(comp, outputPath) {
    var renderQueue = app.project.renderQueue;
    renderQueue.items.add(comp);
    var thisItem = renderQueue.item(renderQueue.items.length);
    var outputModule = thisItem.outputModule(1);
    
    // 设置渲染输出文件名和路径
    var outputFile = new File(outputPath + "/" + "temp.png"); // PNG 序列
    outputModule.file = outputFile;
    outputModule.applyTemplate("_HIDDEN X-Factor 8 Premul");
    
    // 设置入点和出点为当前时间点，使其只渲染当前帧
    var currentTime = comp.time;



    thisItem.timeSpanStart = currentTime;
    thisItem.timeSpanDuration = comp.frameDuration; // 只渲染一帧
    

    
    // 确保渲染队列项处于激活状态
    thisItem.render = true;
    
    // 开始渲染
    app.project.renderQueue.render();
    
    // alert("渲染完成");
}


function testRenderCurFrame(){
    alert("testRenderCurFrame");
}


// applyRenderCurFrame();