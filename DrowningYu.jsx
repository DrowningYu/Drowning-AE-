//脚本制作：Drowning鱼 如果有bug可以去b站给我私信反馈 


#include "DrowningYu/loopYu/loopYu.jsx"
#include "DrowningYu/renderCurFrame/renderCurFrame.jsx"
#include "DrowningYu/swayYu/swayYu.jsx"
#include "DrowningYu/normalYu/normalYu.jsx"
#include "DrowningYu/lyricYu/lyricYu.jsx"
#include "DrowningYu/update/update.jsx"


function mainFunction(defaultPanel) {
    function buildUI(defaultPanel) {
        var dialog = defaultPanel instanceof Panel ? defaultPanel : new Window('palette', 'DrowningYu');





        var group1 = dialog.add("group", undefined, {name: "group1"}); 
        group1.orientation = "row"; 
        group1.alignChildren = ["left","center"]; 
        group1.spacing = 10; 
        group1.margins = 0; 





        var loopYuPanel = group1.add("panel", undefined, undefined, { name: "loopYuPanel" });
        loopYuPanel.text = "帧选择器";
        loopYuPanel.orientation = "row";
        loopYuPanel.alignChildren = ["left", "top"];
        loopYuPanel.spacing = 10;
        loopYuPanel.margins = 20;
        loopYuPanel.alignment = ["left", "top"];

        var buttonLoopYu = loopYuPanel.add("button", undefined, undefined, { name: "buttonLoopYu" });
        buttonLoopYu.text = "应用";
        // buttonLoopYu.size = [50, 10];
        buttonLoopYu.onClick = applyLoopYu;

        var buttonHelpLoopYu = loopYuPanel.add("button", undefined, undefined, { name: "buttonHelpLoopYu" });
        buttonHelpLoopYu.text = "?";
        buttonHelpLoopYu.size = [12, 12]; // 设置帮助按钮大小
        buttonHelpLoopYu.enabled = true; // 确保按钮可用

        buttonHelpLoopYu.onClick = helpLoopYu;

        







        var renderCurFramePanel = group1.add("panel", undefined, undefined, { name: "renderCurFramePanel" });
        renderCurFramePanel.text = "渲染当前帧至桌面";
        renderCurFramePanel.orientation = "row";
        renderCurFramePanel.alignChildren = ["left", "top"];
        renderCurFramePanel.spacing = 10;
        renderCurFramePanel.margins = 20;
        renderCurFramePanel.alignment = ["left", "top"];


        var buttonRenderCurFrame = renderCurFramePanel.add("button", undefined, undefined, { name: "buttonRenderCurFrame" });
        buttonRenderCurFrame.text = "渲染";
        // buttonLoopYu.size = [50, 10];
        buttonRenderCurFrame.onClick = applyRenderCurFrame;

        // 添加帮助按钮
        var buttonHelpRenderCurFrame = renderCurFramePanel.add("button", undefined, undefined, { name: "buttonHelpRenderCurFrame" });
        buttonHelpRenderCurFrame.text = "?";
        buttonHelpRenderCurFrame.size = [12, 12]; // 设置帮助按钮大小
        buttonHelpRenderCurFrame.enabled = true; // 确保按钮可用

        // 点击帮助按钮时调用 help() 方法
        buttonHelpRenderCurFrame.onClick = helpRenderCurFrame;










        var panelSwayYu = group1.add("panel", undefined, undefined, { name: "panelSwayYu" });
        panelSwayYu.text = "随动效果";
        panelSwayYu.orientation = "row";
        panelSwayYu.alignChildren = ["left", "top"];
        panelSwayYu.spacing = 10;
        panelSwayYu.margins = 20;
        panelSwayYu.alignment = ["left", "top"];


        var buttonApplySwayYu = panelSwayYu.add("button", undefined, undefined, { name: "buttonApplySwayYu" });
        buttonApplySwayYu.text = "应用";
        // buttonLoopYu.size = [50, 10];
        buttonApplySwayYu.onClick = applySwayYu;

        // 添加帮助按钮
        var buttonHelpSwayYu = panelSwayYu.add("button", undefined, undefined, { name: "buttonHelpSwayYu" });
        buttonHelpSwayYu.text = "?";
        buttonHelpSwayYu.size = [12, 12]; // 设置帮助按钮大小
        buttonHelpSwayYu.enabled = true; // 确保按钮可用

        // 点击帮助按钮时调用 help() 方法
        buttonHelpSwayYu.onClick = helpSwayYu;








        var group2 = dialog.add("group", undefined, {name: "group2"}); 
        group2.orientation = "row"; 
        group2.alignChildren = ["left","center"]; 
        group2.spacing = 10; 
        group2.margins = 0; 













        var panelNormalYu = group2.add("panel", undefined, undefined, { name: "panelNormalYu" });
        panelNormalYu.text = "使用ps生成法线";
        panelNormalYu.orientation = "row";
        panelNormalYu.alignChildren = ["left", "top"];
        panelNormalYu.spacing = 10;
        panelNormalYu.margins = 20;
        panelNormalYu.alignment = ["left", "top"];


        var buttonApplyNormalYu = panelNormalYu.add("button", undefined, undefined, { name: "buttonApplyNormalYu" });
        buttonApplyNormalYu.text= "运行";
        // buttonLoopYu.size = [50, 10];
        buttonApplyNormalYu.onClick = applyNormalYu;

        var buttonhelpNormalYu = panelNormalYu.add("button", undefined, undefined, { name: "buttonhelpNormalYu" });
        buttonhelpNormalYu.text = "?";
        buttonhelpNormalYu.size = [12, 12]; // 设置帮助按钮大小
        buttonhelpNormalYu.enabled = true; // 确保按钮可用

        buttonhelpNormalYu.onClick = helpNormalYu;






        var panelLyricYu = group2.add("panel", undefined, undefined, { name: "panelLyricYu" });
        panelLyricYu.text = "网易云歌词生成";
        panelLyricYu.orientation = "column";
        panelLyricYu.alignChildren = ["center", "top"];
        panelLyricYu.spacing = 10;
        panelLyricYu.margins = 20;
        panelLyricYu.alignment = ["left", "top"];

        var edittextLyricYuLink = panelLyricYu.add('edittext {properties: {name: "edittextLyricYuLink"}}'); 
        edittextLyricYuLink.text = "网易云歌曲链接"; 
        edittextLyricYuLink.preferredSize.width = 100; 

        var radiobuttonLyricYuTranslate = panelLyricYu.add("checkbox", undefined, "加载翻译");
        radiobuttonLyricYuTranslate.value = true;

        var groupLyricYu1 = panelLyricYu.add("group", undefined, {name: "groupLyricYu"}); 
        groupLyricYu1.orientation = "row"; 
        groupLyricYu1.alignChildren = ["left","center"]; 
        groupLyricYu1.spacing = 10; 
        groupLyricYu1.margins = 0; 

        var statictextLyricYuFrame = groupLyricYu1.add("statictext", undefined, undefined, { name: "statictextLyricYuFrame" });
        statictextLyricYuFrame.text = "合成帧数";

        var edittextLyricYuFrame = groupLyricYu1.add('edittext {properties: {name: "edittextLyricYuFrame"}}'); 
        edittextLyricYuFrame.text = "30";
        edittextLyricYuFrame.preferredSize.width = 30;


        var groupLyricYu2 = panelLyricYu.add("group", undefined, {name: "groupLyricYu"}); 
        groupLyricYu2.orientation = "row"; 
        groupLyricYu2.alignChildren = ["left","center"]; 
        groupLyricYu2.spacing = 10; 
        groupLyricYu2.margins = 0; 


        var buttonApplyLyricYu = groupLyricYu2.add("button", undefined, undefined, { name: "buttonApplyLyricYu" });
        buttonApplyLyricYu.text= "运行";
        // buttonLoopYu.size = [50, 10];
        buttonApplyLyricYu.onClick = function(){
            applyLyricYu(edittextLyricYuLink.text, radiobuttonLyricYuTranslate.value, parseInt(edittextLyricYuFrame.text, 10));
        };

        var buttonhelpLyricYu = groupLyricYu2.add("button", undefined, undefined, { name: "buttonhelpLyricYu" });
        buttonhelpLyricYu.text = "?";
        buttonhelpLyricYu.size = [12, 12]; // 设置帮助按钮大小
        buttonhelpLyricYu.enabled = true; // 确保按钮可用

        // 点击帮助按钮时调用 help() 方法
        buttonhelpLyricYu.onClick = helpLyricYu;










        var panelUpdate = group2.add("panel", undefined, undefined, { name: "panelUpdate" });
        panelUpdate.text = "一键更新";
        panelUpdate.orientation = "row";
        panelUpdate.alignChildren = ["left", "top"];
        panelUpdate.spacing = 10;
        panelUpdate.margins = 20;
        panelUpdate.alignment = ["left", "top"];


        var buttonApplyUpdate = panelUpdate.add("button", undefined, undefined, { name: "buttonApplyUpdate" });
        buttonApplyUpdate.text= "没做";
        // buttonLoopYu.size = [50, 10];
        buttonApplyUpdate.onClick = applyUpdate;

        var buttonhelpUpdate = panelUpdate.add("button", undefined, undefined, { name: "buttonhelpUpdate" });
        buttonhelpUpdate.text = "?";
        buttonhelpUpdate.size = [12, 12]; // 设置帮助按钮大小
        buttonhelpUpdate.enabled = true; // 确保按钮可用

        buttonhelpUpdate.onClick = helpUpdate;














        var statictextDrowningYu = dialog.add("statictext", undefined, undefined, { name: "statictextDrowningYu" });
        statictextDrowningYu.text="Drowning鱼";
        statictextDrowningYu.addEventListener('click',DrowningYuPage,false);





        return dialog;


    }



    var myPanel = buildUI(defaultPanel);
    myPanel.layout.layout();
    if (myPanel != null && myPanel instanceof Window) {
        myPanel.show();
    }
}


function DrowningYuPage(){
    var command = 'explorer https://space.bilibili.com/516232572/dynamic';
    var code = system.callSystem(command);
}



mainFunction(this);//this对应AE提供的默认窗口

