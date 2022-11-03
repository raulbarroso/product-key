// tabs
var tabs = document.getElementsByClassName("tab")
for (i = 0; i < tabs.length; i++){
  tabs[i].onclick = select;
}
tabs[0].style = "background-color: #124379;";

// sections
sections = document.getElementsByTagName("SECTION");
sections[0].style = "display: block;"

var action = tabs[0].innerHTML;

function select(){
  action = this.innerHTML;
  // tabs
  for (i = 0; i < tabs.length; i++){
    tabs[i].style = "background-color: #bbb;";
  }
  this.style = "background-color: #124379;";
  // section
  for (i = 0; i < sections.length; i++){
    sections[i].style = "display: none;";
  }
  document.getElementById(action).style = "display: block;"
}

function read() {
  var reader = new FileReader();
  reader.onload = function(){
    var csv = Papa.parse(reader.result);
    if (action == "Add Keys"){
      var newCsvData = addKeys(csv);
      return;
    } else if (action == "Generate Keys"){
      var newCsvData = generate(csv);
    } else if (action == "Filter"){
      var newCsvData = filter(csv);
    } else if (action == "Replace"){
      var newCsvData = replace(csv);
    }
    var newCsv = Papa.unparse(newCsvData);
    download(filename, newCsv);
  }
  if (input.files[0]){
    reader.readAsText(input.files[0]);
  } else {
    alert('No file chosen');
  }
}

// constants
var marketArr = ['Agriculture','Industrial','Potable Water','Residential',
                'Wastewater','Construction','Mining & Quarry','HVAC'];

