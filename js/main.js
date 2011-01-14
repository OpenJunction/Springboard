var JXSpringboard = new 
(function(){
	 var self = this;
	 this.logDiv = $("<div></div>");

	 $(document).ready(
		 function() {
			 $("body").append(self.logDiv);

			 self.log("URL Format = http://springboard?s=[JX-URI]&a=[ActivityAcript]&r=[Role]");

			 var uri = new jsUri(window.location);
			 var query = uri.query();

			 var jxUri = uri.getQueryParamValue("s");
			 self.log("JX URI=" + jxUri);

			 var script = {};
			 try{
				 script = JSON.parse(uri.getQueryParamValue("a"));
				 self.log("ActivityScript=" + script);				 
			 } catch (x) {
				 self.log("ERROR: parsing activity script: " + x.message);
			 }

			 var role = uri.getQueryParamValue("r");
			 self.log("Casted Role=" + role);

			 var agentFamily = self.agentFamily(window.navigator.userAgent);
			 self.log("Device Family=" + agentFamily);

			 var installUri = self.buildInstallUri(jxUri, script, role, agentFamily);
			 self.log("Install URI=" + installUri);

			 var launchUri = self.buildLaunchUri(jxUri, script, role, agentFamily);
			 self.log("Launch URI=" + launchUri);
		 });


	 this.buildInstallUri = function(jxUri, script, role, agentFamily){
		 var uri = new jsUri();
		 uri.setPath('/index.html');
		 uri.setHost('www.test.com');
		 uri.setPort(8080);
		 uri.setProtocol('https');
		 uri.setQuery('this=that&some=thing');
		 return uri;
	 };

	 this.buildLaunchUri = function(jxUri, script, role, agentFamily){
		 var uri = new jsUri();
		 uri.setPath('/index.html');
		 uri.setHost('www.test.com');
		 uri.setPort(8080);
		 uri.setProtocol('https');
		 uri.setQuery('this=that&some=thing');
		 return uri;
	 };

	 this.agentFamily = function(agentString){
		 if(agentString.indexOf("iPhone") > -1){
			 return "iPhone";
		 }
		 if(agentString.indexOf("iPad") > -1){
			 return "iPad";
		 }
		 if(agentString.indexOf("Android") > -1){
			 return "Android";
		 }
		 return "PC";
	 };

	 
	 this.log = function(str){
		 var span = $("<div></div>").html(str);
		 $(self.logDiv).append(span);
	 };



 })()