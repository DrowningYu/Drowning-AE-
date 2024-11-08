#include "../utils.jsx"

function applySplitShape(){
    var settings = getSettings();
    var selectedComp = getSelectedComp();

    var selectedLayers = getSelectedLayers();

    if (selectedLayers === null) {
        return;
    }
    
    if(selectedLayers.length!=1){
        alert("只能选中一个图层")
        return;
    }
    var selLayer=selectedLayers[0];
    if(selLayer.matchName != "ADBE Vector Layer"){
        alert("只能选中形状图层")
        return;
    }
    alert("pass");
}
function helpSplitShape(){
    alert("拆分形状图层");
}