// Add Product Keys
function addKeys(obj){
  var table = generate(obj, true);
  console.log(table);

  if (table[table.length - 1] == ""){
    table.pop();
  }

  document.getElementById("download-title").style="display: none";
  document.getElementById("download-btn").style="display: none";
  for (i = 1; i < tabs.length; i++){
    tabs[i].style = "display: none";
  }

  var exId = makeArr('External ID', table);
  var sku = makeArr('Internal Reference', table);
  var name = makeArr('Name', table);
  var brand = makeArr('Brand', table);
  var desc = makeArr('Sales Description', table);
  var cat = makeArr('Product Category', table);
  var tags = makeArr('Product Tags', table);
  var productKey = makeArr('Product Key', table);

  var max = name.length;
  var articleArr = [];
  for (let i = 0; i < max; i++){
    var articleIndex = "<p class='article-index'>Product " + (i + 1) + " of " + max;
    var productInfo = `<div class="name-info product-info">
                        <h2>Name:</h2>
                        <textarea id="p-name-`+i+`">` + name[i] + `</textarea>
                      </div>
                      <div class="sku-info product-info">
                        <h2>SKU:</h2>
                        <textarea id="p-sku-`+i+`">` + sku[i] + `</textarea>
                      </div>
                      <div class="product-info desc-info">
                        <h2>Sales Description:</h2>
                        <textarea id="p-desc-`+i+`">` + desc[i] + `</textarea>
                      </div>
                      <div class="hidden">
                        <p id="p-exId-`+i+`">` + exId[i] + `</p>
                      </div>
                      <div class="hidden">
                        <p id="p-brand-`+i+`">` + brand[i] + `</p>
                      </div>
                      <div class="hidden">
                        <p id="p-cat-`+i+`">` + cat[i] + `</p>
                      </div>
                      <div class="hidden">
                        <p id="p-tags-`+i+`">` + tags[i] + `</p>
                      </div>
                      <div class="divider"></div>`;
    var keyCats = `<div class="key-selectors key-categories">
                    <h2>Categories</h2>
                    <p>Installation</p>
                    <select onchange="hideMap(this)" class="adopted" id="installation-`+i+`">
                      <option value="installation" selected></option>
                      <option>Surface</option>
                      <option>Submersible</option>
                    </select>
                    <p>Drive</p>
                    <select>
                      <option value="drive" selected></option>
                      <option>DieselEngine</option>
                      <option>GasEngine</option>
                      <option>Electric</option>
                      <option>PumpEnd</option>
                    </select>
                    <p>Water</p>
                    <ul class="checkbox-water">
                      <li><input type="checkbox" value="Clear">Clear</li>
                      <li><input type="checkbox" value="Effluent">Effluent</li>
                      <li><input type="checkbox" value="Trash">Trash</li>
                      <li><input type="checkbox" value="Sewage">Sewage</li>
                    </ul>
                    <p>Application</p>
                    <select onchange="hideMap(this)" id="application-`+i+`">
                      <option value="application" selected></option>
                      <option>ResidentialPumps</option>
                      <option>SubmersiblePumps</option>
                    </select>
                    <p>Child Category</p>
                    <select onchange="hideMap(this)" id="child-category-`+i+`">
                      <option value="child-category" selected></option>
                      <option>EndSuctionPumps</option>
                      <option>EngineDrivenPumps</option>
                      <option>PressureBoosterPumps</option>
                      <option>JetPumps</option>
                      <option>PeripheralPumps</option>
                      <option>MultiStage</option>
                      <option>SmartPumps</option>
                      <option>DeepWell</option>
                      <option>Dewatering</option>
                      <option>Effluent</option>
                      <option>Sewage</option>
                      <option>Slurry</option>
                      <option>Trash</option>
                      <option>Turbine</option>
                    </select>
                    <div class="key-selectors key-hidden hidden" id="motor-sku-`+i+`">
                      <p>Motor SKU</p>
                      <input type="text" name="text-motor-sku" placeholder="Motor SKUs separated by ','">
                    </div>
                    <p>Market</p>
                    <ul class="checkbox-market">
                      <li><input type="checkbox" value="Agriculture">Agriculture</li>
                      <li><input type="checkbox" value="Construction">Construction</li>
                      <li><input type="checkbox" value="HVAC">HVAC</li>
                      <li><input type="checkbox" value="Industrial">Industrial</li>
                      <li><input type="checkbox" value="MiningQuarry">MiningQuarry</li>
                      <li><input type="checkbox" value="PotableWater">PotableWater</li>
                      <li><input type="checkbox" value="Wastewater">Wastewater</li>
                      <li><input type="checkbox" value="Residential">Residential</li>
                    </ul>
                    <p>Model</p>
                    <input type="text" name="text-model" placeholder="e.g. 'Series,J,BP60'">
                  </div>`;
    var keyAtts = `<div class="key-selectors key-attributes">
                      <h2>Attributes</h2>
                      <div class="atts-nums">
                        <p>Horsepower</p>
                        <input type="text" class="input-nums" name="num-hp" placeholder="e.g. '0.5'">
                      </div>
                      <div class="atts-nums">
                        <p>Discharge Size</p>
                        <input type="text" class="input-nums" name="num-discharge-size" placeholder="e.g. '2'">
                      </div>
                      <div class="key-selectors key-hidden hidden" id="key-surface-`+i+`">
                        <div class="atts-nums">
                          <p>Suction</p>
                          <input type="text" class="input-nums" name="num-suction" placeholder="e.g. '4'">
                        </div>
                      </div>
                      <p>Discharge Type</p>
                      <select>
                        <option value="discharge-type" selected></option>
                        <option>Flanged</option>
                        <option>NPT</option>
                        <option value="Flanged,NPT">Flanged/NPT</option>
                      </select>
                      <p>Phase</p>
                      <select>
                        <option value="phase" selected></option>
                        <option>1Phase</option>
                        <option>3Phase</option>
                        <option value="1Phase,3Phase">1Phase/3Phase</option>
                      </select>
                      <p>Voltage</p>
                      <ul class="checkbox-voltage">
                        <li><input type="checkbox" value="115V">115V</li>
                        <li><input type="checkbox" value="230V">230V</li>
                        <li><input type="checkbox" value="208-230V">208-230V</li>
                        <li><input type="checkbox" value="460V">460V</li>
                      </ul>
                      <p>RPM</p>
                      <select>
                        <option value="rpm" selected></option>
                        <option>1300-1800RPM</option>
                        <option>3300-3800RPM</option>
                      </select>
                      <p>Seal</p>
                      <ul class="checkbox-seal">
                        <li><input type="checkbox" value="1Seal">1Seal</li>
                        <li><input type="checkbox" value="2Seal">2Seal</input></li>
                        <li><input type="checkbox" value="PackingSeal">PackingSeal</input></li>
                      </ul>
                      <div class="atts-nums">
                        <p>Max Head</p>
                        <input type="number" name="num-mh" placeholder="e.g. '50'">
                      </div>
                      <div class="atts-nums">
                        <p>Max Flow</p>
                        <input type="number" name="num-mf" placeholder="e.g. '300'">
                      </div>
                      <p>Curve</p>
                      <a href="https://mycurvefit.com/" target="_blank">Find here</a>
                      <input type="text" name="num-curve" placeholder="e.g. '(-0.00003**x)-0.0752*x+43.823'">
                      <div class="key-selectors key-hidden hidden" id="key-submersible-`+i+`">
                        <p>Motor Protection</p>
                        <select>
                          <option value="motor-protection" selected></option>
                          <option>None</option>
                          <option>ThermalOverload</option>
                          <option>TemperatureSensor</option>
                          <option>MoistureSensor</option>
                        </select>
                        <p>Operation</p>
                        <select>
                          <option value="operation" selected></option>
                          <option>AutomaticOperation</option>
                          <option>ManualOperation</option>
                          <option value="AutomaticOperation,ManualOperation">AutomaticOperation/ManualOperation</option>
                        </select>
                        <div class="atts-nums">
                          <p>Cable</p>
                          <input type="text" class="input-nums" name="num-cable" placeholder="e.g. '15'">
                        </div>
                      </div>
                    </div>`;
    var keySelectors = "<h2 class='block-elm'>Configure Product Key</h2>" + keyCats + keyAtts;
    var htmlText = "<article id='"+i+"' class='hidden'>" + articleIndex + productInfo +
                    keySelectors + articleIndex + "</article>";
    articleArr.push(htmlText);
  }
  articleArr.push("<article id='" + max + "' class='hidden'><h2>Finished!</h2></article>");
  var enableCopy = "<div id='nav-select'><input type='checkbox' id='enable-copy'><p>Copy empty values from previous</p></div>";
  var backButton = "<p id='backButton' class='noselect' onclick='prevArticle(" + max + ")'>Back</p>";
  var downloadBtn = "<p id='downloadBtn' class='noselect' onclick='downloadKeys()'>Download</p>";
  var nextButton = "<p id='nextButton' class='noselect' onclick='nextArticle(" + max + ")'>Next</p>";
  articleArr.push("<div class='article-navigation block-elm'>" + backButton + enableCopy + downloadBtn + nextButton + "</div>");

  addSection = document.getElementById("Add Keys");
  addSection.innerHTML = articleArr.join("");

  var articles = document.getElementsByTagName("ARTICLE");
  for (let i = 0; i < articles.length - 1; i++){
    var key = productKey[i];
    setKey(articles[i], key);
  }

  articles[0].className = "active-art";
  // disable back button
  document.getElementById("backButton").classList.add("off");
}

