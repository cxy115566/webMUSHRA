/*************************************************************************
         (C) Copyright AudioLabs 2017 

This source code is protected by copyright law and international treaties. This source code is made available to You subject to the terms and conditions of the Software License for the webMUSHRA.js Software. Said terms and conditions have been made available to You prior to Your download of this source code. By downloading this source code You agree to be bound by the above mentionend terms and conditions, which can also be found here: https://www.audiolabs-erlangen.de/resources/webMUSHRA. Any unauthorised use of this source code may result in severe civil and criminal penalties, and will be prosecuted to the maximum extent possible under law. 

**************************************************************************/

function LikertScale(_responseConfig, _prefix, _initDisabled, _callback) {
  this.responseConfig = _responseConfig;
  this.prefix = _prefix;
  this.initDisabled = _initDisabled;
  this.callback = _callback;  
  this.group = null;
  this.elements = null;
} 

LikertScale.prototype.enable = function () {
  $('input[name='+this.prefix+'_response]').checkboxradio('enable');
}


LikertScale.prototype.render = function (_parent) {
  this.group = $("<fieldset data-role='controlgroup' data-type='horizontal'></fieldset>");
  _parent.append(this.group);
  this.elements = [];
  var i;
  if(this.responseConfig != null){
    for (i = 0; i < this.responseConfig.length; ++i) {
      var responseValueConfig = this.responseConfig[i];
      var img = "";
      if (responseValueConfig.description){
        var element = $("<p>" + responseValueConfig.label + "</p>" + "<p>" + responseValueConfig.description + "</p>");
        this.elements[this.elements.length] = element;
        this.group.append(element);
        if (responseValueConfig.rate){
          // 根据rate生成评分配置
          var rates = [];
          for (var i = 0; i < responseValueConfig.rate; ++i) {
              rates.push(i);
          }
          var labels = [];
          console.log(rates.length);
          for (var i = 0; i < rates.length; ++i) {
             labels.push(rates[i].toString());
          }
          var element = $("<p>" + responseValueConfig.min_value + " ----------> " + responseValueConfig.max_value + "</p>");
          this.elements.push(element);
          this.group.append(element);
          
          for (var i = 0; i < rates.length; ++i) {
            img = "<img id='"+this.prefix+"_response_img_"+i+"' width=50% src='"+responseValueConfig.img+"'/>";
            var element = $("<input type='radio' data-mini='false' value='"+rates[i]+"' name='"+this.prefix+"_response' id='"+this.prefix+"_response_"+i+"'/> \
              <label for='"+this.prefix+"_response_"+i+"'><center>"+""+labels[i] +"<br/>"+img+ +"</center></label> \
            ");
            this.group.append(element);
            this.elements.push(element);
          }

          
        }
      }else{ 
        var img = "";
        if(responseValueConfig.img) {
          img = "<img id='"+this.prefix+"_response_img_"+i+"' src='"+responseValueConfig.img+"'/>";
        }
        var element = $("<input type='radio' data-mini='false' value='"+responseValueConfig.value+"' name='"+this.prefix+"_response' id='"+this.prefix+"_response_"+i+"'/> \
          <label for='"+this.prefix+"_response_"+i+"'><center>"+responseValueConfig.label +"<br/>"+img +"</center></label> \
        ");
        this.group.append(element);
        this.elements[this.elements.length] = element;
      }
      
      
    }

    this.group.change((function() {
      var set = false;
      for (i = 0; i < this.elements.length; ++i) {
        if (set === true) {
          $("#"+this.prefix+"_response_img_"+i).attr("src", this.responseConfig[0].img);
        } else {
          if ($("#"+this.prefix+"_response_"+i+":checked").val()) {
            set = true;
            $("#"+this.prefix+"_response_img_"+i).attr("src", this.responseConfig[0].imgSelected);
          } else {
            $("#"+this.prefix+"_response_img_"+i).attr("src", this.responseConfig[0].imgHigherResponseSelected);
          }
        }
      }

      if (this.callback) {
        this.callback(this.prefix);
      }
    }).bind(this));
  }
  if (this.initDisabled) {
    this.group.children().attr('disabled', 'disabled');    
  }
  
};

