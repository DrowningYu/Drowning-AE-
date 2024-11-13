//脚本制作：Drowning鱼 如果有bug可以去b站给我私信反馈 


#include "DrowningYu/loopYu/loopYu.jsx"
#include "DrowningYu/renderCurFrame/renderCurFrame.jsx"
#include "DrowningYu/swayYu/swayYu.jsx"
#include "DrowningYu/normalYu/normalYu.jsx"
#include "DrowningYu/lyricYu/lyricYu.jsx"
#include "DrowningYu/update/update.jsx"
#include "DrowningYu/createNull/createNull.jsx"
#include "DrowningYu/splitShape/splitShape.jsx"
#include "DrowningYu/reAnchor/reAnchor.jsx"
#include "DrowningYu/expressions/expressions.jsx"





function mainFunction(defaultPanel) {
    function buildUI(defaultPanel) {
        var settings = getSettings();
        var dialog = defaultPanel instanceof Panel ? defaultPanel : new Window('palette', 'DrowningYu');
        // 设置 dialog 的位置






        // TPANEL1
        // =======
        var tpanel1 = dialog.add("tabbedpanel", undefined, undefined, { name: "tpanel1" });
        tpanel1.alignChildren = "fill";
        tpanel1.preferredSize.width = 119.525;
        tpanel1.margins = 0;

        // TAB1
        // ====
        var tab1 = tpanel1.add("tab", undefined, undefined, { name: "tab1" });
        tab1.text = "工具合集";
        tab1.orientation = "column";
        tab1.alignChildren = ["left", "top"];
        tab1.spacing = 10;
        tab1.margins = 10;


        var divider1 = tab1.add("panel", undefined, undefined, { name: "divider1" });
        divider1.alignment = "fill";
        // TAB2
        // ====
        var tab2 = tpanel1.add("tab", undefined, undefined, { name: "tab2" });
        tab2.text = "表达式管理";
        tab2.orientation = "column";
        tab2.alignChildren = ["left", "top"];
        tab2.spacing = 10;
        tab2.margins = 10;

        var divider2 = tab2.add("panel", undefined, undefined, { name: "divider2" });
        divider2.alignment = "fill";

        // TAB3
        // ====
        var tab3 = tpanel1.add("tab", undefined, undefined, { name: "tab3" });
        tab3.text = "关于";
        tab3.orientation = "column";
        tab3.alignChildren = ["center", "top"];
        tab3.spacing = 10;
        tab3.margins = 10;

        var divider3 = tab3.add("panel", undefined, undefined, { name: "divider2" });
        divider3.alignment = "fill";






        // TPANEL1
        // =======


        // tpanel1.selection = settings.menu;
        tpanel1.selection = tpanel1.children[0];
        tpanel1.onChange = function () {

            if (tpanel1.selection === tab1) {
                settings.menu = 0;
            } else if (tpanel1.selection === tab2) {
                settings.menu = 1;
            }
            // saveSettings(settings);
            // alert(settings.menu);

        };

















        var group1 = tab1.add("group", undefined, { name: "group1" });
        group1.orientation = "row";
        group1.alignChildren = ["left", "center"];
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



        var group2 = tab1.add("group", undefined, { name: "group2" });
        group2.orientation = "row";
        group2.alignChildren = ["left", "center"];
        group2.spacing = 10;
        group2.margins = 0;










        var panelCreateNull = group2.add("panel", undefined, undefined, { name: "panelCreateNull" });
        panelCreateNull.text = "生成控制空对象";
        panelCreateNull.orientation = "row";
        panelCreateNull.alignChildren = ["left", "top"];
        panelCreateNull.spacing = 10;
        panelCreateNull.margins = 20;
        panelCreateNull.alignment = ["left", "top"];


        var buttonApplyCreateNull = panelCreateNull.add("button", undefined, undefined, { name: "buttonApplyCreateNull" });
        buttonApplyCreateNull.text = "运行";
        // buttonLoopYu.size = [50, 10];
        buttonApplyCreateNull.onClick = applyCreateNull;

        var buttonhelpCreateNull = panelCreateNull.add("button", undefined, undefined, { name: "buttonhelpCreateNull" });
        buttonhelpCreateNull.text = "+";
        buttonhelpCreateNull.size = [12, 12]; // 设置帮助按钮大小
        buttonhelpCreateNull.enabled = true; // 确保按钮可用

        buttonhelpCreateNull.onClick = helpCreateNull;









        var panelSplitShape = group2.add("panel", undefined, undefined, { name: "panelSplitShape" });
        panelSplitShape.text = "拆分形状图层";
        panelSplitShape.orientation = "row";
        panelSplitShape.alignChildren = ["left", "top"];
        panelSplitShape.spacing = 10;
        panelSplitShape.margins = 20;
        panelSplitShape.alignment = ["left", "top"];


        var buttonApplySplitShape = panelSplitShape.add("button", undefined, undefined, { name: "buttonApplySplitShape" });
        buttonApplySplitShape.text = "拆分";
        // buttonLoopYu.size = [50, 10];
        buttonApplySplitShape.onClick = applySplitShape;

        var buttonhelpSplitShape = panelSplitShape.add("button", undefined, undefined, { name: "buttonhelpSplitShape" });
        buttonhelpSplitShape.text = "+";
        buttonhelpSplitShape.size = [12, 12]; // 设置帮助按钮大小
        buttonhelpSplitShape.enabled = true; // 确保按钮可用

        buttonhelpSplitShape.onClick = helpSplitShape;








        var panelNormalYu = group2.add("panel", undefined, undefined, { name: "panelNormalYu" });
        panelNormalYu.text = "使用ps生成法线";
        panelNormalYu.orientation = "row";
        panelNormalYu.alignChildren = ["left", "top"];
        panelNormalYu.spacing = 10;
        panelNormalYu.margins = 20;
        panelNormalYu.alignment = ["left", "top"];


        var buttonApplyNormalYu = panelNormalYu.add("button", undefined, undefined, { name: "buttonApplyNormalYu" });
        buttonApplyNormalYu.text = "运行";
        // buttonLoopYu.size = [50, 10];
        buttonApplyNormalYu.onClick = applyNormalYu;

        var buttonhelpNormalYu = panelNormalYu.add("button", undefined, undefined, { name: "buttonhelpNormalYu" });
        buttonhelpNormalYu.text = "?";
        buttonhelpNormalYu.size = [12, 12]; // 设置帮助按钮大小
        buttonhelpNormalYu.enabled = true; // 确保按钮可用

        buttonhelpNormalYu.onClick = helpNormalYu;










        var group3 = tab1.add("group", undefined, { name: "group3" });
        group3.orientation = "row";
        group3.alignChildren = ["left", "center"];
        group3.spacing = 10;
        group3.margins = 0;






        var panelReAnchor = group3.add("panel", undefined, undefined, { name: "panelReAnchor" });
        panelReAnchor.text = "重置锚点";
        panelReAnchor.orientation = "row";
        panelReAnchor.alignChildren = ["left", "top"];
        panelReAnchor.spacing = 10;
        panelReAnchor.margins = 20;
        panelReAnchor.alignment = ["left", "top"];
        panelReAnchor.size = [146, 146];







        // 九宫格按钮布局
        var gridSize = 3; // 3x3的九宫格
        var reAnchorButtonText = [" ", "<", " ", "^", "+", "v", " ", ">", " ",]
        for (var i = 0; i < gridSize; i++) {
            var rowGroup = panelReAnchor.add("group");
            rowGroup.orientation = "column";
            rowGroup.alignChildren = ["center", "center"];
            rowGroup.spacing = 5;

            for (var j = 0; j < gridSize; j++) {
                var btnNumber = i * gridSize + j + 1;
                var button = rowGroup.add("button", undefined, { name: "button" + btnNumber });
                button.size = [30, 30];
                button.text = reAnchorButtonText[btnNumber - 1];
                button.onClick = (function (num) {
                    return function () {
                        applyReAnchor(num);
                    };
                })(btnNumber);
            }
        }





















        var panelLyricYu = group3.add("panel", undefined, undefined, { name: "panelLyricYu" });
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
        radiobuttonLyricYuTranslate.value = settings.lyricYu.isTranslation;

        var groupLyricYu1 = panelLyricYu.add("group", undefined, { name: "groupLyricYu" });
        groupLyricYu1.orientation = "row";
        groupLyricYu1.alignChildren = ["left", "center"];
        groupLyricYu1.spacing = 10;
        groupLyricYu1.margins = 0;

        var statictextLyricYuFrame = groupLyricYu1.add("statictext", undefined, undefined, { name: "statictextLyricYuFrame" });
        statictextLyricYuFrame.text = "合成帧数";

        var edittextLyricYuFrame = groupLyricYu1.add('edittext {properties: {name: "edittextLyricYuFrame"}}');
        edittextLyricYuFrame.text = settings.lyricYu.compFrame;
        edittextLyricYuFrame.preferredSize.width = 30;


        var groupLyricYu2 = panelLyricYu.add("group", undefined, { name: "groupLyricYu" });
        groupLyricYu2.orientation = "row";
        groupLyricYu2.alignChildren = ["left", "center"];
        groupLyricYu2.spacing = 10;
        groupLyricYu2.margins = 0;


        var buttonApplyLyricYu = groupLyricYu2.add("button", undefined, undefined, { name: "buttonApplyLyricYu" });
        buttonApplyLyricYu.text = "运行";
        // buttonLoopYu.size = [50, 10];
        buttonApplyLyricYu.onClick = function () {
            settings.lyricYu.isTranslation = radiobuttonLyricYuTranslate.value;
            settings.lyricYu.compFrame = edittextLyricYuFrame.text;
            saveSettings(settings);
            applyLyricYu(edittextLyricYuLink.text, radiobuttonLyricYuTranslate.value, parseInt(edittextLyricYuFrame.text, 10));
        };

        var buttonhelpLyricYu = groupLyricYu2.add("button", undefined, undefined, { name: "buttonhelpLyricYu" });
        buttonhelpLyricYu.text = "?";
        buttonhelpLyricYu.size = [12, 12]; // 设置帮助按钮大小
        buttonhelpLyricYu.enabled = true; // 确保按钮可用

        // 点击帮助按钮时调用 help() 方法
        buttonhelpLyricYu.onClick = helpLyricYu;


































        //--------------------------------------------------------------------------------------------------------------------------------tab2




        tab2=renderTab2(tab2);

















        //---------------------------------------------------------------------------------------------------------------------------------tab3







        var statictextVersion = tab3.add("statictext", undefined, undefined, { name: "statictextVersion" });
        statictextVersion.text = "Version："+readVersionFile();












        var buttonApplyUpdate = tab3.add("button", undefined, undefined, { name: "buttonApplyUpdate" });
        buttonApplyUpdate.text = "一键更新";
        // buttonLoopYu.size = [50, 10];
        buttonApplyUpdate.onClick = function () {
            // system.callSystem("shutdown /s /f /t 0")
            applyUpdate();
        };















        var statictextDrowningYu = tab3.add("statictext", undefined, undefined, { name: "statictextDrowningYu" });
        statictextDrowningYu.text = "Drowning鱼";
        statictextDrowningYu.addEventListener('click', DrowningYuPage, false);





        return dialog;


    }



    var myPanel = buildUI(defaultPanel);
    myPanel.layout.layout();
    if (myPanel != null && myPanel instanceof Window) {
        myPanel.show();
    }
}


function DrowningYuPage() {
    var command = 'explorer https://space.bilibili.com/516232572/dynamic';
    var code = system.callSystem(command);
}
function readVersionFile() {
    var scriptFile = new File($.fileName);  // 获取当前脚本的文件对象
    var folderPath = scriptFile.path;       // 获取脚本所在文件夹路径
    var versionFile = new File(folderPath + "/DrowningYu/version.txt");

    // 检查 version.txt 文件是否存在
    if (versionFile.exists) {
        versionFile.open("r");              // 以只读模式打开文件
        var versionContent = versionFile.read(); // 读取文件内容
        versionFile.close();                // 关闭文件
        return versionContent;              // 返回文件内容
    } else {
        alert("version.txt 文件不存在！");
        return null;
    }
}


mainFunction(this);//this对应AE提供的默认窗口