function removeCopy(elm){
  elm.classList.remove("copy");
}

function downloadKeys(obj){
  var articles = document.getElementsByTagName("ARTICLE");
  var newTable = [['External ID', 'Name', 'Internal Reference', 'Product Key', 'Brand', 'Product Tags', 'Product Category', 'Sales Description']];
  for (let i = 0; i < articles.length - 1; i++){
    var exId = document.getElementById("p-exId-" + i).innerHTML;
    var name = document.getElementById("p-name-" + i).value;
    var sku = document.getElementById("p-sku-" + i).value;
    var key = getKey(articles[i]);
    var brand = document.getElementById("p-brand-" + i).innerHTML;
    var tags = document.getElementById("p-tags-" + i).innerHTML;
    var category = document.getElementById("p-cat-" + i).innerHTML;
    var desc = document.getElementById("p-desc-" + i).value;

    var row = [exId, name, sku, key, brand, tags, category, desc];
    newTable.push(row);
  }
  var filename = "ProductKeys.csv";
  console.log(newTable);
  // download
  var newCsv = Papa.unparse(newTable);
  download(filename, newCsv);
}

function getKey(article){
  var sl = article.getElementsByTagName("SELECT");
  var ul = article.getElementsByTagName("UL");
  var ipt = article.getElementsByTagName("INPUT");
  var sku = document.getElementById("p-sku-" + article.id).innerHTML;
  var brand = document.getElementById("p-brand-" + article.id).innerHTML.split("&amp;").join("").split(" ").join("");
  var emptyKey = ":_:_Pump_:_sku_:_installation_:_drive_:_water_:_application_:_"
                  + "child-category_:_market_:_brand_:_model_:_hp_:_discharge-size_:_"
                  + "discharge-type_:_phase_:_voltage_:_rpm_:_seal_:_mh_:_head-range_:_"
                  + "mf_:_flow-range_:_curve_:_suction_:_motor-protection_:_operation_:_cable_:_motor-sku_:_:";
  var key = emptyKey.split("_:_");
  var newKey = emptyKey.split("_:_");
  newKey[key.indexOf("sku")] = sku;
  newKey[key.indexOf("brand")] = brand;

  // selections
  for (let i = 0; i < sl.length; i++){
    var keyName = sl[i].getElementsByTagName("OPTION")[0].value;
    var j = key.indexOf(keyName);
    newKey[j] = getSelect(sl[i]);
  }

  // checkboxes
  for (let i = 0; i < ul.length; i++){
    var keyName = ul[i].classList[0].split("-").slice(1).join("-");
    var j = key.indexOf(keyName);
    newKey[j] = getCheckbox(ul[i]);
  }

  // special inputs
  for (let i = 0; i < ipt.length; i++){
    if (ipt[i].type != "checkbox"){
      var keyName = ipt[i].name.split("-").slice(1).join("-");
      var j = key.indexOf(keyName);
      var val = ipt[i].value;
      if (j != -1 && val != ""){
        // conditions
        if (keyName == "model"){
          val = val.split(" ").join(",").split(",,").join(",");
        } else if (keyName == "motor-sku"){
          val = "motorSKU:" + val.split(" ").join(",").split(",,").join(",");
        } else if (keyName == "hp"){
          val = getArrayUnits(val.split(","), "HP");
        } else if (keyName == "discharge-size"){
          val = getArrayUnits(val.split(","), "Discharge");
        } else if (keyName == "suction"){
          val = getArrayUnits(val.split(","), "Suction");
        } else if (keyName == "cable"){
          val = getArrayUnits(val.split(","), "Cable");
        } else if (keyName == "mh" || keyName == "mf"){
          newKey[j + 1] = getRange(val, keyName);
          val = val + keyName;
        }
        newKey[j] = val;
      }
    }
  }

  // remove extra attributes
  if (newKey[3] != "Submersible"){
    removeKeys(newKey, key, ["motor-protection", "operation", "cable"]);
  }
  if (newKey[3] != "Surface"){
    removeKeys(newKey, key, ["suction"]);
  }
  if (newKey[6] != "DeepWell"){
    removeKeys(newKey, key, ["motor-sku"]);
  }
  return newKey.join("_:_");
}

