#include "../utils.jsx"

function applySplitShape() {
    var settings = getSettings();
    var selectedComp = getSelectedComp();

    var selectedLayers = getSelectedLayers();

    if (selectedLayers === null) {
        return;
    }

    if (selectedLayers.length != 1) {
        alert("只能选中一个图层")
        return;
    }
    var selLayer = selectedLayers[0];
    if (selLayer.matchName != "ADBE Vector Layer") {
        alert("只能选中形状图层")
        return;
    }





    // 循环遍历内容组中的每个项目，并复制图层
    for (var i = 1; i <= selLayer.content.numProperties; i++) {
        // 复制当前图层
        var newLayer = selLayer.duplicate();
        newLayer.name = selLayer.name + '_' + selLayer.content.property(i).name;
        // 仅保留复制图层的第 i 个内容，其余内容删除
        for (var j = newLayer.content.numProperties; j > 0; j--) {
            if (j !== i) {
                newLayer.property("ADBE Root Vectors Group").property(j).remove();
            }
        }
    }

    selLayer.enabled = false;

}
function helpSplitShape() {
    alert("拆分形状图层");
}