function setKey(article, setKey, markCopy=false){
  var artId = article.id;
  var sl = article.getElementsByTagName("SELECT");
  var ul = article.getElementsByTagName("UL");
  var ipt = article.getElementsByTagName("INPUT");
  var emptyKey = ":_:_Pump_:_sku_:_installation_:_drive_:_water_:_application_:_"
                  + "child-category_:_market_:_brand_:_model_:_hp_:_discharge-size_:_"
                  + "discharge-type_:_phase_:_voltage_:_rpm_:_seal_:_mh_:_head-range_:_"
                  + "mf_:_flow-range_:_curve_:_suction_:_motor-protection_:_operation_:_cable_:_motor-sku_:_:";
  var key = emptyKey.split("_:_");
  var setKey = setKey.split("_:_");

  // remove extra attributes
  if (setKey[3] != "Submersible"){
    removeKeys(key, key, ["motor-protection", "operation", "cable"], false);
  }
  if (setKey[3] != "Surface"){
    removeKeys(key, key, ["suction"], false);
  }
  if (setKey[6] != "DeepWell"){
    removeKeys(key, key, ["motor-sku"], false);
  }

  // sku and brand
  if (!document.getElementById("p-sku-" + artId).value){
    var i = key.indexOf("sku")
    document.getElementById("p-sku-" + artId).value = setKey[i]
  }

  if (!document.getElementById("p-brand-" + artId).innerHTML){
    var i = key.indexOf("brand")
    document.getElementById("p-brand-" + artId).innerHTML = setKey[i]
  }

  // selects
  for (let i = 0; i < sl.length; i++){
    var keyName = sl[i].getElementsByTagName("OPTION")[0].value;
    var j = key.indexOf(keyName);
    if (j != -1 && sl[i].value == keyName && setKey[j] != keyName){
      setValueSelect(sl[i], setKey[j]);
      if (sl[i].getAttribute("onchange")){
        hideMap(sl[i]);
      }
      if (markCopy) {
        sl[i].classList.add("copy");
        sl[i].setAttribute("onclick", "removeCopy(this)");
      }
    }
  }

  // checkboxes
  for (let i = 0; i < ul.length; i++){
    var keyName = ul[i].className.split("-").slice(1).join("-");
    var j = key.indexOf(keyName);
    if (j != -1 && isUnchecked(ul[i]) && setKey[j] != keyName){
      var checkbox = ul[i].getElementsByTagName("INPUT");
      var vals = setKey[j].split(",");
      for (let k = 0; k < checkbox.length; k++){
        for (let l = 0; l < vals.length; l++){
          if (checkbox[k].value == vals[l]){
            checkbox[k].checked = true;
          }
        }
      }
      if (markCopy) {
        ul[i].classList.add("copy");
        ul[i].setAttribute("onclick", "removeCopy(this)");
      }
    }
  }

  // special inputs
  for (let i = 0; i < ipt.length; i++){
    if (ipt[i].type != "checkbox"){
      var keyName = ipt[i].name.split("-").slice(1).join("-");
      var j = key.indexOf(keyName);
      if (j != -1 && ipt[i].value == "" && setKey[j] != keyName){
        // conditions
        if (keyName == "hp" || keyName == "discharge-size" || keyName == "suction" || keyName == "cable"){
          var num = setKey[j].split(",");
          for (let k = 0; k < num.length; k++){
            num[k] = parseFloat(num[k]);
          }
          ipt[i].value = num.join(",");
        } else if (keyName == "mh" || keyName == "mf"){
          ipt[i].value = parseInt(setKey[j]);
        } else if (keyName == "motor-sku"){
          ipt[i].value = setKey[j].slice(9);
        } else {
          ipt[i].value = setKey[j]
        }
        if (markCopy) {
          ipt[i].classList.add("copy");
          ipt[i].setAttribute("onclick", "removeCopy(this)");
        }
      }
    }
  }
}

function removeKeys(valKey, emptyKey, keyArr, spliceEmpty=true){
  for (let i = 0; i < keyArr.length; i++){
    var j = emptyKey.indexOf(keyArr[i]);
    valKey.splice(j, 1);
    if (spliceEmpty){
      emptyKey.splice(j, 1);
    }
  }
}

function isUnchecked(ul){
  var checkbox = ul.getElementsByTagName("INPUT");
  var empty = true;
  for (let i = 0; i < checkbox.length; i++){
    if (checkbox[i].checked){
      empty = false;
      break;
    }
  }
  return empty;
}

function getSelect(select){
  var options = select.getElementsByTagName("OPTION");
  for (let i = 0; i < options.length; i++){
    if (options[i].selected){
      return options[i].value;
    }
  }
}

function getCheckbox(ul){
  var keyName = ul.className.split("-").slice(1).join("-");
  var checkbox = ul.getElementsByTagName("INPUT");
  var vals = [];
  for (let i = 0; i < checkbox.length; i++){
    if (checkbox[i].checked){
      vals.push(checkbox[i].value)
    }
  }
  if (vals.length == 0){
    return keyName
  }
  return vals.join(",")
}

function getArrayUnits(arr, unit){
  for (let i = 0; i < arr.length; i++){
    if (arr[i].split("")[0] == "."){
      arr[i] = '0' + arr[i];
    }
    arr[i] = parseFloat(arr[i]) + unit;
  }
  return arr.join(",");
}

function getRange(val, unit){
  var range = [];
  for (i = 1; i < 6; i++){
    range.push(Math.floor(val) - i + unit);
  }
  return range.join("");
}

function setValueSelect(select, val){
  var options = select.getElementsByTagName("OPTION");
  for (let j = 0; j < options.length; j++){
    if (options[j].value == val){
      options[j].selected = true;
      return
    }
  }
}


function hideMap(obj){
  var select = obj.id.split("-")
  var elmId = select.pop();
  switch(select.join("-")){
    case "installation":
      switch(obj.value){
        case "installation":
          document.getElementById("key-surface-" + elmId).classList.add("hidden");
          document.getElementById("key-submersible-" + elmId).classList.add("hidden");
          break;
        case "Surface":
          document.getElementById("key-surface-" + elmId).classList.remove("hidden");
          document.getElementById("key-submersible-" + elmId).classList.add("hidden");
          break;
        case "Submersible":
          document.getElementById("key-surface-" + elmId).classList.add("hidden");
          document.getElementById("key-submersible-" + elmId).classList.remove("hidden");
          break;
      }
      break;
    case "application":
      switch(obj.value){
        case "application":
          hideSelection(document.getElementById("child-category-" + elmId), [], true);
          break;
        case "ResidentialPumps":
          hideSelection(document.getElementById("child-category-" + elmId), ["JetPumps", "PeripheralPumps", "MultiStage", "SmartPumps"]);
          break;
        case "SubmersiblePumps":
          hideSelection(document.getElementById("child-category-" + elmId), ["DeepWell", "Dewatering", "Effluent", "Sewage", "Slurry", "Trash", "Turbine"]);
          break;
      }
      break;
    case "child-category":
      switch(obj.value){
        case "child-category":
          hideSelection(document.getElementById("application-" + elmId), [], true);
          document.getElementById("motor-sku-" + elmId).classList.add("hidden");
          break;
        case "JetPumps":
        case "PeripheralPumps":
        case "MultiStage":
        case "SmartPumps":
          hideSelection(document.getElementById("application-" + elmId), ["ResidentialPumps"]);
          document.getElementById("motor-sku-" + elmId).classList.add("hidden");
          break;
        case "Dewatering":
        case "Effluent":
        case "Sewage":
        case "Slurry":
        case "Trash":
        case "Turbine":
          hideSelection(document.getElementById("application-" + elmId), ["SubmersiblePumps"]);
          document.getElementById("motor-sku-" + elmId).classList.add("hidden");
          break;
        case "DeepWell":
          hideSelection(document.getElementById("application-" + elmId), ["SubmersiblePumps"]);
          document.getElementById("motor-sku-" + elmId).classList.remove("hidden");
          break;
      }
      break;
  }
}


// hide selection; if all=true unhide all
function hideSelection(obj, arr, all=false){
  var options = obj.getElementsByTagName("OPTION");
  for (let i = 1; i < options.length; i++){
    if (all) {
      options[i].disabled = false;
      continue;
    }
    options[i].disabled = true;
    for (let j = 0; j < arr.length; j++){
      if (options[i].value == arr[j]){
        options[i].disabled = false;
        if (arr.length == 1){
          options[i].selected = true;
        }
        break;
      }
    }
  }
}

function nextArticle(max){
  var articles = document.getElementsByTagName("ARTICLE");
  var activeArt = document.getElementsByClassName("active-art")[0];
  var i = parseInt(activeArt.id);
  if (i == max){
    return
  }
  if (document.getElementById("enable-copy").checked && i < max - 1){
    var key = getKey(articles[i]);
    console.log(key);
    setKey(articles[i + 1], key, true);
  }
  articles[i].className = "hidden";
  articles[i + 1].className = "active-art";
  document.body.scrollTop = 220; // For Safari
  document.documentElement.scrollTop = 220; // For Chrome, Firefox, IE and Opera
  if (i == 0) {
    // enable prev
    document.getElementById("backButton").classList.remove("off");
  } else if (i == max - 1) {
    // disable next
    document.getElementById("nextButton").classList.add("off");
  }
}

function prevArticle(max){
  var articles = document.getElementsByTagName("ARTICLE");
  var activeArt = document.getElementsByClassName("active-art")[0];
  var i = parseInt(activeArt.id);
  if (i == 0){
    return
  }
  articles[i].className = "hidden";
  articles[i - 1].className = "active-art";
  document.body.scrollTop = 220; // For Safari
  document.documentElement.scrollTop = 220; // For Chrome, Firefox, IE and Opera
  if (i == 1) {
    // disable prev
    document.getElementById("backButton").classList.add("off");
  } else if (i == max) {
    // enable next
    document.getElementById("nextButton").classList.remove("off");
  }
}

// Generate Product Key
function generate(obj, add=false){
  var table = obj.data;

  if (table[table.length - 1] == ""){
    table.pop();
  }

  var skipArr = makeSkipArr('External ID', table);
  var exId = makeArrSkip('External ID', table, skipArr);
  var sku = makeArrSkip('Internal Reference', table, skipArr);
  var name = makeArrSkip('Name', table, skipArr);
  var desc = makeArrSkip('Sales Description', table, skipArr);
  var cat = makeArrSkip('Product Category', table, skipArr);
  var brand = makeArrSkip('Brand', table, skipArr);
  var tags = makeArrSkip('Product Tags', table, skipArr);
  var productKey = makeArrSkip('Product Key', table, skipArr);
  var attValues = makeArrSkip('Products/Attribute Values', table, skipArr);
  var markets = getMarkets(tags);

  var keyStr = ":_:_Pump_:_sku_:_installation_:_drive_:_water_:_application_:_child-category" +
                "_:_market_:_brand_:_model_:_hp_:_discharge-size_:_discharge-type_:_phase" +
                "_:_voltage_:_rpm_:_seal_:_mh_:_head-range_:_mf_:_flow-range_:_curve_:_att1_:_att2_:_att3_:_:";

  var keyDict = {
    ":": ":",
    "product": "Pump",
    "sku": "",
    "installation": "installation",
    "drive": "drive",
    "water": "water",
    "application": "application",
    "child-category": "child-category",
    "market": "market",
    "brand": "brand",
    "model": "model",
    "hp": "hp",
    "discharge-size": "discharge-size",
    "discharge-type": "discharge-type",
    "phase": "phase",
    "voltage": "voltage",
    "rpm": "rpm",
    "seal": "seal",
    "mh": "mh",
    "head-range": "head-range",
    "mf": "mf",
    "flow-range": "flow-range",
    "curve": "curve"
  }

  // Create new temp table
  // the first row of the new table, two columns
  var newTable = [['External ID', 'Name', 'Internal Reference', 'Brand', 'Product Tags', 'Product Category', 'Sales Description', 'Product Key']];
  for (let i = 0; i < exId.length; i++){
    var row = [exId[i],name[i],sku[i],brand[i],tags[i],cat[i],desc[i]];
    if (productKey[i] != "" && productKey[i] != null){
      row.push(productKey[i]);
      newTable.push(row);
      continue;
    }
    var key = {...keyDict};
    // SKU
    key["sku"] = sku[i];
    // Markets
    if (markets[i] != null){
      key["market"] = markets[i].join(',').split('&').join('').split(' ').join('');
    }
    // Brand
    key["brand"] = brand[i].split('&').join('').split(' ').join('');

    // Get Installation from category and name
    if (cat[i].includes("Submersible") || name[i].includes("Submersible") || name[i].includes("Cable")){
      key["installation"] = "Submersible";
    } else if (cat[i].includes("Engine") || name[i].includes("Engine") || name[i].includes("Surface")){
      key["installation"] = "Surface";
    }

    // Get drive from category or installation
    if (cat[i].includes("Pump End")){
      key["drive"] = "PumpEnd";
    } else if (cat[i].includes("Submersible")){
      key["drive"] = "Electric";
    }

    // Get Water from cat or Name
    if (cat[i].includes("Trash") || name[i].includes("Trash")){
      addMulti(key, "water", "Trash");
    }
    if (cat[i].includes("Effluent") || name[i].includes("Effluent")){
      addMulti(key, "water", "Effluent");
    }
    if (cat[i].includes("Sewage") || name[i].includes("Sewage")){
      addMulti(key, "water", "Sewage");
    }

    // get application from category
    if (cat[i].includes("Residential Pumps")){
      key["application"] = "ResidentialPumps";
    } else if (cat[i].includes("Submersible Pumps")){
      key["application"] = "SubmersiblePumps";
    }

    // Get child cat from category 
    if (cat[i].split(" / ").length == 1){
      key["child-category"] = cat[i].split(" ").join("");
    } else if (cat[i].split(" / ").length == 2){
      key["child-category"] = cat[i].split(" / ")[1].split(" ").join("");
    }

    // SPECIAL CONDITIONS:
    if (true){
      // by market
      if (key["market"].includes("Agriculture")){
        if (key["child-category"].includes("DeepWell")){
          key["installation"] = "Submersible";
          addMulti(key, "water", "Clear");
        }
      }
      if (key["market"].includes("HVAC")){
        key["installation"] = "Surface";
        addMulti(key, "water", "Clear");
      }
      if (key["market"].includes("Construction")) {
        if (key["brand"].includes("Zoeller")){
          key["installation"] = "Submersible";
        } else if (!key["brand"].includes("Tsurumi")){
          key["installation"] = "Surface";
        }
      }
      if (key["market"].includes("Mining")) {
        addMulti(key, "water", "Effluent");
      }
      if (key["market"].includes("Potable")) {
        addMulti(key, "water", "Clear");
        if (key["child-category"].includes("DeepWell")){
          key["installation"] = "Submersible";
        } else {
          key["installation"] = "Surface";
        }
      }
      if (key["market"].includes("Wastewater")){
        key["installation"] = "Submersible";
      }
      // by brand
      if (key["brand"].includes("Cornell")){
        key["installation"] = "Surface";
      } else if (key["brand"].includes("Flint") && key["installation"] == "Surface"){
        addMulti(key, "water", "Clear");
      } else if (key["brand"].includes("Zoeller")){
        key["installation"] = "Submersible";
      }
    }

    // Get additional atts from Installation
    if (key["installation"] == "Submersible"){
      key["motor-protection"] = "motor-protection";
      key["operation"] = "operation";
      key["cable"] = "cable";
    } else if (key["installation"] == "Surface"){
      key["suction"] = "suction";
    }

    // guesses values
    if (true){
      var nameArr = name[i].split(',').join(' ').split(' ');
      for (let j = 0; j < nameArr.length; j++){
        // Find horsepower
        var matches = nameArr[j].match(/hp/ig)
        if (matches){
          if (nameArr[j].match(/\d/g)){
            numb = nameArr[j];
          } else {
            numb = nameArr[j-1];
          }
          if (numb.includes('/')){
            var value = divideStr(numb);
          } else if (numb.includes('-')){
            var mixed = numb.split('-');
            var value = mixed[0] + divideStr(mixed[1]);
          } else {
            var value = parseFloat(numb);
          }
          key["hp"] = value + "HP";
        }
        // Find discharge
        var matches = nameArr[j].match(/\"|in\./ig);
        if (matches){
          if (nameArr[j].match(/\d/g)){
            numb = nameArr[j];
          } else {
            numb = nameArr[j-1];
          }
          key["discharge-size"] = parseFloat(numb) + "Discharge";
        }
        // Find voltage
        switch(nameArr[j]){
          case "115V":
            key["voltage"] = "115V";
            break;
          case "230V":
            key["voltage"] = "230V";
            break;
          case "208-230V":
            key["voltage"] = "208-230V";
            break;
          case "460V":
            key["voltage"] = "460V";
        }
      }
    }

    // variants 
    if (key["sku"] == ""){
      // operation
      if (attValues[i].includes(": Automatic")){
        addMulti(key, "operation", "AutomaticOperation");
      }
      if (attValues[i].includes("Non-Automatic")){
        addMulti(key, "operation", "ManualOperation");
      }
      // phase
      if (attValues[i].includes("Single Phase")){
        addMulti(key, "phase", "1Phase");
      }
      if (attValues[i].includes("Three Phase")){
        addMulti(key, "phase", "3Phase");
      }
      // voltage
      if (attValues[i].includes("Voltage: 115")){
        addMulti(key, "voltage", "115V");
      }
      if (attValues[i].includes("Voltage: 230")){
        addMulti(key, "voltage", "320V");
      }
      if (attValues[i].includes("Voltage: 208-230")){
        addMulti(key, "voltage", "208-230V");
      }
      if (attValues[i].includes("Voltage: 460")){
        addMulti(key, "voltage", "460V");
      }
      // seal
      if (attValues[i].includes("Seal: Single")){
        addMulti(key, "seal", "1Seal");
      }
      if (attValues[i].includes("Seal: Double")){
        addMulti(key, "seal", "2Seal");
      }
      if (attValues[i].includes("Seal: Packing Seal")){
        addMulti(key, "seal", "PackingSeal");
      }
      // discharge type
      if (attValues[i].includes("Flanged")){
        addMulti(key, "discharge-type", "Flanged");
      }
      if (attValues[i].includes("NPT")){
        addMulti(key, "discharge-type", "NPT");
      }
    }
    // turn key dict into array
    var keyArr = Object.values(key);
    keyArr.push(":");
    productKey[i] = keyArr.join('_:_');
    row.push(productKey[i]);
    newTable.push(row);
  }
  if (add) {
    return newTable;
  }
  filename = "GeneratedProductKeys.csv";
  obj.data = newTable;
  console.log(newTable);
  return obj;
}

function divideStr(str) {
  var vals = str.split('/');
  return parseInt(vals[0]) / parseInt(vals[1])
}

function addMulti(key, name, str){
  if (key.hasOwnProperty(name)){
    if (key[name] == name){
      key[name] = str;
    } else if (!key[name].includes(str)) {
      key[name] += ',' + str;
    }
  }
}

// returns array of values for any given field
function makeArr(field, table) {
  var col = table[0].indexOf(field); // Find index of field
  if (col == -1 && field == "External ID"){
    var col = table[0].indexOf("ID");
  }
  var valArr = [];
  for (i = 1; i < table.length; i++) {
    if (table[i][col] != null){
      valArr.push(table[i][col]);
    } else {
      valArr.push("");
    }
  }
  return valArr;
}

// makes arr of bools indicating skip
function makeSkipArr(field, table) {
  var col = table[0].indexOf(field);
  if (col == -1 && field == "External ID"){ // corrects for odoo ID bug
    var col = table[0].indexOf("ID");
  }
  var skipArr = [];
  for (i = 1; i < table.length; i++) {
    if (table[i][col] == ""){
      skipArr.push(true);
    } else {
      skipArr.push(false);
    }
  }
  return skipArr;
}

// returns array of values for any given field skipping fields
function makeArrSkip(field, table, skip, sep=",") {
  var col = table[0].indexOf(field);
  if (col == -1 && field == "External ID"){ // corrects for odoo ID bug
    var col = table[0].indexOf("ID");
  }

  var valArr = [];
  for (i = 1; i < table.length; i++) {
    if (!skip[i - 1]){
      if (table[i][col] != null){
        valArr.push(table[i][col]);
      } else {
        valArr.push("");
      }
    } else if (table[i][col] != null && table[i][col] != ''){
      valArr[valArr.length - 1] = [valArr[valArr.length - 1],table[i][col]].join(sep);
    }
  }
  return valArr;
}

// returns array of array of markets found in tags
function getMarkets(tags) {
  var reg = regexMarkets();
  var matches = [];
  for (i = 0; i < tags.length; i++){
    matches.push(tags[i].match(reg));
  }
  return matches;
}

// Makes Regex out of Markets
function regexMarkets() {
  var marketStr = marketArr.join('|');
  var reg = new RegExp(marketStr, 'gi');
  return reg;
}

function replace(obj) {
  var table = obj.data;
  console.log(table);

  var column = document.getElementById("replace-column").value;
  var target = document.getElementById("replace-target").value;
  var value = document.getElementById("replace-value").value;

  //replace
  var col = table[0].indexOf(column);
  for (i = 1; i < table.length; i++) {
    if (table[i][col]) {
      table[i][col] = table[i][col].split(target).join(value);
    }
  }
  filename = "ModifiedInv(" + value + ").csv";
  obj.data = table;
  console.log(table);
  return obj;
}

// filters inventory
function filter(obj) {
  var table = obj.data;
  console.log(table);

  var column = document.getElementById("filter-column").value;
  var values = makeArr(column, table);
  var value = document.getElementById("filter-value").value;
  if (value == ""){
    var reg = /^$/gm;
  } else {
    var reg = new RegExp(value, 'gi');
  }
  var hasVal = matchVal(reg, values);
  var newTable = [table[0]]; // the first row
  var selection = document.getElementById("filter-have").value;
  if (selection == "have"){
    for (i = 1; i <= hasVal.length; i++){
      // only adds rows with x tag
      if(hasVal[i - 1]){
        newTable.push(table[i]);
      }
    }
  } else {
    for (i = 1; i <= hasVal.length; i++){
      // only adds rows with x tag
      if(!hasVal[i - 1]){
        newTable.push(table[i]);
      }
    }
  }
  if (selection != "have"){
    value = "-" + value;
  }
  filename = "FilteredInv(" + value + ").csv";
  obj.data = newTable;
  console.log(newTable);
  return obj;
}

// returns array of bools
function matchVal(reg, vals) {
  var matches = [];
  for (i = 0; i < vals.length; i++){
    if (vals[i].match(reg)){
      matches.push(true);
    } else {
      matches.push(false)
    }
  }
  return matches;
}

// downloads the csv file
function download(filename, text) {
  const fileStream = streamSaver.createWriteStream(filename, {
    size: 22, // (optional) Will show progress
    writableStrategy: undefined, // (optional)
    readableStrategy: undefined  // (optional)
  })

  new Response(text).body
    .pipeTo(fileStream)
    //.then(success, error)
}
