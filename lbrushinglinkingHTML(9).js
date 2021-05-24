(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.X_close = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(4.8,1,1).p("ABehdQAnAnAAA2QAAA3gnAnQgnAng3AAQg2AAgngnQgngnAAg3QAAg2AngnQAngnA2AAQA3AAAnAng");
	this.shape.setTransform(0.7,0.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhdBdQgngmABg3QgBg2AngnQAngnA2AAQA3AAAnAnQAnAngBA2QABA3gnAmQgnAng3ABQg2gBgngngAAEABIAlA3IAVAAIgwhDIAtg9IgTAAIgkAxIghgxIgUAAIAsA+IgyBCIAUAAIAmg3g");
	this.shape_1.setTransform(0.7,0.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAmBAIgmg2IAAAAIgmA2IgUAAIAyhCIgsg9IAUAAIAhAxIAkgxIASAAIgtA8IAxBDg");
	this.shape_2.setTransform(1.025,-0.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.X_close, new cjs.Rectangle(-14.9,-15.1,31.299999999999997,31.299999999999997), null);


(lib.show_btn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAZAvIAAguQAAgNgEgGQgDgHgIgDQgIgDgOAAQgMAAgPACIgBgOQAQgDAPAAQAcAAALALQALALAAAWIAAAxgAgnAvIAAgzIARAAIAAAzg");
	this.shape.setTransform(60.725,13.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAVAvIAAguQAAgLgDgHQgCgGgIgEQgIgEgNAAIgWABIgCgOQAOgCALAAQAbAAAMALQALALAAAWIAAAxg");
	this.shape_1.setTransform(50.275,13.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAXAvIgjgyQgIAEgBANIgEAhIgSAAIAEghQADgVAQgIIgWgfIAUAAIAdAqQAGgDACgFQACgEABgLIADgTIARAAIgCAUQgCAMgEAIQgEAHgKAGIAcAog");
	this.shape_2.setTransform(41.275,13.625);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAZAvIAAguQAAgNgEgGQgDgHgIgDQgIgDgOAAQgMAAgPACIgBgOQAQgDAPAAQAcAAALALQALALAAAWIAAAxgAgnAvIAAgzIARAAIAAAzg");
	this.shape_3.setTransform(30.575,13.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(6.8,1,1).p("AHCBpIAAjRQAAgygyAAIsfAAQgyAAAAAyIAADRQAAAyAyAAIMfAAQAyAAAAgyg");
	this.shape_4.setTransform(45,15.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("AmPCbQgyAAAAgyIAAjRQAAgyAyAAIMfAAQAyAAAAAyIAADRQAAAygyAAg");
	this.shape_5.setTransform(45,15.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.3,-3.3,96.7,37.699999999999996);


(lib.palm_zoom = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1));

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#602508").s().p("AAEABIgJAAIAAgBIAJAAIACAAIAAABIgCAAg");
	this.shape.setTransform(-10.075,16.775);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#8F593A").s().p("AgBAEIAAgHIABgCIACAAIAAACIgCADIAAABIAAADIAAACIgBAAIAAgCg");
	this.shape_1.setTransform(-11.2,15.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#7E3F1F").s().p("AgGAIIAAgCQAHgGAFgKIABAAIAAADQgBAEgDACIAAACIAAADIgCAAQgCAFgFACIAAgDg");
	this.shape_2.setTransform(-7.75,15.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#773A19").s().p("AgEABIAAgBQAEAAADgCIACgBIAAADIgCAAQgDADgEABIAAgDg");
	this.shape_3.setTransform(-8.975,16.525);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#A87654").s().p("AgDACIAAgCQADAAAAgEIABAAIADAAIgBACQgCAEgEADIAAgDg");
	this.shape_4.setTransform(-10.575,14.675);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#9C5D36").s().p("AgFAFQADgFAFgFIAAgBIACAAQAGAMgQABIAAgCg");
	this.shape_5.setTransform(-8.812,14.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FBCEB3").s().p("AgBAEIAAgEIAAgDIAAgCIABAAIABACQADAJgFAAIAAgCg");
	this.shape_6.setTransform(15.0613,50.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#F4C5A5").s().p("AgCAGIAAgCIAAgEIAAgDIACAAIAAgCQAHAFgGAGIgBAAIgCAAg");
	this.shape_7.setTransform(15.1913,49.325);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#6D3718").s().p("AgEAJIAAgDIAAgCQAEgEADgHIACgBIAAADQgBAFgEABIAAADIAAACIgCAAIAAADIgCAAg");
	this.shape_8.setTransform(15.125,48.325);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#E6CCC5").s().p("AAAAGIAAgLQADACgCAHIAAACg");
	this.shape_9.setTransform(20.7455,49.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#8F6543").s().p("AAAALIAAgCIAAgTIABAAIAAATIAAACIgBAAg");
	this.shape_10.setTransform(24.675,47.825);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#F5C6B5").s().p("AgCAAIAAAAIAFABIgFgBg");
	this.shape_11.setTransform(24.8689,49.835);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F4D0BA").s().p("AgFAAQAEAAgBgHIACAAIACAEIABABIABACIACAAIgBACQgDAGgCAAQgDAAgCgIg");
	this.shape_12.setTransform(22.7,50.0213);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#62381D").s().p("AgFAFIgCgBIgBgCIACAAIABgCQAGAEAFgGIAAgCIADAAIAAACIAAACIgCAAQgCAFgGAAIgEAAg");
	this.shape_13.setTransform(23.925,49.4735);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#976B48").s().p("AgBADIAAgIIACAAIAAACQACAHgEACIAAgDg");
	this.shape_14.setTransform(22.9688,46.85);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#5F3214").s().p("AAAAVIgDgFIAAgCIAAggIAAgCIACAAIAAAFIAAADIAAAJIAAACQAAALADAIIACAAIgBADIgCAAIgBAAg");
	this.shape_15.setTransform(22.95,47.6);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#804B27").s().p("AAAAFIgBgJIADAEIAAADIgCAAIAAACIAAAAg");
	this.shape_16.setTransform(22.575,45.25);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#743D1F").s().p("AgBADIAAgEIAAgCIADgCIAAACIAAACIgDAHIAAgDg");
	this.shape_17.setTransform(22.35,43.925);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#976141").s().p("AAAAGIgBgJIABAAIAAgCIACAAIAAACIgCADIAAABIAAADIAAACIAAAAg");
	this.shape_18.setTransform(22.1,43.125);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#C99374").s().p("AABAGIAAgBIgDABIAAgCIAAgDIACgCIAAgCIAAgCIABAAIABAGIABAAIAAADIAAACIgCAAg");
	this.shape_19.setTransform(22.45,42.875);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#683615").s().p("AgCAEIgBgGIAAgCIACAAQgBAEADAAIADAAIgBACIgEABIAAACIgBgBg");
	this.shape_20.setTransform(22.95,42.5);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#8C5635").s().p("AgEAFIAAgDIAAgCIAEgDIACgBIADAAIgBADIgCABIgCAAIAAACIgBAAIAAADIgDAAg");
	this.shape_21.setTransform(22.575,42);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#58280B").s().p("AAAALIAAgYIABAAIAAAWIAAACIAAACIgBABIAAgDg");
	this.shape_22.setTransform(15.975,43.625);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#743F1D").s().p("AgCAFIAAgCIAAgCIAEgGIAAABIABADQABAFgEgBIAAACIgCAAg");
	this.shape_23.setTransform(16.135,41.7);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#E7D0C6").s().p("AgBAEIAAgJIACAAIAAACQACAHgEACIAAgCg");
	this.shape_24.setTransform(18.5188,44.875);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#E6D0C7").s().p("AgBAGIAAgOIACAAIAAADQACAJgEAFIAAgDg");
	this.shape_25.setTransform(18.7558,42.375);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#E8CFC6").s().p("AAAAFIAAgMIABAAIAAADQACAJgDADIAAgDg");
	this.shape_26.setTransform(18.9955,40);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#783F24").s().p("AAAAFIgBgJIABAAIACAAIAAACIgCACIAAADIAAACg");
	this.shape_27.setTransform(16.6,40.25);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#C58858").s().p("AgBAjQgEgkgFABQAKgtAKAKIABABIAAACIgDADIAAAFIAAACIgCAAIABAKIABAAIAAADIgCACIAAgBIgFAGIAAACIAAACIAAAZIAAADIABACQABAFgEAAIAAgCg");
	this.shape_28.setTransform(15.75,42.0024);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#6F3619").s().p("AgEAOIAAgDIAAgFIACgCIAAgDIAAgBIAAgCQAEgDAAgHIABAAIACAAIAAACQgDAKgEAIIAAADIAAADIgCAAg");
	this.shape_29.setTransform(17.1,38.4);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#E7CFC6").s().p("AgBAJIAAgTIACAAIAAACQACAMgEAHIAAgCg");
	this.shape_30.setTransform(19.2558,37.175);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#613311").s().p("AgCAGIAAgCIAAgEIACgDIAAgCIACAAIABACQABAFgEgBIAAADIAAACIgCAAg");
	this.shape_31.setTransform(23.085,40.875);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#D4A270").s().p("AgEALIACgCIAAgDIAAgCIAAgDQADABgBgFIAAgCQAEgBgBgHIgBgCIACAAQAFAVgJAKIgCAAIAAAAQgEAAACgFg");
	this.shape_32.setTransform(23.3188,40.8771);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#7E4921").s().p("AABAKQABgHgEgBIAAgCIAAgJIACAAQAEAAgBAIIgBABIAAAIIAAACg");
	this.shape_33.setTransform(23.5938,37.3);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#75431E").s().p("AgDANIAAgCIAAgCQADgHAAgMIgBgDQAEABgBAHIABAAIABACQABAEgEAAIAAACIAAADQACAHgEAAIgCAAg");
	this.shape_34.setTransform(23.46,38.9);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#865227").s().p("AAAAJIAAgCQgDgFACgKQADAGABAIIAAADIgDAAg");
	this.shape_35.setTransform(23.2775,35.425);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#6F3C1A").s().p("AgBAOIAAgDIAAgDIAAgSIAAgDIAAgCIACAAIAAACQACASgEALIAAgCg");
	this.shape_36.setTransform(24.9558,47.85);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#E7C19A").s().p("AgFAUIgCgBQgEgHABgMQAEgBgBgIIgBgCIAAgDQAMgKAFAEIACABIAAAFIAAADIgCAAIAAACIAAACIgDAAIAAATIAAADIAAACQgDAFgDAAQgDAAgCgCg");
	this.shape_37.setTransform(23.9222,47.4522);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#703B18").s().p("AgDAFIAAgFQADgCACgEIACgBIgBACQgCAHgEAGIAAgDg");
	this.shape_38.setTransform(25.425,45.5);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#804B2A").s().p("AgDAEIAAgDQAEgBgBgFIABAAIADAAIAAACQgCAGgFADIAAgCg");
	this.shape_39.setTransform(26.175,44.125);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#B07846").s().p("AgJAaIAEgBIABgCQAIgKgEgUIgBgBIAAgDQACABAAgFIgBgCIAAgDIAAgIQAIAZgBAaIABAAIABACIABABIAAABIgTACIAAgDg");
	this.shape_40.setTransform(23.8,40.15);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#D8A675").s().p("AgNASIAAgDIAAgFIgBgCIgEgFIgCgBIAAgCIAEgHIABgCIACAAQAXABAFgGIABgCQAGgCgBAHIAAACIgBAAQAAAHgEABIAAABIAAADIgCAAQgCAFgEACIgCgBQgFgEgMAKIAAADIgCAAg");
	this.shape_41.setTransform(24.2317,44.4859);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#F0CAAA").s().p("AgOAEIAAgDIAAgBIATgCIAAgBIAIAAIACAAIgBACQgEAFgUAAIgEAAg");
	this.shape_42.setTransform(24.3,43.1269);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#76482A").s().p("ACzCiIgIAAIgBgBIgBgCQAEgEAIADIAAABIAAADIgCAAgAi0h7IAAgDIAAgCQAPgMAIgUIABgBIAAADQgHAUgPAMIAAADIgCAAg");
	this.shape_43.setTransform(7.675,26.6);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#5D2A0B").s().p("AABAGIABgCQABgGgGACIAAgDIADAAIACgCIACAAIAAAJIAAACIgDAAg");
	this.shape_44.setTransform(26.175,42.875);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#85502E").s().p("AgCALIAAgYIACAAIABAFIABAAIAAARIAAACIgBABIgDACIAAgDg");
	this.shape_45.setTransform(26.3,41.125);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#B97948").s().p("AAAgEIAAgCIABANIgBgLg");
	this.shape_46.setTransform(25.4,39.9578);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#6D3A1A").s().p("AgGAaIgBgFIAAgCIAAgGIANgmIACAAIgBACIgLAqIAAAEIAAADIgCAAg");
	this.shape_47.setTransform(27.05,37.65);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#E1D0C7").s().p("AACADIgFgFQAGgBABAEIAAADIgCgBg");
	this.shape_48.setTransform(11.025,54.5477);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#79482C").s().p("AgKAMIACAAQAKAAAEgIIAAgCIAAgCIAAgOQAEACAAAIIABAAIAAAEIAAACIgCAAIAAAFIAAADIgCAAQgFAFgEAAQgEAAgEgDg");
	this.shape_49.setTransform(13.75,50.9536);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#F6CBB4").s().p("AAIAbQgTgOgGgiQAFgMAAAMIAAADQgBANAHAFIACABQAIAGAJgHIACgBIABABQAGAKgMASIgCgBg");
	this.shape_50.setTransform(13.1973,52.125);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#BF8155").s().p("AAAAOIgDgVQAEgMABAMIACAAIAAACIgDAAIAAADIAAAOIAAACIgBAAg");
	this.shape_51.setTransform(14.275,49.775);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#915D40").s().p("AABAGQABgHgDgCIAAgCIABAAIACAAIAAAFIAAABIAAADIAAACg");
	this.shape_52.setTransform(14.625,49.825);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#F0D7BD").s().p("AgCAGIAAgCIAAgHIACAAIAAgCIABAAQAGALgHAAIgCAAg");
	this.shape_53.setTransform(12.7361,50.5875);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#F3D8BE").s().p("AgBAGIAAgDIAAgDIAAgBIAAgFQAHAJgHAEg");
	this.shape_54.setTransform(13.0875,48.65);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#C48659").s().p("AgCAAQAMAAgMABg");
	this.shape_55.setTransform(14.475,47.775);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#E9CFC6").s().p("AgJAAIARAAIACAAIAAAAIgJABQgGAAgEgBg");
	this.shape_56.setTransform(-0.05,48.085);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#B2744B").s().p("AgCAIIgBgEIAFgLIACgBIAAADQABAKgFAEIgCgBg");
	this.shape_57.setTransform(1.5821,43.125);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#6A381C").s().p("AgHAPIAAgDQAFAAACgDIAAgCQAGgEgBgKIAAgCIAAgDIAAgCIACADIAAACIABACQABAIgEAEIAAACIAAADIgCAAQgCAFgFAAIgDAAg");
	this.shape_58.setTransform(1.4938,43.2577);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#EFD4B2").s().p("AAAAIIgFgCIAAgCIAAgMQARAAgKAPIgBACIgBgBg");
	this.shape_59.setTransform(0.0504,43.6242);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#F3D1C0").s().p("AgSAHQANgEgFgUIABAAIABACIACABQABAIAKgCIAAgBQAJABACgGIACAAIABAAIgEAVIgBABQgIAKgHAAQgJAAgIgLg");
	this.shape_60.setTransform(0.175,45.7503);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#8E6246").s().p("AABAIIgBgCIAAgBQgDgCACgGQADABAAgGIABAAIAAADIAAALIAAADIgCgBg");
	this.shape_61.setTransform(-0.8225,43.375);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#A76D45").s().p("AgDAPIgCgCIgBgCQgDgGABgJQAGgJAGgDIACAAIACADIABABIgBACQgIAKgDARIAAgCg");
	this.shape_62.setTransform(2.5525,40.5);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#885234").s().p("AgBACIgCgCIAAgDIAEAAIADAAIAAADQgBADgDABIgBgCg");
	this.shape_63.setTransform(3.575,38.875);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#936B43").s().p("AgBAFIAAgCIAAgFIABAAIAAgCIACAAIAAACIgCACIAAADIAAACIgBAAg");
	this.shape_64.setTransform(-0.05,41.5);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#EAC9A2").s().p("AgDAKIAAgDIAAgCIACgDIABgCIAAgCIAAgFIABAAIAAgCIACAAQADATgHAAIgCAAg");
	this.shape_65.setTransform(0.3204,41.0128);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#875A38").s().p("AgCAIIAAgDIAAgLIACAAIABABIABABIAAACIAAACIgCAAIAAAFIAAADIgCAAg");
	this.shape_66.setTransform(0.2,40.25);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#D3A878").s().p("AgIAhIgCAAIABgCQAJgPgSAAIAAgDIAAgCIAAgCIADAAIACAAQAKACgDgVIgCgBIAAgCQASgGgKgMIAAgCQAFABAEADIACACIAHABIABABIAAACIgDAAQgHAEgFAIQgCALAEAEIAAACIAAADIAAACIgBAAIgFAMIAAAFIABABIAAABQgBADgFAAIgDAAg");
	this.shape_67.setTransform(1.325,41.15);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#EDD3B3").s().p("AgFAHIAAgNIAFgDIACAAIAAACQALALgSAGIAAgDg");
	this.shape_68.setTransform(1.0401,38.775);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#5E3616").s().p("AAAAIIAAgCIAAgDIAAgKIABAAIAAANIAAADIgBgBg");
	this.shape_69.setTransform(0.325,38.9);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#9A6C51").s().p("AAAADIgCgGIACAAIADAAIgBACIgCACIAAADIAAgBg");
	this.shape_70.setTransform(0.7,36.675);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#7D5139").s().p("AgDAFIAAgCIAAgDQAEAAABgDIACgBIAAACQgBADgDACIAAACIgDAAg");
	this.shape_71.setTransform(1.075,35.8);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#C58258").s().p("AgCAAIAAAAIAFABIgFgBg");
	this.shape_72.setTransform(14.2125,46.3889);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#DEAE85").s().p("AgMAdQgFgCABgGQALACgHgOIgCAAIAAgDIAAgFIADAAIAAABQAHgCgHgKIAAAEIAAADIgCAAQgBgMgCgLQAJgEAMAAIACAAQAPAAgHAMIAAACIgCABQgDAHgFAFIAAADIgBAAQgBgNgEANIACAUIACABIgBACQgDAIgKAAIgBgCgAAAgLQANgBgNgBgAgBgbQALAEgLgEg");
	this.shape_73.setTransform(14.1341,49.1);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#724425").s().p("AADAdIgCgBQgGgGABgNQAIgLgFgSIAAgDIAAgCIAAgDIABAAQADAKABANIABAAIAAACIAAADIgCAAIAAAEIAAACIgBACIgCABIAAAHIAAADQAAAGAFACIAAACIgCAAg");
	this.shape_74.setTransform(12.3933,49.325);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#F1C7A4").s().p("AgLADIAAgEIACAAIADAAIAGgCIAAgBQAEADAIABIAAAAIgCAAQgMAAgJAFIAAgCg");
	this.shape_75.setTransform(13.625,45.975);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FCDBBE").s().p("AAGACIgDAAIgGAAIgCgBIgBgBQAKgCADAEg");
	this.shape_76.setTransform(13.825,45.0942);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#805034").s().p("AAHALQAHgLgOAAIAAgCQgIAAgEgDIgCgBIAAgBIAHAAIADAAQAEADAFABIACAAQAEABgBgGIgBgCIACgBIABgCIABAAQAGASgMAIIAAgCg");
	this.shape_77.setTransform(14.9223,46.1);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#8C5C3D").s().p("AgCAJQAAgJgDgFIACgBIAAgBIADAAIABAAQAAAEAFgBIAAABIgCAAIgDAAIAAAFIAAABIgBAAIAAADIAAADg");
	this.shape_78.setTransform(12.275,46.1);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#E8D0CA").s().p("AgBAFIAAgLIACAAIAAACQABAIgDADIAAgCg");
	this.shape_79.setTransform(10.56,47.7);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#E0C9C3").s().p("AAAALIAAgYQADALgDAPIAAABIAAgDg");
	this.shape_80.setTransform(10.785,42.875);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#6C3719").s().p("AAAAKIgDAAIAAgCIAAgDQADgFABgHIAAgCIACAAIABACIAAADQABAFgEgBIAAACIAAADIAAADIAAACIgBAAg");
	this.shape_81.setTransform(12.2955,44.25);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#7A4928").s().p("AAAAHIgCgBIAAgCQADgEAAgIIABAAIAAADIAAACIAAADQACAHgEACIAAgCg");
	this.shape_82.setTransform(12.6705,42.625);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#5D2C07").s().p("AAAAEIAAgDIAAgBIAAgFIABAAIAAACQACAHgDACIAAgCg");
	this.shape_83.setTransform(13.0455,41.625);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#E4CDC4").s().p("AgBAQIAAghIACAAIAAACQACAUgEAOIAAgDg");
	this.shape_84.setTransform(10.8058,38.9);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#623213").s().p("AAAAJIAAgMIAAgCIAAgFIABAAIAAAHIAAADIAAAGIAAADIgBACIAAAAIAAgCg");
	this.shape_85.setTransform(13.025,37.9);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#E3B187").s().p("AAAAFIAAgGIAAgDIAAgDQADAFgDAJIAAAAIAAgCg");
	this.shape_86.setTransform(13.2643,37.05);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#723D1D").s().p("AAAAEIAAgJIAAAAIABACIAAADQACAFgDABIAAgCg");
	this.shape_87.setTransform(12.7955,35.675);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#C18A57").s().p("AgJAtIAAgDQAEABgCgGIAAgCQAEgCgBgIIAAgDQAEgCgCgIIAAgCIABgCQAEgKgFgKIAAgCIAAgHIABgBQACgKgDgEIAAACIAAADIgCAAIAAAFIAAACIgCAAIgBgMQAEgBgBgHIAAgCIACAAIABAAQADAbAFgKIAAgBQALAygbAbIAAgCg");
	this.shape_88.setTransform(13.4182,40.025);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#865132").s().p("AABAJIgBgCIAAgBIgCAAIgBgOIADAAIAAAJIABAAIABACIACABIAAACIAAADIgDAAg");
	this.shape_89.setTransform(12.775,34.425);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#5A2B09").s().p("AAAAGIAAgCIAAgDIAAgGIABAAIAAACIAAADIAAAEIAAACIgBAAg");
	this.shape_90.setTransform(13.025,34.175);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#8E633B").s().p("AAAACIgHAAIAAgCIAAgBQAHgBAHACIABAAIgDAAIgDAAIAAACIgCAAg");
	this.shape_91.setTransform(13.9,33.8);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#CF9C7D").s().p("AAAAGIAAgJIAAgCIAAAAIABACIAAAHIAAACIgBAAg");
	this.shape_92.setTransform(12.775,33.925);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#693715").s().p("AAAAGIAAgCIgBAAIAAgDQACAAAAgGIABAAIAAACIAAADIAAAEIAAACIgCAAg");
	this.shape_93.setTransform(12.9,32.925);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#EED6A8").s().p("AgCAAIAAAAIAFABIgFgBg");
	this.shape_94.setTransform(14.7,32.185);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#E6D1CB").s().p("AAAAEIAAgJIABAAIAAACQACAHgDACIAAgCg");
	this.shape_95.setTransform(11.0455,34.925);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#E7D0C8").s().p("AAAAEIAAgJIABAAIAAACQACAHgDACIAAgCg");
	this.shape_96.setTransform(11.2955,32.925);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#6F4119").s().p("AgCAFIAAgDIAAgEIACAAIAAgCIADAAIAAACIAAACIgCAAQAAAFgCAAIgBAAg");
	this.shape_97.setTransform(13.4,31.8021);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#7F5131").s().p("AgFALIAAgDQAGgFABgNIACAAIAAABIACABIAAACQgEAJgFAIIgCAAg");
	this.shape_98.setTransform(14.025,30.2);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#844624").s().p("AgCACIAAgGIACAAIACAAIAAACIgEAHIAAgDg");
	this.shape_99.setTransform(4.7,35.3);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#8E532D").s().p("AgJAQIAAgCIAAgDIACgCIAAgDIAAgCQAHgIAGgLIACAAIABAEIABABIgBACQgHALgJALIAAACIgCAAg");
	this.shape_100.setTransform(5.7,33.175);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#754F34").s().p("AADAFQgFgDgCgEIAAgCQAEACADAEIACABIAAACIgCAAg");
	this.shape_101.setTransform(5.95,29.6);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#7B4324").s().p("AgEAVIgBgFQAHgEgEgGIgBgCQAKgEgCgUIABAAIAAAIIAAACIAAACQABAUgKAGIAAADIgBAAg");
	this.shape_102.setTransform(7.0792,29.95);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#70381D").s().p("AgBAKIAAgIIAAgCIAAgLIACAAIAAACQACAOgEAIIAAgDg");
	this.shape_103.setTransform(7.8188,27.6);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#F4D7B6").s().p("AAHAGQgDgFgEgBIgCgBQgBgDgFABIAAgCQAPgDABAMIABACIgCAAg");
	this.shape_104.setTransform(5.575,29.2042);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#864F2F").s().p("AgDAIIAAgDIAAgDQAEgBgBgIIABAAIABACIACABIAAADQgCAEgCAFIgDAAg");
	this.shape_105.setTransform(8.025,25.6);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#7B411D").s().p("AAAAEIgBgCIAAgCIAAgEIABAAIACAAIAAADIgCABIAAACIAAADIAAgBg");
	this.shape_106.setTransform(8.4,24.6);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#7E4221").s().p("AgCAEIAAgDIAAgEIACAAIADAAIgBADIgCABIAAADIgCAAg");
	this.shape_107.setTransform(8.65,23.725);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#F6CBB9").s().p("AAAAJIAAgRIABAAIAAAMIAAACIAAADg");
	this.shape_108.setTransform(14.275,27.225);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#654229").s().p("AADACIgFgCIgCAAIAAgBIACAAQAFgCABADIABAAIAAADIgCgBg");
	this.shape_109.setTransform(4.95,29.0775);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#A86C43").s().p("AAAARIAAgGIgBgCQgCgHAAgHQADgFACgHIACAAIAAAHIAAADIAAACQgBAOgDAKIAAgCg");
	this.shape_110.setTransform(4.075,36.65);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#DAA372").s().p("AgTAlQAVgogCgcIAAgDIAAgBQgHAAgCgEQAGACABgEIAAgDIAEACIADABQACAFAFACIADAAIABABIABACIABABQAFAHgIAEIgCAAQgGALgHAIIAAACIgCABIgCACIAAAFIAAACIgCAAQgCAIgEAFQAAAIACAHIABACIgCABIgEACQgDAAgBgIg");
	this.shape_111.setTransform(4.958,33.5667);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#B07247").s().p("AgCAFIAAgCIAAgFIACgCIACAAIAAACIgCACIAAADIAAACIgCAAg");
	this.shape_112.setTransform(4.7,34.3);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#794B2A").s().p("AgBAKIAAgHQADgEgBgKIABAAIAAACIAAACIAAAFIAAACIAAADQAAAGgDAEIAAgDg");
	this.shape_113.setTransform(1.95,33.55);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#693D1D").s().p("AgCALIAAgCIAAgDIAAgTIACAAIADAAIAAADIgFAXIAAgCg");
	this.shape_114.setTransform(2.45,31.45);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#5F3013").s().p("AgCAHIAAgCIAAgLIAEAGIABADIgDAAIAAACIAAACIgCAAg");
	this.shape_115.setTransform(2.7,29.35);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#F3D6B4").s().p("AAAAEIgCgBQgEgBAAgFQAGgCADAEIACABIACAAIAAABQAAADgEAAIgDAAg");
	this.shape_116.setTransform(3.95,29.2091);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#EEC69E").s().p("AAJAqIgFAAIgBgBIgGgBIAAgCQgFgGgKgCIAAgCIgCAAIAAgDIACgDIAAgCIAAgCQAFgCAAgEIAAgCIACgDIABgCQAFgDAAgGIAAgCQAHARAOgyIAAgCIADAAIACAAIAAACQACAcgWApQACALAGgFIACgBIAAAFIAAACIgCAAg");
	this.shape_117.setTransform(2.8333,34.3);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#D4A774").s().p("AgKARIAAgCIAAgFIAFgYIAAgCIAAgDIAAgCIACAAQgEAbAQgWIACAAIAAACQgKAkgGAAQgDAAgCgFg");
	this.shape_118.setTransform(3.325,31.831);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#865E42").s().p("AAEABQgCgCgHABIAAgBIALABIAAAAIAAACIgCgBg");
	this.shape_119.setTransform(3.825,28.85);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#BA875A").s().p("AgGgBIgBgCIgFgIIAAgCIADAAIADACIACAAIAAADQABAFADACIADAAQABADAIAAIAAABIgCAAIgDAAIgCABQgGAKgDAAQgFAAADgPg");
	this.shape_120.setTransform(3.7,29.7512);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#704021").s().p("AAAAIIgBgCIAAgCIAAgDQACgBAAgIIACAAIAAAOIAAADIgDgBg");
	this.shape_121.setTransform(2.95,27.725);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#7A4D31").s().p("AgHANIAAgDQAIgKAFgOIABAAIAAACIAAADQgCAIgFAEIAAACIAAACQgCAFgFADIAAgCg");
	this.shape_122.setTransform(4.2,24.85);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#E8A081").s().p("AgMALIAAgDQAEgCABgEIAAgCQAHgFAFgHIACAAIAAABQATAQgmAJIAAgDg");
	this.shape_123.setTransform(-6.1665,14.3);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#793F1B").s().p("AgJAGIAAgCQAHgHAKgEIACgBIAAACIgFADIgCABQgEAGgIAFIAAgDg");
	this.shape_124.setTransform(-6,13.325);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#E5B994").s().p("AgFAGIgBgEQAGgIADABIACAAIACADIAAACIAAABQgHACgEAEIgBgBg");
	this.shape_125.setTransform(-4.5,11.545);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#7A4526").s().p("AgJAEQAFgEAGgBIAAgCIADgCIADAAIACAAIgBACQgDADgGABIAAADIgBAAQgDACgFAAIAAgCg");
	this.shape_126.setTransform(-4,11.825);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#814722").s().p("AgCACIAAgCIAAgCIACgBIAAgBIADAAIAAACQgBAFgEACIAAgDg");
	this.shape_127.setTransform(9.9,20.9);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#A26F51").s().p("AAAACIgDAAIAAgCIAAgBQADACAEgBIAAAAIgBACIgCAAIgBAAg");
	this.shape_128.setTransform(11.525,18.4);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#8C5734").s().p("AgEABIAAgBIAEgBIAAgCIADAAIACAAIAAACQgDAEgGABIAAgDg");
	this.shape_129.setTransform(11.15,19.025);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#915932").s().p("AAAAFIgDAAIAAgDQADgCACgEIACAAIAAACIAAACIgBAAQAAAFgDAAIAAAAg");
	this.shape_130.setTransform(10.275,19.9021);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#6D3C22").s().p("AACAEQgDACgDgDIAAgDQAEAAACgCIAAgCIADAAIAAACQABAHgEAAg");
	this.shape_131.setTransform(11.6705,17.9);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#F0D5B6").s().p("AgLAdQAGgfAQgbIABAAQgGAkgRAYg");
	this.shape_132.setTransform(6.925,23.2);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#6E391A").s().p("AgEAIIAAgCIAAgCQAEgFACgHIAAgCIADAAIAAACQgEALgFAIIAAgDg");
	this.shape_133.setTransform(5.45,22.5);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#B07146").s().p("AgMAZIgBAAIAAgCQAFgFACgIIABgCQAFgIADgLIABgCIAAgDIAEgPIABgCIABgBQAPgWgMArIgBAAQgSArgMANQAFgIABgKg");
	this.shape_134.setTransform(5.5667,22.8385);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#6F3616").s().p("AgDAXIAAgDIAAgFQADgCAAgIIAAgCQADgEgCgKIAAgDIAAgDIAAgEIADAAIAAAVIAAADIgBACIgDAPIAAADIgDAAg");
	this.shape_135.setTransform(6.075,19.15);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#AB6F53").s().p("AAAAGIAAgOIABAAIAAADQACAJgDAFIAAgDg");
	this.shape_136.setTransform(6.0955,18.525);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#72411E").s().p("AALAGQgLgDgIgDIgCgBIgDgCIAAgCIAaAKIABABIgDAAg");
	this.shape_137.setTransform(9.775,17.275);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#DBA576").s().p("AgFBGIgBAAIAAgDIgBgCQgBgNgQADIAAACIgCAAIgBgBIgMgBIAAgDIAAgPIAAgCIAAgDIADAAQAEgDADgEIAAgDIABAAQgBAKgFAIQAMgNATgrIABAAQALgrgOAWIgBABIAAgDIAAgWQAEgDACgHIAAAAQABAPAQgBIAAgCQAJAFALADIADAAIAAACIAAADIAAACIgBACIgEABIAAACIAAADIgCAAQgCAFgEACIAAADIAAABIgCABIAAADIAAACIgCAAQgCAKgGAFIAAAEIAAACIgDAAIAAAFIAAADIgCAAIAAAFIAAACIgBAAQAAAIgEACIAAADIAAACIAAANIAAACIgBAAQACAUgKAFIgBgCgAAIgcQgQAbgGAfIAAABQARgYAHgkIgCABg");
	this.shape_138.setTransform(7.175,23.125);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#E8BB88").s().p("AgGgBIAAgBIANAFIgNgEg");
	this.shape_139.setTransform(9.1188,15.9576);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#ECCCA8").s().p("AgIgFIAAgCIAKALIACAAIADACIACABIAAABIgCAAQgNAAgCgNg");
	this.shape_140.setTransform(8.025,16.4781);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#733F1E").s().p("AAKAJIgLgKIAAABIgBAAQgBAIgEACIgDAAIAAgDQAEAAgBgHIAAgBQAHABAAgJIABAAQABAKAJAFIAAABIAAADIgBgBg");
	this.shape_141.setTransform(7.3,15.9);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#955D3F").s().p("AgFAGIAAgDIAAgCQAEgCABgEIABAAIACAAIADAAIAAACIAAACIgDAAIgBABQAAAGgFAAIgCAAg");
	this.shape_142.setTransform(7.05,15.0556);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#E3B990").s().p("AgFALIAAgDIAAgCIAAgCIAAgMIACgBIAAgBQADADAGAAIAAACIgBAAQgEAQgFAAIgBAAg");
	this.shape_143.setTransform(8.275,13.8026);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#6B3A1A").s().p("AAAALIgDAAIAAgCIAAgDQADgHADgJIABAAIAAACIAAADIgBABIgCABIAAAMIAAACIgBAAg");
	this.shape_144.setTransform(7.525,13.325);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#95653C").s().p("AAAADIAAgDIgCgEQAJADgGAFIgBABIAAgCg");
	this.shape_145.setTransform(9.2226,11.7);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#F8E4CC").s().p("AgDgDIAEAAIADAAIAAADIgBABQgDADAAAAQgDAAAAgHg");
	this.shape_146.setTransform(8.7734,12.3074);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#EABD99").s().p("AABAEIgEAAIAAgDIAAgBIADgCIABgBIACAEIABADIgDAAg");
	this.shape_147.setTransform(8.775,11.575);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#EBC08F").s().p("AgKAAQAqgBgqACg");
	this.shape_148.setTransform(10.975,13.46);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#9C6C52").s().p("AAAAFIAAgLIABAAIAAACQACAIgDAEIAAgDg");
	this.shape_149.setTransform(13.5455,13.7);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#724021").s().p("AgCAQIAAgDIAAgFIAEgXIAAACIAAANIAAABIAAACQACAHgEAAIAAADIAAADIgCAAg");
	this.shape_150.setTransform(13.1705,14.35);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#EAD3CB").s().p("AAAAKIAAgDIAAgQQADAHgDAMg");
	this.shape_151.setTransform(30.1643,31.325);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#724125").s().p("AgBADIAAgHIABAAIACAAIAAACIgDAHIAAgCg");
	this.shape_152.setTransform(28.05,34.55);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#916140").s().p("AAAAFIgBAAIAAgJIADAHIAAACIgCAAg");
	this.shape_153.setTransform(28.05,31.8);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#F2D6B6").s().p("AABADIgBAAIgBgCIgCgCQAFgEACAGIAAACIgDAAg");
	this.shape_154.setTransform(25.425,32.462);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#5D2D0E").s().p("AAEAJIAAgDQACgIgJACIgCAAIAAgDIACAAQAGACABgEIAAgDIACAAIAAAOIAAADIgCAAg");
	this.shape_155.setTransform(27.675,33.175);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#F2D5BC").s().p("AgFgDIAFAAIACAAIACAAIABADQAAAAAAABQABABAAAAQAAABgBAAQAAABAAAAQgDAAgHgHg");
	this.shape_156.setTransform(26.8682,33.4096);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#936B4D").s().p("AABACIgEAAIgCAAIAAgCIAAgBQAFAAAGABIAAAAIgCAAIAAACIgDAAg");
	this.shape_157.setTransform(26.675,32.8);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#F9CCB7").s().p("AAAAFIAAgLIABAAIAAACQACAIgDADIAAgCg");
	this.shape_158.setTransform(27.9455,29.6);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#8D5D41").s().p("AgCgEIACgDIAAgCIADAAIAAALIAAADIgBACIgBADQgBAAgCgOg");
	this.shape_159.setTransform(27.55,29.8779);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#BA814F").s().p("AgBAFQADgGgBgNIABAAIAAATIAAACIgBAAQgBAIAAAAQgBAAAAgKg");
	this.shape_160.setTransform(27.05,27.8958);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#BF8150").s().p("AAAgCIAAgCIABAJIgBgHg");
	this.shape_161.setTransform(26.9,24.3585);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#F5CBBB").s().p("AgFAAIAAgDQATgHgNANIgBABIgCAAIgCACQgBAAAAgGg");
	this.shape_162.setTransform(28.4029,25.2028);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#5A2808").s().p("AAAATIAAgFIAAgDIAAgTIAAgCIAAgKIABAAIAAAiIAAACIAAACIgBADIAAgCg");
	this.shape_163.setTransform(27.425,27.225);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#E3B7A3").s().p("AAAATIgDAAIAAgDIAAgiIADAAQgBALADgFIACgBIgBADIgCACIAAAYIAAADIgBAAg");
	this.shape_164.setTransform(27.925,26.975);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#834F31").s().p("AAAAEIgCAAIAAgDIAAgEIACAAIADAAIAAADIAAABIAAADIgDAAg");
	this.shape_165.setTransform(27.55,24.725);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#E7D4CC").s().p("AAAAHIAAgNQADACgCAJIAAACIgBAAg");
	this.shape_166.setTransform(29.9455,27.1);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#EFD6B4").s().p("AgHABIAAgBIAAgCQAUAFgHAAIgNgCg");
	this.shape_167.setTransform(24.1188,33.8167);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#DBA776").s().p("AACAvIAAgBQgHgCgEADIgBAAQABgbgIgYIABgCQABgHgEgBIAAgCQgBgJgEgGIAAgDIAAgFIACAAIABACQAfAEgggIIAAgDQAGACAHAAIAAgCQAIABAEgDIACAAIACAAQAPANgEgLIgBgCQAKgCgCAJIAAADIgDAAIAAAHIAAADIgBAAIgOAmIAAAFIAAADIgCAAIAAAZIAAACIgDAAgAgCARQADAZgDgbIAAACg");
	this.shape_168.setTransform(25.5674,37.7576);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#75411F").s().p("AgFACIgCAAIgBgCIAFAAIADAAIABAAIAAgCIADAAIACAAIADAAIAAACIgCAAQgEADgEAAIgEgBg");
	this.shape_169.setTransform(25.175,33.0625);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#E8D3CB").s().p("AAAAUIAAgnIABAAIAAAlIAAACIgBAAg");
	this.shape_170.setTransform(21.225,36.3);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#AA7753").s().p("AgCAAIAAgDIACgCIABAAIACAAQAAALgCAAQgBAAgCgGg");
	this.shape_171.setTransform(22.9,32.4328);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#AC7548").s().p("AgIAHIAAgDQAFgDgCgIQADAJALABIAAABIgDAAIgFAAIABACIACABIAAABIgDAAQgEAAgFgBg");
	this.shape_172.setTransform(24.175,32.63);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#733F1B").s().p("AgBASQgEgJABgMQAFARAAgWIgBAAIAAgCQAEgPAAAMIAAADIABACQABAJgEADIAAACIAAADIAAACIgCAAIAAAFIAAADIgBgBg");
	this.shape_173.setTransform(23.116,32.6533);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#6E381C").s().p("AgEALIAAgCIAAgFQAEgDAAgEIAAgCIAAgDIADgCIACAAIgBACQgCAJgDAIIAAACIgDAAg");
	this.shape_174.setTransform(17.85,35.925);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#875336").s().p("AgBALQgBgFgFgCIACgBIABgCIACAAQAEgBgBgIIABAAIACAAIABgCQAEAFgDALIgBAAIgCABIgDACIAAACIgBAAg");
	this.shape_175.setTransform(17.86,34.175);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#E2B386").s().p("AADA6QgFgBgEgDIABAAQgDgFgLACIABACIACABIAAABIACABIAAABIgHACIAAgCQgGABABgEIAAgDIAAgCQAbgbgKgzIAAACQgFAJgEgbIgBAAIAAgCIAAgDIAAgCIAAgFIAIAAIACAAQAQgBALAFIACABQAEACACAFIABAAIAAADQgBAFgEACIAAAFIAAADIgBAAQABAIgFACIAAACIAAACIgBAAQgLgLgJAtQAEgCAFAlIAAADIgCgBg");
	this.shape_176.setTransform(15.1229,39.8923);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#69351A").s().p("AAMADQgLgEgQABIAAgDIACAAIADAAIAHAAIACAAQAJABAGADIACAAIgBACIgBABIgCgBg");
	this.shape_177.setTransform(15.75,34.175);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#BE8650").s().p("AgKADIAAgCIAAgCQAEABgBgGIACAAQAEAJAMABIAAABIgCAAIgCABIgHABQgGAAgEgEg");
	this.shape_178.setTransform(14.25,32.5);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#DCB185").s().p("AAKAFIgHAAIgBgBQgGgCgHABIAAgDIAAgEQAGAFAKgCIACgBIAFAFIAAACIgCAAg");
	this.shape_179.setTransform(14.375,33.3);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#EDCFAB").s().p("AAKAHIgCgBQgGgEgJAAIAAgCIgEgFIACAAQAQgDAFAMIABADIgDAAg");
	this.shape_180.setTransform(16.35,33.639);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#5D2914").s().p("AAAAGIAAgBIAAgCIAAgHIAAgDIABADIAAADIAAAGIAAACIgBgBg");
	this.shape_181.setTransform(14.525,28.6);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#E6D0CA").s().p("AAAAFIAAgMIABAAIAAADQACAJgDACIAAgCg");
	this.shape_182.setTransform(19.4955,32.55);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#723F1F").s().p("AABAaQgFgYABgdIADAAQgCAdAFAVIABADIgBACIgCAAIAAgCg");
	this.shape_183.setTransform(17.9609,30.45);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#B57B4C").s().p("AAAAJIgBgCQgCgEAAgFQAEgLABAIIACAAIgBACIgCABIABAGIACAAIgBACIgCABIAAACIgBAAg");
	this.shape_184.setTransform(17.7208,26.677);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#EECFA5").s().p("AgCAUQgBAAAAgIIAHgdIAAgCQABAngGAAIgBAAg");
	this.shape_185.setTransform(16.2368,26.8512);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#98694A").s().p("AAAAOIAAgDIAAgYIABAAIAAARIAAACIAAADQABAFgCAAIAAAAg");
	this.shape_186.setTransform(14.5455,24.4771);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#804F33").s().p("AAMA8IgCgDIAAgCIAAgNIAAgCIAAgDQAEABgCgGIAAgCIACAAIABACQABASgEAMIAAgCgAgOguIAAgDQAFgEADgIIACAAIACAAIAAACQgEAHgGAGIgCAAg");
	this.shape_187.setTransform(13.4205,22.125);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#703C1B").s().p("AgDAMIgBgHIACgBIAAgBIAAgDIAAgCIAEgHIABgDIACABIAAACIAAADIgHAOIAAACIAAACIgBAAg");
	this.shape_188.setTransform(18.35,25.85);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#82512D").s().p("AgBgGIABAAIADAAIAAACQgDALAAAAQgCAAABgNg");
	this.shape_189.setTransform(23.7979,29.5578);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#B77C48").s().p("AgCATIAAgnQAKAMgIAdIgCAAIAAgCg");
	this.shape_190.setTransform(24.3327,25.725);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#FDC9AA").s().p("AgFADQAYgOgYAPg");
	this.shape_191.setTransform(22.7375,22.5803);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#5C2A0D").s().p("AAAAoIAAgDIAAhJIAAgDIABAAIAAAZIAAACIAAAnIAAADIAAAHIAAADIgBAAg");
	this.shape_192.setTransform(23.925,24.875);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#A06241").s().p("AgBAEIAAgJQAIgCgHANIgBAAIAAgCg");
	this.shape_193.setTransform(21.0955,17.0175);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#7C4927").s().p("Ag3BsIAAgCIAAgSIACAAIABgCQAGAKgGAKIAAACIgDAAgAAzhaIAAgCIgDgPIADAAQABAHADAFIABADIgDAAIAAACIgCAAg");
	this.shape_194.setTransform(18.475,30.2);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#BB7E47").s().p("AgGAAIgBAAIAOABIgNgBg");
	this.shape_195.setTransform(24.5563,19.5389);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#885B37").s().p("AAAAJIgBgBIgCgLQADABAAgGIABAAIADAAIgBACIgCABIAAALIAAADIgBAAg");
	this.shape_196.setTransform(23.425,18.525);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#BA7D44").s().p("AgEAAIgBgCIALAFIgKgDg");
	this.shape_197.setTransform(15.9438,19.9079);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#622F0E").s().p("AAAAVIAAgDIAAgRIAAgBIAAgSIAAgCIABAAIAAAmIAAADIgBAAg");
	this.shape_198.setTransform(14.75,23);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#9C6A4A").s().p("AgCAFIAAgCIAAgEIACgBIAAgCQADAAgBAEIAAADIgCAAIAAACIgCAAg");
	this.shape_199.setTransform(14.6611,20.6479);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#794320").s().p("AgKADIgBgCQgFgHgJAFIAAgDQARAAAgAGIACABIAAABIgQABQgLAAgJgCg");
	this.shape_200.setTransform(17.975,18.3771);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#DDA876").s().p("AAEBMQgFgOgQAEIAAgBQgNgCgEgKIAAgCIAAgDQAGgHADgKIABgCIAAgDIAAgHQAEgMgCgRIAAgDIAAgCIAAgoIAAgCQABgGgDABIAAgDIAAgFIABAAIABgCQALgFAJABIAAgBQAPADAVgCIAAgBIABAAQgDAjgSAWIAAACIAAADIgFAHIAAADIAAACIgBAAQgCgIgEALQgBAFADAEIAAACQgBAfAGAYIAAACIgBAAQABAIgFACIAAgCgAgbA5QAMADgMgEgAgFgNIgHAdQAAAIABAAQAIABgCgoIAAACgAgRhCQAWAIgWgJIAAABg");
	this.shape_201.setTransform(17.175,26.475);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#855734").s().p("AgBAFIAAgJIABgBIAAgCIACAAIAAADIAAACIgCABIAAADIAAADIAAACIgBABIAAgDg");
	this.shape_202.setTransform(14.625,19.65);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#E5C196").s().p("AgJADIAAgCIAFgCIAAgCQAIgFAGAIIAAABIAAABQgJgBgKAFIAAgDg");
	this.shape_203.setTransform(15.85,18.5656);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#835332").s().p("AgCAFIAAgDIAAgDIABAAIACgDIADAAIAAADIgBABIgEACIAAADIgBAAg");
	this.shape_204.setTransform(15,18.4);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#EBB88B").s().p("AAAAFIAAgMQADAFgDAJIAAAAIAAgCg");
	this.shape_205.setTransform(14.985,16.9);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#8A5D2D").s().p("AAGACIAAAAIgOgEIAMAAIACAAIACACIABACIAAABIgDgBg");
	this.shape_206.setTransform(16.975,14.2);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#683515").s().p("AAAANIAAgDIAAgVIABAAIAAACIAAACIAAAMIAAACIAAADIAAADIgBAAg");
	this.shape_207.setTransform(14.75,16.9);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#99684A").s().p("AgCAFIAAgDQADAAgBgGIABAAIADAAIgBADIgEAGIgBAAg");
	this.shape_208.setTransform(15,15.15);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#6F4125").s().p("AgEAPIAAgCIAAgFQAGgIACgOIABAAIAAADIAAACQgCALgEAIIAAADIAAACIgDAAg");
	this.shape_209.setTransform(15.6,13.175);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#7D512F").s().p("AgBAGIAAgCIAAgJIABAAQAAAEABACIABAAIAAADIgCACIgBAAg");
	this.shape_210.setTransform(23.8,17.025);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#AE835E").s().p("AgBAGQgBgDAAgDIAAgDIAAgCIACAAIACAAIABAAQABAHgEAEIgBAAg");
	this.shape_211.setTransform(24.1275,16.525);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#643614").s().p("AAAAKIAAgDIAAgQIABABIAAACIAAANIAAADIgBAAg");
	this.shape_212.setTransform(24.175,14.925);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#98654C").s().p("AAAAKIAAgTQADAGgCAKIAAADg");
	this.shape_213.setTransform(21.7455,13.925);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#A1734A").s().p("AAAACIgCgBIAAgBIAAgDIACAAIACAAIABACQABAFgEAAIAAgCg");
	this.shape_214.setTransform(24.335,13.825);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#71401A").s().p("AAEARIgBgCQgGgOgCgSIACAAQAAAGACACIABACIAGAWIAAACIgCAAg");
	this.shape_215.setTransform(33.625,20.4);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#DAA975").s().p("AAAAEQgBgDAAgEIAAgCQAEADgBAIIgCAAIAAgCg");
	this.shape_216.setTransform(33.4661,19.025);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#915931").s().p("AgCAHIAAgCQAJgYgGAaIgBAAIgCAAg");
	this.shape_217.setTransform(28.1125,20.6865);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#723A19").s().p("AgCAPIAAgDIAAgMQADgCgBgJIAAgDIACAAIAAADQACALgEAFIAAAHIAAADIgCAAg");
	this.shape_218.setTransform(27.8308,22.875);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#F1D2AA").s().p("AAGAGQgDgCgEAAIgBgCQgFgBABgGQAIAEAFAFIABACIgCAAg");
	this.shape_219.setTransform(25.5477,16.525);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#A98D74").s().p("AADADQgEgCgDgEQAEAAADACIACABIAAABIAAADIgCgBg");
	this.shape_220.setTransform(25.8,17.275);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#F0D1B6").s().p("AgLgFIACAAIACAAQAEAEAEACIABAAQAGAAACACIACABIAAABIgIABQgKAAgFgLg");
	this.shape_221.setTransform(26.05,17.5331);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#AA724C").s().p("AgDAAIADgCIABgBIACADIABABIgCABIgDACQgCAAAAgEg");
	this.shape_222.setTransform(28.4231,17.7712);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#774C24").s().p("AgEAAIAHgBIACAAIAAABQgEACgBAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAgBg");
	this.shape_223.setTransform(26.8,13.6886);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#A37562").s().p("AAAAHIAAgCIgCgJIACAAIAAgDQAEAEgCAIIAAACIgCAAg");
	this.shape_224.setTransform(29.0705,16.9);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#CB9B86").s().p("AAAAHIAAgCIAAgLQADAEgDAJg");
	this.shape_225.setTransform(29.1643,14.175);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#79512C").s().p("AgEgCQAEABAFACIAAABIgDAAIgBABQgEAAgBgFg");
	this.shape_226.setTransform(25.8,13.4521);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#6E411C").s().p("AAAAGIAAgDIAAgJQAEAHgEAGg");
	this.shape_227.setTransform(24.95,10.875);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#865833").s().p("AgEAHIAAgCIAAgHIACgDIABgBQADAAgBAGIABAAIADADIAAACIgCgBQAAgDgEACIAAACIAAACIgDAAg");
	this.shape_228.setTransform(24.8,12.7);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#B2744C").s().p("AAAAHIAAgQIABAAIAAADQACAKgDAGIAAgDg");
	this.shape_229.setTransform(28.6955,14.425);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#C6905C").s().p("AAEAfIAAgCIgGgXIABAAQABgIgFgDIAAACIgCAAIgDAAIAAgCQAFgIgCgPIAAgCIACAAQABAIAJgFIACgBIACABQAHAGgOALQABAUAEATIAAACIgDAAg");
	this.shape_230.setTransform(33.8417,19.025);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#784A27").s().p("AABALQAAgNgEgLIACAAQgBAGADgCIAAgBIACAAIAAACQACAOgEAIIAAgDg");
	this.shape_231.setTransform(32.6558,17.025);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#F2D4AE").s().p("AgEAAIAAAAQAPABgIAAIgHgBg");
	this.shape_232.setTransform(33.775,14.2563);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#6C3C17").s().p("AAEAEIgDAAIAAgBQgHABABgHIACAAQABAEAGgBIACAAIAAABIAAADIgCAAg");
	this.shape_233.setTransform(33.6197,15.275);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#DFB493").s().p("AAAAGIAAgCQACgGgEgBIAAgCIAAgFIACAAQAEAGgCAKIAAADIAAABIgBABQgBAAAAgBQAAAAAAAAQAAgBAAgBQAAgBAAgBg");
	this.shape_234.setTransform(32.5205,15.0161);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#936943").s().p("AAAAKIgDAAIAAgDQACgKgEgGIACAAIAEAIIAAABIgBAAQgBAHAHgBIAAABIgCAAIgDAAIAAADIgBAAg");
	this.shape_235.setTransform(33.125,14.925);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#784A2B").s().p("AgDAFIAAgLIADAAIABAAIACAAIABACIgDAAIgBAAIAAAEIAAACIgBADIgCACIAAgCg");
	this.shape_236.setTransform(32.375,14.425);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#8F6648").s().p("AAAAFIgBgBIgBgEIACgBIAAgDQAEABgBAFIgBADIgCAAg");
	this.shape_237.setTransform(32.2938,15.15);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#C49679").s().p("AAAAKIAAgDIAAgQIABAAIAAAQIAAADIgBAAg");
	this.shape_238.setTransform(32.125,12.7);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#B78B5A").s().p("AAEAHQgCgFgGAAIAAgCIAAgHQAJACAAAKIAAADIgBgBg");
	this.shape_239.setTransform(33,12.2);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#673613").s().p("AgBAQIAAgCIAAgRIAAgCIAAgKQADAAgBAFIAAACIAAADIAAAGIAAADIAAAKIAAACIgCAAg");
	this.shape_240.setTransform(32.41,12.075);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#AD805F").s().p("AAAAIQABgGgDAAIAAgCIAAgJIACAAIABAEIABABIABADQABAHgEAEIAAgCg");
	this.shape_241.setTransform(32.5438,10.2);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#9B7651").s().p("AgCALIAAgXQAKALgIAOIgCABIAAgDg");
	this.shape_242.setTransform(33.0451,7.1);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#523119").s().p("AAAATIAAgEIAAgDIAAgCIAAgDIAAgaIABAAIAAAYIAAACIAAAKIAAADIgBgBg");
	this.shape_243.setTransform(32.625,7.725);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#F6CAB9").s().p("AgPAnIAAgCQACgJgEgEIAAgCIAAgKIABAAQACgLgDgDIAAgCIAAgeIAAgDIAAgMQAQAFAPgFIACAAIAAACIAAADIgDAAIAAAKIAAACIAAAKIAAADIgCAAIAAARIAAACIAAAMIAAACIABAFIABAAQAGALAAAOIAAADIAAACIAAABIgigLg");
	this.shape_244.setTransform(30.9,13.725);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#C99B66").s().p("AgCAPQAAgHgEAAIAAgDIAAgDIACAAIAAABQAFgEgFgIIAAgCIAAgDIADAAIAAACIABABIADAAQALgCgPAZIAAADg");
	this.shape_245.setTransform(25.2741,11.2);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#583218").s().p("AgBAMIAAgaIACAAIAAADQACAPgEALIAAgDg");
	this.shape_246.setTransform(25.4558,5.975);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#703F24").s().p("AALA+IAAgCIgCgDIgBgBQgCgCgJAGIAAACIgCAAQgDgCgFAAIAAgDQAUABACgSIAAgDQAEgFgCgMIAAgCIAAgDIAAgCQgEgkACgrQAEACgCAIIAAADIAAAOIAAADIABAWIACAAIAAAdIAAADIAAAMIAAACIAAAKIAAADIgBACIgCAAIACAKIABADIgBACIgBAFIgBgFg");
	this.shape_247.setTransform(27.675,11.6875);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#EFD3C9").s().p("AgQANIAAgCIAAgOQAEgBgCgGIAAgDIACAAQATAHAKAOIAAACQgRAEgNAAIgDgBg");
	this.shape_248.setTransform(30.525,6.6028);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#B88159").s().p("AgIAtQAQgGgKgdIgBgDQACgYAGgdIABAAIABAHIACAAIAAADIAAACIAAADQABAGgEABIAAgCQACgIgEgCQgCApAEAlIAAADIgCAAQgGAAgGACIAAgCg");
	this.shape_249.setTransform(28.1955,8.725);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#764A2F").s().p("AAAALIAAgHIAAgDIAAgLIAAAAIABACIAAARIAAACIgBAAg");
	this.shape_250.setTransform(28.925,3.625);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#A97754").s().p("AABAIIgBgDIAAAAIgCgBIgBgEQADAAAAgGIABAAIABAEIACAAIAAAHIAAADIgDAAg");
	this.shape_251.setTransform(28.925,2);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#A6825D").s().p("AgNAkIgBgCIAAgCIAAgUIADAAQAEgLgCgPIAAgDQAFgCgCgIIAAgCIACgBQAagNgJAQIgCABQgKAbgMAaIAAAHIAAADIgCgBg");
	this.shape_252.setTransform(26.5391,6.2836);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#7D4F21").s().p("AAAAAIAAgBIAAgDIABAJIgBgFg");
	this.shape_253.setTransform(26.9191,-1.4724);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#784D34").s().p("AgCAeIAAgDIAAgCQAEgXgCgdIAAgCIACAAIAAAsIAAACIABADQABAIgEACIgCAAg");
	this.shape_254.setTransform(25.5938,1.5);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#764729").s().p("AAAAGIAAgFIAAgBIAAgFIAAAAIABACIAAAHIAAACIgBAAg");
	this.shape_255.setTransform(29.175,1.125);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#8B6444").s().p("AimDMIAFACIACABIADAAIACAAIAAACIAAABIgEABQgHAAgBgHgACji0IABgCQABgHgEgBIAAgCIAAgIQAEgBgBgGIgBgDQAHAIgEAUIAAACIgDAAg");
	this.shape_256.setTransform(16.1977,23.8284);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#F3D2C5").s().p("AgKgBQAKgJAJADIACABIAAAGIAAADIAAABQgFAEgEAAQgGAAgGgJg");
	this.shape_257.setTransform(31.15,4.4613);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#BB9C8F").s().p("AgRApIgBgXQAQABASgEIAAgBQgLgOgSgIIgCAAIAAgCIAAgCIAAgDIAAgRIACAAQAHACATgIIAAgCQAFAFgCAKIAAADIgCgBQgLgDgIAIQAJARALgKIABgBQAEAAgBAHIgBADIAAAaIAAACIgCAAQgQAGgPgGIAAANIAAACg");
	this.shape_258.setTransform(30.6938,6.1);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#7E4E33").s().p("AAAAGQgBgGAAgFQAEABgCAFIAAADIAAACg");
	this.shape_259.setTransform(31.9188,0.125);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#673D20").s().p("AAAAOQACgLgEgDIAAgDIAAgKIAAgCQAEAIAAALIAAACIABADQABAGgEABIAAgCg");
	this.shape_260.setTransform(32.2938,2.125);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#815338").s().p("AABAGQgCgFgBgGQAGABgBAIIgBACIgBAAg");
	this.shape_261.setTransform(31.5317,-1.1);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#774022").s().p("AgNBLIgCgBIAAgCQARgVADgkIgBAAIAAgDQAEABgCgFIAAgDIACAAQAHgNgJABIAAgCQADgSgJgEQAEACABgFIABAAQAIgNgDgaIAAgDIADAAIAAAgIAAADIABAUIABAAIAAACQAAAigMAWIAAAIIAAACIgCAAQgFASgKAMIAAgCg");
	this.shape_262.setTransform(20.225,17.15);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#9A5C3A").s().p("AgBATIgCAAIAAgDIAFgkIABAAIAAACQADAZgHAOIAAgCg");
	this.shape_263.setTransform(21.0159,11.575);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#C1835A").s().p("AgCAWIgDgOQABgQAFgLIAAgDIAEAEIABABIgBABIgFAkIAAACIgCAAg");
	this.shape_264.setTransform(20.725,11.2);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#B78D79").s().p("AgGACIAAgCIAAgCQAYgDgWAJIgCAAIAAgCg");
	this.shape_265.setTransform(22.501,8.299);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#815237").s().p("AABAHIgBgBIgDgEIgCAAIAAgCIAAgHIAFAAIABAAQABAQADgMIABgBIAAADIAAABIAAACIgCADIAAACIgDAAg");
	this.shape_266.setTransform(21.225,8.7);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#593018").s().p("AgCgEIACAAIADAAIAAADIgCAAQgBAGAAAAQgBAAgBgJg");
	this.shape_267.setTransform(21.6,8.4038);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#794728").s().p("AAAAHIAAgBQgDgDACgHIABAAIAAgCIADAAIAAALIAAACIgDAAg");
	this.shape_268.setTransform(21.5636,7.2);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#845335").s().p("AABAEQgDgCABgGIABAAIADAAIAAAHIAAACIgCgBg");
	this.shape_269.setTransform(21.3469,5.975);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#B88F7A").s().p("AgGAGIgCABIAAgDIAAgEQAXgNgHARIAAADQgGgGgIAFg");
	this.shape_270.setTransform(23.0443,5.5902);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#63391F").s().p("AgBABIAAgEIABAAIACAAIAAADQAAADgDABIAAgDg");
	this.shape_271.setTransform(17.6,8.825);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#603A1E").s().p("AgCAFIAAgDIAAgCIACgBIAAgDIACAAIABADQABAEgEgBIAAADIgCAAg");
	this.shape_272.setTransform(17.885,7.95);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#B49078").s().p("AAAAGIgBgCIgCgEIAFgEIACgBIAAACIAAADIgDAAIAAAEIAAACIgBAAg");
	this.shape_273.setTransform(17.225,8.575);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#6E3A1A").s().p("AgFALIAAgCIAAgDQAFgGADgKIABgDIACAAIAAADQgEANgHALIAAgDg");
	this.shape_274.setTransform(16.725,10.575);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#BA9983").s().p("AgBgBIgBgCIAFAHIgEgFg");
	this.shape_275.setTransform(16.3632,6.8021);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#9A745A").s().p("AgBABIAAgBIAAgDIABAAIACAAIAAADIAAABIgBABIgCACIAAgDg");
	this.shape_276.setTransform(15.6,4.875);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#EBC192").s().p("AgaAyQAIgWANgBIABAAIACABIAAgBIAAgCIgCgCQAIgjADgpIAAgDIAAgCQAFATALAMIACABIADAAIgBACQgGALgBAQIADAOIACABIACAAIABACIgCAAQgBAEgFgBIgBAAQABARgKARIAAACIgEAAQgTAAgNgJg");
	this.shape_277.setTransform(18.1,11.6545);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#CF9B6B").s().p("AAZA/QgggHgRAAIgCAAIgDACIAAgCIAAgDIABAAQADgKgEgFIAAgCIAAgDIAEgHIABgDIAAgCIAAgCQAFgJACgKIAAgDQAJgKAEgPIAAgCQAEgBAAgEIAAgDIAAgCQAEAAgBgFIgBgDQAEgCABgFIAAgDIAAgCIAAgCIADAAIAAACQgEApgIAjIgCAAIgNAAIAPAFQgOAAgIAWQAOAKAWgBIAAgBQAKgRgBgSIABAAQALAEgDASIAAADIAAAKIAAACIAAADQABAFgEAAIAAACIgCAAg");
	this.shape_278.setTransform(17.8833,12.325);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#754924").s().p("AgDAFIAAgDQAEAAgBgGIABAAIADAAIAAACQgBAFgDACIgDAAg");
	this.shape_279.setTransform(18.225,6.95);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#693B18").s().p("AgBAHIAAgCIAAgFQACAAgBgEIAAgCIACAAIAAAFIAAABIAAADIgCAAIAAACIAAACIgBAAg");
	this.shape_280.setTransform(18.6,5.725);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#916649").s().p("AgBAFIAAgCIAAgDIABgCIAAgCQAEACgCAGIgCABIgBAAg");
	this.shape_281.setTransform(18.8481,4.5);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#663D1E").s().p("AAAAGIAAgFIAAgBIAAgFIABACIAAADIAAAEIAAACIgBAAg");
	this.shape_282.setTransform(19.225,3.125);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#956849").s().p("AAAAFIgCgCIAAgDIAAgGIACAAIABAGIABAAIAAADQACAEgEAAIAAgCg");
	this.shape_283.setTransform(19.3705,2.25);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#B2907E").s().p("AgEAJIAAgDIAAgCQAFgFADgJIABAAIAAACQAAAOgJAFIAAgCg");
	this.shape_284.setTransform(16.35,3.875);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#8D5A34").s().p("AACAFQgEgCgCgDQACgDAEgBIADAAIgBACIgCAAQgBAEAEACIAAABIgDAAg");
	this.shape_285.setTransform(15.125,3.5);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#734525").s().p("AgFATIAAgDIAAgCIAAgCQgEgBABgFIACAAIABgCIAAgDIAAgGQAJgXAEAUIABAAIAAADIgBACIgCAAIAAADIAAABIgBABQgDAJgFAFIAAADIgCAAg");
	this.shape_286.setTransform(16.2045,2.642);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#5A2B0C").s().p("AAAAJIAAgGIAAgDIAAgJIABABIAAACIAAANIAAADIgBgBg");
	this.shape_287.setTransform(19.475,1.25);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#7C4A2F").s().p("AgFAKIAAgCIAAgDQAFgHAFgJIABgBIAAADQgFALgGAKIAAgCg");
	this.shape_288.setTransform(17.725,0.75);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#8E5222").s().p("AgEAOIgCgKQATgngIAlIAAACIgBABQgEAGgEAFIAAgCg");
	this.shape_289.setTransform(18.8373,-2.1447);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#6C3F25").s().p("AgDALIAAgCIAAgIIAEgJIAAgCIADAAIAAACQABAGgEAAIAAACIAAABIAAAGIAAACIgBABIAAABIgDAAg");
	this.shape_290.setTransform(21.9955,5.35);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#B9947F").s().p("AgDABIAAgBIABgBIABgCIABABQAKAGgNAAIAAgDg");
	this.shape_291.setTransform(23.0291,3.375);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#936B4F").s().p("AAAACIgBgCIAAgBIABgBIAAgCIACAAIAAAEIAAACIAAADIgCAAIAAgDg");
	this.shape_292.setTransform(22.575,2.75);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#F3C8AF").s().p("AgYBzIAAgHQAMgXAAgjIAAgCIAAgDQACgLgEgGIAAgCIAAggIAAgCIACgDIAAgCIACgBQAWgJgYACIAAgCIAAgNIACAAIABgCIACAAQAIgFAGAFIAAgCQAHgTgXAOIAAgDIAAgCQAEAAgCgGIAAgCIAAgCIACgBIABgCQANAAgJgHIgCAAIAAgDIAAgFIAAgCQADAAgBgFIAAgDQAIgiAQAGIAAABIAAACQACAegEAXIAAACIAAADIAAAbIAAACIgDAAIAAAUIAAADIgCAAIAAACIAAACIAAAKIAAACIgDAAIAAADIAAACIAAACIgCADIAAAIIAAACIgDAAIAAADIAAACIAAARIAAADIgCAAIAAACIAAADIgDAAIAAAKIAAACIgBAAQAAAGgDgBIABAMIABABIACAPIAAACIAAABQgSgBgKAIIAAgDg");
	this.shape_293.setTransform(23.1058,10.1056);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#7A4220").s().p("AhHBvIAAgCIAAgGQAGgEACgKIACAAIAAADIAAACQgDAIgFAHIAAACIgCAAgABDhjIAAgDIAAgCIAFgGIAAABIAAADQABAFgEgBIAAADIgCAAg");
	this.shape_294.setTransform(15.885,12.25);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#7E5033").s().p("AAAAHIAAgCQgEgFAAgGIAEAAIADAAIACACIAAACIAAACIAAADIgBACIgBAAIAAACIgDAAg");
	this.shape_295.setTransform(22.0975,3.5);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#E1BF9B").s().p("AAAgBIAAgDIABAJIgBgGg");
	this.shape_296.setTransform(20.7,4.496);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#7D4E32").s().p("AAAAKIgCgBIAAgDIAAgFQADgCAAgJIABAAIAAACQACAMgEAHIAAgBg");
	this.shape_297.setTransform(19.6308,-0.6);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#ECC696").s().p("AgHAJQAJgYACAFIABACIAAADQAJAQgVAAIAAgCg");
	this.shape_298.setTransform(20.6204,1.8576);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#EDCA9C").s().p("AgPgDIAAgDIAAgFQAVAHAKgBIAAACIgCAAQgHAPgHAAQgHAAgIgPg");
	this.shape_299.setTransform(21.7,-3.5312);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#E0B381").s().p("AgTAkIAAgFQAEAAgBgFIAAgCIAAgDIAAgPQAEgGgCgNIAAgCIAAgDIAAgCQAFgFgCgKIAAgDQAOAgAPgfIACgBIAAADQgIAagNAUIgBgCQgCgFgKAZIAAACIAAACIgFAGIAAgDg");
	this.shape_300.setTransform(21.325,-0.1);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#7C481A").s().p("AABAGIAAgBQgDgCACgGIAAgCIABAAIABALg");
	this.shape_301.setTransform(20.2417,-6.825);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#8B562D").s().p("AgBAEIgBgEIACgBIAAgDQAEAAgCAEIAAACIgCAAIAAADIgBgBg");
	this.shape_302.setTransform(20.1205,-7.7);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#EACAA8").s().p("AgCgCIgBgCIAHAJIgGgHg");
	this.shape_303.setTransform(15.2504,-7.1986);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#925B2C").s().p("AgFAAQAYABgYAAg");
	this.shape_304.setTransform(17.4875,-5.875);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#F3DABB").s().p("AAAANQgEgKAAgNQAIgKAAAaIABAAIAAADQAAAEgFABIAAgBg");
	this.shape_305.setTransform(18.0972,-8.8101);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#DAB17D").s().p("AgKAAQAEAAABgDIAAgDIACAAQADAAABgFIAAgCIADAAQgBAGADAEIAAACIABADIACABQgCAHAEABIAAACIAAACQgLgHgKgIg");
	this.shape_306.setTransform(19.225,-7.5);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#7B5020").s().p("AgCACIAAgCIACgBIAAgDIACABIABACIAAABQgBAFgEAAIAAgDg");
	this.shape_307.setTransform(19.1,-8.7);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#7D4A20").s().p("AgCABQALgHgLAJg");
	this.shape_308.setTransform(16.6625,-9.0579);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#875C3B").s().p("AgCgCIgBgCIAHAJIgGgHg");
	this.shape_309.setTransform(16.0004,-12.6611);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#936847").s().p("AACAEIgCgBIgCgDIAAgDQAEACABAFg");
	this.shape_310.setTransform(14.95,-13.525);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#E4BE8D").s().p("AADARIgBAAQgBgagHAJIAAgBIAAgFQAGgEAEgGIABAAIAAACQgBAMADAHIAAACIAAADIgCACIAAADIAAACIgCAAg");
	this.shape_311.setTransform(18.35,-9.925);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#7F5135").s().p("AgNAMIAAgDIAAgCQgGgEgGgBQALgQAoAEQgogBADAXg");
	this.shape_312.setTransform(20.2,-12.5721);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#744017").s().p("AAAAIQgCgEAAgGIAAgCIAAgDIAAgCIACAAQADAEgBAHIAAADIAAACIgCADIAAgCg");
	this.shape_313.setTransform(19.8569,-8.675);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#8A5626").s().p("AAAAIIgDgQQAEAFACAHIABADIgDAAIAAABg");
	this.shape_314.setTransform(19.475,-10.3);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#F8E6CD").s().p("AgDgJIgBgCIAJAXIgIgVg");
	this.shape_315.setTransform(21.0813,-10.4744);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#85552F").s().p("AgGACQAagIgaAJg");
	this.shape_316.setTransform(32.925,-4.6132);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#92603A").s().p("AAEADQgCgEgGABIAAgDQAIgBABAFIAAADIgBgBg");
	this.shape_317.setTransform(30.775,-2.0891);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#F5CCBC").s().p("AgMAYIAAgCIAAgIIAAgCIAAgIQADgOAGgMIABgCQAFgBACAFIABABQAAAGADAFIACABQAAAGABAFIACAAIAAAKIAAADIgBABQgOAHgIAAIgDgBg");
	this.shape_318.setTransform(30.65,0.3011);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#AE7E5A").s().p("AgEAOIgBAAIAAgDIAAgCQAEgNAGgLIABAAIAAADIAAACQgGALgDAPIgBgCg");
	this.shape_319.setTransform(29.675,-0.85);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#814E24").s().p("AgBACIAAgGIABAAIACAAIAAACIgDAHIAAgDg");
	this.shape_320.setTransform(30.3,-4.2);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#7E5026").s().p("AACAKIAAgDQgBgKgFgGQAKACgBAOIAAADIgDAAg");
	this.shape_321.setTransform(30.0587,-5.7);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#743F17").s().p("AgJABQAJgHAJAGIABABIgCgBQgIgBgJAEIAAgCg");
	this.shape_322.setTransform(33,-6.7833);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#AC8157").s().p("AAAAAIAAgCIABAFIgBgDg");
	this.shape_323.setTransform(28.694,-3.8851);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#8F5C2F").s().p("AABACIgEAAIAAgCIAAgBIADAAIABAAIACABIABACIgDAAg");
	this.shape_324.setTransform(26.425,-2.2);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#9E7246").s().p("AABAFIgBAAIgCAAIgDgCIAAgDIACAAQANgKgGANIAAACIgDAAg");
	this.shape_325.setTransform(26.415,-3.4593);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#905F34").s().p("AgDACIgDAAIAAgCIAAgCIADAAIACAAIACAAQALAFgLAAIgEgBg");
	this.shape_326.setTransform(26.9598,-2.6929);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#E3B788").s().p("AAAAGQgEgCABgHIACgBIABgBIACACIACAAIAAADIAAABIgDAAIAAADIAAACIgBAAg");
	this.shape_327.setTransform(25.9045,-2.575);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#855A2F").s().p("AAAAFIAAgCQgDgCACgFIABAAQAAAEACADIABACIgDAAg");
	this.shape_328.setTransform(25.7775,-3.95);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#E3B989").s().p("AgNBeQgFgCgFgBIAAgDIgCgCIAAgDQAQgagLABIgDAAIAAgCIAAgIQANgZAKgcIABAAQAJgQgZANIgDAAIAAgCIAAgtIAAgCQAEADAEgDIACAAIABACQABADAAABQABABAAAAQAAgBgBgCQgBgDgBgEIAAgCIgCgDQARABgMgGIgDAAIABgCQAGgOgOALIgBgCQgCgDAAgFIAAgCQAegOALAMIABACIAAAHIAAADIgDAAQAEADABAHIAAACIgBABQgHALgEANIAAACIAAADIAAAFIAAACIgCAAQABAHgEABIABAEIABABIAAAMIAAADIgBAAQgHAcgCAZIABADQALAdgQAGIAAACIgCABIgIACIAAgCgAAJhQQACACAAABQABABAAAAQAAAAgBgCQgBgBgBgDIAAACg");
	this.shape_329.setTransform(27.675,4.1231);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#EAC695").s().p("AgIAiIABAAQAKgHgHgEIAAABQgKgJgEgPIgBAAQABgMgGgPIAAgCQALgJARgBIADAAQACALAAAQIAAADQATAKgDAVIgBACQgEAQgMAAQgHAAgJgGgAgQgWQARArgSgtIABACg");
	this.shape_330.setTransform(22.3709,-9.1437);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#9D632F").s().p("AgEAAQAUgDgUAFg");
	this.shape_331.setTransform(26.825,-5.7214);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#7C4E28").s().p("AABALIgCgHIAAgDIAAgLQACAJABAKIAAACIgBAAg");
	this.shape_332.setTransform(29.3,-7.825);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#804D26").s().p("AAAAKIAAgCQgDgIgBgJQAEAHAEAFIABACIgBAAQAAAFgDAAIgBAAg");
	this.shape_333.setTransform(25.3,-10.4227);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#7A441E").s().p("AgCgDQADAAABgFIABAAIAAADQgBAOgCAAQAAAAgCgMg");
	this.shape_334.setTransform(25.55,-9.0241);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#BD8655").s().p("AAQANQgDgEAAgDIgBgBQgKgFgIAGIAAADIgCAAQgLAFADgRQAYABAGgKIABgBQAAAJACAIIABAAIAAAHIAAADIgCgBg");
	this.shape_335.setTransform(32.7179,-7.325);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#F8EBDC").s().p("AABACIgJgGQAaAEgOAGg");
	this.shape_336.setTransform(33.4,-11.1);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#FAEEE3").s().p("AgWAAIAAgCQAWADAYgEIAAABQgOAGgLAAQgLAAgKgEg");
	this.shape_337.setTransform(29.4,-11.3926);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#794226").s().p("AgCAaQgBgJAAgJIAAgCQAIgPgIgNIACgBIAAgCQALASgKAcIgBACIAAADg");
	this.shape_338.setTransform(34.6689,-9.55);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#72391C").s().p("AAAAHIAAgCIgBgCQgCgDAAgHIADAAQAAAGADAEIABACIgBACIgCABIgBgBg");
	this.shape_339.setTransform(34.1208,-12.65);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#8D5B33").s().p("AAAAGQgEgCAAgHQAFgFADAEIABABIgDAAIAAAHIAAACIgCAAg");
	this.shape_340.setTransform(12.9,8.0529);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#AF8A71").s().p("AgDAEQADgCAAgHIABAAIABACQAFAIgKABIAAgCg");
	this.shape_341.setTransform(14.2667,8.325);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#804A28").s().p("AgHAlQABgUgEgPIAAgCIAAgHIADAAQAHgTAKgKIABAAIAAACIAAADIAAACQgEAKgGAHIAAADIAAACIgBAAQABAHgEACIAAADIAAACQACAHgEABIAAAUIAAACg");
	this.shape_342.setTransform(14.25,8.475);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#EFC3AA").s().p("AgWByIgCAAQATgNgmgCIAAgDIAAgCQAHgBADgFIAAgCIADAAIAAgCQAEgBgCgHIAAgCQAGgGAEgHIAAgCIAAgDIAAgCQAEgBgBgHIAAgCQAEgDgBgJIAAgDIAAgCIAAgFIAAgDIAAgTQAEAAgCgHIAAgDQAKgBgEgJIgBgCIAAgDIAAgCQAFgIAEgKIAAgCIADgCIABAAQAKgGAAgOIAAgDIAAgCIAAgDIACAAIABgCQAIgKAEgNIABgCQAEgFAEgHIACAAIAAAJIAAADIAAAFIAAACIAAAKIAAADIgDAAIAAAHIAAADIAAAFIAAACIgDAAIAAAFIAAADIAAACIgCADIAAACIAAADIAAACQABAFgDAAIAAAFIAAACIgBAAQAAAHgFABIAAACIAAADIgCACIgCABIgGAEIACAFIABADIgBACQgDAJgGAIIAAACIAAADIgBAAQgCANgHAJIAAAFIAAACIgBAAQABAHgDABIAAACIAAAXIAAACIAAAFIAAADIgBACIgCAAIAAAKIAAADIAAAFIAAACIgBACQgCAEgFAAQgEAAgFgDgAAMghQACADABABQABACAAgBQAAAAgBgCQgBgBgDgEIABACg");
	this.shape_343.setTransform(15,10.0065);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#784D30").s().p("AgGALIAAgCQAEgFACgEIAAgDIAEgFIABgCIADAAIgBACQgEAMgHAHIgCAAg");
	this.shape_344.setTransform(9.65,9.325);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#FBE3CF").s().p("AgBADQADgCgBgHIABAAIAAAFIAAABIAAADQgCAEAAAAQAAAAAAAAQgBAAAAgBQAAAAAAgBQAAgBAAgBg");
	this.shape_345.setTransform(11.65,7.425);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#E7BE8F").s().p("AgKAlIAAgBQgHgBgDgDIAAgCIAAgDQAEABAAgGIABAAIAAADQgBALAIgHIAAgCIACAAQAGgHgKgDIAAgCIACgDIAAgCQAIgIADgLIABgDQAKgHABgRIABAAQAEAAgBAHIAAACIgCAAQABAIgEACQABAJADgJIABgCIACAAIgFATQgLAlgOAAIgBAAg");
	this.shape_346.setTransform(10.025,9.4778);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#E3B6A3").s().p("AgBANQgCgNAAgMQADALABAAIADABIgBACQgBAFgCAEIAAACg");
	this.shape_347.setTransform(10.775,5.85);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#824F30").s().p("AgHASIAAgCQAFgBAAgEIAAgDIAAgCQADgEABgEIAAgDIAAgDIACgCIABgCIAAgDIAAgCQAEACgCAHIAAADIgBAAQgBARgJAGIgDAAg");
	this.shape_348.setTransform(10.9205,6.35);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#926754").s().p("AgCANQgFgKACgPQAVAGgQATIAAABIgCgBg");
	this.shape_349.setTransform(6.0902,7.1);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#894C27").s().p("AgFAGIAAgCQAEgEAEgHIABgBIACAAIgBADIgKAOIAAgDg");
	this.shape_350.setTransform(6.3,-0.625);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#E3BF9A").s().p("AgBACIAAgCIAAgJIABAAIAAACQADARgBAAQgBAAgCgIg");
	this.shape_351.setTransform(13.3512,4.799);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#E8BA8E").s().p("AgZApIgDgEIAAgDIAAgFQAcgmgKgVIgBgCQgGgRARAOIABABQAOgFALAAIACAAQgHANAEAMIgBAAQgZAmgTARIgCABIgDgBg");
	this.shape_352.setTransform(16,-1.1911);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#502913").s().p("AgCAFIAAgCIAAgFIACAAIAAgCIADAAIgBACIgCACIAAADIAAACIgCAAg");
	this.shape_353.setTransform(12.15,2.25);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#E4B19C").s().p("AABAIQgCgHgBgJQADAEABAFIABADIAAACIAAADIgCgBg");
	this.shape_354.setTransform(11.15,4.125);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#5E3520").s().p("AgCAEIAAgHIACAAIAAgCIACAAIAAACQAAAGgEADIAAgCg");
	this.shape_355.setTransform(11.9,3.375);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#946942").s().p("AgHAPQAFgDAAgHIAAgDIAAgCIAAgCIACgCIAAgDIAAgCQAEAAgCgFIAAgDQAGABgBAHIAAACIAAAFIAAACIgBAAQgEASgEAAQgCAAgDgDg");
	this.shape_356.setTransform(12.4021,2.5179);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#5B2F16").s().p("AgCAFIAAgCIAAgFIACAAIAAgCIACAAIAAACQACAFgEAAIAAACIgCAAg");
	this.shape_357.setTransform(12.4205,1.25);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#C39179").s().p("AgjAnIACgBQAPgUgWgGIAAgDIAAgCIAAgDIAAgTQAUATABgTIABAAQASgSAXgLIADgBIAAADQACAFgFAAIABACIACAAIAAAFIAAADIgBACIgCAAIAAAFIAAADIAAACIgCAAIAAAIIAAACQAIAJAFgYIACAAIADAFIACAAIgBACIgBADIAAADIgDAAIAAAJIAAACIgCAAQgCAKgGAFIAAAHIAAADIgDAAIAAgDIAAgFIAAgCQACgHgEAAIAAgDQACgIgEgBIgBgCQgBgGgEgEQABAJADAHIACAAIgBACIgCADIAAADIgDgBQgBAAgDgLQAAANABANIABAAIAAADQgBAEgEABIAAACIgBADIgEAFIgCAAQgEACgEAAQgLAAgPgHg");
	this.shape_358.setTransform(9.55,4.5698);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#E3AA90").s().p("AgCAHIgBgCQADAAAAgFIAAgCIAAgCIAAgDIABADIADAAIgBACIgCAAIAAAFIAAACIAAACIgBAAIgCAAg");
	this.shape_359.setTransform(12.275,0.25);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#9D715E").s().p("AgDAOIgCgCIAAgDIAAgVQATgHgOAhIAAAAIgDAAg");
	this.shape_360.setTransform(3.8091,7.7722);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#713611").s().p("AgEABIAAgBIAHgCIACgBIAAACIgJAFIAAgDg");
	this.shape_361.setTransform(1.7,4.875);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#FACBAE").s().p("AgCgGIACAAIABAAQACANgBAAQAAAAgEgNg");
	this.shape_362.setTransform(2.7176,5.2375);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#E0B592").s().p("AAAAFQgEgDAAgHQAKgDgBAKIAAACIgBACIgEABIAAgCg");
	this.shape_363.setTransform(-2.9913,10.0417);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#7C492B").s().p("AgFAFIAAgCIAAgDIACAAIAEAAIAAgCIADgBIACgBIAAACQgBAGgIgBIAAACIgCAAg");
	this.shape_364.setTransform(-2.625,10.7);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#895A3A").s().p("AABANQAJgOgTAAQAKgSAHAHIACABIgBACIgBACIAAAJIAAADIgBACQgCAFgFADIABgCg");
	this.shape_365.setTransform(-2.025,8.7);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#F0C5B1").s().p("AgCAGIAAgJIABgCIABgDIABAAIACABQADAJgIAHIAAgDg");
	this.shape_366.setTransform(-0.9029,8.325);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#A06847").s().p("AgCAHIgCgCIAAgCQADgDgDgJIACAAIACAAQAAAHAEADIABACIgCAAIAAACIAAACIgDABIgCACIAAgDg");
	this.shape_367.setTransform(-3.5,10.45);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#644127").s().p("AAFAHIgBgBQgHgEgDgJIACAAIAHAFIACABQAAAEACADIAAABIgCAAg");
	this.shape_368.setTransform(-4.5,8.7);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#EFCAAA").s().p("AACAJIgHgEIAAgBQgHgBACgKIACAAIABgCQAdAFgQANIgCABIgCgBg");
	this.shape_369.setTransform(-4.406,7.45);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#694731").s().p("AgDADIAAgDIAEgCIAAgCIADAAIgBACQgBAEgFADIAAgCg");
	this.shape_370.setTransform(-4.875,5.75);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#FBD5BC").s().p("AgCAFIAAgDIAAgEQAHgEgDAEIAAACIgBABIgBABIAAADIgCAAg");
	this.shape_371.setTransform(-4.4359,4.7625);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#582A10").s().p("AgFADIAAgCQAFgFAGgBIAAACIgBAAQgEAGgGACIAAgCg");
	this.shape_372.setTransform(0.075,6.15);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#94684B").s().p("AgIAJIAAgDIAAgDIADgBIACgBQAGgCAEgGIACAAIAAACQgDAJgLACIAAADIgDAAg");
	this.shape_373.setTransform(-0.175,6.6);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#90613D").s().p("AgIAHIAAgFIAAgCIAAgEQAOgJACALIABAAIAAACIgBABIgEAEIAAgCQgHABgFAGIAAgDg");
	this.shape_374.setTransform(0.325,5.2975);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f("#7B4B29").s().p("AgDAEIAAgDIADgEIABgCIADAAIgBACQgBAGgFADIAAgCg");
	this.shape_375.setTransform(-2.125,2.125);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#E9C9AA").s().p("AgGAGIACgDIAAgCIACgBIABgBIADgDIABgCIABABQAIAMgMAAIgGgBg");
	this.shape_376.setTransform(-3.5377,4.6572);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f("#68462D").s().p("AgEAFIAAgDIAGgGIABgDIACAAIAAADQgBAEgEAAIAAACIAAADIgEADIAAgDg");
	this.shape_377.setTransform(-3.25,3.75);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#B98D68").s().p("AAEAlQABgKgKADIgDAAIAAgCQgCgDAAgFIACgBQAPgOgdgFIAAgBQAFgDABgFIABgCIAAgDIACgBIABgBIACAAIgBACIgBADQATADgIgPIgBgBIAAgCQACgBABgEIAAgDIAAgCIAAgDIADAAIAAADQASALgKAOIAAACQgHAIARgHIACgBIAAAFIAAADIAAABIAAACIgCABIgEACIAAACIAAADIgBgBQgIgHgJASQATAAgKAPIAAACIgDABIgCACIAAgDg");
	this.shape_378.setTransform(-2.9,6.475);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f("#9F6946").s().p("AgDAFIAAgCQADgBAAgGIABAAIADAAIgBACIgDAHIgDAAg");
	this.shape_379.setTransform(-1.625,1);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#804D2B").s().p("AgBAFIAAgCIAAgFIABgCIACAAIAAACIgCACIAAADIAAACIgBAAg");
	this.shape_380.setTransform(-1.275,0);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f("#92623F").s().p("AgNAAQAMgIAMAGIADAAIgBACIgCACIAAgBQgGAAgEAEIgBAAIgGAAQgGAAgBgFg");
	this.shape_381.setTransform(2.325,3.5329);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#774A30").s().p("AgDAFIgCAAIAAgDIACAAIAAgCQADgDAGgBIAAACIAAACQgBAEgFgCIAAADIgDAAg");
	this.shape_382.setTransform(2.825,4.05);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f("#8E5735").s().p("AADACQgEgBgDgCIAEAAIADAAIABABIABACIgCAAg");
	this.shape_383.setTransform(3.7,1.5);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#7B431D").s().p("AgDAEIAAgEIACgDIABgCIABACIADAAIgBACIgGAHIAAgCg");
	this.shape_384.setTransform(4.325,2.375);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f("#9C6F4D").s().p("AgCgCIgBgCIAHAJIgGgHg");
	this.shape_385.setTransform(0.063,1.2016);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#BE8F66").s().p("AgGAWQgCgLgPAJIAAgCIAAgnQAUAGACgCIABgCQAGABAFADIADABQACAEAFABIADAAIgBACIgCADIAAAEIAAACIAAADIgCAAIgDAAQgNgFgLAIQABAHALgDIACAAIAAADIgCAAIAAADIgCAAIgHACIAAADIgBgBgAgTgRQANAPgOgRIABACg");
	this.shape_386.setTransform(1.825,2.75);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f("#734425").s().p("AgDADIAAgDQAEAAABgDIACgBIAAACQgCAFgFACIAAgCg");
	this.shape_387.setTransform(-0.675,-1);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#EDC49D").s().p("AgMAhIAAgCQAKgOgSgLQAGgDABgGIABgDIAEgHIAAgDIAAgCIAAgDIACgCIAAgDQAGgCABgFIAAgDIACAAIADAAQAGANAIAIIABACIgBACQgCACgSgHIAAAnIAAADIAAAFIAAACIgCABQgIADgDAAQgBAAAAAAQAAgBAAAAQAAgBAAAAQABgBABgBg");
	this.shape_388.setTransform(-0.4,2.194);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f("#6A401E").s().p("AANANQgGgDgHgBIAAgCQgIgHgGgNQALAJAIAKIACAAQADAEAEACIABACIgCgBg");
	this.shape_389.setTransform(1.7,-0.125);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#E1B58D").s().p("AAFAKIgFAAIAAgCQgEgCgDgDIACAAIgCgKQAEgBABgBQACAIAHAJIABACIgDAAg");
	this.shape_390.setTransform(3.2,0.25);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f("#855D3F").s().p("AgFAEIAAgDQAFgBACgFIACAAIACAAIAAACIgLAJIAAgCg");
	this.shape_391.setTransform(2.075,-4.075);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#8F694B").s().p("AgDAGIgCAAIAAgCQAGgDAEgFIABgBIAAACQgCAFgEACIAAACIgDAAg");
	this.shape_392.setTransform(0.325,-2.1);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f("#7A5236").s().p("AgDAEIAAgDQADgBACgCIACgBIAAADQgBADgDABIgDAAg");
	this.shape_393.setTransform(2.825,-5.075);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#9B6043").s().p("AAAAFIAAgFIAAgBIAAgCIAAgEQABADAAAEIgBAHIAAABIAAgDg");
	this.shape_394.setTransform(13.275,-4.45);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f("#834A24").s().p("AgGABIAAgCQAGgCAHABIAAABIgCAAQgGABgFADIAAgCg");
	this.shape_395.setTransform(11.15,-5.2781);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#7A4321").s().p("AgEAhIAAgCIAAgFIACgBIAAgCIAAgCIAAgCQAEgLAAgPIAAgDIABgBIACgGQAJATgPAdIgBACIgCAAgAgHggIADABIgDABIAAgCg");
	this.shape_396.setTransform(12.937,-2.6);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f("#D79E78").s().p("AgcAPQANgNAPgKIABgBQAFgDAIgCIACAAIACAAIABgCIACgBQAGAAABADIABADIAAADIAAACIAAACIgDAAQgQgBgKAEIgBABQgMAKgPAIIAAgDg");
	this.shape_397.setTransform(10.275,-3.9781);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#F8C4A1").s().p("AgtAcIAAgCIAHgIIAAgCQAJgEABgLIAAgCIAMgPIABgCIAAgCIAEgEIAAgBQAOgIAMgLIABgBQAMgEAPABIADAAIAAAFIAAADIAAACQgBAQgEALIAAADIAAACIgCAAIgDgCIAAACIAAADIgDAAQgYALgRASIgBAAQgBATgUgTIAAAUIAAACIgCABIgDAAQgHAAgDgVg");
	this.shape_398.setTransform(8.55,0.4455);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f("#783F1B").s().p("AgSASIAAgCIAAgCQANgUAVgLIADgBIAAADIgDABQgPAKgMANIAAADIAAABIgEADIAAACIgDAAg");
	this.shape_399.setTransform(8.55,-3.35);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f("#EAC895").s().p("AgDAAIAAAAQAJABgDAAIgGgBg");
	this.shape_400.setTransform(6.575,-7.6);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f("#7C5232").s().p("AgHDmQgEgDgHgBIgCAAIgFADIAAgDIAAgCIADgCIACgBQAJACAFAGIABACIgCgBgAABjQIAAgCQAMgJAJgKIACgBIACAAIgBACIgYAXIAAgDg");
	this.shape_401.setTransform(3.075,15.175);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f("#E5BC89").s().p("AgjANIAAgCIANgQIACgBQATgKAlAEIAAABIgDAAQgWAAgOATIgCABQgMAFgKAAIgIgBg");
	this.shape_402.setTransform(8.3,-6.2746);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f("#9E5C35").s().p("AgEACQAUgJgUAKg");
	this.shape_403.setTransform(9.4375,-5.8576);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f("#8C674B").s().p("AgEACQAEgBABgDIACgBIACAAIgBACQgCAEgGAAIAAgBg");
	this.shape_404.setTransform(7.65,-9.8);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f("#835C40").s().p("AgGAGIAAgCIALgIIACgBIAAACIgLAJIgCAAg");
	this.shape_405.setTransform(6.175,-8.575);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f("#F1D4AE").s().p("AgkA4IgCgBQgKgKgLgJIAAgCQAGgDABgFIABgCQAEgBABgEIAAgDIAMgKIAAgCQAEgBABgDIAAgDIAYgXIABgCIALgKIAAgCIACgBIABgCQAGgBADgEIABgCQAFgEAKgBIACAAQAEAFACAHIACAAQATAOgFAGIgCAAIAAgBQgmgEgTAKIgBABIgNARIAAABIAAACQgMAMgIAQIAAAFIAAACIABACQAAABABAAQAAAAAAABQAAAAAAABQAAAAAAAAQgBACgDABIABAKgAAAgYQAPACgPgDg");
	this.shape_406.setTransform(6.1771,-5.075);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f("#D5AD81").s().p("AACAHQgCgHgDgEIAAgCIADAAIABAAQAAAGACADIABACIAAACIgCAAg");
	this.shape_407.setTransform(10.275,-10.175);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f("#86522C").s().p("AACAXIABAAQgKgbgUgHIgBgCQgCgEAAgGIADAAIAPAQIACABIABABQAUALAUggIAAACQgNAQgLAQIgBACQgEAMATABIACAAQgCAEgGAAQgFAAgIgEg");
	this.shape_408.setTransform(13.4958,-8.4875);

	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f("#F9EAD5").s().p("AgBgBIAAgCIADAHIgDgFg");
	this.shape_409.setTransform(11.8689,-11.0231);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f("#805235").s().p("AgOAHIAAgCQANgFALgGIACAAIADAAIAAABIgDABIAAACIAAACIgCAAIgCAAIgDAAIAAADIgDAAQgIAAgFAEIgDAAg");
	this.shape_410.setTransform(9.4,-10.9);

	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f("#9F6E4B").s().p("AgFAGIAAgCQAFgEAFgFIABAAIAAACIAAACIgJAHIgCAAg");
	this.shape_411.setTransform(11.275,-12.275);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f("#E1BC91").s().p("AgJAWIgQgRIAAgCIAAgDIACAAIABgBIAJgIIABgCQAMgCAGgHQAAAAAAAAQAAAAABAAQAAAAAAgBQAAAAAAAAIAFAAIACAAIADAEIACABIABACQAMANgNgDIAAgBQgOAHgMAUIgCAAgAgOACQAIAMgJgOIABACg");
	this.shape_412.setTransform(13.213,-11.425);

	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f("#704424").s().p("AgJADQAJgCAFgEIADgBIACAAQAAAAAAABQAAAAAAAAQAAAAgBAAQAAAAAAAAQgHAGgLACIAAgCg");
	this.shape_413.setTransform(12.9,-13.15);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f("#7B5638").s().p("AAAAHIAAgOIABAAIAAAMIAAADIgBgBg");
	this.shape_414.setTransform(12.775,-18.85);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f("#8D654E").s().p("AgCACIAAgDIACgBIAAgCIADAAIgBADQgBADgDADIAAgDg");
	this.shape_415.setTransform(13.15,-20.1);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f("#633010").s().p("AABAEQABgFgEABIAAgDIAAgCIACAAIACAFIABABIgBADIgCACIABgCg");
	this.shape_416.setTransform(33.5,-14.275);

	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f("#844E2D").s().p("AAAAEIgCgBIgBgCIAAgBIAAgDIADAAIABAAIABACIACABIgBABIgCAAIAAADIgBAAg");
	this.shape_417.setTransform(33.375,-15.275);

	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f("#FEEFE5").s().p("AgGAAQAcABgcAAg");
	this.shape_418.setTransform(31.025,-15.325);

	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f("#B38155").s().p("AAGAGQgFgGgIgDIACAAIABgCQAEAFAIAAIAAABIAAADIAAACIgCAAg");
	this.shape_419.setTransform(32.25,-15.775);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f("#865F3E").s().p("AAKADIgYAAIAAgDIAOAAIAAgBQAIgBAFACIACAAIgBACIgCABIgCAAg");
	this.shape_420.setTransform(30.275,-16.4042);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f("#E9C69D").s().p("AgYgLIADAAIACAAIAYAAIACAAQAIAEAGAGIABAAIABABIACABIAAACIAAADIgCAAQgKAGgJAAQgQAAgMgXgAgEgCQAcAAgcgBg");
	this.shape_421.setTransform(30.775,-14.9611);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f("#D6AA7A").s().p("AgigBIAHgPIAAgDQADADAHABIAAABQARAjAegSIACAAQAEgBgBAGIgBACIAAACQgTAIgOAAQgXAAgMgVg");
	this.shape_422.setTransform(30.06,-14.693);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f("#F6DAB8").s().p("AgIAFQAIAAABgFIAAgCIAAgCIADAAIACAAIACAAQAEAJgMAAIgIAAg");
	this.shape_423.setTransform(25.1882,-18.071);

	this.shape_424 = new cjs.Shape();
	this.shape_424.graphics.f("#794A2E").s().p("AgFAAQAYAAgYAAg");
	this.shape_424.setTransform(27.175,-19.55);

	this.shape_425 = new cjs.Shape();
	this.shape_425.graphics.f("#E5C090").s().p("AgUgGIAPgJIACgBIAAACQgCAGgIAAQAWADgGgNIgCAAIAAgDIAAgCIAUABIAAABIAAACIgRAnIAAADIgDAAIgDABQgLAAgHgeg");
	this.shape_425.setTransform(25.675,-16.6826);

	this.shape_426 = new cjs.Shape();
	this.shape_426.graphics.f("#905E3B").s().p("AgOAhIgFABQgFgCgIAAIABABQgPgDgDgNIAAgCQALAOAIgRIABgCIAAgDIARgnIAAgCIABAAQAAAMgGAIIAAACIAAADIgHAOQATAiAxgUIAAgCIACgCIABgDQAEAAgBAFIgBADIgCAAQgBAGADAEIAAACIgCAAQgbAAgiADg");
	this.shape_426.setTransform(29.06,-15.375);

	this.shape_427 = new cjs.Shape();
	this.shape_427.graphics.f("#754119").s().p("AgCgIIACAAIAAACIACADIABADIgBABQAAAIgBAAQgBAAgCgRg");
	this.shape_427.setTransform(29.05,-23.2);

	this.shape_428 = new cjs.Shape();
	this.shape_428.graphics.f("#83502B").s().p("AAAAIIgCgDQADgEAAgKIABAAIAAACIAAADIAAADQACAIgEADIAAgCg");
	this.shape_428.setTransform(29.3205,-24.35);

	this.shape_429 = new cjs.Shape();
	this.shape_429.graphics.f("#6F3B1D").s().p("AgCAFIAAgDIAAgCIAAgGIACAAIADAAIgBACQgBAGgDAFIAAgCg");
	this.shape_429.setTransform(29.8,-25.575);

	this.shape_430 = new cjs.Shape();
	this.shape_430.graphics.f("#DBAF88").s().p("AACAGIgBAAQgBgEgCgCIAAgDIAAgCQAGADgBAIg");
	this.shape_430.setTransform(23.1267,-16.525);

	this.shape_431 = new cjs.Shape();
	this.shape_431.graphics.f("#794F33").s().p("AAHARQgJgOgGgUQAFABgBAEIABAAQADADAAAFIABAAQADAJAEAIIAAACIAAACIgBAAg");
	this.shape_431.setTransform(23.2,-15.4);

	this.shape_432 = new cjs.Shape();
	this.shape_432.graphics.f("#8D5E37").s().p("AgKABIAAgBIACgBIABgBIACAAQAgABggABIAAABIgCABIgDACIAAgDg");
	this.shape_432.setTransform(20.925,-17.75);

	this.shape_433 = new cjs.Shape();
	this.shape_433.graphics.f("#E1B883").s().p("AAAAGIAAgCQgEgEAAgFQAGgCgBAHIACAAQAEADgEACIAAABIgDAAg");
	this.shape_433.setTransform(20.0794,-18.7391);

	this.shape_434 = new cjs.Shape();
	this.shape_434.graphics.f("#FCE3C3").s().p("AgJABQAogFgoAGg");
	this.shape_434.setTransform(19.125,-15.9583);

	this.shape_435 = new cjs.Shape();
	this.shape_435.graphics.f("#673B20").s().p("AgIABIADAAQAFgCAGgCIADAAIAAADIgCAAQgGADgJAAIAAgCg");
	this.shape_435.setTransform(18.975,-17.25);

	this.shape_436 = new cjs.Shape();
	this.shape_436.graphics.f("#956038").s().p("AgFABIAEgBIABAAIAEgCIACgBIAAADIAAABQgEADgCAAQgDAAgCgDg");
	this.shape_436.setTransform(17.475,-16.7685);

	this.shape_437 = new cjs.Shape();
	this.shape_437.graphics.f("#E7C395").s().p("AgJALIgCAAQgQADgJgFQAWgJATgNIAAgCIADgCIACAAIACAAQAUAKAFAYIAAABQgYAAgWgHgAgLAAIAAAAIATgDIgTADg");
	this.shape_437.setTransform(19.325,-15.8);

	this.shape_438 = new cjs.Shape();
	this.shape_438.graphics.f("#7E5832").s().p("AAGAIQgJgFgFgKQAHAHAJAEIABACIAAADIgDgBg");
	this.shape_438.setTransform(13.775,-17.25);

	this.shape_439 = new cjs.Shape();
	this.shape_439.graphics.f("#845633").s().p("AgBAGIAAgOQAGAFgFALIgBABIAAgDg");
	this.shape_439.setTransform(14.8583,-15.525);

	this.shape_440 = new cjs.Shape();
	this.shape_440.graphics.f("#CCA377").s().p("AgIACIAAgCIAOgEIADAAIgBACIgCABIAAABIgCAAQgHABgFAEIAAgDg");
	this.shape_440.setTransform(19.225,-17.625);

	this.shape_441 = new cjs.Shape();
	this.shape_441.graphics.f("#DDB383").s().p("AgMAZQAUgRADgiIABAAIABAAQABAPgFALQAAAKACAKIABAAIAAACIgDAAIgCABIgFACIgCAAQgDACgDAAQgEAAgCgCg");
	this.shape_441.setTransform(17.1775,-19.3809);

	this.shape_442 = new cjs.Shape();
	this.shape_442.graphics.f("#876853").s().p("AgDAIIAAgGIAFgLIACAAIAAACQgDAKgEAHIAAgCg");
	this.shape_442.setTransform(14.75,-23.35);

	this.shape_443 = new cjs.Shape();
	this.shape_443.graphics.f("#A1816C").s().p("AgBAEIAAgFQACABAAgFIABAAIAAACQAAAHgDACIAAgCg");
	this.shape_443.setTransform(15.35,-24.95);

	this.shape_444 = new cjs.Shape();
	this.shape_444.graphics.f("#E0B482").s().p("AgGApQAIgsAEgnIACAAIAAACQgCAhgGAaIABACQAPATgWADIAAgCg");
	this.shape_444.setTransform(19.1,-27.45);

	this.shape_445 = new cjs.Shape();
	this.shape_445.graphics.f("#AA8165").s().p("AgDAGIAAgGQAEgBgBgHIABAAIADAAIgBACIgGAPIAAgDg");
	this.shape_445.setTransform(16.225,-27.175);

	this.shape_446 = new cjs.Shape();
	this.shape_446.graphics.f("#8A5D3E").s().p("AgCAKIAAgCIAAgIQAEgBgBgIIABAAIAAADIABACQABAHgEACIAAADIAAACIgCAAg");
	this.shape_446.setTransform(16.6438,-29.05);

	this.shape_447 = new cjs.Shape();
	this.shape_447.graphics.f("#714529").s().p("AgCAGIAAgCIAAgEQAEAAgBgFIgBgDIACABIABACIAAACQgBAHgEAFIAAgDg");
	this.shape_447.setTransform(17.1,-30.675);

	this.shape_448 = new cjs.Shape();
	this.shape_448.graphics.f("#86583C").s().p("AgCAMIgCgBIAAgCQAEgJABgNIABAAIADAAIAAADQgDAMgDALIgBgBg");
	this.shape_448.setTransform(17.6,-32.65);

	this.shape_449 = new cjs.Shape();
	this.shape_449.graphics.f("#6C381D").s().p("AAAAGIAAgCIAAgJIABAAIAAAJIAAACIgBAAg");
	this.shape_449.setTransform(17.975,-34.625);

	this.shape_450 = new cjs.Shape();
	this.shape_450.graphics.f("#6B3C1F").s().p("AgBAFIAAgLIACAAIAAACQACAIgEADIAAgCg");
	this.shape_450.setTransform(18.2688,-36);

	this.shape_451 = new cjs.Shape();
	this.shape_451.graphics.f("#6C3B1A").s().p("AgBAEIAAgJIACAAIAAACQACAHgEACIAAgCg");
	this.shape_451.setTransform(18.5188,-37.375);

	this.shape_452 = new cjs.Shape();
	this.shape_452.graphics.f("#E1B382").s().p("AAAANIgBAAIgBgHQAEgGgCgKIAAgDQAEALgDAPg");
	this.shape_452.setTransform(19.8516,-33.65);

	this.shape_453 = new cjs.Shape();
	this.shape_453.graphics.f("#B68465").s().p("AAAAEIAAgJIABAAIAAACQACAHgDACIAAgCg");
	this.shape_453.setTransform(30.1955,-29.425);

	this.shape_454 = new cjs.Shape();
	this.shape_454.graphics.f("#B8886A").s().p("AAAAEIAAgJIABAAIAAACQACAHgDACIAAgCg");
	this.shape_454.setTransform(30.4455,-31.425);

	this.shape_455 = new cjs.Shape();
	this.shape_455.graphics.f("#713E20").s().p("AgFgNIACAAQAHAKACANIAAADIAAABIgLgbg");
	this.shape_455.setTransform(28.175,-25.875);

	this.shape_456 = new cjs.Shape();
	this.shape_456.graphics.f("#E1C09B").s().p("AgBgFIAAgCIAAgDQACAIACAJIAAACIAAACQgFgFABgLg");
	this.shape_456.setTransform(26.5479,-30.725);

	this.shape_457 = new cjs.Shape();
	this.shape_457.graphics.f("#683C1F").s().p("AAGAiIAAgDQgDgMgDgKIAAgDQgCgJgDgHIAAgDQgCgJgBgLIADAAQAFAhAIAfIABADIgDAAg");
	this.shape_457.setTransform(26.925,-30.65);

	this.shape_458 = new cjs.Shape();
	this.shape_458.graphics.f("#EECEAC").s().p("AABANQgCgLAAgMIAAgDIABAAQAAALACAIIAAADIAAACIAAACIgBAAg");
	this.shape_458.setTransform(26.05,-32.65);

	this.shape_459 = new cjs.Shape();
	this.shape_459.graphics.f("#F6DBAE").s().p("AAAAGQAAgGAAgFIABAAIAAACIAAADIAAABIAAADIAAACIgBAAg");
	this.shape_459.setTransform(25.675,-34.375);

	this.shape_460 = new cjs.Shape();
	this.shape_460.graphics.f("#95684B").s().p("AAAAGIgCAAIAAgCIAAgDQADAAgBgEIAAgCQAEACgBAHIgBACIgCAAg");
	this.shape_460.setTransform(26.0938,-34.625);

	this.shape_461 = new cjs.Shape();
	this.shape_461.graphics.f("#592B0E").s().p("AgBAFIAAgDIAAgCIAAgHIACAAIAAAGIAAABIAAACQABAGgDAAIAAgDg");
	this.shape_461.setTransform(25.96,-35.25);

	this.shape_462 = new cjs.Shape();
	this.shape_462.graphics.f("#DBBB93").s().p("AAAAFIAAgDQgCgCAAgEIACAAIADAAIAAAGIAAADIgDAAg");
	this.shape_462.setTransform(25.55,-35.5);

	this.shape_463 = new cjs.Shape();
	this.shape_463.graphics.f("#F5D1A7").s().p("AAAALIAAgCIAAgTIABAAIAAAHIAAADIAAAJIAAACIgBAAg");
	this.shape_463.setTransform(25.425,-37.125);

	this.shape_464 = new cjs.Shape();
	this.shape_464.graphics.f("#845C3A").s().p("AAAAHIgBAAIAAgCIAAgJIABAAIAAgDIACAAIAAAMIAAACIgCAAg");
	this.shape_464.setTransform(25.8,-36.75);

	this.shape_465 = new cjs.Shape();
	this.shape_465.graphics.f("#BC8D6E").s().p("AAAAFIAAgLIABAAIAAACQACAIgDADIAAgCg");
	this.shape_465.setTransform(30.6955,-34.025);

	this.shape_466 = new cjs.Shape();
	this.shape_466.graphics.f("#A7785E").s().p("AgBAEIAAgJIACAAIAAACQACAHgEACIAAgCg");
	this.shape_466.setTransform(30.9188,-37.125);

	this.shape_467 = new cjs.Shape();
	this.shape_467.graphics.f("#7C4F36").s().p("AgCACIAAgDIACgCIADgBIAAADQgCADgDADIAAgDg");
	this.shape_467.setTransform(-7.75,9.95);

	this.shape_468 = new cjs.Shape();
	this.shape_468.graphics.f("#ECC7A2").s().p("AgfApIAAgCIAAgDIACgCIABgDQAEgDADgEIAAgCIAAgDQAPgMAGgTIAAgDQAEgCABgFIAAgDIACgCIABgDIAJgIIABgCQAEgEACAEIABAAIABADQAOAXgRgDIgCAAQgLAMgOARIAAACIAAADIAAABQgGAFgDAGIAAACIgCABQgCALgIAAIgGgCg");
	this.shape_468.setTransform(-8.0089,12.0171);

	this.shape_469 = new cjs.Shape();
	this.shape_469.graphics.f("#835C41").s().p("AAEAIIgDAAIgBAAQgBgDgEADIAAgCIAAgCQAFgEABgFIAAgDIADAAIAAADIgBACIgCAAQgBAJAGABIAAABIgCAAg");
	this.shape_469.setTransform(-5.625,7.1);

	this.shape_470 = new cjs.Shape();
	this.shape_470.graphics.f("#7F583D").s().p("AgEAEIAAgDQAFgBADgFIABAAIAAACIgBACIgIAHIAAgCg");
	this.shape_470.setTransform(-6.75,8.325);

	this.shape_471 = new cjs.Shape();
	this.shape_471.graphics.f("#B89B89").s().p("AgJAQIgBgCQgEgHAAgKIACgDIAAgCQAIgIARABIACAAIgBACIgHAIIAAACIAAADIAAAAIgCABIgCAAIAAgBQADgFgIAFIAAAEIAAACIAAACIgEADIAAADIAAACIgDAAg");
	this.shape_471.setTransform(-4.5,4.6197);

	this.shape_472 = new cjs.Shape();
	this.shape_472.graphics.f("#E4BBA8").s().p("AhDAuQAug6AphAIABgBIAAACIgCADQAAALAEAHIABACIgBACQgCAHgFADIAAADIgBAAQgDAFgGACIAAADIAAACIAAADIgCACIgCABIgCACIAAAFIAAACIgBABQgJATgPAMIAAACIAAADIgBAAQAAAFgEgBIAAADIAAACIgCABIgDACIAAAHIAAADQADAIADgDIACAAIAKAAIACAAQAFgBADgEIACAAQAFgCACgFIACgBQAngIgTgRIAAgCIAEgDIABgCQAFAAADgCIACAAQAKARACABIAAgBIAPgMIACAAIgcAhQgdAhgbAAQgbAAgYggg");
	this.shape_472.setTransform(-7.875,11.519);

	this.shape_473 = new cjs.Shape();
	this.shape_473.graphics.f("#EFCBB6").s().p("AhlB3IAAgCIC3jtIACgBIADAAIgBACIgCABIAAAFIAAACIgCAAIABAPIABAAQAFAMAKAFIADAAIAAAPIAAADIgCAAQgDAFgFACIAAADIgCAAQgGAGgKABIgBABQgFAGgGADIAAADIgCAAQgMAHgNAFIAAADIgCAAQgBAEgFABIAAACIAAACIgCAAIgDABIgMAIIAAADIgCABQgIAKgLAJIAAACIAAADIgCAAQgCAEgEABIAAACIgBABQgDAFgGACIAAACIAAADIAAACQgBAEgEABIgBABQgEAGgHADIAAACIgCABQgBAEgFAAIAAADIAAACIgCABIgDACIAAAFIAAACIgBAAQABAHgEABIAAACIgBACIgFAGIAAACIgCAAIAAADIAAACIgCAAIgDAAQgRgBgIAJIAAgDg");
	this.shape_473.setTransform(4.45,-8.425);

	this.shape_474 = new cjs.Shape();
	this.shape_474.graphics.f("#F9D5A4").s().p("AAAgBIgBgCIADAHIgCgFg");
	this.shape_474.setTransform(33.1565,-40.8037);

	this.shape_475 = new cjs.Shape();
	this.shape_475.graphics.f("#F7D8A2").s().p("AAAgEIAAgDIABAPIgBgMg");
	this.shape_475.setTransform(32.8375,-38.4549);

	this.shape_476 = new cjs.Shape();
	this.shape_476.graphics.f("#CA9C83").s().p("AAAAIIAAgDIAAgLIABAAIAAALIAAADIgBAAg");
	this.shape_476.setTransform(30.875,-38.5);

	this.shape_477 = new cjs.Shape();
	this.shape_477.graphics.f("#FAD0B8").s().p("AAFBaIAAgCIgCgCIgBgDQgCgPgGgJIgBgDQgIgfgGghIAAgCQACgIgFgCIAAgCIAAgGIAAgCIAAgNIAAgCIAAgeIAAgDIAAgCQALgHAagEIAAABQAGAPAAAMIABAAQABgPADgOIABAAIAAAdIAAADIgDAAIAAANIAAACIAAAKIAAACIAAAPIAAADIgCAAIAAANIAAABIAAAJIAAADIgCAAIAAAKIAAADIAAAEIAAADIgDAAIAAAKIAAACIAAADQACAFgEAAIAAAPIAAADIgDAAIAAAHIAAACIgBAAQAAALgEAEIAAgDg");
	this.shape_477.setTransform(28.525,-33.15);

	this.shape_478 = new cjs.Shape();
	this.shape_478.graphics.f("#C69D7A").s().p("AAAAQIAAgCIAAgbIAAgCIABAAIAAAdIAAACIgBAAg");
	this.shape_478.setTransform(25.925,-39.125);

	this.shape_479 = new cjs.Shape();
	this.shape_479.graphics.f("#562910").s().p("AAAAOIAAgIIAAgCIAAgTIABAAIAAAaIAAADIAAACIgBAAIAAgCg");
	this.shape_479.setTransform(25.675,-38.875);

	this.shape_480 = new cjs.Shape();
	this.shape_480.graphics.f("#6A3E1D").s().p("AgBAHIAAgCIAAgLQAEACgCAGIAAADIAAACIgCAAg");
	this.shape_480.setTransform(25.7188,-41.225);

	this.shape_481 = new cjs.Shape();
	this.shape_481.graphics.f("#EBBF91").s().p("AgBAgIAAgCIgCg9QADAOACgGIABgBIABADQABAFgEAAIAAAKIAAACIAAALIAAADIAAAUIAAACIgCAAg");
	this.shape_481.setTransform(25.46,-41.475);

	this.shape_482 = new cjs.Shape();
	this.shape_482.graphics.f("#8F674C").s().p("AAAAWIAAgCQACgIgDgCIAAgCIAAgJQACAAgBgFIAAgDIAAgCIAAgIIAAgCIACACIAAABIAAACIAAAfIAAACIAAADIAAACIgCAAg");
	this.shape_482.setTransform(25.8,-42.975);

	this.shape_483 = new cjs.Shape();
	this.shape_483.graphics.f("#6A3818").s().p("AgHBgIAAgDIAAgPQAEAAgBgFIAAgCQAEgCgCgIIAAgDIAAgCIAAgFQADgCgBgIIAAgDIAAgCIAAgKQAEgDgCgJIAAgDIAAgCIAAgOQAEgCgBgIIgBgDIAAgCIAAgNIAAgCIAAgeIAAgCIAAgcIACABIABACIAAAMIAAADIAAACQADBbgOBIIAAAFIAAADIgDAAg");
	this.shape_483.setTransform(30.5572,-35.875);

	this.shape_484 = new cjs.Shape();
	this.shape_484.graphics.f("#F7D6AF").s().p("AgFgLQAIAMACgTIABAAIAAACQAAAXgJALIAAABQgCgKAAgUg");
	this.shape_484.setTransform(33.625,-43.775);

	this.shape_485 = new cjs.Shape();
	this.shape_485.graphics.f("#C69260").s().p("Ag9E3IgbgLIgBgBQgIgFgBgLIACAAQAIABAEgSIABAAQAQACALgoIAFgTIAAgDIAAgHQAGgGADgJIABAAQAHAVgEgfIAAgCIAAgDIACgDIAAgCIACAAQAUgRAYgoIACAAQgEgMAHgNIgCAAQgLAAgNAFIgCgBQgRgOAGASIABACQALAVgdAmIAAgCQABgHgGgBIABgCQAQgdgJgUQAAgFgDgDIAAgDQgCgDgFAAIgDgBIAAACIAAACIgCAAIAAgBQgJgBgGACIAAADIgCABQgXALgMAUIAAADIAAACIgCABQgEAGgEAFIAAADIAAADIgBACQgBALgIAEIgDAAIgCgDIgBgCIgCgCIAAgCQgHgKgDgIQAAgBAAAAQAAgBAAAAQgBAAAAgBQAAAAgBgBIAAgCIAAgCIAAgFQAHgQAMgMIABgCQANAEARgIIACgBQAOgUAXAAIADAAIABAAQAFgGgTgOIAAgBQAUAGALAcIgBAAQARAIAEgIIgBAAQgTgBAEgMIAAgCQAMgRAMgQIABgCQgUAhgWgMIAAgBQANgVAOgIIAAACQANACgMgNIgBgBIABAAQgBgFgFgCIAAACIgCAAIgFAAIgDAAIAAgCQAFgCADgFIACgBIACAAQAGgMgIgFIAAgDQASgsAIg9QAFgdAGgcQAIgqAGAOIAAAEIAAADIAAADQACALgEAGIABAHIABAAIAAADIAAACIgBAAQgEAngKAuIAAACIAAAIIAAACIgBAAQgDAkgUAQQAFAFAIgEIABgBIAAACIgEAAQAFAGAGgGIABgCQAJgBAGgDIACgBIAAACQgUANgVAKQAJAFAPgDIACAAQAXAHAYAAIAAgBQgFgZgUgKIgCAAIAAgBQAhgDghgBIABgCQADgCgEgDIAPgFIAAgBQAlg2gQhdQgJgyAKgsIAAgCIAAgFIAIgEIACgBIADA+IAAACIAAAUIAAADQAAAFACACIAAADQAAAGACAGIABAAQAAAOADALIACAAQgBAMAGAFIAAgCQAEALADAMIAAACIANAcIAAgBIACADIAAACIgCAAQADAeABgUIABgCQAEgEgCgJIAAgCQADgGACgGIAAgDIAAgDIAAgFQAQhIgEhcIAAgCIACAAQADAqAAg0IACAAQADCUgbB/IAFAFIADAAIgBACIgOABIAAADIgDAAIgCAAIAAgCQgHgBgDgDIAAgCQAFgIABgLIgBAAIAAgCIgUgBIAAADIAAACIgDAAIgCAAIAAACIgCABIgQAJQAIAkAPgFIACgBIAAADQgIAPgMgNIAAgCQgEgIgDgKIABAAQABgJgHgEIAAADIAAACIgBAAQAAgEgEgBQAFAVALAOIABAAQADAMAPADQAQAaAOAUIACAAIAEAHIABABQAHAGAAALIABADIgDAAIgBgCQgKgMgfAOIAAADIgDAAQgBAGADACIABACIAAACIgBABIgCABQgBAJAEABIACAAIAFAAIADAAIAAADIgCABQgEACgEgDIAAACIgDAAIAAgBQgQgGgJAjIAAgBIgEAFIAAADIAAADIgBABIgCABIAAADIgCAAIgFAAQgBAHAFAFIABACIgBACIgEALIgDAAIgCAAQgBAHAEACIACABIgBACIgCAAQgCAIAEADIABABIgDAAIgCAAIgFAAIAAAIIAAACIgCAAQgLgNgFgSIAAgDIAAgFIACgBQACgHgEgCIAAgCIAAgGIADAAIABAFIABABIAFgGIAAgCQAWAAgJgRIAAgDQAOgVAIgaIAAgDIAAgBQgKAAgWgGIAAAFIAAACIAAADQACAKgFAFIAAACIAAADIgBAAQAAAJgEADIAAgCIAAgKIAAgDQAIglgUAoIACAKIAAACIgBAAQgFAKgFAIIAAACIAAACIgBAAQgEgUgKAXIAAAIIAAACIgDAAQgFABgCAEQACADAFACIADAAIAAACIAAADIgDAAIAAADIgBAAQgKAKgIATIgBgBQgDgEgGAFQAAAHAFACIACABQAEAOAAAVIABAAIAAAFIAAADIgCAAIAAgCIgFAXIAAAGIAAACIgCAAQgDAIgFAFIAAACIgBACQgCADgFAAIAAgCgAhYEkQAcAKgcgLIAAABgAhJEMIAAACIAUgCIgUAAgAAhCwQAEARgEgTIAAACgABLBDIAAgCQADgWgSgLIAAgCQgBgQgCgLIgCAAQgSABgMAIIABADQAGAPgCAMIACAAQAEAPAJAKIAAgBQAIAEgKAHIgCAAQAaAPAIgZgABaBNIAAABIAKgDIgKACgAhTBNIAAABIAKgGIgKAFgAgEBMQAZAAgZgBgAADAKQAGABAGAEIAAADIgBAAQgFAGgGAEIAAAEIAAADQgBAOAEAKIACAAQAKAIAMAHIAAgCIABAAIgBgNIAAgCQACgFgEAAIAAgDQABgHgEgEIAAgDQgCgIgFgFIADARIACAAIAAADIAAADIgDAAIAAgCIgCgBIgBgCQgCgIAAgMIABAAQgCgXApABIgQAAQgbAAgJAMgAgXA7QAPARgQgTIABACgABPAmIABABQADAbACgcIAAgDIgBgCQgFgGgEgHQABAJADAJgAgJAtIAAABIAHgFIgHAEgAgPAEQAOARgPgSIABABgABcg8QAZAAgZgBgABkAOIgCAAIAEgBIAAACIgCgBg");
	this.shape_485.setTransform(17.3201,-13.4);

	this.shape_486 = new cjs.Shape();
	this.shape_486.graphics.f("#E2B67D").s().p("AgMB2IAAgFQAEh6AOhnIADgIQgJAsAIAyQAQBcgkA2IAAgCg");
	this.shape_486.setTransform(23.1415,-31.4);

	this.shape_487 = new cjs.Shape();
	this.shape_487.graphics.f("#A27151").s().p("AAAAFIgCAAIAAgDIAAgGIACAAIAAACIACAAIAAACQACAFgEAAIAAAAg");
	this.shape_487.setTransform(18.6205,-38.4979);

	this.shape_488 = new cjs.Shape();
	this.shape_488.graphics.f("#6E3E1C").s().p("AAAAHIAAgCIAAgCIAAgJIABACIAAACIAAAHIAAACIgBAAg");
	this.shape_488.setTransform(18.725,-39.5);

	this.shape_489 = new cjs.Shape();
	this.shape_489.graphics.f("#B48261").s().p("AAAADIgCgDIAAgCIAAgCIACAAIACAAIAAACQACAHgEAAIAAgCg");
	this.shape_489.setTransform(18.8705,-40.25);

	this.shape_490 = new cjs.Shape();
	this.shape_490.graphics.f("#EAC396").s().p("AgSCCQgKgFgHgIIAAgCIAAgNQADgCABgFIABgDIAAgCIAAgDQAGgDACgJIACAAQAFgHACgLIAAgCQAFgDAAgHIAAgCIAAgDIAAgFIACAAIAGgPIABgCIAAgDIAAgCQAEgCgBgIIgBgDQAFgDAAgIIAAgDQAFgLADgNIAAgDIAAgCIAAgKQAEgEgBgJIgBgCQAFgCgCgIIAAgDQAEABgCgGIAAgCIAAgDIAAgHQAEgBgBgHIAAgCIAAgDIAAgRIACgBIAAgBQAMgDgFAvQgCAOAAAOQgGgOgIAqQgGAcgFAdQgIA8gSAtIAAgCg");
	this.shape_490.setTransform(16.5258,-29.8089);

	this.shape_491 = new cjs.Shape();
	this.shape_491.graphics.f("#845337").s().p("AAAAKIAAgDIAAgQIABAAIAAAQIAAADIgBAAg");
	this.shape_491.setTransform(18.975,-41.725);

	this.shape_492 = new cjs.Shape();
	this.shape_492.graphics.f("#B98C6F").s().p("AgCAJIAAgDIAAgDQAFgXAAAXIAAADIgBABIgCACIgCAAg");
	this.shape_492.setTransform(19.1,-43.55);

	this.shape_493 = new cjs.Shape();
	this.shape_493.graphics.f("#EDCAA8").s().p("AgMCOQgBgJgBgKQAFgMAAgQIgCAAIAAgCIAAgIQAWgDgOgUIgBgBQAGgcABggIAAgCIAAgCIAAgDIABAAQADgQgEgLIAAgCIAAgFQAAgOABgOQAGgvgLADIAAgDQAAgYgFAYIAAADIAAACIAAARIAAADIgCAAIAAACIAAADIAAAKIAAACIgDAAIAAAIIAAACIAAAKIAAADIgDAAIAAAMIAAADIgCAAIAAAKIAAACIgBAAQgBAOgFAIIAAACIAAACQABAGgEgBIAAAFIAAADIgBAAQAAAIgEACIAAAHIAAADIgBAAQAAAGgEABIAAAIIAAACIgDAAIAAAFIAAADIgBAAQAAAFgDgBIAAAFIAAADIgCAAIgGAMIAAAFIAAADIgBAAQgCAJgGADIAAADIAAACIgDAAIgDAAIAAgCIAAgIQAShigCh1IACAAIAGA8IABAAQAEg1AFgdIABAAIAPAjIAAACQADgVALgOIABgCQAIgIAJAKIACAAQAhgEAMAGIAAAIIAAADIgCAAQgCAGgEgOIgCABIgIAEIAAAFIAAADIgEAHQgPBngDB6IAAAFIAAADIgBABIgOAEIgCAAQABgHgGACQgBAGAFAEIAAACIgCAAIgOAFIAAACgABBiCIAAgBIABABg");
	this.shape_493.setTransform(19.55,-31.6028);

	this.shape_494 = new cjs.Shape();
	this.shape_494.graphics.f("#A57552").s().p("AgCAGIAAgCIAAgJQADACAAAHIACAAIgCACIgBAAIgCAAg");
	this.shape_494.setTransform(38.5,39.375);

	this.shape_495 = new cjs.Shape();
	this.shape_495.graphics.f("#F3CDBB").s().p("AgPAAIAFABIADABQAIAFAFgHIABgCIABgBIABgCIAAgCIAAgKQAHAOgBAPIgBAAIgCAAQgDAGgEAAQgHAAgNgSg");
	this.shape_495.setTransform(37.8018,40.3209);

	this.shape_496 = new cjs.Shape();
	this.shape_496.graphics.f("#764B2F").s().p("AgDAFIAAgBQgFgDgCgFIACAAIAAgCIADAAQACAMAJgFIADgBIACAAIgBADQgDAEgEAAQgDAAgDgCg");
	this.shape_496.setTransform(37.375,39.987);

	this.shape_497 = new cjs.Shape();
	this.shape_497.graphics.f("#5E3210").s().p("AADASIAAgRIgCAAQgDgJgCgMIACAAIAGAUIABAAIAAAQIAAACIAAACIgCABIAAgDg");
	this.shape_497.setTransform(36,37.4);

	this.shape_498 = new cjs.Shape();
	this.shape_498.graphics.f("#F6C6B4").s().p("AgCADIAAgHIACAAIABACIACAAIAAACIgFAFIAAgCg");
	this.shape_498.setTransform(39.1,37.8);

	this.shape_499 = new cjs.Shape();
	this.shape_499.graphics.f("#75421E").s().p("AABAOQAAgJgDgBIAAgDIAAgLIACgBIAAgBIABAAIACACIAAAIIAAACIAAABIAAAKIAAADg");
	this.shape_499.setTransform(38.5,38.4);

	this.shape_500 = new cjs.Shape();
	this.shape_500.graphics.f("#F7CEBF").s().p("AAAAHIgDgCIAAgCIAAgFIACgCIABgCQAGAFgEAGIgBACIgBAAg");
	this.shape_500.setTransform(39.3094,36.8);

	this.shape_501 = new cjs.Shape();
	this.shape_501.graphics.f("#C38C61").s().p("AD5CKQgDgFgGgFQAOgCgDAOIgBABIgBgDgAj7g3IACAAIABgDQAMAGAEgPIABgBQASgBgHgMIgBgBIAAgDIAAgCQAOgSALgLIACgBQARADgOgXIAAgDIACAAQAEAKAIAEIABABQADAJgDAEIAAADIgDgBQgCgBgIAJIABAEIACABIAAACIgCABQgLAFgHAHIAAACIAAADIgCAAQgEALgJAGIAAACIgCACQgDABgFAAIAAACIgCAAIgKAAIAAADIgCAAIgCABQgCAAgCgGg");
	this.shape_501.setTransform(13.7265,22);

	this.shape_502 = new cjs.Shape();
	this.shape_502.graphics.f("#E6D3CF").s().p("AgBAIIAAgRIACAAIAAACQACALgEAGIAAgCg");
	this.shape_502.setTransform(40.6188,37.3);

	this.shape_503 = new cjs.Shape();
	this.shape_503.graphics.f("#AC775A").s().p("AgDAAIAAgCIACAAIABAAIADAAQAAAAAAAAQABABAAAAQAAAAAAABQAAAAAAAAIgBAAIgBAAQAAAAgBABQAAABAAAAQAAABgBAAQAAAAAAAAQgBAAgCgDg");
	this.shape_503.setTransform(39.175,34.625);

	this.shape_504 = new cjs.Shape();
	this.shape_504.graphics.f("#E9C098").s().p("AgJARIAAgCIAAgQQAMADgHgaIAAgCIACAAIACAAQAFAEAEAGIABACIAAADQABAFgEAAIAAACIgBACIgBABIAAALIAAACIAAAKIAAADIgDAAIgEACQgFAAgCgKg");
	this.shape_504.setTransform(37.7705,37.5046);

	this.shape_505 = new cjs.Shape();
	this.shape_505.graphics.f("#ECC1B2").s().p("AAAAFIAAAAIgBgJQAEADgBAGg");
	this.shape_505.setTransform(39.4083,32.55);

	this.shape_506 = new cjs.Shape();
	this.shape_506.graphics.f("#703E1F").s().p("AAFAOIgBgCIgCgBIAAgCQAEAAgBgFIAAgDIABAAQADgNgNACIgDAAIgCAAIgDAAIAAgDIAOAAIADAAQAEAIACgIIABAAIAAADQACAFgFAAIAAAFIAAABIAAACIgCADIAAAFIAAADIgCAAg");
	this.shape_506.setTransform(38.2688,35.925);

	this.shape_507 = new cjs.Shape();
	this.shape_507.graphics.f("#D09F6F").s().p("AgBAXIAAgCIAAgRIgBgBIgGgSIAAgDQAEgIAFAFIACABIADAAIAAACQAIAagNgEIAAARIAAACIgCAAg");
	this.shape_507.setTransform(36.6524,36.9038);

	this.shape_508 = new cjs.Shape();
	this.shape_508.graphics.f("#7C4B2A").s().p("AgHALIAAgCQADgHgDgKIADAAIAAgCIACAAIAAACIgCADQAAAJALgCIAAACIAAACIgBAAQgGgFgEAIIAAACIgDAAg");
	this.shape_508.setTransform(36.25,34.175);

	this.shape_509 = new cjs.Shape();
	this.shape_509.graphics.f("#58270D").s().p("AAAAMIAAgCIAAgTIAAgDIABAAIAAAUIAAACIAAACIgBAAg");
	this.shape_509.setTransform(35.875,31.8);

	this.shape_510 = new cjs.Shape();
	this.shape_510.graphics.f("#975E35").s().p("AAAAEIgCgEIACgCIAAgCIACABIABACIAAABIAAACIgDAAIAAADIAAgBg");
	this.shape_510.setTransform(35.75,30.325);

	this.shape_511 = new cjs.Shape();
	this.shape_511.graphics.f("#BC844B").s().p("AgBAMIgCAAIAAgDIAAgTIAAgCIAAgCQAKAdgFAAIgDgDg");
	this.shape_511.setTransform(36.3645,31.6059);

	this.shape_512 = new cjs.Shape();
	this.shape_512.graphics.f("#7E4D30").s().p("AABAPIgBAAIAAgDQAAgMgCgLIAAgDIACAAQgBAEABADIABAAIABAJIABAAIAAAKIAAADIgCAAg");
	this.shape_512.setTransform(39.1,32.8);

	this.shape_513 = new cjs.Shape();
	this.shape_513.graphics.f("#C88A59").s().p("AgHgVQAJAHABgEIABAAIABAOIACAAIABADIABABIgCAAIAAADIgCAAQADAYgIgHIAAACQgJgKACghg");
	this.shape_513.setTransform(38.0826,31.275);

	this.shape_514 = new cjs.Shape();
	this.shape_514.graphics.f("#612F0E").s().p("AAAALIAAgOIAAgCIAAgFIAAAAIABADIAAAPIAAADg");
	this.shape_514.setTransform(38.625,29.7);

	this.shape_515 = new cjs.Shape();
	this.shape_515.graphics.f("#9E6F4F").s().p("AgDAFIAAgDIABAAQABgEgCgCIADAAIADAEIABACIgBAAQgBABAAABQAAAAgBAAQAAABgBAAQAAAAAAAAIgDAAg");
	this.shape_515.setTransform(38.6,26.3705);

	this.shape_516 = new cjs.Shape();
	this.shape_516.graphics.f("#734126").s().p("AABAJIgBAAIAAgCQAHgLgLgBIAAgDIACAAQAEACABgEIABAAIABACQABAMgEAHIgBgCg");
	this.shape_516.setTransform(38.5205,27.725);

	this.shape_517 = new cjs.Shape();
	this.shape_517.graphics.f("#DAA88F").s().p("Ag/D9IAAgDQgBgFgHABIAAgDQgFgYADgfQADgDAAgJIgBgDIAAgCIAAgZIACAAQADgRgFgKIAAgDIAAgFQAFgOgDgUIAAgDIAAgCIAAgNQAEgCgBgIIAAgCIAAgDIAAgFQAEgCgBgIIAAgCIAAgCQALgugEgmQgQAIgFATQgcB9g/BaIgCAAIgSAAIgBAAQgKgJgGgNIAAgCIAAghQAiiLAfiNQAHgdgIgUIACgBQAOghgUAGIAAAXIAAACIgDABIgoAlIgCAAIgPAMIAAABQgDgBgJgRIAAgDQAGgBADgEIABgCIAAgDQAIACABgHIABgCQAEgDADgFIAAgCQAKgHgEgKIgCgBIAAgCQANgCADgKIAAgDIAEgDIAAgCIAKgGIAAgBIADAAQAIAdgFgdIAAAAIAAgDQAGACABgEIAAgDIACgDIAAgCIADAAQADAaAKgFIACgBIAAADIAAACQgCAQAFALIACAAQAVAKANgEIADgBIAAADQgDAFgEAFIAAACIgBACIgFADIAAADIAAACIAAADIgBAAQAAAFgDAAIgBAAQgDAJgEAIIAAADIAAACIgBAAQgCAFgEACIAAADIAAACIAAADQABAHgDAAIAAADIAAAFIAAACIgDAAIAAAPIAAADIAAACQACAIgFACIAAAFIAAADIAAACQgDAHgEAFIAAADIAAACIgCABQgEAOgJAKIAAADIAAACIgCAAIAAADIAAACIgCAAQAAAIgDACIAAADIAAACIgDAAIAAADIAAALIAAADIgDAAIAAATIAAADIgBAAQABAKgEAFIAAAHIAAADIgBACIgCADIgCAAQgBAEgEABIAAACIAAADIgDAAIACAHIABAAIABABIABACIgCAAIgDACIAAADIAAACIgDAAIAAAMIAAADIgCAAIAAAMIAAADIAAACIgCAAIAAAFIAAADIgDAAIAAACIAAADIgBAAQAAAFgEAAQgCAGAEACIAAACIgBAAQAFAVgNADQARAVAQgUIACgBIADgWIgBAAIAAgCIAAgDQAEgDgBgJIgBgDQAEgRAJgLIAAgCQAEAAABgFIAAgCQAEgKABgPIAAgCIAEgIIABgCIAAgDQAJgLAHgLIABgDIAAgCQAMgHgBgTIgBgDQAEgIgBgOIAAgDQADgEABgGIAAgCIAAgDIAAgCIADgDIAAgCIAAgDIACgCIABgDIAAgCQAEgGADgJIAAgCQAEgDABgFIAAgCQAEAAAAgFIABAAQAmACgTANIABAAQAMAGAFgHIAAgCIADAAIAAARIAAADIgDAAIAAAZIAAACIAAADIAAACIgCAAIABASIABAAIAAAHIAAADIgBAAQgBAMgHAGIAAADIgBACIgCAAIAAAFIAAADIgCAAQABAHgEAAIAAADIAAACIgCAAIABAPIABAAIAAAKIAAADIABAMIABAAIAAAMIAAADIAAARIAAADIAAAFIAAACIgBAAQABAJgEAEIAAACIgBADQgCAHgDAFIAAADIAAACIAAACIgCABQAEAFgBAJIACAAIABADQAGASgKAMIAAgDQAAgMgEAMQAGAjATAOIACABQANgSgHgLIgBgBIAAgCIAAgFIACAAQAHAAgEgKIAAgDIACAAQAFgHgHgFIAAgDQADgCABgFIAAgDQANgIgGgTIgBAAIAAgCIAAgXIAAgCQADAAgBgFIAAgDIACgCIAAgDIAAgCIAAgDIADgCIAAgDIAAgCIAAgDQAFgIADgLIAAgDIAAgCQADgIACgKIABgCIACgBQACgLgEgGIgBgCQgEgWAAgdIAAgDIACAAIAAgCIAAgDIAAgCIAIgPIAAgDQAKgMAGgRIACAAQAKgIATABIAAgBIACAAIAABLIAAACIgCAAQAAAaAFgXIAAgDIAAgCIAAgIIACAAQAJgegLgMIAAgDIAAgYIAAgDQgEgFgBgHIAAgDIAAgMIACgBIAAgCIADgCIAAgDQAFgEgBgIIgCAAIAAgDIAAgOQAEAAgBgGIAAgCIAAgCIAAgDQAFgBABADIABABQACAFAGAAIACAAQAFAFAFgGIAAgCQAGgCAHAAIACAAIAAACIgCAAIAAARIAAADIAAACQgBATgWgBIAAgDIAAgCQgGgGgIgEQgBAHAFABIAAACIgCAAIgCAAQAGAQASgFIAAgBIAAgDQAKgFADABIAAACIgDAAIgCACQgBAIAHgFIABAAQABAJABgJIABgDIADAAIAiALIAAgBIADAAQACATAHAOIABACQAFAKgBARIAAADIAAACIgCAAQAAAMADAIIACAAIAAADIABAJIACABIAEAOIAAACIACAEIABABIAAAUIAAACIAAACIgDABQADALgDAGIAAADQACAMAEAKIACAAIAAARIAAADQACAFAFADIAAACIgCgBIgFgCQATAeAJgRIACAAIADACIABAAIAAADQgEAJgKADQgEAAgBgCQgtgygEhgQgDhQgcAoIAAASIAAACIABAPIACAAIAAAWIAAACIAAARIAAADIgBACQgHB9g0BSIAAABQgegBgCgeIAAgDQABgIgDgCIAAgCIAAgUQAFgnACgrIAAgCIAAgDIAAglIAAgDQAHg2gEgqIgCABQgQAUgCAhIAAARIAAADIgDAAIAAAMIAAADIAAAZIAAACIgDAAIAAAUIAAADIAAAHIAAACIgCAAIAAANIAAACIAAAFIAAADIgCAAIAAAPIAAACIAAAIIAAACIgDAAIAAAKIAAADIAAACQgFA6gYAkIgCABQgKAIgJAAQgLAAgHgLgAArDLQAEARAHgOIABgDQALACACgGIACgBQAEgLgCgTIAAgCQAFgFACgIIABgCQAFgDACgHIAAgCIAAgDIAAgKIAAgCIAAgSIAAgCIAAgFIAMgqIABgDIAEgHIAAgDIAAgCIAAgPIAAgCIgEgIIAAAKIACAAIAAACQgBAFgHgCIAAgBQgGgCgGAAIAAADIgCAAIAAgDQgCgHgGAFIACADIAAACIAAACIgCAAIAAgBQgMAAgDgLIAAgDIAAgCQgBgMgEAOIAAADIgCAAIgDACIAAADQAAAMAEAKIABAAQgBALADAFIABACIAAAKIAAACIAAADQACANgFAGIAAADIAAACIAAADIgDACIAAAFIAAADIgCAAIgEAFIAAACIAAADIgCACIgBAAIABAKIACAAIAAAFIAAADIAAABIACABIABAKIABAAIAAAgIAAADIgBAAQAAAHgDAAgABDDKQANADgNgEIAAABgABegJIAAAFIAAACQADAWACgLIABgCQADgDgBgIIAAgDIAAgCIAAgZIACgDIAAgCIADgBQAMgOgTAHIAAgCIAAgDIAAgCIAAgIQAEgFgCgMIAAgCIABgBQAHgagKAYIAAADIAAACQABAJgEADIAAANIAAACIgDAAIAAAFIAAADIAAAKIAAACIgBAAQABANgEAHQAAAUADgRgABag2QADAQgDgTIAAADgAArhDIAAACIAMgIIgMAGgAA8hkQAeAEgfgFIABABg");
	this.shape_517.setTransform(17.85,29.6106);

	this.shape_518 = new cjs.Shape();
	this.shape_518.graphics.f("#653312").s().p("AABAGIgEgOIADAAIADAJIABADIgBACIgCADIAAgDg");
	this.shape_518.setTransform(35.375,29.475);

	this.shape_519 = new cjs.Shape();
	this.shape_519.graphics.f("#7E5031").s().p("AAAAFIgBgBIgBgIIACACIADAAIAAACIAAADIAAACIgDAAg");
	this.shape_519.setTransform(35,28.1);

	this.shape_520 = new cjs.Shape();
	this.shape_520.graphics.f("#804D27").s().p("AABALQgDgIAAgLIACAAIAAgCIACAAIAAACIgCADQADAKgBAEIAAACIgBAAg");
	this.shape_520.setTransform(34.5008,26.225);

	this.shape_521 = new cjs.Shape();
	this.shape_521.graphics.f("#6B3C17").s().p("AgBADIgDgCIAAgBQAFAAAAgDIABAAIADABIAAACIgDAAIgCABIAAADIgBgBg");
	this.shape_521.setTransform(35.25,27.475);

	this.shape_522 = new cjs.Shape();
	this.shape_522.graphics.f("#E2B082").s().p("AAOAlIgOAAIAAgBQgNABAAgKIACgCIABgDIAAgCIACAAQAKAMgMgmIgBgCIgCgBIAAgCIgEgKIAAgDQAMABAAgLIAAgCIALAAIADAAQANABgIAMIAAACIAAAFIAAACIgCAAQAAAFgKgHQgCAhAJAJIAAgBQAJAGgDgYIACAAQACAMAAANIAAADIgCAAIAAACIgDAAg");
	this.shape_522.setTransform(37.1,30.825);

	this.shape_523 = new cjs.Shape();
	this.shape_523.graphics.f("#EEC8A2").s().p("AgFAGIAAgCIAAgDIAAgBIACgCIADgBIAEgCIACAAIAAACQAAAJgKAAIgBAAg");
	this.shape_523.setTransform(35.875,27.7261);

	this.shape_524 = new cjs.Shape();
	this.shape_524.graphics.f("#663812").s().p("AAGABIgCAAIgMAAIAAgBIAOAAIADAAIAAABIgDAAg");
	this.shape_524.setTransform(37.375,26.725);

	this.shape_525 = new cjs.Shape();
	this.shape_525.graphics.f("#805630").s().p("AgCACIgCgBIAAgBIAGgBIABgCIACAAIAAADIAAABIgCABIgFACIAAgCg");
	this.shape_525.setTransform(36,26.975);

	this.shape_526 = new cjs.Shape();
	this.shape_526.graphics.f("#BC8659").s().p("AAFABIgLAAIAAgBIALAAIACAAIAAABIgCAAg");
	this.shape_526.setTransform(37.25,26.975);

	this.shape_527 = new cjs.Shape();
	this.shape_527.graphics.f("#774622").s().p("AAAAPIAAgDQABgQgFgKIADAAIABAAQAHAOgEAMIAAADIgDAAg");
	this.shape_527.setTransform(34.4727,23.625);

	this.shape_528 = new cjs.Shape();
	this.shape_528.graphics.f("#EDCAA4").s().p("AAJAFIgOAAIgCAAIgDAAIgCgCQAIgHALAAIACAAIABACIACABQACABgBAFIgBAAIgDAAg");
	this.shape_528.setTransform(37.0667,26.0985);

	this.shape_529 = new cjs.Shape();
	this.shape_529.graphics.f("#6B3919").s().p("AABAJIgBgBIAAgCIgBgCQgCgDAAgGIAAgDIADAAQAAAJADAGIABACIgDAAg");
	this.shape_529.setTransform(38.12,24.975);

	this.shape_530 = new cjs.Shape();
	this.shape_530.graphics.f("#935E3F").s().p("AgBAEIgBgEIACgCIAAgCQAEAAgCAFIAAACIgCAAIAAACIgBgBg");
	this.shape_530.setTransform(37.7705,23.85);

	this.shape_531 = new cjs.Shape();
	this.shape_531.graphics.f("#EED2CB").s().p("AAAAGQgBgGAAgFQAEACgCAHIAAACIgBAAg");
	this.shape_531.setTransform(40.1188,26.225);

	this.shape_532 = new cjs.Shape();
	this.shape_532.graphics.f("#EDCFC9").s().p("AAAAMQgBgMAAgLQAEAIgCANIAAACg");
	this.shape_532.setTransform(39.8688,21.625);

	this.shape_533 = new cjs.Shape();
	this.shape_533.graphics.f("#653112").s().p("AAAAGIAAgJIAAgCIAAgDIABAAIAAAJIAAACIAAADIgBADIAAgDg");
	this.shape_533.setTransform(37.625,23);

	this.shape_534 = new cjs.Shape();
	this.shape_534.graphics.f("#6F3B1C").s().p("AAAAKIAAgVQADAJgDAOIAAAAIAAgCg");
	this.shape_534.setTransform(37.3643,20.65);

	this.shape_535 = new cjs.Shape();
	this.shape_535.graphics.f("#EECD9E").s().p("AAEAfQgFgdgEgeIAAgCQAKAbAAAig");
	this.shape_535.setTransform(35.3,21.5);

	this.shape_536 = new cjs.Shape();
	this.shape_536.graphics.f("#98654B").s().p("AgBAUIAAgHIAAgBQACgOgCgJIAAgDIAAgCIABgBIAAgCIACAAIAAADIAAAFIAAACIAAAWIAAACIgCAAIAAADIAAACg");
	this.shape_536.setTransform(37.5,20.625);

	this.shape_537 = new cjs.Shape();
	this.shape_537.graphics.f("#FACCBD").s().p("AAAAEIgBAAIAAgDIAAgEQAFAHgDAAIgBAAg");
	this.shape_537.setTransform(37.975,19.2803);

	this.shape_538 = new cjs.Shape();
	this.shape_538.graphics.f("#9B6C5C").s().p("AAAAFIAAgMQADAFgDAJIAAAAIAAgCg");
	this.shape_538.setTransform(37.8643,16.9);

	this.shape_539 = new cjs.Shape();
	this.shape_539.graphics.f("#E8D3CE").s().p("AAAAGIAAgDIAAgIQADADgDAIg");
	this.shape_539.setTransform(39.835,15.05);

	this.shape_540 = new cjs.Shape();
	this.shape_540.graphics.f("#67371E").s().p("AAAAQIAAgCIAAgbIAAgCQADAAgCAFIAAACIAAAMIAAACIAAAIIAAACIgBAAg");
	this.shape_540.setTransform(37.6455,17.025);

	this.shape_541 = new cjs.Shape();
	this.shape_541.graphics.f("#ECC99C").s().p("AgLAAIAAgBIADAAIACAAIADAAIACAAIAJgCIADgBIABAAQgBAGgKgCIAAADIgBAAIgGACQgEAAgBgFg");
	this.shape_541.setTransform(34.425,15.8962);

	this.shape_542 = new cjs.Shape();
	this.shape_542.graphics.f("#DCA877").s().p("AgMA/IAAgDQABgEgDgLIACgCIAAgDIABgCQAEgOgHgNIAAgDQgEgRgBgWQAOgKgHgGIgCgBIAAgDQALACAAgHIgBAAIAAgCQAOgKADAPIACAAIAAAbIAAADIgBACIgBAAIAAADIAAACIAAAWIAAACIAAAHIACAAIAAAKIAAADIABAEIABABQAAAHACADIABACIgDAAQgLAAgIAIIACACIADAAIgBACIgGABIAAACIgBAAQgBABAAABQAAAAgBAAQAAABgBAAQAAAAgBAAIgDAAgAgMgXQAEAdAGAdIABAAQAAgjgLgaIAAADg");
	this.shape_542.setTransform(36,21.0705);

	this.shape_543 = new cjs.Shape();
	this.shape_543.graphics.f("#875838").s().p("AgGACIAAgCQAGAAAFgEIACAAIAAACIgCABIAAABIAAACIgCABIgJACIAAgDg");
	this.shape_543.setTransform(35,15.15);

	this.shape_544 = new cjs.Shape();
	this.shape_544.graphics.f("#B4734B").s().p("AgDADIgCgDQAFABACgFIACAAIACAAIAAACQgCAGgHABIAAgCg");
	this.shape_544.setTransform(36.375,14.175);

	this.shape_545 = new cjs.Shape();
	this.shape_545.graphics.f("#A2623E").s().p("AAAAFIAAgBQgEgCACgGQAIAAgDAJIgBAAIgCAAg");
	this.shape_545.setTransform(36.8042,13.1988);

	this.shape_546 = new cjs.Shape();
	this.shape_546.graphics.f("#DCAC7D").s().p("AgNAOIAAgCIgFgHIAAgCIgCgBIAAgCIAAgJQAHgBABAFIACABQAJABABgGIABAAIAHgGIABgCQAJAAgBAKIACAAQgCAHAEABIAAABIgBAAQgCAGgHgBIACADIABACIgDAAIgCAAQgFAEgHABIgCAAIgDABQgEAAgBgEgAgNAIQAUABgUgCg");
	this.shape_546.setTransform(34.625,13.4676);

	this.shape_547 = new cjs.Shape();
	this.shape_547.graphics.f("#734A26").s().p("AgDABIAAgBIADgCIABgBIADAAIgBACIgGAFIAAgDg");
	this.shape_547.setTransform(35.125,12.075);

	this.shape_548 = new cjs.Shape();
	this.shape_548.graphics.f("#9A6C4E").s().p("AgDABQAFACgBgDIAAgDIACADIABABIgBACIgGABIAAgDg");
	this.shape_548.setTransform(36.375,10.575);

	this.shape_549 = new cjs.Shape();
	this.shape_549.graphics.f("#A06246").s().p("AgBAAIAAgCIADAFIgDgDg");
	this.shape_549.setTransform(36.7439,11.7897);

	this.shape_550 = new cjs.Shape();
	this.shape_550.graphics.f("#794222").s().p("AAKAZQgEgPgOAKIAAgDIACAAIABgCIACAAQAHgBACgHIAAgCIABAAQADgJgJAAIgBAAQAAgKgIAAIgCAAIAAgCQAEgBACgEIABAAIAGgBIABgCQAJARgCAbIAAACIAAADgAACgOQAJAKgKgMIABACg");
	this.shape_550.setTransform(36.3924,13.175);

	this.shape_551 = new cjs.Shape();
	this.shape_551.graphics.f("#C6C6C6").s().p("AgJACIgBgCIAVgJIAAASIgFABQgHAAgIgIg");
	this.shape_551.setTransform(41.35,7.6914);

	this.shape_552 = new cjs.Shape();
	this.shape_552.graphics.f("#C88F66").s().p("AAAAFIgBgJIABAAQADABgCAFIgBADg");
	this.shape_552.setTransform(34.9568,8.7);

	this.shape_553 = new cjs.Shape();
	this.shape_553.graphics.f("#DFB68A").s().p("AAXB9IAAgCQAAgLgKgCIAAgCQAFgEgCgJIAAgCIAAgDIAAgKIABAAQAKgQgLgLIAAgCQAEgUgHgIIAAgCQAAgMgFgIIABgCQABgGgEgBIAAgDQABgIgGgBIAAgDQgBgGgIABIAAgCQgBgHgEgDIADAAIAEgIIABgCIAAgDQABgPgLgCIgBgDQgBgLgDgJIAAANIAAACIgCAAQgPgUgPgaIgBgBQAIAAAFACIACAAIADABQAjgDAaAAIACAAIABACIACABQAJANgJARIAAACIgCAAQgFAKgZAAQgDASAKgFIACgBQAKgFAIACIACABQABADADAEIABAAIABADQABAFgJAHQAJAmgGApIgBACQALAPgBAbIAAADIgCAAIABAKIABAAQAGAQAHgGIACAAIAAACQABAEgGgBIAAACIgBABQgCADgEABIAAADIgDAAIgCACIAAADIAAACIgCAAQgBAGgHAAIgDgBgAALgwIAAABIANgFIgNAEgAAXhwIAEADQANgGgbgFIAKAIgAgoh2QAWALAYgNIAAgBQgYAFgWgEIAAACg");
	this.shape_553.setTransform(31.1521,0.4071);

	this.shape_554 = new cjs.Shape();
	this.shape_554.graphics.f("#9D7861").s().p("AABAFIgBAAIgBgJQADAEAAAFg");
	this.shape_554.setTransform(36.175,7.45);

	this.shape_555 = new cjs.Shape();
	this.shape_555.graphics.f("#733F25").s().p("AAAgBIAAgDIABAJIgBgGg");
	this.shape_555.setTransform(34.85,1.496);

	this.shape_556 = new cjs.Shape();
	this.shape_556.graphics.f("#9C827C").s().p("AgDABQgBgBACgHQAMACgKANg");
	this.shape_556.setTransform(39.2646,4);

	this.shape_557 = new cjs.Shape();
	this.shape_557.graphics.f("#AB8576").s().p("AgFAAIAAgBIALADIgLgCg");
	this.shape_557.setTransform(36.625,2.9583);

	this.shape_558 = new cjs.Shape();
	this.shape_558.graphics.f("#9C7661").s().p("AAAAQIgBgYIAAgCIAAgFQAEAMgCARIAAACg");
	this.shape_558.setTransform(35.9058,4.85);

	this.shape_559 = new cjs.Shape();
	this.shape_559.graphics.f("#4A2610").s().p("AACAXQgGgTABgbIADAAIAAAYIABAAIAAACIAAADIABAKIACAAIAAAFIAAADIgCgBg");
	this.shape_559.setTransform(35.8625,6.35);

	this.shape_560 = new cjs.Shape();
	this.shape_560.graphics.f("#613823").s().p("AAAARIAAgCQgCgOABgRQADAGgBANIACAAIAAAEIAAADIAAAFIAAACIgDAAg");
	this.shape_560.setTransform(35.4875,2.25);

	this.shape_561 = new cjs.Shape();
	this.shape_561.graphics.f("#764121").s().p("AiEAqIAAgCIAFgDIAAgCIADAAIgBACIgCADIAAACIgCABIgDACIAAgDgACDgpIAAgDIACAKIgCgHg");
	this.shape_561.setTransform(21.675,6.975);

	this.shape_562 = new cjs.Shape();
	this.shape_562.graphics.f("#673215").s().p("AAAgEIAAgCIABANIgBgLg");
	this.shape_562.setTransform(35.3375,-1.0115);

	this.shape_563 = new cjs.Shape();
	this.shape_563.graphics.f("#C3C3C2").s().p("AgHAFQAHgEgIgGQAgAFgdAGIgDAAIABgBg");
	this.shape_563.setTransform(40.8075,3.125);

	this.shape_564 = new cjs.Shape();
	this.shape_564.graphics.f("#6A3515").s().p("AAAAJIgBgBIAAgDIAAgOQAEAGgCALIAAACIgBgBg");
	this.shape_564.setTransform(35.6558,-3.2);

	this.shape_565 = new cjs.Shape();
	this.shape_565.graphics.f("#CD9370").s().p("AABALQgBgLgBgKQACgBAAAGIABAAIAAAOIAAACIgBAAg");
	this.shape_565.setTransform(35.25,-3.5771);

	this.shape_566 = new cjs.Shape();
	this.shape_566.graphics.f("#A46D4A").s().p("AAABGIAAgDQACgGgCgBIAAgDQAAgbgKgPIAAgCQAHgpgKgmQAKgHgCgFIAAgDIACAAQAFAGACAJIAAADIgCAAQABgGgDABQABAKABAMIACAAIAAACIACABQgCAaADAUIgBAAIgBAAQABgMgFgHQgBARADAOIABADQgCAbAIATIABABQACAFABAHIAAADIgCAAIgEACQgFAAgDgMgAgDAFQADAQgDgSIAAACgAgDgJQADAPgDgRIAAACgAABgkQABAGABADQAAADAAAAQAAgBAAgDQgBgEgBgGIAAACg");
	this.shape_566.setTransform(35.125,2.2203);

	this.shape_567 = new cjs.Shape();
	this.shape_567.graphics.f("#784425").s().p("AAAAGIAAgCIAAgHIAAgCQADACgCAHIAAACIgBAAg");
	this.shape_567.setTransform(34.6455,-6.575);

	this.shape_568 = new cjs.Shape();
	this.shape_568.graphics.f("#A2634A").s().p("AAAAFIAAgLIABAAIAAACQACAIgDADIAAgCg");
	this.shape_568.setTransform(34.8955,-17.125);

	this.shape_569 = new cjs.Shape();
	this.shape_569.graphics.f("#793E21").s().p("AgGAiIgBgCQASgTgGgqIAAgCIAAgDIADAAIAAAqIAAACIgDAAIAAAMIAAADIAAACQgCAHgHABIgCgBg");
	this.shape_569.setTransform(34.25,-18.875);

	this.shape_570 = new cjs.Shape();
	this.shape_570.graphics.f("#BB7A49").s().p("AAABVQgSgSAHgtQALgwADg5IAAgDQAGBLABAsIABgIIACgDIAAADQAFArgSATIAAgCg");
	this.shape_570.setTransform(33.4701,-24.35);

	this.shape_571 = new cjs.Shape();
	this.shape_571.graphics.f("#8A5332").s().p("AAAANIAAgDQgDgIACgNIABAAIABABIACABIAAATIAAADIgDAAg");
	this.shape_571.setTransform(34.7167,-23.6);

	this.shape_572 = new cjs.Shape();
	this.shape_572.graphics.f("#713A1A").s().p("AgBAIIgBgCIAAgDIAAgIIACgBIAAgBIACAAIAAACQACAFgEABIAAAFIAAADIgBgBg");
	this.shape_572.setTransform(35.0205,-25.45);

	this.shape_573 = new cjs.Shape();
	this.shape_573.graphics.f("#561F01").s().p("AAAAJIAAgDIAAgOQADACgCAHIAAADIAAACIAAADIgBAAg");
	this.shape_573.setTransform(35.1455,-27.175);

	this.shape_574 = new cjs.Shape();
	this.shape_574.graphics.f("#97603F").s().p("AAAALQABgIgDgCIAAgBIAAgNIACAAIABAKIABAAIAAADQACAJgEAFIAAgDg");
	this.shape_574.setTransform(35.2808,-28.175);

	this.shape_575 = new cjs.Shape();
	this.shape_575.graphics.f("#5F2907").s().p("AAAAJIAAgJIAAgBIAAgIQADACgCAHIAAACIAAAFIAAADIgBgBg");
	this.shape_575.setTransform(35.3955,-29.55);

	this.shape_576 = new cjs.Shape();
	this.shape_576.graphics.f("#9B6645").s().p("AAAALQABgIgDgCIAAgBIAAgNIACAAIABANIABAAIAAABQACAKgEADIAAgDg");
	this.shape_576.setTransform(35.5205,-30.675);

	this.shape_577 = new cjs.Shape();
	this.shape_577.graphics.f("#5C2A0B").s().p("AAAAKIAAgLIAAgDIAAgFQADABgCAHIAAABIAAAHIAAADg");
	this.shape_577.setTransform(35.6455,-31.8);

	this.shape_578 = new cjs.Shape();
	this.shape_578.graphics.f("#96603B").s().p("AAAAKQABgHgDgBIAAgCIAAgLIACAAIABAJIABAAIAAACQACAJgEADIAAgCg");
	this.shape_578.setTransform(35.7705,-33.025);

	this.shape_579 = new cjs.Shape();
	this.shape_579.graphics.f("#F5CFC4").s().p("AAMAAIAAgCQgOgOgOgGQAfgFABApIABAAIAAACQgDAIgCAAQgCAAACgYg");
	this.shape_579.setTransform(38.725,-41.6347);

	this.shape_580 = new cjs.Shape();
	this.shape_580.graphics.f("#ECD3CB").s().p("AAAADIgCAAIAAgCIAAgCQAFgEgBAGIAAACIgCAAg");
	this.shape_580.setTransform(40.7021,-40.85);

	this.shape_581 = new cjs.Shape();
	this.shape_581.graphics.f("#AA7250").s().p("AAAAGIAAgOIABAAIAAADQACAJgDAFIAAgDg");
	this.shape_581.setTransform(36.1455,-39.375);

	this.shape_582 = new cjs.Shape();
	this.shape_582.graphics.f("#AA7656").s().p("AAAAFIAAgMIABAAIAAADQACAIgDADIAAgCg");
	this.shape_582.setTransform(36.3955,-42.95);

	this.shape_583 = new cjs.Shape();
	this.shape_583.graphics.f("#E2B5A6").s().p("AAXGuIgDgCIABAAQABgPgHgOIAAgCIAHgGIAAgCIABgDQAEgHgHgFIAAgCIAAgGQAEABgBgFIgBgDIACAAQAAAAAAgBQAAAAgBAAQAAgBAAAAQAAAAgBgBIAAgCIAAgKIACAAQABgHgFgDIgBAAQgCgDAAgEIAAgCIgCgEIAAgCIAAgRQAEgHgBgNIgBgCIAAgDIgEgFIgBgCQgEgFAAgKIAAgCQABgGgEAAIAAgCIAAgKIAAgDIAAgWIADAAQAFABgIgJIAAgCIAAgDIAAgHIABAAQADgKgEgFIAAgCQACgFgEgBIAAgCQACgcgJgQIAAgDIgCgDIAAgCQgBgHgCgFIAAgDIAAgFIABAAQAAgFgDgFIAAgDIAAgCIAAgCQACgSgFgMIAAgDIAAgEIABAAQgDgVACgZIAAgDQACgMgEgGIAAgCQgCgKgGgFIAAgDQACgHgEgDIAAgCQALgdgLgSIgBgCQgDgFgBgGIAAgCQABgFgEAAIAAgDIgCgFIAAgCIACgBIAAgBQAIgBACgHIAAgCQAEgDgBgKIAAgCIAAgCIAAgrIAAgCIAAgUIAAgDIAAgFQAEgBgCgGIAAgCIAAgDIAAgDQAFgEgCgKIAAgDIAAgDIAAgFQAEgDgCgJIAAgCIAAgDIAAgHQAEgEgBgJIAAgDIAAgBIAAgGQAHguAAg3IAAgDIACADIABACQANAGAPAOIAAADQgEAlAJgUIAAgDIAAgDIADAAIACAAIAAADQgXBmgSBrQALBwATBpIABABQAJAHgIADIgBACIAAACIgCAAQABA0gBAzIAAACIAAAJIAAADIAAAtIAAADQAAAMABAMIABAAIAAAZIAAACQAAAHACAGIABAAQAFAsAAAwIAAACIgDAAIAAASIAAADIAAACQABAUgIAMIgCgBgAARA3IADAGQAKgOgNgBQgBAHABACgAgLAqQAYAHgYgIIAAABg");
	this.shape_583.setTransform(37.225,-1.35);

	this.shape_584 = new cjs.Shape();
	this.shape_584.graphics.f("#F5D3B8").s().p("AgDgDQADACADABIABABIgBABIgDACQgCAAgBgHg");
	this.shape_584.setTransform(35.125,-45.2886);

	this.shape_585 = new cjs.Shape();
	this.shape_585.graphics.f("#784225").s().p("AgDA7IgBgJIAAgCIAAgQQAEgIgCgOIAAgDQADgEgBgJIAAgDIAAgDIAAgRQAEgDgBgJIAAgDIAAgCIAAgMIACAAIAAAEIAAADIAAADQAAA2gHAuIAAAGIAAABg");
	this.shape_585.setTransform(36.25,-39.25);

	this.shape_586 = new cjs.Shape();
	this.shape_586.graphics.f("#DFAE7D").s().p("AABCXIgBAAIAAgBQgJgBgEgFIgCgBQgFgCgHAAIgDAAIgFgFQAbh/gEiTIgBAAQAAA0gDgqIgCAAIAAgCIAAgNQAJgGAIAGIABADQAAAUABAKIAAAAQAKgLAAgZIAAgCIAAgDIAFACIAAABQAAAMAHgGIAAgBQAGgCAHAAIAAACIgCAAIAAANIAAACIgDAAIAAAMIAAADIAAARIAAADIgCAAIAAAOIAAADIAAACQACAPgFAIIAAAPIAAACIgDAAIAAANIAAACIAAAFIAAADIgCAAIAAALIAAADIAAAHIAAADIgCAAIAAAMIAAACIAAAPIAAADIgBABIgCACIAAAJIAAADIgDAAQgCAOAFAIIAAADIAAACIgCACIgBAIQgBgsgGhKIAAACQgEA4gKAyQgHAtASASIAAABIgCAAgAgDhRQABAHAAADQABAEAAgBQAAAAgBgEQAAgEgBgHIAAACgAAAhlQAAADABACQABACAAgBQAAAAgBgCQgBgCAAgEIAAACg");
	this.shape_586.setTransform(33.15,-30.8);

	this.shape_587 = new cjs.Shape();
	this.shape_587.graphics.f("#A18973").s().p("AAAgFIAAgBIABAAIAAgCQAIAMgMAFIADgOg");
	this.shape_587.setTransform(-5.3094,0.2);

	this.shape_588 = new cjs.Shape();
	this.shape_588.graphics.f("#B5B0AC").s().p("ABKAOIgCgBQAEgJgMgCQgdgEghgEQgpgFghAHQACACAGABIgBABIgBAAQgKgBgGgEQAMgJAWACQA7AEA6AKQAZAFgUAHg");
	this.shape_588.setTransform(33.9896,-42.5607);

	this.shape_589 = new cjs.Shape();
	this.shape_589.graphics.f("#938C88").s().p("ABHALQgGgGgJgDQgygGgtgCQgSgBgGAHIAAgBIgCgBIABgBQgGgBgCgCQAhgHApAFQAhAEAdAEQAMACgEAJIgBAAg");
	this.shape_589.setTransform(33.9985,-42.3587);

	this.shape_590 = new cjs.Shape();
	this.shape_590.graphics.f("#F7DEC4").s().p("AgMAIQAGgGAAgDIAAgCIANgIIABABQALAFgPAFIgCACQgFAKgEAAQgDAAgCgEg");
	this.shape_590.setTransform(28.0699,-37.8827);

	this.shape_591 = new cjs.Shape();
	this.shape_591.graphics.f("#FAE0C7").s().p("AgIAAIACgCIABgBQAEgDAEAAIADAAIADAJQgIgFgBAIQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAAAAAQgCAAgGgHg");
	this.shape_591.setTransform(31.25,-39.4083);

	this.shape_592 = new cjs.Shape();
	this.shape_592.graphics.f("#F6DEC6").s().p("AgIgBQAAAAAAAAQAAAAAAAAQAAgBAAAAQABAAAAAAQAKgHAHALIgBgBQgCAFgDAAQgEAAgIgHg");
	this.shape_592.setTransform(33.6,-39.5268);

	this.shape_593 = new cjs.Shape();
	this.shape_593.graphics.f("#F4D9BE").s().p("AgVASIABgBQATgEgCgRIAAgDIgCABQgDgDgHAJIAAgCQABgFgDgMIgCAHQgBABAAABQgBAAAAABQgBAAAAAAQAAAAgBAAIgBAAQgDALgEgMQACgHAGgCIADgBQAMgDADAEIABABQACAFAJgFIABABQAHADADgBIABAAQAHAJAGAJQgMACgKAFQgLAGgFgDQgDADgCAAQgCAAgCAGIgCAAIgDAAQgEAAADgEg");
	this.shape_593.setTransform(40.175,-37.5766);

	this.shape_594 = new cjs.Shape();
	this.shape_594.graphics.f("#E0BFA5").s().p("AgaAbQgLgOAAgcQAOgOAVAEIAPACIAYAXIAAgBIABABQAAAFgCADIgBABIgGACIAAgBQgdAFgZAMIgBAAIAAAAgAgDgEQACARgTAEIgBABQgEAGAIgCIACAAQACgGACAAQACAAADgDQAFADALgGQAKgFAMgCQgGgJgHgJIgBAAQgDABgHgDIgBgBQgJAFgCgFIgBgBQgDgEgMADIgDABQgGACgCAHQAEAMADgLIABAAQABAAAAAAQAAAAABgBQAAAAABAAQAAgBABgBIACgHQADAMgBAFIAAACQAHgJADADIACgBg");
	this.shape_594.setTransform(40.175,-37.5735);

	this.shape_595 = new cjs.Shape();
	this.shape_595.graphics.f("#EDE3DC").s().p("AgLAHIAAgCIAAgBIAAgCIgBAAIABgFIAAgCQADgCAOABIAHAAIgDABQgQgDgDAPIgCAAg");
	this.shape_595.setTransform(37.225,-33.7417);

	this.shape_596 = new cjs.Shape();
	this.shape_596.graphics.f("#FDEED5").s().p("AgLAOQAGgMAKgGIAAgBQACgQAFALIgBAGQgBADgIAGIgNAKIAAgBg");
	this.shape_596.setTransform(33.525,-30.1283);

	this.shape_597 = new cjs.Shape();
	this.shape_597.graphics.f("#83614A").s().p("AghAPQAEgZAXgDIAAgBQAQgBAVAIIADACIAAAAQghgBgaAOIAAgBQAGgIAJgFIgCAAQgPAFgFAQIgBAAIAAAAg");
	this.shape_597.setTransform(31.125,-35.7928);

	this.shape_598 = new cjs.Shape();
	this.shape_598.graphics.f("#E9C8AD").s().p("AgnAcIgCgDQACgEgIgHQAGgGACgLIAIgCIAAACQABADgGAGQAFAKAJgQIACgCQAQgFgMgFIABgCQAAgBAAgBQAAAAgBAAQAAgBgBAAQAAAAgBAAQAKgDACgCIgBgBIAAAAQAJgGAOgBIAAgBQAKABAKACIABAAQANAFgDATIAAABIAAABIgBACQgBACgCACQAEACgCAHIAAACIgCgBIgDgBIABgEQgUgMgeADIAAABQgKAFgHAHQgFAMgFAFIAAACIgDgEgAACgVIgCACIgBADQAIALAAgGQABgJAIAHIgCgKIgDgBQgGAAgDADgAAXgUQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAAAABQAPANAEgKIAAAAQgDgHgGAAQgEAAgEADg");
	this.shape_598.setTransform(30.5121,-37.6587);

	this.shape_599 = new cjs.Shape();
	this.shape_599.graphics.f("#E8DED8").s().p("AgGASIgBgBQgDgCgFgBIAJgFIAAgBIABgDIABgCQAEgQAOgFIACAAQgIAFgHAJIAAABQgCACABAGQAAAOgDAAIgDgBg");
	this.shape_599.setTransform(28.375,-34.562);

	this.shape_600 = new cjs.Shape();
	this.shape_600.graphics.f("#B48669").s().p("AghAUQABgFgDAAQADgLABgHIAAgCQAHgHAKgFIAAgBQAegEAUANIgBAEIgDgCQgVgIgQABIAAABQgXADgEAZIABAAIAAACIgCADg");
	this.shape_600.setTransform(31.025,-35.7621);

	this.shape_601 = new cjs.Shape();
	this.shape_601.graphics.f("#F4EFED").s().p("AgCAHIAAgCIAAgCQAAgDgCgCIAFgGIABAAIAAABQAJAPgNABIAAgCg");
	this.shape_601.setTransform(26.8856,-26.075);

	this.shape_602 = new cjs.Shape();
	this.shape_602.graphics.f("#72513B").s().p("AgGAcIABgJIAAgCQACgKAFgHIABAAIACgRIABgCIAAgEIABgEQACAbgOAcg");
	this.shape_602.setTransform(35.2118,-29.6);

	this.shape_603 = new cjs.Shape();
	this.shape_603.graphics.f("#F3DAC0").s().p("AgRAqQgGAFgHgIIAAgBQAJgPAUgRIAAgBQgFgFAJgGQAIAEgCgGQgCgDAAgEQAAgKAFABIABgBQAHgQgRADIgDgFQAJAEALgHQAIACgFADQgEACAJADIABABQAEAPgHAYQAAABgBgBQgSAHgFAXIACABQAFAAgLAMQgDgHgMACgAARgDIAAACQgLAFgGAMIAAACIAOgLQAIgGABgDIABgFQgCgFgBAAQgDAAgBAJg");
	this.shape_603.setTransform(32.3196,-30.375);

	this.shape_604 = new cjs.Shape();
	this.shape_604.graphics.f("#E4DBD4").s().p("AgSgBIAAAAQAVAAAQADIgCAAIgIAAQgNAAgOgDg");
	this.shape_604.setTransform(30.175,-24.8827);

	this.shape_605 = new cjs.Shape();
	this.shape_605.graphics.f("#DBB99F").s().p("AgjAvIAAgCQACgQAPgJIAAgBQgDgEAEgJIAAgBQgLgHgCgJIACABQAGAFAMAEIAAgBQAGgEAEgFIAAAAQgGgLgJgJIAAABIgCgBQgEAJgOgCQAJgOAPgFIABAAQgFgFAPgCIASgBQAJAGAIAHIABAAIgBACIAAAGIABABIAAABIgBAAIgCASIABAAIgBACIgDARIgBAAQgFAGgCALIgBAAIgEAPIgBABQgDAHgHACIgCAAIgIABQgNAAgSgFgAgDAwQALgMgGAAIgBgBQAFgXASgHQAAABABgBQAHgYgEgPIgBgBQgJgDADgCQAFgDgHgCQgLAHgIgEIABAFQASgDgHAQIgBABQgGgBABAKQAAAEACADQACAGgIgEQgJAFAFAGIAAABQgUARgJAPIAAABQAGAIAHgFIAFAAQAIAAACAFg");
	this.shape_605.setTransform(32.45,-30.48);

	this.shape_606 = new cjs.Shape();
	this.shape_606.graphics.f("#E9CEB5").s().p("AgKgFQgBgNARACIAAgBQAHAGgCALIgBACQgHgUgIAQQAJAIgCAAQgEABAEAGIACABQAAAAAAABQAAAAABAAQAAAAAAABQAAAAAAABIgCABIgDAAQgNgGADgRg");
	this.shape_606.setTransform(44.8221,-29.6);

	this.shape_607 = new cjs.Shape();
	this.shape_607.graphics.f("#E8CEB6").s().p("AAQAaQABgRgKgGIgBgBIgYgCQAEgEAHgCIABgBQAJgJAEgHIAAgCQAQARgGAgIgBACg");
	this.shape_607.setTransform(43.8087,-34.125);

	this.shape_608 = new cjs.Shape();
	this.shape_608.graphics.f("#9E7D67").s().p("AgOAHIAAgCIAWgJIAAgBIAEgCQAFAAgDACQgMAJgQAEIAAgBg");
	this.shape_608.setTransform(41.41,-35.455);

	this.shape_609 = new cjs.Shape();
	this.shape_609.graphics.f("#98765F").s().p("AgnAGQADgPARADIADgBQAGgDAHgCIABgBIAAADIAAABIgCAAQgEAAgGAHQANAFAMgCQAMgCAOACQAAAAAAAAQAAAAAAAAQgBABgBAAQgBAAgBABQALADgEAEIgGADQgCABgEgCIABgBIABgBQgIgEgJgCIAAABQgHAAgEADIAAgBQgJgFgFADQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQgFgEgKgBQgGADgCAIIgCADQgBAAABgIg");
	this.shape_609.setTransform(40.2408,-33.6094);

	this.shape_610 = new cjs.Shape();
	this.shape_610.graphics.f("#715642").s().p("AABAGQgIgGgMgEIgBAAQAFgEAKAGIAAABQADgDAGAAIAAgBQAKACAHADIAAABIgBABIgCgBQgHABgEAEIAAgBQgBAAAAgBQgBAAAAAAQgBAAAAABQgBABgBABIgBgBg");
	this.shape_610.setTransform(41.075,-32.5681);

	this.shape_611 = new cjs.Shape();
	this.shape_611.graphics.f("#EBE2DD").s().p("AAIAIIgBgBQgFgEgFgCIAAgBIgHgFIAAgCQALAFAJAGIABAAIAAACQAAAAAAABQAAAAAAAAQgBABAAAAQgBAAAAAAIgBAAg");
	this.shape_611.setTransform(40.175,-32.3208);

	this.shape_612 = new cjs.Shape();
	this.shape_612.graphics.f("#6F513E").s().p("AAJAMIAAgBIgOgIIAAgBIgFgKIAAgBIAAgCQAGACAEAEIABABIAAABQAHAHADAIg");
	this.shape_612.setTransform(40.9,-31.025);

	this.shape_613 = new cjs.Shape();
	this.shape_613.graphics.f("#96775F").s().p("AAIANQgGgBgCgDIABAAQgDgIgHgHIAAgBQABAAAAAAQABAAAAgBQABAAAAAAQAAgBAAAAIAAgCQABgBABAAQAAgBABAAQAAAAABAAQAAAAABABIAAAAIAAABQgCABAAAEQAJAHAEANg");
	this.shape_613.setTransform(41.975,-30.7231);

	this.shape_614 = new cjs.Shape();
	this.shape_614.graphics.f("#FCE5CA").s().p("AgJAEIAKgGIABgCQAAAGAIgDIAAAAQgBAGgJAAIgJgBg");
	this.shape_614.setTransform(38.55,-26.5825);

	this.shape_615 = new cjs.Shape();
	this.shape_615.graphics.f("#7E624F").s().p("AgZAEQAAgDAFgBIABAAQAMgFARABIAHAAIAKABIAAABIgCAAIgUACQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAABIgBAAQgMAAgQAFIABgCg");
	this.shape_615.setTransform(36.825,-25.0571);

	this.shape_616 = new cjs.Shape();
	this.shape_616.graphics.f("#C0A38A").s().p("AgzA6IgDgKIACgFIAAgCQAPgbgCgcIgBAEIAAAFIgBAAIACgSIABAAIAAABIAAACIACAAQgBANADgHQACgJAGgCQAKAAAFAEQAAAAABAAQAAABAAAAQAAAAABAAQAAAAAAgBIACAAIgBACIAHAGIAAABIAAACIAAACIAFAKIAAABIAOAIIABAAQAEADAFABIADABQgFgNgKgHQAAgEADAAIAAgCQAEgEAHAAIABAAQAEACACgBIAGgDQAEgEgLgDQABAAABgBQABAAABAAQAAgBABAAQAAAAgBAAQgOgCgMACQgNACgMgGQAGgHAEAAIABAAQARgEAMgKQADgCgFAAIgEACQACgDAFgCIACABIAGgCIAAgCIAHABIABAAIAAACQgEAIgKAIIgBABQgHACgEAFIAZACIABABQAKAGgBARIAAAAIAAABIAAABQgSgCABAMQgDASAOAGIADAAIACgBIAAACIAAABQABADAAAEIAAABQgEACgFgCQgMgDACgSIgBAAQgKAGgGALIAAABQgEgEgBgEIgCAAQgRgFgTgBIgBABQgMAEgEAQQAHAHAOACQgSgCgMAGgAgDA3IgKgBIAMgBQAIgBAKACIAAAAQgJgBgEACIgCABIgFAAg");
	this.shape_616.setTransform(39.925,-30.95);

	this.shape_617 = new cjs.Shape();
	this.shape_617.graphics.f("#EBE5E1").s().p("AAAALIAAgCQgFgOgXAAIAAgCIAUgCIACAAIAGAAIABgBIAbAEIABABQgNAAgMABIgBACIgBgBIgBADQAEAEgEAFIAAACg");
	this.shape_617.setTransform(40.225,-24.375);

	this.shape_618 = new cjs.Shape();
	this.shape_618.graphics.f("#BA967B").s().p("AgSAdQgCgHgGgDIAAgBIAAgCQgBgIgDgGIAAgBIABgBIAAgBQAEgFgEgEIABgEIAAAAIAAACQAaABAVgKIAAgBQABgCAHgEIAAgBQABAAABAAQAAABABAAQAAAAABABQAAAAAAABIAAACQgOAEAGAGQACADgBAFIgBgBQgLgIgFAIIgDABQgKAAAGAFQgEAGgFAAIgDAAQgBAKgHAAQABAMAIgFIgCAGQgBAAAAABQgBAAAAAAQgBABAAAAQgBAAgBAAIAAgBg");
	this.shape_618.setTransform(43.35,-23.225);

	this.shape_619 = new cjs.Shape();
	this.shape_619.graphics.f("#EAD2B7").s().p("AgbARQgOgCgHgHQADgOANgFIABAAQATAAARAFIACAAQABAEADADIAAgBQAHgJAJgHIACAAQgCARAMAEQAFACAEgCIAAABIAAADIACABIgBABQgIAAgEAGIgCAAQgLgCgPACQgJgBgJAAIgLABIgDAAIgEAAgAgTAEIgLAHQASAEACgKIAAAAQgIAEAAgHg");
	this.shape_619.setTransform(40.65,-27.2625);

	this.shape_620 = new cjs.Shape();
	this.shape_620.graphics.f("#876851").s().p("AgaAIIAAgBIABgCQAMgBANAAIgBgBIgbgDQAEgCAJABIAAAAQAPgCAKACIABAAQAEgGAIAAIABgBIADABIACAAIgBAAQgHAEAAADIgBAAQgSAJgWAAIgGgBg");
	this.shape_620.setTransform(43.225,-25.3902);

	this.shape_621 = new cjs.Shape();
	this.shape_621.graphics.f("#EBD1B9").s().p("AgEAHIgBAAQAEgSAGAGIAAAAQACACgDADIgGAIIgCgBg");
	this.shape_621.setTransform(46.7318,-22.2062);

	this.shape_622 = new cjs.Shape();
	this.shape_622.graphics.f("#D5D1CF").s().p("ABNASQgCgDgDAAIAAgBIgBgBQAUgGgZgFQg6gKg7gFQgWgBgMAJQAGAEAKAAIABAAIACABIAAABIgCAAIgbAJIAAgBQgEABgCgEQACgPAJgHIAAgBQA0gCAtAGQAoAGAlAGIACABQALACAFAHQgKAGgOADIAAAAIgBAAg");
	this.shape_622.setTransform(34.275,-42.54);

	this.shape_623 = new cjs.Shape();
	this.shape_623.graphics.f("#796152").s().p("AAdAgIAAgBQABgIgDgBQACgCABgEIAAgCIAAgBQAEgMACgPIABgBQgCgJgQgBQghgEgfAFIgBABQgLAFgPACIgBADQgDAKgQgBIAAgCIAAgBIARgMIABgBIAbgJIADAAQAFgHASAAQAtADAyAGQAJAEAGAFIACABIABAAIAAAAIABABIAAABQAAAAgBAAQgBABAAAAQgBAAAAAAQgBAAAAAAIgDgBQgEADgJACQgKgGgIABIgQADIAAACQgDAUgEARIgBAAQAFAKgCAAQgBAAgEgFg");
	this.shape_623.setTransform(32.15,-39.4155);

	this.shape_624 = new cjs.Shape();
	this.shape_624.graphics.f("#F2DAC8").s().p("AgCgBQAGgJAHgBIABAAIgKAPIgBAAIgMAIQAEgIAFgFg");
	this.shape_624.setTransform(9.575,-23.125);

	this.shape_625 = new cjs.Shape();
	this.shape_625.graphics.f("#977B66").s().p("AhBAKQgBgFAEgBIAAABIgBACQAQABADgJIABgDQAPgCALgFIABgBQAfgFAhAEQAQABACAJIgTgEQgegIgaAIQgFAAgDABIgHAAQgLACAGADQAFABgEABIgCABQgCAKgNgFQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAABIgBABQgBACgKAAQgBAAAAAAQgBAAAAABQgBAAAAAAQAAABAAAAQAAgCgDgEg");
	this.shape_625.setTransform(29.2295,-40.6139);

	this.shape_626 = new cjs.Shape();
	this.shape_626.graphics.f("#FBE3C7").s().p("AgFAeQAIgHgFgQIgBAAQgGgMgMgHQAFgCAHABQAGgBACAGQAIgGAJgDIAAgBQAAgPAGAFIAAAAIAAAPIAAACQgKANgFARIgBACIAAACIgHAGIgEACIAAgBg");
	this.shape_626.setTransform(22.65,-31.8011);

	this.shape_627 = new cjs.Shape();
	this.shape_627.graphics.f("#FEEED6").s().p("AAAANIgBACQgDgFgHgFIABgBQAKgCAAgPQAGgCgDAFQgEAIAEAHIABAAQAQAHgRADQABgLgEAJg");
	this.shape_627.setTransform(25.3629,-29.0058);

	this.shape_628 = new cjs.Shape();
	this.shape_628.graphics.f("#F3D6BC").s().p("AgDAfIgCAAQgOgBgCgKQAIgPAKgOIAAgBIAAgCIAAgCQAIgMAOgDIABgBIAAACQAGAUgKAfIAAACIgBAAIgGAGIgCAAIgFAAIgFAAgAACATQARgDgQgHIgBAAQgEgIAEgHQADgFgGACQAAAPgKACIgBABQAHAFADAFIABgCQABgEABAAQACAAgBAGg");
	this.shape_628.setTransform(25.4758,-29.4125);

	this.shape_629 = new cjs.Shape();
	this.shape_629.graphics.f("#96745B").s().p("AAMAbIABgCQAEgIAAgGIAAgCQgHgQgRgHIAAgBIAAgBQgKgEgDgGQAAgBABAAQAAAAAAgBQABAAAAAAQABAAABABIABAAQATAJANAOQAAAAAAAAQAAABABAAQAAAAAAAAQAAAAAAAAQAGAPgJAPIgBAAIgDACIABgCg");
	this.shape_629.setTransform(19.7543,-31.4518);

	this.shape_630 = new cjs.Shape();
	this.shape_630.graphics.f("#8E7F70").s().p("AgOAGQAJgMAUAAIABAAIgBABQgJAAACABQAIAGgIABQgPABgJADIACgBg");
	this.shape_630.setTransform(16,-33.2875);

	this.shape_631 = new cjs.Shape();
	this.shape_631.graphics.f("#F9E0C7").s().p("AgDgGQAJgCAGADIgBABQgJAHgNAFQAFgFADgJg");
	this.shape_631.setTransform(17.9,-30.3068);

	this.shape_632 = new cjs.Shape();
	this.shape_632.graphics.f("#F5DFC9").s().p("AgTATIAAgBQAAgJAGgGIACgCIAEgBIANgKIAFgCQAKgIgBAEIgEADQgGAKgNAJIgFABIgCACQgEAKgFAAIAAAAg");
	this.shape_632.setTransform(14.6548,-28.3049);

	this.shape_633 = new cjs.Shape();
	this.shape_633.graphics.f("#AE8A71").s().p("AgUAgQgCgHgGgFQABgEAEgBIAAgBIAIgGIAAgCQAOgPAKgVQAAgBAAAAQABAAAAAAQAAAAABAAQAAAAABAAIAAACQAEAAACACIABAAQAGABADACIABABIgBACIgBABIgCAAQgNADgKANIABABIAAACIgCAAQgMALgJASIABADIABABIgCAAg");
	this.shape_633.setTransform(24.825,-30.3812);

	this.shape_634 = new cjs.Shape();
	this.shape_634.graphics.f("#795A43").s().p("AgRgBIACAAIACgBQAHgCALABIAAgBIAMAAIABAAIgBABQgIAIgJAAQgIAAgJgGg");
	this.shape_634.setTransform(24.525,-25.8858);

	this.shape_635 = new cjs.Shape();
	this.shape_635.graphics.f("#D9B69D").s().p("AgGAUIAAgBIAAgBQgDgBAAgDIAAgCIgBgBIgBgDQAJgRAMgMIACAAIAAACQgLAOgHAOQACALANAAIACAAIAAABQgLgBgHACIABgCg");
	this.shape_635.setTransform(23.925,-28.3625);

	this.shape_636 = new cjs.Shape();
	this.shape_636.graphics.f("#F8DABC").s().p("AgGATIAAgBIgGAAQAJgFAEgKIABgCQAIgHACgMIABAIQgFANgEAFIAAACIgBABQgEACgEAGIgBAAg");
	this.shape_636.setTransform(19.475,-28.3764);

	this.shape_637 = new cjs.Shape();
	this.shape_637.graphics.f("#8C6E57").s().p("AgVAJQAEgGAFgCIABgBQAIgGAKgDIACAAQAGAFACAGIABAAIAAACQABADADABIAAABIgBAAIgLgEQgIgFgEACIgTAIIAAgBg");
	this.shape_637.setTransform(21.05,-27.375);

	this.shape_638 = new cjs.Shape();
	this.shape_638.graphics.f("#B38E76").s().p("AgRAHQADgEgCgBIAAgBQAAgEABgCIABgBIACAAIgBACIATgIQAFgDAHAGQgEgBgFADIgDACQgCAFAGADQgCAEgHgBQgEgCgCAFQgDAFgCAAQgEAAgDgHg");
	this.shape_638.setTransform(20.2,-25.8368);

	this.shape_639 = new cjs.Shape();
	this.shape_639.graphics.f("#F5D9C1").s().p("AAGAAIAAgBQgNABgIgHIAAgBQALADATACIAAABIABAAQgHAEgBAHQgDgGABgDg");
	this.shape_639.setTransform(22.4,-23.4);

	this.shape_640 = new cjs.Shape();
	this.shape_640.graphics.f("#F6DAC1").s().p("AACgJIABAAQAFgGAEgCIACgBQACAIgEAKIACAAIgBAAQgJAQADgKQABgIgCADQgGAKgNAIQAMgOADgOg");
	this.shape_640.setTransform(23.7364,-21.625);

	this.shape_641 = new cjs.Shape();
	this.shape_641.graphics.f("#EDD9C5").s().p("AgEAFIgBAAIgBAAQADgLADgEIgBADQgBAHADAAQAJgIgEAQIgCABIgBABIgCABQgBgHgEABg");
	this.shape_641.setTransform(18.6723,-6.25);

	this.shape_642 = new cjs.Shape();
	this.shape_642.graphics.f("#BA9477").s().p("AgSARQACgIAHgDQALgFgEgFIAAAAQAMgCAJgRIAAAAQgKAXgDAYIgCAAIgEAAQgIAAgKgHg");
	this.shape_642.setTransform(4.65,-16.2076);

	this.shape_643 = new cjs.Shape();
	this.shape_643.graphics.f("#948171").s().p("AgdAhIAAgCQAcghAcgdIACAAQABAAAAAAQAAAAAAABQAAAAAAABQAAAAgBABQgPAZgYAVIgBACQgGANgLAAIgBAAg");
	this.shape_643.setTransform(2.6375,-18.7049);

	this.shape_644 = new cjs.Shape();
	this.shape_644.graphics.f("#A29080").s().p("AhhBeIABgFIABABIAAABQAMABAGgNIABgDQAagWAPgYQAAgBAAgBQABAAAAgBQAAAAgBAAQAAgBAAAAIBWhpIACgBIgCABQAJgDAQgBQAIgBgIgHQgCgBAJAAIABgBIABgCQADAGAKAEIAAABIgCAAQgSgFAJANIgBgBQgLgIgJAKQguAzgqA1QgOASgRANIAAACQgIAKgHAHIAAABIgGAMIgBAAQgGAEgGAAQgFAAgFgCg");
	this.shape_644.setTransform(9.2,-24.5663);

	this.shape_645 = new cjs.Shape();
	this.shape_645.graphics.f("#A7866C").s().p("AAPAIIgBgBIgBgBQgNgIgPADIgBACIgJAEIAAgDIAAgCQALgCAAgHIAAgCQADgLANAKIAKAIQANAJABAGQAAABgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQgEAAgEgIg");
	this.shape_645.setTransform(0.875,-12.8864);

	this.shape_646 = new cjs.Shape();
	this.shape_646.graphics.f("#BB9E87").s().p("AgRBcQgRgDgHAAIgBgBIgDgFIALgkIACAAQAMgFgHgNIgBACIAAAAQAOg+ATg6IABAAIAAACIAAADIAKgFIABgBQAQgEANAJIAAABQgRACgDAOQgDARgEAJIAAABQgCAJADAFQgBAQgMAIIgBABQABAHgFAJIAAACQADAJgEAKQABAGgCgBQgKgDAGAEQAJADgIAGIgBABQAAAEgCADIAAABQgHgBgHAKIgBABQgBAOgKAFIAQAEIAAAAIgBAAg");
	this.shape_646.setTransform(-2.375,-3.6365);

	this.shape_647 = new cjs.Shape();
	this.shape_647.graphics.f("#9D7F68").s().p("AgLgDIABgDQAHAAAQADIABAAIAAACQAGAAAAAEIAAABIgBAAIgBABQgUgFgRAHQAGgJACgBg");
	this.shape_647.setTransform(-5.4982,5.95);

	this.shape_648 = new cjs.Shape();
	this.shape_648.graphics.f("#DEC0A8").s().p("AiIDYIAAgBIAAgCQABgFgHABIAAgCIAAAAIgQgEQAKgFABgOIABgBQAIgKAGABIAAgBQACgDAAgEIABgBQAJgGgKgDQgGgEALADQADABgCgGQAFgKgEgJIAAgCQAFgJAAgIIABgBQALgIABgQQgDgFACgJIAAgBQAFgJADgRQADgOAQgCIABAAQAIAMAEgGQgBgHgNgKIgKgHQgOgLgDAMIgBgBQABgFgCgDQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABAAIAAgBQALAEALgFIABgBIAGgLIAAgCQAHgGAIgLIAAgCQARgNAOgRQAqg3AugzQAJgKALAIIABABQgJgMASAFIACAAIAAABQASAHAGAQIAAACQAAAGgDAJIgBABQgEAFAGgFIAAAAQAJgPgFgQQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAgBAAQgNgOgTgKQAPgHARgEIACAAQAGAIAJgCQADgBAAgDQgGgNALgDIAAABQANAOAHAQIABABQAAAAgBAAQAAAAgBAAQAAAAAAABQgBAAAAAAQgLAVgOARIABgCQAGgRAJgOIAAgCIAAgPIAAAAQgFgFgBAPIAAABQgJADgJAGQgCgGgFABQgHgBgGACQANAHAFANIABAAQAGAQgJAHQAAABAAAAQAAAAAAAAQABAAABgBQABAAABgBIAAAAQgDACgBADIgCAAQgLAEgIAGIAAgBQAEgGAFgNIgCgIQgBALgJAIIAAgBQgCgHgKADQAAAAgBABQgBAAAAAAQAAABAAAAQgBABABAAQAAAFgKAAQgBAAgBAAQAAAAAAABQgBAAAAAAQAAAAAAAAIgBABQgPAEAEAJIgCABIgwArQgXAYgOAjQgHARgIAQQgBgBgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQgJAFADAFIADAAQADAHgQADQABABAAAAQAAABAAAAQAAABAAABQAAAAAAABQgIAXgUASIgUA5QgEAMgBAKQgFAhgJARIgCgBgAgjgiQgJARgOACIAAAAQAGAGgMAFQgHADgDAHQAMAJALgCIACAAQAEgXAKgYgAgIhRQgFAGgEAIIANgIIABAAIAIgQIAAAAQgHABgGAJgAA4iQIgFACIgOAKIgEACIgDACQgFAGAAAJIAAABQAFAAAEgKIACgCIAFgBQAOgKAGgKIADgDQABAAAAAAQAAgBAAAAQgBAAAAAAQAAAAAAAAQgCAAgGAFgABJieQgDAKgFAFQAOgFAJgIIABgBQgEgCgEAAIgIABg");
	this.shape_648.setTransform(10.2,-15.125);

	this.shape_649 = new cjs.Shape();
	this.shape_649.graphics.f("#B09B86").s().p("AgIALIAAgBIABAAQAGgOAKgHIgCAKQgDANgKAAIgCgBg");
	this.shape_649.setTransform(15.25,1.057);

	this.shape_650 = new cjs.Shape();
	this.shape_650.graphics.f("#AB9582").s().p("AgWA2QAagvAPg9IAAgCIABABQABAQACAMIAAAAIgEARQgBAFgDADQgIAIAKAEIABAAQgMAVgRANQgDAJgFgCQADAGgCAAIgEgDg");
	this.shape_650.setTransform(12.275,1.758);

	this.shape_651 = new cjs.Shape();
	this.shape_651.graphics.f("#B69478").s().p("AgTAWQADgEAGgBQAGgBgBgOIAAgBQAHgBADAIIABABIADABQAJgKgJAEIAAABQACgNgBgVIAAABQAFAJgCAQIABAAQAFAFABAJIAAABIgHAOIgBABQgHADgGAAQgKAAgIgIg");
	this.shape_651.setTransform(14.675,6.4074);

	this.shape_652 = new cjs.Shape();
	this.shape_652.graphics.f("#F9DDBD").s().p("AgJAEQAJgDAIgHIAAgBIAAACQAFAFgJAEIgBAAQgDAEgDAAQgDAAgDgEg");
	this.shape_652.setTransform(16.1143,9.7315);

	this.shape_653 = new cjs.Shape();
	this.shape_653.graphics.f("#D5BBA5").s().p("AgcC+QgagKgZgFIgBgBIgDgHIACgQIAAgBQAIAFgEgIQAFABACgIQATgNALgVIgBAAQgJgEAHgKQADgCACgFIADgRIABAAQgDgNAAgQIgBAAQAThQARhTQADgVgBgTQAAgKAEgFIAAABQABABgDAFQAHAMAGgKQACgFAFABQAGACADgEQgHgEADgGIACgCQAFgDAFABIALAEIABAAIAAABIgBACIgCABIgCAAQAUAOAPgQIABgBQADACgBAEIAAACIgBABIgEAQQAAAAABAAQAAAAAAABQAAAAAAABQAAAAAAABIAAABIgBAAQgDALgGAGIgCAAQAEgJgCgJIgCABQgEADgFAFIgBABQgEAPgMAOIAAACQgGAMAAAIIgBABQgJAPgFAVIgBAAIgLARIAAABQgCAIACAEIgBAAQgJANACAJIgGAcQACAVADgVIABgBQAEgBACAIIACgCIABgBQgHBIgIBDIAAADQgCgJgEAKIAAABQgIAIgKADQAHAIAGgIIABAAIAAABQgFAJgIACgAgnCPIAAABQABAOgHABQgFABgEAEQAOAMASgHIACgBIAGgOIABgBQgCgJgFgGIgBAAQACgQgEgJIgBgBQACAVgDAOIABgBQAIgEgJAKIgCgBIgCgBQgDgHgGAAIgBAAgAgjBiIgBABIgBABQANABADgOIACgKQgLAGgFAPgAAxicQgBADADAHQABgHAHgFIgBAAIAAgBQgUgCgMgDIAAABQAJAIAOgCg");
	this.shape_653.setTransform(18.1375,-7.7875);

	this.shape_654 = new cjs.Shape();
	this.shape_654.graphics.f("#B4927A").s().p("AgaBwIABgFIAAgCIABAAQADgRgDgNIABABQAAgHgCgIIgCgBQgKgDgXgDIAAABQgBgHgLAAQgLAHAAAVQgBAQgEALIAAgCQACgRgDgNIABgHIABgBIAAgBQABgBAAgBQAAAAgBgBQAAAAAAAAQgBgBAAAAIAEgPIABgBIAAACIAAABQAOAAgIgQIgBgBIABgBQAJgfgFgVIAAgBIABgBIABgCQAGAGgBgTQgBgHAEgDQAbgOAhABIAAAAIADABIABABQALALgIgRIAAAAQAFgRACgVIAAgBIAQgEQAIgBAKAGQAJgCAFgDIACABQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAgBQADABACACIABABIAAABQALAMAIAPIAAABIgBABIgYgXIgPgDQgVgDgPANQABAeAKANIABAAQAagMAegEIAAABIgCgBQgFACgCADIAAABIgXAJIgBABQgHACgGADIgHAAQgPgBgDACIgBAAQgHgHgJgGIgSAAQgQADAFAEIgBAAQgPAGgJANQAOADAFgJIABABIAAgBQAKAJAHALIgBAAQgFAFgGAEIAAABQgLgEgHgFIgCgBQACAIALAJIABABQgFAIADAEIAAABQgPAJgCAPIAAACQAaAIAOgDIACAAQAHgDADgGIABgBIAEgQIABAAIAAACIgBAJIABAAIAAACIgCAFIgBAAQgIAKgMADQAJAFACANIgCAJIABAFIgCAHIgEANIgDAMIgCgBgAhCAvQATAFASgBIACAAQgRgFgVAAg");
	this.shape_654.setTransform(34.925,-29.75);

	this.shape_655 = new cjs.Shape();
	this.shape_655.graphics.f("#DEC2A9").s().p("AggAJIAAgBIAAgCQAFgKAAgPQAAgVALgIQAMAAAAAHIABgBQAVADAKADIACABQACAJAAAGIgBAAQADANgDAPIgBAAIAAgCQABgKgEgHIAAgBQgNgFgHAJIAAgBQgLgIgGAOQgEgEAGgLQACgHAFADIAAAAQACAGANgJIACAAQAMAKgFgQIABAAQgSgHgVAFIgBAAQgFAPgEAQQAFACADgKQADATgEASQgCgJgBALQgEAHgBANIgGgog");
	this.shape_655.setTransform(29.3,-20.0766);

	this.shape_656 = new cjs.Shape();
	this.shape_656.graphics.f("#AF927C").s().p("AgMAjQACgYAHgTIABgBQADACADgPQABgJAGgDIAAABQgDALAFAJIgFASQgFAQAIgHIABAAQgFAVgPAAIgEAAg");
	this.shape_656.setTransform(24.775,5.262);

	this.shape_657 = new cjs.Shape();
	this.shape_657.graphics.f("#C0AA96").s().p("AgUBmIAAAAIgDgXIAAgFIABgBQATACAFgXIgBAAQgIAHAGgQIADgTQgDgJACgLIAAgBQgFADgCAJQgDAPgEgCQANg7AHhCIAAgCIAAgDQAEAHgBATIABAAQAAgNAFgIIADAAQAEAiABAjIAAABQgHAeAAAfIAAAAQgHAKAAALIgBAAIgJAPQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAAAAAQACAFgNAIQAHABgCAOQgBAEgHAAIgGgBg");
	this.shape_657.setTransform(25.825,1.4688);

	this.shape_658 = new cjs.Shape();
	this.shape_658.graphics.f("#B58C6B").s().p("AAIAIQgLgBgKAAIAAAAQANgEANgKIABAAQABALgEAEIgDAAg");
	this.shape_658.setTransform(27.335,11.325);

	this.shape_659 = new cjs.Shape();
	this.shape_659.graphics.f("#E2CBB6").s().p("AgQCVQAEgPgFgBIABgCQAFgXAAgSIgBgBQgFgIACgFIABAAQAGACAAgTIgCgBQgFgBADgHIAAgBQADgVgIAAQgBgIADgHQABgFgFgFQADgDAAgFQACgQgFgEIgBAAQAFgKgDgDIAAgBQgHgDAJgEIgBgJIgBgCQgEADAAgJIAAgCQADgQABgOIgBAAIgCgJIAAgCIAAgOIgBgBIgKgZQADgKAJgFIAAgDIABgFIAZgCIACAAIASAJIACABIABAAIgBABIAAACQAEAGABAHIAAACQgBABgBAAQgBAAAAAAQgBAAAAAAQAAAAAAgBQAAgJgDAKQgDgEAAAFQAAAEgGADQABAFgDAJQgDALAFABIgBABQgDAIgBANIAAAAQgCAKgEALIADAxIAAACQADgJABgMIABAAQAEAWgNAGIgCAAQgHALAGAFIAAAAQAAgKADAAIAAACQgBAFAFAAQAIgDgCAQQgDA1AKArIgBAAQgGgEgCgJIACAYQgBgBAAAAQgBgBAAAAQgBAAAAAAQgBABgBAAQgDACAAgLQgFgCAAAEQgCATgJAAIAAACQAAAPgHASQgEgJAEgOg");
	this.shape_659.setTransform(37.425,-7.0875);

	this.shape_660 = new cjs.Shape();
	this.shape_660.graphics.f("#987056").s().p("AgJgDIgBgBQAKAHAJgFIACAAQgDAHgFAAQgEAAgIgIg");
	this.shape_660.setTransform(37.35,9.9696);

	this.shape_661 = new cjs.Shape();
	this.shape_661.graphics.f("#906E50").s().p("AgIgCIABgBIAVACIACAAIAAAAQgFgBgCACIACABIABABIAAAAIgbADQACgFAFgCg");
	this.shape_661.setTransform(35.475,12.65);

	this.shape_662 = new cjs.Shape();
	this.shape_662.graphics.f("#826246").s().p("AgFAEIgKAAIgBgBIgCgBQACgCAFAAIAAAAQAMgGAPAEIABAAIACAAIAAABQgOABgJAEIgBABIAAgBg");
	this.shape_662.setTransform(38.275,12.473);

	this.shape_663 = new cjs.Shape();
	this.shape_663.graphics.f("#E9C8A8").s().p("AAFATIAAgBQgUgCAHAFIABAAQgNAFgKgKQAEgLAJACIAAAAIAFADQAEACAMACQANgFAHgNIACgBIAAgBQAEgFgFgEQgDgDAGgEQAIAVgMAXIgBAAQABgEgGADQgFACgDAAQgFAAAAgEg");
	this.shape_663.setTransform(37.5891,9.487);

	this.shape_664 = new cjs.Shape();
	this.shape_664.graphics.f("#C2A38B").s().p("AABC8IgWgCQgFgCgCgGQgKghAGgyQAUiKgWhtIgBgEIACgJQACgJAEgIIACAAIgBACQAQgFANABIAAgBQAAgBABAAQAAAAAAgBQAAAAABAAQAAAAAAAAIAAACQAYAAAEAPIABACIgCAAIgSgKIgBAAIgZADIgBAEIAAADQgKAFgDAKIALAZIAAABIAAAPIAAABIADAJIAAAAQgBAOgCAQIgBADQAAAIAEgDIABACIABAJQgJAEAHADIAAABQAEADgGAKIABAAQAGAFgDAPQAAAFgCAEQAEAEgBAFQgCAHAAAJQAIgBgCAVIgBABQgCAIAFAAIABABQABATgHgCIgBAAQgCAFAGAIIABABQgBATgFAWIgBACQAFABgEAPQgEAOAEAKQAIgTgBgPIAAgCQAJAAACgSQAAgFAGACQAAAMACgCQABgBABgBQABAAAAAAQABAAAAABQABAAAAABIgCgYQACAKAGADIABAAQAFAMACAOIAAABQgFAFADADQAEAEgEAFIAAAAIgBABQgIAPgMAFQgMgCgEgDIgFgCIgBAAQgIgCgEALQAKAKAMgGIAAAAQgIgEAVACIAAAAQAAAJAMgGQAHgDgBAEIAAACIgBABIACABIAAABIgBgBQgPgDgNAGIgCAAgAgDCfQANARAGgPIgBAAQgLAFgIgHg");
	this.shape_664.setTransform(36.8,-6.4);

	this.shape_665 = new cjs.Shape();
	this.shape_665.graphics.f("#F8DBB9").s().p("AgBAHIABgBQgGABgBgHQAEgJAJgBIABAAQgBADgDABQAFgBAAAEQgBAOgEAAQgCAAgCgEg");
	this.shape_665.setTransform(39.65,14.1807);

	this.shape_666 = new cjs.Shape();
	this.shape_666.graphics.f("#AD8B6E").s().p("AgfAFIAAgCIAcgCIAAgBIAIABIACAAQAJgEAOgCIAAgBIACABIAAABQgdAKgiABIAAgCg");
	this.shape_666.setTransform(37.125,12.825);

	this.shape_667 = new cjs.Shape();
	this.shape_667.graphics.f("#F9D8B7").s().p("AABANIAAgCQgDADgEgJIAAgBQALgMgBgIIABAAIACAVIAAABQgDABgBAJIgBABQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAgBg");
	this.shape_667.setTransform(36.675,16.5173);

	this.shape_668 = new cjs.Shape();
	this.shape_668.graphics.f("#F1D8BF").s().p("AgCARQAEgHgGAAIABgHIAAgCQAGADgCgMQgBgIADgJQAFAKgFAPIAAAZIgFABQgFAAAFgJg");
	this.shape_668.setTransform(39.3077,19.9614);

	this.shape_669 = new cjs.Shape();
	this.shape_669.graphics.f("#F2D2B0").s().p("AAAAWQgKgBgEgCQAJgFAFgGIABgDIAAgFQAEgDABgHIAAgCIAIgIIAAgBIABABQgBAegOANg");
	this.shape_669.setTransform(29.375,10.95);

	this.shape_670 = new cjs.Shape();
	this.shape_670.graphics.f("#C9AB8F").s().p("AgOAFIAAgBQAGgCAIABIABAAIAMgHIABgBQACABgBAEIgBACIAAAAIgbADIgBAAg");
	this.shape_670.setTransform(28.5167,14.6);

	this.shape_671 = new cjs.Shape();
	this.shape_671.graphics.f("#664C37").s().p("AgWAAIAAAAIACgCIABAAQAQACAQgEIABAAIACABIAIABIAAABIgBABQgNAFgLAAQgLAAgKgFg");
	this.shape_671.setTransform(27.2375,14.0577);

	this.shape_672 = new cjs.Shape();
	this.shape_672.graphics.f("#9C795D").s().p("AgOACIAAgBQAAAAgBgBQAAAAgBAAQAAAAgBAAQgBAAAAAAIAAgCQAFgCANADIATABIgBAAQgLAEgJAAIgMgCg");
	this.shape_672.setTransform(26.7,13.5618);

	this.shape_673 = new cjs.Shape();
	this.shape_673.graphics.f("#CFA88A").s().p("AAMBKIgSgDQgOgCgFACIgCgBIgGgEIABgCQAFgCAMABQAIAAgGgBQgHgKAIgLIACAAQABgJAJgIIABAAQABgPAGgJIABAAQAFgFACAOIAAACIAEgWIgBAAQgHAFADgSQACgIgCgKQAIgQABgQIACACIgBABIgBAKQABAtAJAoIgBABIAAABIgIAIIAAACQgBAIgDADIgBAFIgBAEQgGAGgJAFQAEABAKABIAAABIgCAAQgCABgBAEIgBgBgAAHA7IADAAQADgEAAgMIgBAAQgMALgOAEIAAABIAFgBIAQABg");
	this.shape_673.setTransform(27.45,6.2);

	this.shape_674 = new cjs.Shape();
	this.shape_674.graphics.f("#9D8167").s().p("AAAAFIgegFIABgCIAAgCQADgBAGABIACAAIAAACQAWAIAXgKIABgBIADABIAAABIAAABIgNAHIgCAAQgHgBgGACIgDgBg");
	this.shape_674.setTransform(26.8,14.425);

	this.shape_675 = new cjs.Shape();
	this.shape_675.graphics.f("#C9AF96").s().p("AARAGIABAAIAAAAIgBAAgAARAGQgVgGgNAEQAAgEABgEIABgBIAAACIAAABIAeAFIACABIAAACIAAAAg");
	this.shape_675.setTransform(25.325,14.575);

	this.shape_676 = new cjs.Shape();
	this.shape_676.graphics.f("#E9D1BA").s().p("AgnC0QAAgDgEgBIABgCIAAgCQAMACACgFQACgOgHgBQAOgIgCgFQAAAAgBAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIAKgPIABAAQAAgLAHgKIAAAAQAAgfAGgfIAAgBQgBgjgDghIgDAAQgFAIAAANIgBAAQABgTgEgHIAAADIgBAAQAFgjgEgbIAAgCIABgBIAAgCQABgMADgHQABgLADAIQADgRgCgUQgDALgFgEQAEgQAFgOIABAAQAUgGATAHIgCAAQAFAQgMgJIgCgBQgNAKgDgHIAAABQgEgEgCAHQgFAMACAEQAHgPALAJIAAAAQAIgIAMAFIAAABQAFAHgBALIAAABIAAACIgBAGIACABIgBACQgNAygGA8IgEA6IAAACIgCgBQgBAPgHAQQACAKgCAIQgEASAHgEIABgBIgEAXIAAgCQgCgPgFAHIgBAAQgEAIgCAQIgBAAQgKAHgBAJIgBABQgJAKAHALQAGABgIAAQgLgBgGABIgBgBg");
	this.shape_676.setTransform(28.025,-5.546);

	this.shape_677 = new cjs.Shape();
	this.shape_677.graphics.f("#9F7E65").s().p("AAAAFIAAABIgBAAIAAgBQgHgBgHABQAPgOAQAFIAAACQgCAIgHAAIgHgBg");
	this.shape_677.setTransform(24.55,37.1938);

	this.shape_678 = new cjs.Shape();
	this.shape_678.graphics.f("#E7CDB4").s().p("AAEB7QgJgDgFgFIAAABQgLAEgNADIgBgBQgDgDgCgDIABgCIAAgCIAVgEIABAAIACAAIACABIADABQAGgBALgHIABAAQADgCgDgKIgBAAQgJgEAJgMIgBgBQgEgGgDAFIAAgCQgBgKgGgOIABgBQgFAFgBAMIgBABQgJAKgBAJIgBAAQgCgKABgIQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAABAAQAGgLADgQIgCAAIgBgCQABAAAAAAQAAgBABAAQAAgBAAAAQAAgBAAAAQgCgKAJgEIABAAQgKgLAOAAQgEgIACgKQADgOgDgDIAAgBQgJABgBAPQAAACgBAAQAAABAAgBQAAAAAAgBQAAgCABgCQADgQgIgBIgBAAQACgsgGglIAAgDIABgCQANgFAVAHIABABIAAgBIAcgDIAAgBIABAAIgBAPIABAAQAAAFADADIAAACQAAAMgHACQgBAAgBABQgBABAAAAQAAABAAAAQAAAAABABQAIADgJAGIgBAAQAAALgMAJIgBAAQAEgMgHAMQAIABgEAGQgEAFABAGQAAAOADAGIABACQgHgDgEAMQABAAABAAQABABAAAAQABAAAAAAQAAAAABAAQAIgHgDAUQgHArAEAkQACAVgJgIQgDAGACAEIABACQAAADgCADIgCAAg");
	this.shape_678.setTransform(26.2266,27.0458);

	this.shape_679 = new cjs.Shape();
	this.shape_679.graphics.f("#BEA990").s().p("AgMADIACgFIABAAIAAABQALABAKgCIABAAIgBABQgMAEgIAAIgEAAg");
	this.shape_679.setTransform(23.325,40.0516);

	this.shape_680 = new cjs.Shape();
	this.shape_680.graphics.f("#BF9F85").s().p("AAVAIQgPgDgIAAQACgFAJACIADABQAAgDgLgCIgCAAIgVAFIAAgBIAAgCQANgBAKgFIAAgBQAFAFAKACIACABQADABACAEIAAACIgCAAg");
	this.shape_680.setTransform(25.025,39.275);

	this.shape_681 = new cjs.Shape();
	this.shape_681.graphics.f("#8B6D55").s().p("AgTAEIABgBIACgCIABAAIAVgFIACAAQAMADAAACIgDgBQgJgBgDAEIgCAAIgBAAQgFACgHAAIgJgBg");
	this.shape_681.setTransform(24.275,39.4781);

	this.shape_682 = new cjs.Shape();
	this.shape_682.graphics.f("#72543D").s().p("AANgBIABABIgCAAIgCAAIgWADQALgIAOAEg");
	this.shape_682.setTransform(37.25,37.1777);

	this.shape_683 = new cjs.Shape();
	this.shape_683.graphics.f("#D8BDA4").s().p("AgTByQgBgVABgbQADhfgRhTIABgEIABAAIAAACIAAABQAigBAdgKIABgBQADADgCADIgBACIgBAAQgKABgEAKQABAIAFgCIAAACIAAACQAAATgGARQACADgBAJIgBABIAAACIgBAHQAIAAgFAHQgIANANgFIAAABQABAMgIAKQAIAAgCAFIgFANQAIAXACAcQACAYgHAZQgBACgDABIgBgBQgJgEADgGIABgBQALgIgGgNIAAgCQgLAFAIgJIgCgFIgBgBQgHAIAAgSQgCgHgDAKQgBAKADAMIgBAAQgHAFAEAKQAEADAAADIAAADQgKABgGALQgFgEgBgJgAgChFQAAABAAABQAAAAAAABQAAAAABAAQAAAAABAAQAAgJADgBIAAgBIgCgWIgBAAQABAIgLANIAAABQAEAJAEgDg");
	this.shape_683.setTransform(37.09,24.85);

	this.shape_684 = new cjs.Shape();
	this.shape_684.graphics.f("#C9AE91").s().p("AgWAEIAAgBIABgDIABAAIgBABQAVgEAWgBIAAgBIABABIAAABIgBADIgBgBQgTgBgBAGIAAABQgGgEgRAEIAAgBg");
	this.shape_684.setTransform(37.625,37.9);

	this.shape_685 = new cjs.Shape();
	this.shape_685.graphics.f("#B38D72").s().p("AgRAgIAAgBQAGgKALgCIAAgDQAAgDgFgCQgEgLAIgEIABAAQgEgMACgKQACgKACAHQAAASAHgIIABACIACAEQgIAJALgFIAAACQAGAMgLAIIgBABQgDAHAJAEIABABQAAAAgBAAQAAAAAAAAQAAAAAAAAQAAAAgBAAIgDAAIAAAAQgPgFgLAKIAAABIgCAAg");
	this.shape_685.setTransform(37.4559,34.4059);

	this.shape_686 = new cjs.Shape();
	this.shape_686.graphics.f("#A2876F").s().p("AgUADIABgBIABgBIACAAIAAgBIAWgDIACgBIAAACIALABIADAAIgBABQgVAAgVAFIABgCg");
	this.shape_686.setTransform(37.65,37.525);

	this.shape_687 = new cjs.Shape();
	this.shape_687.graphics.f("#D4AF94").s().p("AgEADQgBgLAFgDQABgBAEACQgEAJgBADQAAALgBAAQgBAAgCgKg");
	this.shape_687.setTransform(38.6429,43.4453);

	this.shape_688 = new cjs.Shape();
	this.shape_688.graphics.f("#A88365").s().p("AAWAJQgIgBgLgEQgNgEgGABIgBAAQgDgFgFgDIABgBQAYAFAaAJIAAABIgBAAIgBACIgCAAg");
	this.shape_688.setTransform(12.625,10.625);

	this.shape_689 = new cjs.Shape();
	this.shape_689.graphics.f("#75573F").s().p("AgVgEIgBAAIgCAAIABgBQAGgDANAFQAKAEAJAAIACABQAEAAACACIACABIAAAAIgPACQgTAAgMgLg");
	this.shape_689.setTransform(13.35,11.3554);

	this.shape_690 = new cjs.Shape();
	this.shape_690.graphics.f("#A6886C").s().p("AgMgCIgCAAIgVABIAAgBQAHgHAOADIABgBQAPAOAegFIAAgBIAEAEIAAABIgCAAQgIACgIAAQgSAAgMgKg");
	this.shape_690.setTransform(12.6125,11.721);

	this.shape_691 = new cjs.Shape();
	this.shape_691.graphics.f("#F2D8BB").s().p("AgRBEIgJgNIAAgBIAGgRQAAgBAAAAQAKgFAAgIIAAgCQgEgVAOgOQAAgMADgLQADgNgGgGQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQgLAJAIgMIgCAAIgSACQAHgKANACQADABADgDQALACALgBIACAAIAAACQgFAOgBANIABABQgHgCAEgMIgBgEIgBgBQADgJgIAFIgCAAQADAGgDASIAAAFQgDAFAIgBQgIAIgCAQQgDAUgCgCIAAgCQgBgDgEALIABAAIgCASIgFAHIgBACQgDgFgBANQAHADgGALIgCABIAAgCg");
	this.shape_691.setTransform(13.425,19.725);

	this.shape_692 = new cjs.Shape();
	this.shape_692.graphics.f("#EAD5BD").s().p("AAEARIgKgNIAFgQIAAgBQAEgFADAFQACADgBAFQgDAMACAKIgCAAg");
	this.shape_692.setTransform(11.7667,28.3434);

	this.shape_693 = new cjs.Shape();
	this.shape_693.graphics.f("#AF8D73").s().p("AgOAAQABgHABACQABAGAEAAQAEAAAHgDIAAgBQgJgLAMANIADgBIADgBQAEADgFAIIAAABIgDAAQgKAAgNgJg");
	this.shape_693.setTransform(9.3889,32.3773);

	this.shape_694 = new cjs.Shape();
	this.shape_694.graphics.f("#F6D9B8").s().p("AgCAKIgIgEQAJgKAIgCIABgCQAAgBAAAAQABAAAAAAQAAABABAAQAAABAAABIAAADIgBADQgDAAgBACIgFAIIgCAAg");
	this.shape_694.setTransform(10.95,34.4692);

	this.shape_695 = new cjs.Shape();
	this.shape_695.graphics.f("#D5BAA1").s().p("AgHB5IgHgFIgCAAQgNgEgOAEQgGgBABgFQAJguAHg0QAIg4gEgwIAFgdIABAAIAAABIAVgBIABAAQASAQAdgHIABAAIABAAQABAFgCABIgCAAQgLAAgLgBQgEACgDgBQgOgCgGAKIARgBIACAAQgIALAMgIQAAgBAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAGAGgDANQgDALABAMQgQAPAEAVIABACQAAAJgKAEQAAAAAAABIgFAQIgBACIAIAMIABACIgBACIAAABIgEARIAKANIACAAIgBABIgBAKQABALgDAOIAAACQAAgBgBgBQAAgBgBAAQAAAAAAAAQAAAAAAABIgBACQgIACgJAKIAIAFIABAAIABAAIgBADIgCgBgAgiBYQAPAKAMgCIAAAAQAFgIgEgEIgDAAIgDABQgNgMAKALIAAABQgIAEgEAAQgEAAgBgHIAAgBQgBAAgBAHg");
	this.shape_695.setTransform(11.3973,23.6);

	this.shape_696 = new cjs.Shape();
	this.shape_696.graphics.f("#8B6B53").s().p("AgQABIAAgBIgCgBQAOgFANAFIABAAIAIAEIABABIAAAAIgjgDg");
	this.shape_696.setTransform(8.85,35.4125);

	this.shape_697 = new cjs.Shape();
	this.shape_697.graphics.f("#BBA087").s().p("AgPgEIABAAIAiADIAAAAIAEACIAAACIgBgBQgagJgUAMQAAgIAIgBg");
	this.shape_697.setTransform(8.725,36.025);

	this.shape_698 = new cjs.Shape();
	this.shape_698.graphics.f("#CCA081").s().p("AgDACQAFgTACATQAAAGgCAAQgCAAgDgGg");
	this.shape_698.setTransform(8.105,47.3875);

	this.shape_699 = new cjs.Shape();
	this.shape_699.graphics.f("#C3A88F").s().p("AADARQAEgOgDgJIAAgBQgIAKADATQgBAIgBgGIgBgBQgDANgEADIAAgCIAEg7IACgQIAAgCQABgDABAMQABAIAFACQACgOABgMIABAAQAFANgGARIgBABQAGAJABAKIAAACQgJAUgDAVQAAABgBAAQAAAAAAABQgBAAgBAAQAAAAgBAAIAHgfg");
	this.shape_699.setTransform(6.975,43.375);

	this.shape_700 = new cjs.Shape();
	this.shape_700.graphics.f("#E5C4A6").s().p("AgVBFQgFgEgCgEIADgPIABAAIAAABIgBAJQAEABACgCIABAAQABAAABAAQABAAAAgBQAAAAABAAQAAAAAAgBQAFgVAIgUIAAgCQAAgKgGgJIAAgBQAGgRgFgNIgBAAQAAAMgDAOQgGgCAAgIQgBgMgBADIgBAAQABgNgDgKIACgDIAAgBQATgNAbAKIABAAIABAAQgOAjgIAzQAKAZgNAUIgCAAIAAgBQgNgCgIAEgAgFAxQAIAMgBgMQgBgKgBAAQgCAAgDAKg");
	this.shape_700.setTransform(8.325,42.6826);

	this.shape_701 = new cjs.Shape();
	this.shape_701.graphics.f("#B69A80").s().p("AgIAcIABgIIAAgCQAEgDADgNIAAABQABAGABgHQgCgSAIgLIAAABQADAKgEAOIgHAeIgCAAIgDAAIgDAAg");
	this.shape_701.setTransform(6.5981,45.445);

	this.shape_702 = new cjs.Shape();
	this.shape_702.graphics.f("#A18871").s().p("AgIgBIgBgBQAJgEANADIAAABIgCAAQgLgCACACIACACQgHABgJAEQABgFADgBg");
	this.shape_702.setTransform(7.275,49.8019);

	this.shape_703 = new cjs.Shape();
	this.shape_703.graphics.f("#C2AE9A").s().p("AgDARIgCAAIAEgeIAAgBQAIgFgDAMQgCAKAEAKIgIAEIgBAAg");
	this.shape_703.setTransform(6.475,54.2867);

	this.shape_704 = new cjs.Shape();
	this.shape_704.graphics.f("#DFC3A8").s().p("AgNAgIABgDIAAgCIABAAIAJgEQgDgJACgMQACgKgIAEIAAgBQAAgLgEgIIABgDIAAgBQAJgEAHgCIgCgCQgCgCALACIABABIACAAQgGAfgBAhIgBABQgGAIgEAAQgFAAgEgGg");
	this.shape_704.setTransform(7.325,53.2376);

	this.shape_705 = new cjs.Shape();
	this.shape_705.graphics.f("#C4B19D").s().p("AgCgDIABgBIABABQANAIgRAAIACgIg");
	this.shape_705.setTransform(35.9643,50.925);

	this.shape_706 = new cjs.Shape();
	this.shape_706.graphics.f("#C8AD97").s().p("AgIAtIgCAAIgDgBIAAgBQAFghgDgZIABgEIAAgDIABgBIgBgNIABgCIABgBQAFgNgJgEQAIgJACAQQAAAEgCAGQAGAKADAOIAAAAQgDAVgBALQgCAAgBAMQgCAPAEgDQAHACAEgCQAGANgJAFIgBABQgJgGgGgJg");
	this.shape_706.setTransform(37.208,45.4764);

	this.shape_707 = new cjs.Shape();
	this.shape_707.graphics.f("#E3C7AD").s().p("AAJBMQgJgDgKABIAEgCQgIABgHgGIAAgDIABgCQASAAgOgJIgBAAIABgEIAAgCIADABIABAAQAHAJAIAGIACgBQAIgFgFgNQgEACgHgCQgFADADgPQABgMADAAQAAgLADgVIgBAAQgBgOgHgKQACgGAAgEQgDgQgHAJQAIAEgEANIgBABIgCACIABANIAAABIgBABQgCgbgHgUIABgEIABAAIgBABIAAACQASgFAGAEIAAAAQAAgIAUACIABAAIABgDQACAZgEAfQgDASgDALQgGANAIgEQgIAHAGAEIABABQADATgDAOIgBABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAQgIAGAIAFIAAACIgCgBgAALgdQgGAEABAMQADASACgTQAAgFAFgIIgFgCIAAAAg");
	this.shape_707.setTransform(37.5833,45.175);

	this.shape_708 = new cjs.Shape();
	this.shape_708.graphics.f("#967D67").s().p("AgOADQACgDADgBIABgBQALgBAJADIACAAIABAAIAAABIgBABQgLABgLAAIgGAAg");
	this.shape_708.setTransform(37.325,52.88);

	this.shape_709 = new cjs.Shape();
	this.shape_709.graphics.f("#DDCAB5").s().p("AgOAaQAHgegHgYIAAgBIAAgCQAOABAOgDIAAAAIABACIAAACQgPAAADANQABAAAAAAQABAAAAAAQAAAAAAAAQAAABgBAAIgBABQgDALgCAXIAAABIgJANQgEgDABgFg");
	this.shape_709.setTransform(37.375,56.4);

	this.shape_710 = new cjs.Shape();
	this.shape_710.graphics.f("#D3AF94").s().p("AgGAIIABgCQABgQAGgDIABAAQAAAKAEAMIgBABQgDAEgDAAQgDAAgDgGg");
	this.shape_710.setTransform(24.4,52.8472);

	this.shape_711 = new cjs.Shape();
	this.shape_711.graphics.f("#C4AE9A").s().p("AgKBBIgCABIABgDIABADgAgGgSIABgKIAAgBQADgFAAgJIAAgBQAJgMgFgHIAAgCQAFABAAAFIAAABQgBALACAQIAAABQABAGACgBIACABQgDAZgHAiQgDAMgEAIQgGACgBAEIAFhPg");
	this.shape_711.setTransform(23.3,48.55);

	this.shape_712 = new cjs.Shape();
	this.shape_712.graphics.f("#E6CCB3").s().p("AgWBPIAAgBIgDgDIABgBIAAAAIgBgDIAAgCQABgDAGgDQAEgIAEgMQAHgiADgZIgCAAQgCABgBgHIAAgBQgCgQABgKIAAgCQAAgFgFgBIAAACQAFAHgKAMIAAACQAAAJgDAEQgBgbgGgVIAAgCIAAgCQALACAPgHIAAAAIAAAAQAKAAAPACIACAAIgBABQgEADgHgCIgBABQgIACgGAMQAEAOAIgLIAFgCQAIgEgFAKQgCACgCAVQgFA1gCAoIgBgBIgCgBQgGAGAEADQADACgBADIgDACIAAgBQgIgGgGAHIgDABIgEAAIgEAAgAgIA5IgBACQAGAMAGgKIABgBQgEgNAAgKIAAAAQgHADgBARg");
	this.shape_712.setTransform(24.7,47.745);

	this.shape_713 = new cjs.Shape();
	this.shape_713.graphics.f("#816B56").s().p("AgJACIAAgCIABAAQAFAAADgBIABAAIABAAQAQADgQAAIgLAAg");
	this.shape_713.setTransform(23.3871,55.759);

	this.shape_714 = new cjs.Shape();
	this.shape_714.graphics.f("#C0AE9C").s().p("AgBgEIAAgBQAFgOAAARQAAAMgHACIACgQg");
	this.shape_714.setTransform(22.8014,60.8512);

	this.shape_715 = new cjs.Shape();
	this.shape_715.graphics.f("#DDC7B1").s().p("AgIApQgDgBgBgGIABgFIAAgBQAIgCAAgNQAAgQgGANIgBAAQADgYgHgPIACgFIABAAIAAACQAfABgUgFIgBAAQAFgIAKAHIAAAAIAAAJIABACQgIgFgDANIAAADIAAABQAFAVgDAYIgFAGQgEAEgDAAIgCAAg");
	this.shape_715.setTransform(23.625,59.2574);

	this.shape_716 = new cjs.Shape();
	this.shape_716.graphics.f("#EBCDB2").s().p("AgLAlIACgBIABgJIgBgBQAFgMAAgKIABAAQAHgDgCgPQgBgHgDAFQACgQgBgKIgCgCQACgMAUgCIACAAQAJADgDAKIABAAQgVAngKAzQgEARgEgDIACgHQABgNgIAJIgLALQACgRAOgFg");
	this.shape_716.setTransform(-5.975,12.725);

	this.shape_717 = new cjs.Shape();
	this.shape_717.graphics.f("#C7B09A").s().p("ACGCfIgCgJQAQhDAChFIAAgBQAIABgDAQQAAACAAACQAAABAAAAQAAABAAgBQAAAAABgCQAAgPAKgBIAAABQACADgCAOQgDAKAFAJQgOAAAKALIgCAAQgIAEABAKQAAAAAAABQAAABAAAAQAAABAAAAQgBAAAAAAIABACIACAAQgEAQgGALQAAAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAQgCAIADAKIABAAQABgJAJgKIABgBQAAgMAFgFIAAABQAFAOABAKIABACQAEgFADAGIACABQgLAMAKAEIACAAQADAKgDACIgCAAQgLAHgGABIgEgBIgCgBIAAgBQANAFADgOIgBgBQgQgGgPAPQAHgBAHACIAAABIAAAAIgVAEIAAgBgAi2gsQAMg3AHg2IAAgCQASgIAUAHIABgCIABAAIAAACIACAAIgBACQAJADgGAKIAAABIgBAAQADgKgKgDIgBAAQgWACgCAMIACACQACAKgDAQQAEgFABAHQADAQgJADIgBAAQAAAKgFAMIABABIgBAJIgBABQgPAFgCARQABAFgCAAIgDACIgCgQg");
	this.shape_717.setTransform(8.875,22.2293);

	this.shape_718 = new cjs.Shape();
	this.shape_718.graphics.f("#E9D2BB").s().p("AAMBPIgBgEQgCgRgHgKIAAgBQgKg4gYg4QABgJAEACIABgCQACgDACAGIABgDQABgDADABIAWgEIAAAAQAFABgDACQgQAEAJAOIAAABIABABIgBABIAAADQABAMAFgJIgBADQgDAJADAJQADgFADAKQAFA1ARAuQgDAEgEgDIgBgDQgDgHgFgFIgBAAQAIAHgHAGIAAABQAGAGgEAAIgHgCg");
	this.shape_718.setTransform(46.25,-15.4971);

	this.shape_719 = new cjs.Shape();
	this.shape_719.graphics.f("#E0CDBB").s().p("AADAOQgEgPgGgNIAAgBQAHgBACAGIACACIAAACQgGgEACAMIABACQABABAAAAQAAABAAAAQAAAAAAAAQABAAAAAAQAHgKgDANQgCAHgBAAIgBgCg");
	this.shape_719.setTransform(48.6079,-5.2846);

	this.shape_720 = new cjs.Shape();
	this.shape_720.graphics.f("#AB886D").s().p("AgIAGIAAgCQAFgKAHAAIACAAQADACAAADQAAAIgJAAIgIgBg");
	this.shape_720.setTransform(49.475,2.5839);

	this.shape_721 = new cjs.Shape();
	this.shape_721.graphics.f("#F5D4B1").s().p("AgUAIQAOgGAMgHQAMgHABACIACAJIAAABIgHAIQgGADgJAAQgIAAgLgDg");
	this.shape_721.setTransform(49.95,3.6736);

	this.shape_722 = new cjs.Shape();
	this.shape_722.graphics.f("#9C7C62").s().p("AgOAFIAAgCQANAAgHgDIgCgBQAKgEAOABIABABIgBABIgPADIAJABIACAAIgBAAQgJADgKAAIgEAAg");
	this.shape_722.setTransform(48.825,5.6675);

	this.shape_723 = new cjs.Shape();
	this.shape_723.graphics.f("#D1B69E").s().p("AgDBvQAAgbgDgaQgIhaglhDIAAgBQABAAABAAQAAAAABgBQAAAAABAAQAAgBABAAIACgGQgIAFgBgMQAHAAABgKIADAAQAFAAAEgHQgGgFALAAIADgBQAFgIALAIIABABQABgFgCgDQgGgGAOgEQAIAKgBARIgBACIAAAAQgFgGgEATQgJgNAQgEQADgDgFgBIAAABIgWAEQgDgCgBADIgBADQgCgGgCADIgBACQgEgBgBAIQAYA5ALA4IAAACQAGAIACARIABAFQAOAEgJgIIAAgBQAHgGgIgIIABAAQAFAGADAGIABADQAEADADgDIAAABQAUAyAFA9IAAACIgCgJQgBgCgMAHQgNAIgOAGQAWAHANgHIAAAAIAAACIgFAGIgBAAQAAgBgBgBQAAAAgBAAQAAAAgBAAQAAABgBABIgBgBQgPgBgKAEQgNgRgBgcgAATCDIAAACQASAFAAgNQAAgDgCgCIgDAAIgBAAQgHAAgFALgAALAhIAAAAQAHAOAEAPQACAGADgKQADgPgIAMQAAAAAAAAQAAAAAAgBQgBAAAAAAQAAgBAAAAIgBgCQgDgNAGADIAAgBIgBgCQgDgFgFAAIgDAAgAgEhvIAAgCIAAAAIADABIgBABIgCAAg");
	this.shape_723.setTransform(46.65,-10.125);

	this.shape_724 = new cjs.Shape();
	this.shape_724.graphics.f("#896A51").s().p("AgEAEIgKgBIAOgDIABgBQABgBABAAQAAgBABAAQAAAAABABQAAAAABABIAAAAIAHgBIACAAIAAABQgHAFgLAAIgBAAg");
	this.shape_724.setTransform(50.2,5.4625);

	this.shape_725 = new cjs.Shape();
	this.shape_725.graphics.f("#BB9F84").s().p("AgaAGIADgEIABAAIAAACQANAAAKgDIABAAQAMAAAHgFIgBgBQADgDAEAEIgBABIgBAAQgUAKgWAAIgJgBg");
	this.shape_725.setTransform(49.625,5.7565);

	this.shape_726 = new cjs.Shape();
	this.shape_726.graphics.f("#C79F83").s().p("AgGABQADgPgGgJIABAAQAHgBADAEIAAABQAEAKAEATIAAACQgBALgJABQgLgFAFgSg");
	this.shape_726.setTransform(50.875,22.6719);

	this.shape_727 = new cjs.Shape();
	this.shape_727.graphics.f("#B7A089").s().p("AgMACIAAgBQAAgBAAAAQABAAAAAAQABAAAAAAQABAAABAAIABAAIATgDIABABIAAAAQgNAEgMACIAAgCg");
	this.shape_727.setTransform(50.025,26.475);

	this.shape_728 = new cjs.Shape();
	this.shape_728.graphics.f("#6E5541").s().p("AgKAAIAAAAQALgEAMAEIABAAIAAAAIgHAAIgBAAIgTADQABAAABgBQAAgBABAAQAAgBAAAAQAAAAAAAAg");
	this.shape_728.setTransform(50.65,26.1375);

	this.shape_729 = new cjs.Shape();
	this.shape_729.graphics.f("#B6977D").s().p("AAMADQgMgDgLADIgCAAQALgKAQAJIAAABIgCAAg");
	this.shape_729.setTransform(50.675,25.7311);

	this.shape_730 = new cjs.Shape();
	this.shape_730.graphics.f("#CDA185").s().p("AgFgBQADgJAEADQAFACgDAHQgCAHgCAAQgCAAgDgKg");
	this.shape_730.setTransform(50.6529,36.8586);

	this.shape_731 = new cjs.Shape();
	this.shape_731.graphics.f("#BDA28A").s().p("AgEAIIAAgCIABgFIAAgBIAAAAIABgBIAAgDQADgNADAMIABAAIAAACQAAAKgJAFIAAgEg");
	this.shape_731.setTransform(49.375,36.5926);

	this.shape_732 = new cjs.Shape();
	this.shape_732.graphics.f("#C6AB91").s().p("AgGALIACgIIAAgCQAAgPAEABIAAACQABAEADgJQACAJABAIIAAACQgDAEgBAHIgBABIgBAAQgCgMgDANQAAgDgCgCg");
	this.shape_732.setTransform(49.65,34.45);

	this.shape_733 = new cjs.Shape();
	this.shape_733.graphics.f("#A28972").s().p("AgLADIAAgCQAAgBAAAAQAAAAABAAQAAAAABAAQABAAAAAAIACAAQANgGADAGIABAAIABAAQAAABAAgBQgMADgLABIAAgBg");
	this.shape_733.setTransform(50,39.05);

	this.shape_734 = new cjs.Shape();
	this.shape_734.graphics.f("#DEC3AA").s().p("AAKCoQgDgHgNAHIAAgBIgHgGIADgLIAAAAIAAABIAAAFQAKgFAAgLIAAgDIAAgBQABgHADgEIAAgBQgBgJgDgJQgBAIgCgDIAAgDQgEAAAAAQIgCAAQADgpgIggIACgIIABAAIgBACIAAABQAMgBAOgFIAAAAIAGgBIABgBIAAgBQgRgJgKAKQgFgDAAgGQABhUgRhIIAAgCIACgMIgBABQgBgIgDgFIAAgCIABgCQAcACAXgMIABAAQADAzABA3QgBAbAEAaQACASgHAWIgDAIQALAJgNgFIgCAAQgEAFACAJIAAABQgJAPADAVIAAACQAFgJADgMQACgHAEgGQACANgHAKIgBABQAGgDgCAQIgEA4QAAABAAAAQgBABAAAAQgBAAAAAAQgBgBgBAAQgMAAALAHQADACgFACIAAAAIgBAAgAABCRQAEASAGgOQADgIgFgCIgCgBQgEAAgCAHgAAAgSIAAAAQAFAIgDAQQgEARALAGQAJgBABgLIAAgCQgEgTgEgKIAAgCQgEgDgFAAIgCABg");
	this.shape_734.setTransform(49.9563,22.2);

	this.shape_735 = new cjs.Shape();
	this.shape_735.graphics.f("#DBBFA5").s().p("AgJAjQgGgBABgFQAFgggGgaIACgFIABAAIAAABIgBACQANgBALgDQAAABAAgBIABABQABAAABABQABAAAAABQAAAAAAABQABAAgBABQgBADgGADQAAABgBABQAAABAAAAQAAABABAAQAAAAAAgBIABABQgFASAAAbIAAACQgEAJgFAAIgEgBg");
	this.shape_735.setTransform(50.1031,42.656);

	this.shape_736 = new cjs.Shape();
	this.shape_736.graphics.f("rgba(246,246,246,0.996)").s().p("AgLgCQALgDAIgJIAAAAIAEAKIABAAIgBAAQgFABAAADIgCAAQgEAGgCAKQgBgOgJgEg");
	this.shape_736.setTransform(33.55,-24.5625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_586},{t:this.shape_585},{t:this.shape_584},{t:this.shape_583},{t:this.shape_582},{t:this.shape_581},{t:this.shape_580},{t:this.shape_579},{t:this.shape_578},{t:this.shape_577},{t:this.shape_576},{t:this.shape_575},{t:this.shape_574},{t:this.shape_573},{t:this.shape_572},{t:this.shape_571},{t:this.shape_570},{t:this.shape_569},{t:this.shape_568},{t:this.shape_567},{t:this.shape_566},{t:this.shape_565},{t:this.shape_564},{t:this.shape_563},{t:this.shape_562},{t:this.shape_561},{t:this.shape_560},{t:this.shape_559},{t:this.shape_558},{t:this.shape_557},{t:this.shape_556},{t:this.shape_555},{t:this.shape_554},{t:this.shape_553},{t:this.shape_552},{t:this.shape_551},{t:this.shape_550},{t:this.shape_549},{t:this.shape_548},{t:this.shape_547},{t:this.shape_546},{t:this.shape_545},{t:this.shape_544},{t:this.shape_543},{t:this.shape_542},{t:this.shape_541},{t:this.shape_540},{t:this.shape_539},{t:this.shape_538},{t:this.shape_537},{t:this.shape_536},{t:this.shape_535},{t:this.shape_534},{t:this.shape_533},{t:this.shape_532},{t:this.shape_531},{t:this.shape_530},{t:this.shape_529},{t:this.shape_528},{t:this.shape_527},{t:this.shape_526},{t:this.shape_525},{t:this.shape_524},{t:this.shape_523},{t:this.shape_522},{t:this.shape_521},{t:this.shape_520},{t:this.shape_519},{t:this.shape_518},{t:this.shape_517},{t:this.shape_516},{t:this.shape_515},{t:this.shape_514},{t:this.shape_513},{t:this.shape_512},{t:this.shape_511},{t:this.shape_510},{t:this.shape_509},{t:this.shape_508},{t:this.shape_507},{t:this.shape_506},{t:this.shape_505},{t:this.shape_504},{t:this.shape_503},{t:this.shape_502},{t:this.shape_501},{t:this.shape_500},{t:this.shape_499},{t:this.shape_498},{t:this.shape_497},{t:this.shape_496},{t:this.shape_495},{t:this.shape_494},{t:this.shape_493},{t:this.shape_492},{t:this.shape_491},{t:this.shape_490},{t:this.shape_489},{t:this.shape_488},{t:this.shape_487},{t:this.shape_486},{t:this.shape_485},{t:this.shape_484},{t:this.shape_483},{t:this.shape_482},{t:this.shape_481},{t:this.shape_480},{t:this.shape_479},{t:this.shape_478},{t:this.shape_477},{t:this.shape_476},{t:this.shape_475},{t:this.shape_474},{t:this.shape_473},{t:this.shape_472},{t:this.shape_471},{t:this.shape_470},{t:this.shape_469},{t:this.shape_468},{t:this.shape_467},{t:this.shape_466},{t:this.shape_465},{t:this.shape_464},{t:this.shape_463},{t:this.shape_462},{t:this.shape_461},{t:this.shape_460},{t:this.shape_459},{t:this.shape_458},{t:this.shape_457},{t:this.shape_456},{t:this.shape_455},{t:this.shape_454},{t:this.shape_453},{t:this.shape_452},{t:this.shape_451},{t:this.shape_450},{t:this.shape_449},{t:this.shape_448},{t:this.shape_447},{t:this.shape_446},{t:this.shape_445},{t:this.shape_444},{t:this.shape_443},{t:this.shape_442},{t:this.shape_441},{t:this.shape_440},{t:this.shape_439},{t:this.shape_438},{t:this.shape_437},{t:this.shape_436},{t:this.shape_435},{t:this.shape_434},{t:this.shape_433},{t:this.shape_432},{t:this.shape_431},{t:this.shape_430},{t:this.shape_429},{t:this.shape_428},{t:this.shape_427},{t:this.shape_426},{t:this.shape_425},{t:this.shape_424},{t:this.shape_423},{t:this.shape_422},{t:this.shape_421},{t:this.shape_420},{t:this.shape_419},{t:this.shape_418},{t:this.shape_417},{t:this.shape_416},{t:this.shape_415},{t:this.shape_414},{t:this.shape_413},{t:this.shape_412},{t:this.shape_411},{t:this.shape_410},{t:this.shape_409},{t:this.shape_408},{t:this.shape_407},{t:this.shape_406},{t:this.shape_405},{t:this.shape_404},{t:this.shape_403},{t:this.shape_402},{t:this.shape_401},{t:this.shape_400},{t:this.shape_399},{t:this.shape_398},{t:this.shape_397},{t:this.shape_396},{t:this.shape_395},{t:this.shape_394},{t:this.shape_393},{t:this.shape_392},{t:this.shape_391},{t:this.shape_390},{t:this.shape_389},{t:this.shape_388},{t:this.shape_387},{t:this.shape_386},{t:this.shape_385},{t:this.shape_384},{t:this.shape_383},{t:this.shape_382},{t:this.shape_381},{t:this.shape_380},{t:this.shape_379},{t:this.shape_378},{t:this.shape_377},{t:this.shape_376},{t:this.shape_375},{t:this.shape_374},{t:this.shape_373},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_365},{t:this.shape_364},{t:this.shape_363},{t:this.shape_362},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_736},{t:this.shape_735},{t:this.shape_734},{t:this.shape_733},{t:this.shape_732},{t:this.shape_731},{t:this.shape_730},{t:this.shape_729},{t:this.shape_728},{t:this.shape_727},{t:this.shape_726},{t:this.shape_725},{t:this.shape_724},{t:this.shape_723},{t:this.shape_722},{t:this.shape_721},{t:this.shape_720},{t:this.shape_719},{t:this.shape_718},{t:this.shape_717},{t:this.shape_716},{t:this.shape_715},{t:this.shape_714},{t:this.shape_713},{t:this.shape_712},{t:this.shape_711},{t:this.shape_710},{t:this.shape_709},{t:this.shape_708},{t:this.shape_707},{t:this.shape_706},{t:this.shape_705},{t:this.shape_704},{t:this.shape_703},{t:this.shape_702},{t:this.shape_701},{t:this.shape_700},{t:this.shape_699},{t:this.shape_698},{t:this.shape_697},{t:this.shape_696},{t:this.shape_695},{t:this.shape_694},{t:this.shape_693},{t:this.shape_692},{t:this.shape_691},{t:this.shape_690},{t:this.shape_689},{t:this.shape_688},{t:this.shape_687},{t:this.shape_686},{t:this.shape_685},{t:this.shape_684},{t:this.shape_683},{t:this.shape_682},{t:this.shape_681},{t:this.shape_680},{t:this.shape_679},{t:this.shape_678},{t:this.shape_677},{t:this.shape_676},{t:this.shape_675},{t:this.shape_674},{t:this.shape_673},{t:this.shape_672},{t:this.shape_671},{t:this.shape_670},{t:this.shape_669},{t:this.shape_668},{t:this.shape_667},{t:this.shape_666},{t:this.shape_665},{t:this.shape_664},{t:this.shape_663},{t:this.shape_662},{t:this.shape_661},{t:this.shape_660},{t:this.shape_659},{t:this.shape_658},{t:this.shape_657},{t:this.shape_656},{t:this.shape_655},{t:this.shape_654},{t:this.shape_653},{t:this.shape_652},{t:this.shape_651},{t:this.shape_650},{t:this.shape_649},{t:this.shape_648},{t:this.shape_647},{t:this.shape_646},{t:this.shape_645},{t:this.shape_644},{t:this.shape_643},{t:this.shape_642},{t:this.shape_641},{t:this.shape_640},{t:this.shape_639},{t:this.shape_638},{t:this.shape_637},{t:this.shape_636},{t:this.shape_635},{t:this.shape_634},{t:this.shape_633},{t:this.shape_632},{t:this.shape_631},{t:this.shape_630},{t:this.shape_629},{t:this.shape_628},{t:this.shape_627},{t:this.shape_626},{t:this.shape_625},{t:this.shape_624},{t:this.shape_623},{t:this.shape_622},{t:this.shape_621},{t:this.shape_620},{t:this.shape_619},{t:this.shape_618},{t:this.shape_617},{t:this.shape_616},{t:this.shape_615},{t:this.shape_614},{t:this.shape_613},{t:this.shape_612},{t:this.shape_611},{t:this.shape_610},{t:this.shape_609},{t:this.shape_608},{t:this.shape_607},{t:this.shape_606},{t:this.shape_605},{t:this.shape_604},{t:this.shape_603},{t:this.shape_602},{t:this.shape_601},{t:this.shape_600},{t:this.shape_599},{t:this.shape_598},{t:this.shape_597},{t:this.shape_596},{t:this.shape_595},{t:this.shape_594},{t:this.shape_593},{t:this.shape_592},{t:this.shape_591},{t:this.shape_590},{t:this.shape_589},{t:this.shape_588},{t:this.shape_587}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14.7,-45.9,67.7,109.3);


(lib.palm_btn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(6.8,1,1).p("AiQCRQg8g8AAhVQAAhUA8g8QA8g8BUAAQBVAAA8A8QA8A8AABUQAABVg8A8Qg8A8hVAAQhUAAg8g8g");
	this.shape.setTransform(20.5,20.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AiQCRQg8g8AAhVQAAhUA8g8QA8g8BUAAQBVAAA8A8QA8A8AABUQAABVg8A8Qg8A8hVAAQhUAAg8g8g");
	this.shape_1.setTransform(20.5,20.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.3,-3.3,47.699999999999996,47.699999999999996);


(lib.chang_btn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAZAvIAAguQAAgNgEgGQgDgHgIgDQgIgDgOAAQgMAAgPACIgBgOQAQgDAPAAQAcAAALALQALALAAAWIAAAxgAgnAvIAAgzIARAAIAAAzg");
	this.shape.setTransform(15.325,-1.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAYAvIAAgxQAAgLgCgFQgDgGgGgEQgHgDgMAAIgRABIAABNIgRAAIAAhaQATgDAQAAQAQAAALAFQAKAFAEAIQAFAJAAAPIAAAzg");
	this.shape_1.setTransform(4.525,-1.925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgCBAIAAgMQAAgLACgGQABgGAFgFIAGgHIAEgJIACgJIAAgNIgzAAIAAgxIARAAIAAAjIAyAAIAAAXQAAAKgCAFQgCAHgEAGIgFAGQgHAKAAAKIAAAPg");
	this.shape_2.setTransform(-5.3,-3.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAXBBIAAhVQAAgKgCgGQgCgGgHgEQgHgEgMAAQgIAAgHABIAAAZQAAALAKAAIAIgBIACAMQgGACgGAAQgMAAgGgGQgHgGAAgMIAAgjQAQgFARAAQAUAAANAJQANAIAAAZIAABXg");
	this.shape_3.setTransform(-14.525,-0.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(6.8,1,1).p("AHCBpIAAjRQAAgygyAAIsfAAQgyAAAAAyIAADRQAAAyAyAAIMfAAQAyAAAAgyg");

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("AmPCbQgyAAAAgyIAAjRQAAgyAyAAIMfAAQAyAAAAAyIAADRQAAAygyAAg");

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF6666").s().p("AmPCbQgyAAAAgyIAAjRQAAgyAyAAIMfAAQAyAAAAAyIAADRQAAAygyAAg");

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CC0000").s().p("AmPCbQgyAAAAgyIAAjRQAAgyAyAAIMfAAQAyAAAAAyIAADRQAAAygyAAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_6},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_7},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-18.8,96.69999999999999,37.7);


(lib.small_window = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.close_mc = new lib.X_close();
	this.close_mc.name = "close_mc";
	this.close_mc.setTransform(27.35,29.35,1,1,0,0,0,0.7,0.5);

	this.hand_pic = new lib.palm_zoom();
	this.hand_pic.name = "hand_pic";
	this.hand_pic.setTransform(82.95,119.35,0.7618,0.7852,0,0,0,0.4,0);

	this.handText = new cjs.Text("...", "18px 'Times New Roman'");
	this.handText.name = "handText";
	this.handText.textAlign = "center";
	this.handText.lineHeight = 20;
	this.handText.lineWidth = 174;
	this.handText.parent = this;
	this.handText.setTransform(103.05,51);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(6.8,1,1).p("AO7uXI91AAQgyAAAAAyIAAbLQAAAyAyAAId1AAQAyAAAAgyIAA7LQAAgygyAAg");
	this.shape.setTransform(100.5,92);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.handText},{t:this.hand_pic},{t:this.close_mc}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.small_window, new cjs.Rectangle(-3.3,-3.3,207.70000000000002,190.70000000000002), null);


// stage content:
(lib.lbrushinglinkingHTML9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.clearAllSoundStreams();
		 
		self = this; //שמירת ההתייחסות לבמה במשתנה 
		stage.enableMouseOver(24);
		
		self.border_mc.visible = false; //הסתרת המסגרת
		self.border_mc.handText.text = "אלו העצמות בכף היד";// הכלת הטקסט הרצוי בתיבת הטקסט שבתוך המסגרת
		var statusText = "hand";//משתנה שישמש כדי להצביע על הטקסט הקיים במסגרת
		
		self.hand_mc.addEventListener("mouseover", hand_MouseOver);//יצירת מאזין לכפתור היד, לאירוע מעבר עכבר
		self.hand_mc.addEventListener("mouseout", hand_MouseOut);//יצירת מאזין לכפתור היד, לאירוע יציאת עכבר
		self.show_mc.addEventListener("click", show_click);
		self.border_mc.close_mc.addEventListener("click", hand_clickX);
		self.changetext_btn.addEventListener("click", changetext);
		self.border_mc.close_mc.addEventListener("mouseover", closeOver);
		
		function closeOver(){//לשינוי סמן העכבר במעבר על כפתור האיקס
		self.border_mc.close_mc.cursor="pointer";	
			}
		
		function hand_MouseOver() {
			self.border_mc.visible = true;
			self.border_mc.close_mc.visible = false;
		}
		
		function hand_MouseOut() {
			self.border_mc.visible = false;
		}
		
		function show_click() {
			self.border_mc.visible = true;
			self.border_mc.close_mc.visible = true;
			self.hand_mc.visible = false;
			self.show_mc.alpha=0.5;
		}
		
		function hand_clickX() {
			self.border_mc.visible = false;
			self.hand_mc.visible = true;
			self.show_mc.alpha=1;
		}
		
		function changetext() {
			if (statusText == "hand") {
				self.border_mc.handText.text = "שיניתי את הטקסט";
				self.border_mc.hand_pic.gotoAndStop(1);
				statusText = "changed";
				self.changetext_btn.alpha=0.5;
				
			} else {
				self.border_mc.handText.text = "אלו העצמות בכף היד";
				statusText = "hand";
				self.border_mc.hand_pic.gotoAndStop(0);
				self.changetext_btn.alpha=1;
			}
		}
		
		//--- אופציה נוספת, פשוטה יותר, להחלפת הטקסט
		// מתאימה למצבים בהם יש רק שתי אפשרויות - או אלו העצמות, או החלפתי תוכן
		//במצבים של שלוש אפשרויות ומעלה, נהיה מחוייבים להתשמש במשתנה נוסף "סטטוס" שיעזור לנו שבדיקה שלו תעזור לנו להבין את המצב הקיים
		//function changeText() {
		//	if (self.border_mc.handText.text == "אלו העצמות בכף היד") {
		//		self.border_mc.handText.text = "החלפתי תוכן";
		//		self.changetext_btn.alpha = 0.5;
		//	} else {
		//		self.border_mc.handText.text = "אלו העצמות בכף היד";
		//		self.changetext_btn.alpha = 1;
		//	}
		//}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Layer 2
	this.changetext_btn = new lib.chang_btn();
	this.changetext_btn.name = "changetext_btn";
	this.changetext_btn.setTransform(151.25,365.45);
	new cjs.ButtonHelper(this.changetext_btn, 0, 1, 2);

	this.show_mc = new lib.show_btn();
	this.show_mc.name = "show_mc";
	this.show_mc.setTransform(106.25,309.45);
	new cjs.ButtonHelper(this.show_mc, 0, 1, 1);

	this.border_mc = new lib.small_window();
	this.border_mc.name = "border_mc";
	this.border_mc.setTransform(392.25,163.5,1,1,0,0,0,100.5,92);

	this.hand_mc = new lib.palm_btn();
	this.hand_mc.name = "hand_mc";
	this.hand_mc.setTransform(223.75,195.45,1,1,0,0,0,20.5,20.5);
	this.hand_mc.alpha = 0.3906;
	new cjs.ButtonHelper(this.hand_mc, 0, 1, 1);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#717171").s().p("AAPARIgKgBQgagCgDgaQAugMACAfIABAKIgKAAg");
	this.shape.setTransform(188.75,289.2864);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#757575").s().p("AgZAFQAIgVAegDIABgFIAKAAIABAKQAIAigdgFIAAgFQgKAPgHAAQgIAAgEgUg");
	this.shape_1.setTransform(188.8951,293.4296);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#7B7B7B").s().p("ABGAmQgvg7hmgCIAAgKQAZAAAYgFQABAAAAgFQAgARAvACIAKABQAAAFgCABQgIAEgKAAQAVASANAdQABACAFAAQABAIgDAAQgDAAgFgGg");
	this.shape_2.setTransform(179.2587,295.3891);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#606060").s().p("AhKgKQAFAAACgCQADgDAAgFQAsAeBVgKIAKAAQAAAEgBAAQgYAFgZAAIAAAKIgKABIgVABQgyAAgSgfg");
	this.shape_3.setTransform(168.75,291.0438);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#B9B9B9").s().p("AgEAeIAAhFQAQAbgMAzQAAABgEAAIAAgKg");
	this.shape_4.setTransform(162.7691,269.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#B5B5B5").s().p("AgEAoIAAhZQAQAmgMA8QAAABgEAAIAAgKg");
	this.shape_5.setTransform(164.7604,268.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#888888").s().p("AgEAoIAAhZQAQAmgMA8QAAABgEAAIAAgKg");
	this.shape_6.setTransform(170.7604,253.95);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#797979").s().p("AAFAtQACgrgQgQIAAgKIAAgUIAJAAQAAAFADADQACACAFAAIAABFIAAAKg");
	this.shape_7.setTransform(164.25,238.45);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#B2B2B2").s().p("AgFAoIAAgKIAAhFQAQAWgHAvIAAAKIgJAAg");
	this.shape_8.setTransform(163.875,229.95);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#A5A5A5").s().p("AgEAjIAAhPQAQAhgMA3QAAABgEAAIAAgKg");
	this.shape_9.setTransform(165.7604,227.45);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#909090").s().p("AgFAeIAAhFIAJAAIAAAKQAHAvgQAWIAAgKg");
	this.shape_10.setTransform(172.875,218.95);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#DCDCDC").s().p("AgPAMQAFAAACgCQADgDAAgFIAAgJIAAgUQAFgFACgGQACgEAAgFQARADgGAcQgNBAgIAAQgGAAgDgkg");
	this.shape_11.setTransform(222.8922,202.7241);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#9D9D9D").s().p("AgEAoIAAhZQAQAlgMA9QAAABgEAAIAAgKg");
	this.shape_12.setTransform(137.7604,252.95);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#8C8C8C").s().p("AAEAYQgGgVgRgHQAIgRAVgCIAKgBQAAAFgCABQgIAEgKAAQAKALAAASIAAAKQgFAAgBgBg");
	this.shape_13.setTransform(111.25,295.45);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#676767").s().p("AgEBZQgFhZAAhZIAJAAQAAAoAFAnIAFABIAAAdIAAAKIgKAAIAAAyIAAAKIgEgBg");
	this.shape_14.setTransform(135.25,226.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#959595").s().p("AAAAnQgEgnAAgnIAJAAIAABFIAAAKIgFgBg");
	this.shape_15.setTransform(127.75,213.95);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#4B4B4B").s().p("AAmCPQgDgDAAgFIABgKQAGgwgRgWIABgKQAeiliCgEQAAgFgCgEQgDgGgFgFIAKAAQAUAOAeAFIAKABQAgASA5gIIAKAAIAAAKIgKAAIgeAAIAAB3IAAAKIAABQIAAAKIAAAUIAAAKQgFAAgCgCg");
	this.shape_16.setTransform(160.75,220.45);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#CACACA").s().p("AAABFQgEhFAAhFIAJAAIAACBIAAAKIgFgBg");
	this.shape_17.setTransform(121.75,192.95);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#6A6A6A").s().p("AkDH9QgFgdAAgeQAhgjAvgEIAKgBQAFAAACADQADACAAAFQgFAAgBACQgMAUgWAIQgHAbAPAHQACABAAAFIgKAAIgKAAIgKABQgWACgIARQgFAAAAgBgAD6nCQgFgdAAgeIAKAAQAAAKAEAIQABACAFAAIAAAUIAAAKIgKAAIAAAKQgFAAAAgBg");
	this.shape_18.setTransform(134.75,243.95);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#F8F8F8").s().p("AgIAUQgegEALgoIAdAAIAKAAQAFAAACADQAiAqg8AEIgBgFg");
	this.shape_19.setTransform(150.0741,177.45);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#9C9C9C").s().p("AgCAdQghgGANg0QAYAAAYAFQABAAAAAFIgKAAIgdAAQgLAoAdAEIABAFIgJgBg");
	this.shape_20.setTransform(148.5764,176.95);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#6B6B6B").s().p("ABkBoIBaAAIAKAAIAAAKIgKAAQgQACgPAAQgkAAgXgMgAjCg4QgFgdAAgeIAKAAQAAAFACACQADADAFAAIAAAUIAAAKIgKAAIAAAKIAAAKQgFAAAAgBg");
	this.shape_21.setTransform(149.25,197.575);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#ADADAD").s().p("AAPAJQgOgBgKgDQgPgFgKgJQAiAAAjAFIAAAEIgKAAIAAAJIAAABIgKgBg");
	this.shape_22.setTransform(126.75,153.95);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#E3E3E3").s().p("AgTAPQgKgIAAgTQBfgag6A1QgGAGgHAAQgHAAgHgGg");
	this.shape_23.setTransform(149.252,170.2187);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#5A5A5A").s().p("ABCIUQgDgCgFAAQAAgFACgEQAhhKiGAhQAAgFgCgCQgDgDgFAAIAAgKQA6AEgEhAIAFAAQgDgvAAgrQABkqglkZQgFAAgCgCQhDhZAYizIAKAAQAAAKAEAIQABACAFAAIAAAUIAAAKIgKAAQAABGAFBFIAFABQAIBTBRAGIAKABIAAAKIgKAAIgdAAIgKAAQAAAoAFAnIAFABQAOA8AFBGIAAAKIgKAAQAAA7AFA7IAFABQADARARACIAKABQAKAAAIgEQACgBAAgFQARgBgCAVIAFAAIAAAKIAABaIAAAKIAAAKQAECigYCKQAAgFgCgDgAAICCQAKCtAACJIAAAKQBDAegQhkIgBgKIAAgKIAAhQIAAgKIAAgoQAFAAAAgBQANg+gSglIgKAAQgFAAgEgCQgNgEgJAAQgLAAgIAGgABFleQg1gMAChDIAAgKIAAgKIAKAAQAKAtAXAhQACACAFAAQAFAFADAGQACAEAAAFIgJgBg");
	this.shape_24.setTransform(128.4465,234.95);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#8D8D8D").s().p("AgEAdQgFgdAAgdIAJAAQAAAFADADQACACAFAAIAAATIAAAKIgKAAIAAAKIAAAKQgEAAAAgBg");
	this.shape_25.setTransform(117.25,146.95);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#515151").s().p("AABAdQgbgGAIgqQAFAAACgDQADgCAAgFIAJAAQAAAFgBAEQgDAGgFAFQgCAaAVADIAKAAQAAAFgDADQgCACgFAAIgKgBg");
	this.shape_26.setTransform(118.1708,123.95);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#6F6F6F").s().p("AgLANQgDgDgFAAIAAgKQARgCAGgPQABgCAFAAQAAAFADADQACACAFAAQAAAFgDADQgMALgOAKQAAgFgCgCg");
	this.shape_27.setTransform(107.25,109.95);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#3A3A3A").s().p("AgJAdQgFgdAAgdQAFAAACADQADACAAAFQgHAfARAHQAEABAFAAQAAAFgCABQgIAEgJAAQgFAAAAgBg");
	this.shape_28.setTransform(155.75,143.95);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#919191").s().p("AgOAdQgFgYAAgYQAFAAACgCQADgDAAgFQAOAAAOAEQABABAAAFIgKAAIgKAAIAAAKIgJAAIAAAdIAAAKQgFAAAAgBg");
	this.shape_29.setTransform(156.25,128.95);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#707070").s().p("AAKAOQgagHgXgLQAFAAACgCQADgDAAgFQAcAMAoACIABAFIgKAAIgKAAIAAAKIgKgBg");
	this.shape_30.setTransform(123.25,127.45);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#393939").s().p("ABQAFIgUAAIgKAAIhZAAIgKAAIgoAAIAAgJIBQAAIAJAAIA8AAIAKAAQAKAAAIAEQACAAAAAFIgKAAg");
	this.shape_31.setTransform(133.25,133.45);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#AFAFAF").s().p("AgYAFIBZAAIAKAAQAAAFgBAAQgaAFgVAAQgdAAgWgKgAAFgEIhPAAIAAgKQAtAAArAFIABAFIgKAAg");
	this.shape_32.setTransform(131.75,133.4604);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#373737").s().p("ABVAFIgUAAIgKAAIh3AAIgKAAIgUAAIAAgJIAKAAIAKAAICVAAIAKAAQAFAAADACQACACAAAFIgKAAg");
	this.shape_33.setTransform(134.75,128.45);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#454545").s().p("AC1BNQgggRALg8IAKAAIAKAAQAAAEgDADQgCACgFAAQAAAZAFAYQAAABAFAAQAFAFAGADQAEACAFAAQAAAFgDADQgCACgFAAQgFAAgEgCgAjHgyIAAgKIAAgKQAUgPAfANQAEACAFAAQAAAFgCADQgDACgFAAIgKAAIgeAAIAAAKIgKAAg");
	this.shape_34.setTransform(137.25,126.0482);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#3E3E3E").s().p("AAeAFIhFAAIAAgJQAnAAAnAEIABAFIgKAAg");
	this.shape_35.setTransform(141.25,116.45);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#929292").s().p("AgxKnQgFg7AAg8IAKAAIAABuIAAAKIgFgBgAhoqnIDHAAIAKAAIgBAFQgwAFgtAAQg9AAg2gKg");
	this.shape_36.setTransform(134.75,175.95);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#F2F2F2").s().p("AAGAXQgKgIgUAAIAAgKIAAgdIAKAAIAKAAQAWAGAGAXIABAKIgKAAIAAAKQgFAAgEgCg");
	this.shape_37.setTransform(150.75,104.45);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#777777").s().p("AAPAZIgKAAIgBgKQgFgXgXgGQAfAHALgPQACgCAFAAIAAAnIAAAKIgKAAg");
	this.shape_38.setTransform(152.75,103.45);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#C4C4C4").s().p("AgFgOQgBgFAAgFIANAxIgMgng");
	this.shape_39.setTransform(78.9942,189.4001);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#5D5D5D").s().p("AgdA0QAAgFgCgEQgDgGgFgFQAkghAMg4IABgKIAKAAIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAAKIAAAKQgFAkgPAXQAAAPAEAOQABABAFAAQAFAAADADQACACAAAFIAAAFIgNABQgXAAgNgQg");
	this.shape_40.setTransform(66.25,198.7422);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#E7E7E7").s().p("AgYAoIAAgUQAQABgFgVIgBgJQAFAAACgDQADgCAAgFQAOgKAJgSQABgCAFAAIgBAKQgNA3gjAiIAAgKg");
	this.shape_41.setTransform(64.75,196.95);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#5B5B5B").s().p("AgQAQQgDgGgFgFIAAgJQAFgFADgGQACgEAAgFIAKAAQAJAJATAGQABAAAAAFIgKAAQgFAAgBACQgJARgOAKQAAgFgCgEg");
	this.shape_42.setTransform(65.75,192.45);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#4E4E4E").s().p("AgTAJIAAgJQARgDAGgPQABgCAFAAQAFAFADAGQACAEAAAFQAAAEgDACQgCADgFAAQgFAAgBACQgGAKgFAAQgHAAgFgMg");
	this.shape_43.setTransform(62.25,195.0705);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#E8E8E8").s().p("AnRCiQgCgCAAgFIAAgKQAagNASgZQABgCAFAAQAAAFgCAEQgDAGgFAFIAAAKQgFAAgBACQgHAPgRADIAAAKQgFAAgDgDgAGcikQBwAPhwAAg");
	this.shape_44.setTransform(106.05,179.45);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#7D7D7D").s().p("AgdA3IgKAAIAAgKIAAhjQAnAAAnAFIABAFIgKAAIgxAAIAAAeIAAAKIgKAAQAAAJAEAIQABACAFAAIAAAeIAAAKIgKAAg");
	this.shape_45.setTransform(150.25,100.45);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#F0F0F0").s().p("AmzIaQgEgNAAgPQAPgYAFgkIAAgKQAWgGgCAQIAAAKIgFABQgCAugXAXIAAAKQgFAAgBgCgAF8nzIAAgKIAAgeIAyAAIAKAAIgBAKQgEAogZAAQgNAAgRgKg");
	this.shape_46.setTransform(110.25,149.95);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#636363").s().p("AiaCfQAPAAAOgFQABAAAAgFIAoAAIAKAAIAAAKIAAAKIgKAAQgOACgLAAQgdAAgQgMgABwiKQgCgCgFAAIAAgKQAUgFAMgNQADgCAFAAQAFAAADACQACADAAAFQAAAFgBAAQgZAJgOAQQAAgFgDgDg");
	this.shape_47.setTransform(144.75,100.075);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#555555").s().p("Ah7KeIAAgKQAFAAACgDQADgCAAgFIAyAAIAKAAQAKAAAIAEQACABAAAFQgFAAgEACQgTAKgfAAQgOAAgRgCgAAGmjIgJAAIgKAAQgFAAgBgCQgEgIAAgKIAKAAQAzAeAHg8IABgKIgBgFQgngFgnAAIgKgBQhUgLgQhOIAKAAQAsBbCRgLIAKAAQAFAAACACQADADAAAFIgKAAIgKAAIAAAyIAAAKQgFAAgCACQgIAKgRAAQgIAAgKgCgABnpfQgCgCgFAAIAAgKQARgDgCgRIgFAAQAAgFgDgDQgCgCgFAAIAAgKQBYgphIBiQgBADgFAAQAAgFgDgDg");
	this.shape_48.setTransform(149.6776,143.9698);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#494949").s().p("AgdgJIAKAAQAAAFACADQADABAFAAQAOgJAQgIQAEgCAFAAQAAAFgCADQgDACgFAAIAAAJQgFAAgCADQgNARgJAAQgNAAgHgdg");
	this.shape_49.setTransform(150.25,69.9399);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#656565").s().p("AlxLZQgEgPgVAGQAAgFgCgCQgDgDgFAAIAAgKQAXgXACguIAFgBIAKAAIAABQIAAAKIAAAKQgFAAAAgBgAESCZQhdgJhMgYQgFAAgCgCQgDgDAAgFIAAgKQCfA2B5hGQACgBghAEQgYADgZAAIgKAAIh4AAIgKABQhTAMADhJIAKAAQAAAFACADQADACAFAAQA1AvBqgNQBagKA6AQQADAAAAAKQgTBAhWAAIgagBgAFFrPIAKAAQAbAHAHgPQABgCAFAAQAFAAACADQADACAAAFQAAAFgDABQgRAMgOAAQgQAAgKgSg");
	this.shape_50.setTransform(107.75,132.95);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#8A8A8A").s().p("AgQAAIAAgJIAKAAQAAAFABABQAzANg+AAIAAgKg");
	this.shape_51.setTransform(142.9832,56.95);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#5C5C5C").s().p("AAnTCQgCgDgFAAIAAgKQAdgFAWgNQAEgCAFAAQAFAAACADQADACAAAFQgFAAgDADQgXAQgdALQAAgFgDgCgADcFkQgDgGgFgFQAFAAABgCQAshKhagsIAAAKQgFAAgDgDQgCgCAAgFIAAgKQBOgDARBoQAIAvgrACQAAgFgCgEgAjcjUQgCgCgFAAIAAgKQAMgSAPgPQADgCAAgFQAFAAACACQADADAAAFQAAAFgCAEQgLAYgRARQAAgFgDgDgAj6k3QgCgDgFAAIAAgKQBOhmBVhfQACgDAFAAQAFAAACADQADACAAAFQgFAAgCADQhRBohSBnQAAgFgDgCgACOwyIAAgKIAAgeQAjhBA5gqQADgDAFAAQAFAAACADQADACAAAFQgFAAgDADQg5A0gjBLIAAAKIgKAAg");
	this.shape_52.setTransform(114.0807,163.45);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#D7D7D7").s().p("AAFAeQgHgUgKgTIAAgKIAAgUQAKAFAGAHQADADAAAFQAKAYgFAiIgFABQAAgFgCgFg");
	this.shape_53.setTransform(234.5833,198.95);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#EDEDED").s().p("AMfBpQAAgFgCgEQgTgkgJgtQARgQAHAOQABACAFAAQgHAlAOAPQADADAAAFIABAJQAFAVgOAAIgCAAgAsqBLIAAhPIAAgKQAiAegcBDQgBACgFAAIAAgKgAixAMQgYgfgJgtIAAgKIAAgUIAAgKQBaArgsBKQgBACgFAAQgFAAgCgDg");
	this.shape_54.setTransform(152.3688,196.4548);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#EAEAEA").s().p("AmAD1QgBAAAAgFQAdAJAFACIgBABIgggHgAGoCCQBCg+hEBTIgCABQgCAAAGgWgAkxjvIiPAAIgHAAIAAgBIAAgJIAKAAIAKAAQBSgHA6ARIgKAAg");
	this.shape_55.setTransform(174.894,178.925);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#F3F3F3").s().p("AE6BfIAAhaQAqAwgpA+gAlPgOIAAgUIAAgKIAAgKQAmgRARgpQAAgCAFAAQAFAAABACQAdBYhfAUIAAgKg");
	this.shape_56.setTransform(194.8063,198.425);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#585858").s().p("ADqG7QgEgIAAgKIAAgKIAAgKQAdgoA0gSQAEgCAFAAQAAAFgCABQgIAEgKAAIAAAKQgFAAgBACQgRApglARIAAAKIAAAKQgFAAgBgCgAk3kPQgDgDgFAAIAAgKQAqghAagwQACgEAAgFIAAgKIAKAAQARANAhACIAAAFIgKAAIgKAAQgFAAgDADQgxAsgrA1QAAgFgCgCgACWmoIg8AAQAAgFgDgDQgCgCgFAAIAAgKIAKAAIAKAAIAKAAQAUAAALAIQAEACAFAAQAFAAADACQACADAAAFIgKAAg");
	this.shape_57.setTransform(137.25,150.45);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#5E5E5E").s().p("AngLkQAFAAABgCQAdhDgjgfIAAAKIgKAAIABgKQABgQgWAGIAAgKQAKAAAIgEQACgBAAgFQBiAAhBhpQgDgFgIgEQgCgBAAgFQAFAAADgCQACgDAAgFQBGgfAuhwQASgrATg8QAVhBgignQAbACAIgUQAAgCAFAAQAFAAADACQACADAAAFIgBAKQgzDGhYCiIgFAAQAJA9AkAnQACAbgOAGIgZAKQghA9goA4IAAgKgAmYI6QAbBTgdhdQAAAFACAFgAGZKoIAAgKIAKAAQBfgVgdhXQgBgCgFAAIAAgKQAKAAAIgEQACgBAAgFQAFAAAAABQAfCLhzAAIgLAAgABUphQgFhGAAhGIAKAAIAKAAIAAB4IAAAKIgKAAIAAAKIgFAAg");
	this.shape_58.setTransform(119.314,130.95);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#7C7C7C").s().p("AgBBgQgDgGgFgFIAAgKIAAgyQAQgvgHhIIAAgKQARBcgMB0IgFABQAAgFgBgEg");
	this.shape_59.setTransform(180.2604,191.45);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#A8A8A8").s().p("AgxgEIBZAAIAKAAIAAAEQgyAFgxAAIAAgJg");
	this.shape_60.setTransform(170.25,162.45);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#8B8B8B").s().p("Ag2gEIBjAAIAKAAQAAAEgBAAQgcAFgXAAQggAAgZgJg");
	this.shape_61.setTransform(163.75,156.4604);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#6D6D6D").s().p("ABZLBQACglgRgNIAAgKIAAgyIAKAAQAAAPAFAOQAAABAFAAIAABGIAAAKgAhXC9QgIgEgKAAIAAgKQApgTAxgGIAAAFIgKAAQAFAFADAGQACAEAAAFIgKAAQgmACgWASQAAgFgCgBgADokaQgDgCgFAAIAAgKQAeAFgJgkIgBgJQAFgFADgGQACgEAAgFQAFAAABABQATBFgtAKQAAgFgCgDgAkJq2QAPAAAOgEQABgBAAgFIBkAAIAKAAQgBAQAWgFIAJgBIAAAFQgpAFgkAAQgyAAgrgKg");
	this.shape_62.setTransform(154.8198,190.45);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#E9E9E9").s().p("AhYgKQBUAGBVAEIAKAAIAAAJIgKAAIgeAAIgKAAIhjAAIgKABIgIABQgSAAAGgVg");
	this.shape_63.setTransform(164.186,155.0473);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#C0C0C0").s().p("AjWIDIAAhaQARAlgMA+QAAABgFAAIAAgKgACln4IAAgKQAbACAOgKQAEgCAFAAIAAAKQgFAAgCACQgOARgdABIAAgKg");
	this.shape_64.setTransform(156.75,205.45);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#3C3C3C").s().p("ACgFCQgCgCAAgFIAAgKIAAgUIAAgFQgVABABgQQAsgFgNA4IgBAJQgFAAgDgDgAirlEIA8AAIAKAAQAFAAACADQADACAAAFIgKABQgOABgLAAQgdABgQgNg");
	this.shape_65.setTransform(165.4571,118.45);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#838383").s().p("AjCJrQgFgsAAgtIAKAAIAABQIAAAKIgFgBgAC0FAIAAgsIAAgkIAEAIQAMAfgLAyQAAABgFAAIAAgKgAAyprICMAAIAKAAIAAAFQglAFggAAQgtAAgkgKg");
	this.shape_66.setTransform(154.25,209.95);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#737373").s().p("ABBBeQAFAAACgDQADgCAAgFQAZAAAYAFQABAAAAAFIgKAAIgKAAIAAAKIgKABIgMABQgQAAgCgMgAgbg1QgCgCgFAAQAAgFgCgEQgDgGgFgFIgBgFQgngFgoAAIAAgKQB2gjgNBUIgFABQAAgFgDgDg");
	this.shape_67.setTransform(149.75,124.5657);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#666666").s().p("ApHKZQgDgCgFAAIAAgKQAggTAVgdQACgCAFAAQAAAFADACQACADAFAAQAAAFgCACQgcAcgeAZQAAgFgCgDgAE+DpQAAgFgCgDQgDgCgFAAQgFAAgBgCQgEgIAAgKQCdAuByhHQAJgFgKgKQAFAAADgDQACgCAAgFQARADgEAbQgDAUgHADQhQAjhaAAQgtAAgwgIgACopAQgFAAAAgBQgFgTAAgUQAIg5A+ACIAAAFIAAAKIgKAAQgTAAgLAKIAAAKIAAAKIgKAAIAAAKIAAAKIAAAUIAAAKIgKAAg");
	this.shape_68.setTransform(123.4381,118.6966);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#C6C6C6").s().p("AgxgEIBZAAIAKAAQAAAEgBAAQgaAFgVAAQgdAAgWgJg");
	this.shape_69.setTransform(175.25,130.4604);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#A7A7A7").s().p("AAeAFIhFAAIAAgJQAnAAAnAEIABAFIgKAAg");
	this.shape_70.setTransform(177.25,133.45);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#828282").s().p("AAxA8QgdgFgdAAIAAgKQAyAGAegOQAEgCAFAAQgBAQAVgBIAAAFIgKABIgoAJQAAgFgBAAgAhjhAICBAAIAKAAIAAAFQgjAFgdAAQgpAAgigKg");
	this.shape_71.setTransform(171.25,141.45);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#404040").s().p("ABVAFIgoAAIgKAAIiBAAIgKAAIAAgJIAKAAIAKAAIBjAAIAKAAIBGAAIAKAAQAAAEgDADQgCACgFAAIgKAAg");
	this.shape_72.setTransform(170.75,134.45);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#4C4C4C").s().p("ABLJ1QgFgOAAgPIAAgKIAAh4QARASgCAqIAFAAQgGAWAQgBIAKgBQAAAFgCABQgIAEgKAAIAAAKIABAKQAGAWgRgCIAAAUIAAAKQgFAAAAgBgAjMFoQgFgoAAgoIABgKQANhAgsgGIAAgKIAyAAIAKAAQAAAFgDADQgCACgFAAIAAAKIABAKQAGAqgRASIAABGIAAAKIgFAAgADmpXIhaAAIgKAAQhFgGg9gOIAAgKIAKAAIAKAAQAzAAAoAJIAJABQArASBDgHIAKgBIAAAKIgKAAg");
	this.shape_73.setTransform(156.25,189.9488);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#8F8F8F").s().p("Ag7gFIBtAAIAKAAIAAAJIgKAAQgTACgSAAQgqAAgegLg");
	this.shape_74.setTransform(174.25,128.575);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#6C6C6C").s().p("AhxF8QCBgMhoAnQgGADgFAAQgQAAACgegABWlnIAAgKQAQACgFgWIgBgKQAFAAACgCQADgDAAgFQAFAAAAABQAOA2gnAFIAAgKg");
	this.shape_75.setTransform(171.6978,164.9148);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#626262").s().p("Ao7L1QgfgngWgwIAKAAIAKAAQAAAFACACQADADAFAAQAKAYAOgWQABgCAFAAIABAKQAFAVgQgBIAAAUIAAAKQAFAFADAGQACAEAAAFQgFAAgCgDgAINglQiiAagSh2IAKAAQAAAKAEAIQABACAFAAQAwBICOgZQA6gKAMAhQAAAFgDADQgCACgFAAQghgSg5AKgAEGqkQgCgDgFAAIAAgKQARgNgGglIgBgKIAAgKQAlAhgfA3QgBACgFAAQAAgFgDgCg");
	this.shape_76.setTransform(119.75,127.95);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#D3D3D3").s().p("AgxgEIBZAAIAKAAQAAAEgBAAQgaAFgVAAQgdAAgWgJg");
	this.shape_77.setTransform(176.25,118.4604);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#575757").s().p("AIbGuQAMhcgggwQAAgFgBAAQiYgbh1A+QgFAAgEgCQiVhlh5BdIAAAKIAAAKQgFAAgBgCQgEgIAAgKIAAgKIAAgKQBghcB8BQQAEACAFAAQARg5gHhTIAAgKIAAgKIAAgKQBmADBYAQIAKABQAyAAAxgFIABgFIAKAAIAKAAQAFAAACADQADACAAAFQAAAFgBAAQgdAFgeAAIgKAAIhuAAIgKAAQgcgCgWgIQAHBEADBIIAAAKQCVhLBiBiQADACAAAFIAAAKQAHBJgRAvIAAgKgADlErIAKABQA9gDgigsQgCgDgFAAQAAgFgBAAQgYgFgZAAQgNA1AhAGgADRC+QAAAUAKAIQAPAMANgMQAngkgfAAQgPAAgfAIgADbCRQBwAAhwgPgAocEsQgFAAgDgCQgCgDAAgFIAAgKQAtiaA/iIQACgEAAgFQAFAAACADQADACAAAFIgBAJQgbCFg+BhIAAAyIAAAKQAAAFgDADQgCACgFAAIgKAAgAhYiDQgCgDAAgFIAAgKIAAgUQAYgPAuAFIAKAAIAAAKIAAAKIgKAAQgogEgUAOIAAAKIAAAKQgFAAgDgCgACnilQgIgEgKAAIAAgKQBKgNgZgPQgEgCgFAAQAAgFgDgCQgCgDgFAAQAKgKABABQA8AvhRAWQAAgFgCgBgACpkrQATAAAMgHQAEgDAFAAQAFAAACADQADACAAAFQAAAFgCABQgIAEgKAAIgKABIgJABQgMAAABgMgAiHlxQANhCgmAaQgFAAgDgCQgCgDAAgFIAAgKQCngLDAALIAKAAQAFAAACADQADACAAAFIgKAAIgKAAIjHAAIgKAAQg+gGgmAQIAAAUIAAAKIgKAAIAAAKgAFTmjIg8AAQAAgFgDgCQgCgDgFAAIAAgKIAKAAIAKAAIAKAAQAjAAAZAJQAFABAFAAQAAAFgCABQgIAEgKAAIgKAAg");
	this.shape_78.setTransform(125.375,149.9487);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#808080").s().p("AhegEICzAAIAKAAIAAAEQgtAFgoAAQg4AAgwgJg");
	this.shape_79.setTransform(174.75,116.4604);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#535353").s().p("AF6FVQg7hDgihbIAKAAQAkBVA9A6QADACAAAFQAAAFgDADQgCACgFAAQgFAAgCgCgAmKDVQAFAAADgCQACgDAAgFQAdAMApgCIAKAAQAAAFgBABQgOAEgPAAIgKABIgSACQgWAAgKgNgAiEkgQgCgDAAgFIAAgKIAAgKQALghAwAIQABAAAAAFIgKABQgdAFgLAYIAAAKIAAAKQgFAAgDgCg");
	this.shape_80.setTransform(161.75,98.614);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#4F4F4F").s().p("AEYAUIhaAAIgKAAQhLAAhBgKQgFAAgBgCQgEgIAAgJQAzAAAoAJIAJAAQBSASBsgNIAAgFIAUAAIAKAAQAFAAADACQACADAAAFIgBAFQgiAFgjAAIgKAAgAlngTIAKAAIAKAAQBAAGBCAEIAKAAQAAAFgBAAQgOAEgPAAIgKABIgbABQg6AAgjgVg");
	this.shape_81.setTransform(152.25,115.95);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#767676").s().p("AAFAjQACgVgQABIAAgKIAAgJQAQgDgCgbIAFAAIAAA7IAAAKg");
	this.shape_82.setTransform(190.25,111.45);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#ACACAC").s().p("Ah3EYIBuAAIAJAAQAAAFAAAAQgeAFgZAAQgkAAgcgKgAhPkhIC9AAIAKAAIAAAFQgvAFgrAAQg6AAgzgKg");
	this.shape_83.setTransform(172.25,135.9604);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#BEBEBE").s().p("AkmCgIB4AAIAKAAQAAAFgBAAQggAFgcAAQgmAAgfgKgAj+AeIB4AAIAKAAQAAAFgBAAQggAFgcAAQgmAAgfgKgABzipICqAAIAKAAIAAAFQgrAFgmAAQg2AAgtgKg");
	this.shape_84.setTransform(153.75,125.9604);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#595959").s().p("AMiJ4QgCgCAAgFQgEgiAKgSIAEgIQhFAXgBg/IA1g5QACgDAFAAQAFgFAGgDQAEgCAFAAQgHA/APAmQACAEAAAFQAAAFgCADQgDACgFAAIAAAKQAAAFgCAEQgDAGgFAFIAAAUIAAAKQgFAAgDgDgAL4INQgHAbAFgGQAngwgFAAQgDAAgdAbgAs9IrIAAgKIAAgKQAgghAZgnQADgDAAgFQAFAAACADQADACAAAFIAAAeIAAAKIgKAAQgFAAgBACQgSAZgaANIAAAKIgKAAgAnNgWQgDgCgFAAIAAgKQAyhBA6g6QACgCAAgFQAFAAADADQACACAAAFQAAAFgCADQg7A+gxBGQAAgFgCgDgAJBkFIg5g1QAFAAADgCQACgDAAgFQAnAQATAjQACAEAAAFQAAAFgDACQgCADgFAAQAAgFgDgCgAAKpcIAAAKIAAAKQgFAAgDgCQgSgVgNgbQAeANAlALQACABAAAFICCAAIAKAAQAFAAADACQACADAAAFQgFAAgEABQgnALgjAAQg0AAgtgWg");
	this.shape_85.setTransform(141.25,139.45);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#4D4D4D").s().p("ABePAQgNgdgVgTQAKAAAIgEQACgBAAgFIAFAAQgihMhQgiQAFAAACgCQADgDAAgFQAzAiA4AeQACABAAAFQADAbAbADIAKAAIgBAFQgfADgIAWQAIAlAWggIAAAFIgBAKQgCARgRADIAAAKQgFAAgBgCgAB2udQgQgTgqAHIgKAAIipAAIgKABQggAGgIgRQAKAAAIgEQACgBAAgFIAKAAIAKAAQBXASBwgNIAAgFQA9gJAeAIIAJABQAAAFgCADQgDACgFAAIgKAAIgKAAIgFAAQACAbgRADQAAgFgCgDg");
	this.shape_86.setTransform(177.25,202.7118);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#646464").s().p("AGfI/QgChtg6hlQAFgFADgGQACgEAAgFQAFAAAAABQAaCABPBHQAAhBgNg2IgXhfQggh6hIgYIAAAKIAAAKQgFAAgEACQgGADgFAFQAAgFgDgDQghglgYgtQAFAAADgDQACgCAAgFQAdA5AxgWQACAAAAgFQAKAKAKAFIAAgFQBjCwAyDgIABAKIgKAAQgFAAgEgCQgRgIgsAKIAAAKQgFAAgEACQgGADgFAFIAAgKgAm8meQgFAAAAgCQgZhYgohGIAAgKIAKAAQARArAaAiQACADAFAAQABAxARAgQACAEAAAFIgKAAg");
	this.shape_87.setTransform(179.75,127.45);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#545454").s().p("Ah1NLQgZgUgbAWIAAgFQgVACABgRQA3gagRhzQgGgkAIghQAFAAAAgBQAMg9gRgmQAAgFgCgDQgLgTglAHIAAgKQAKAAAIgEQACgBAAgFQAngYALgyIAAAsIAAAKIAAAKQAIBngSBNQgZCHA+AwQADACAAAFQAAAFgDADQgCACgFAAQgFAAgDgCgAnkHvQACgVgRABIAAgKIAAhQIAAgKIAAgyIAKAAIAJCgIABAKgAiCE4QgKhEAHhOQAFgqgfABIAAgKIAAgKQBSgDARhDIABgKQAFAFADAGQACAEAAAFIgBAKQgKA2g7AGIAAAyIAAAKIgKAAIAABGIAAAKIAAA8IgBgDgAHeA6QgPgQAHglIAKAAQAKAUAIAVQACAEAAAFQgFAAgEACQgGADgFAFQAAgFgCgCgAk1nQQCMAsB5g0QAEgCAFAAQAAAFADADQACACAFAAQAAAFgCABQgSAJgUAFQgFAAgEADQgOAJgbgCIAAAKIgKAAQhWgEhUgGQgGAbAagGIAKgBQArASBCgNQABAAAAgFIAeAAIAKAAQAdgBAOgQQACgDAFAAQAKAAAIAEQACABAAAFQAAAFgCAEQgDAGgFAFQghADhMAPQgeAGgYAAQhYAAABhUgADGpFQgbgdgVgiQAFAAACgCQADgDAAgFQAdAaATAjQACAEAAAFQAAAFgCADQgDACgFAAQAAgFgCgCgAAyskIgKAAIgKAAQAAgFgCgCQgDgDgFAAIAAgKQAVAHgBgRIAAgKQARgBgCAVIAFAAIAAAKIAAAKIgKAAg");
	this.shape_88.setTransform(185.25,197.4477);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#565656").s().p("AkONGQgPgLAHggIAKAAIAKAAIAAAeIAAAKQAAAFgCADQgDACgFAAQAAgFgCgCgAEFp6QAAgFgCgEQg2hfg2hgQAFAAADgDQACgCAAgFQBCBjA0BwQACAEAAAFIAAAFQgKgFgKgKg");
	this.shape_89.setTransform(188.136,205.45);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#5F5F5F").s().p("AnGSDQAAgTgKgLQAKAAAIgEQACgBAAgFIAKAAIAKAAQA9ALAWgcQACgDAFAAIAAgKQArgMAvgHIAKgBQAFAAACACQADADAAAFQgFAAgFABQgrAQgvANQAAAFgCABQg+AehCAYIAAgKgAmUjgQAAgFADgDQAvg9gygVIAAgKIAAgKIAKAAQBPA4CVgcQA+gMAAAsQgsAzhvgkIgSgFICPAAIAKAAQg6gShSAHIgKABIAAgFQgjgFgjAAQAKAKAPAFQg0ABgXAsIgKAAgAHFpaQgXghgPgnQAFAAACgDQADgCAAgFQAZAeAOAoQABAFAAAFQAAAFgCACQgDADgFAAQAAgFgCgDgAg2xaIAAgKQAFAAACgDQADgCAAgFQAgAhgUg2QgCgEAAgFQAFAAABACQAfA9gXAAQgLAAgXgNg");
	this.shape_90.setTransform(157.75,181.45);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#484848").s().p("AhoHUQAKAAAIgEQACgBAAgFQAwAQBHgGIAKAAQAeAAAdAFQABAAAAAFIgKAAIgKAAIgKAAIiLAAIgKABIgMABQgQAAgCgMgAhPmSQgFgiAAgjQAqgYAQAsQACAFAAAFIgKAAQAAgFgDgDQgKgOgbACIAAAoIAAAKIAAAKIgFgBg");
	this.shape_91.setTransform(165.75,100.1578);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#505050").s().p("AgTR5IAAgKIAAgUQASgWgIgwIAAgKQAFAAABgBQALg0gRgbIAAgKIAAhaQAQANgCAlIAFAAIAAAUIAAAKIAABaIAAAKQAAAjANAXQACACAFAAQgBAQAVgBIAAAFQgFAAgEgCQgpgTgJApIAAAKIgKAAgAgxxQIAAgKQAKgFAKgDQAFgCAFAAIAAAKQABARgVgHQAgAnAHhFIAAgKIAFAAQAABFgTAAQgNAAgWgdg");
	this.shape_92.setTransform(163.25,170.45);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#C5C5C5").s().p("AgTANQAUAGgBgQIAAgJQAFgFADgGQACgEAAgFIAKAAIgBAKQgFArgOAAQgIAAgLgOg");
	this.shape_93.setTransform(161.25,58.6657);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#525252").s().p("Ah8DlQgsgFgGgsQAYAaAiASQACABAAAFIgKgBgABJDTQgDgGgFgFQAAgFADgEQBPhyAIi6QgFAAgBgBQgYhJg8gkQAFAAADgDQACgCAAgFQBDAcAbBGQABACAFAAQgHDUhWCGQgCADgFAAQAAgFgCgEg");
	this.shape_94.setTransform(159.75,62.95);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#616161").s().p("AKeNuIgMgCQhMgCARhNQAQABgBgVIAFAAQAAAFACACQADADAFAAQAAAFgDACQgCADgFAAQAIBTAXhxQAGgbgRgDIAAgKQAFAAACgDQADgCAAgFQB1AMg3h7QgCgEAAgFIAKAAQAfA1ASBDIABAKQAFAAAAABQAcBuhTgBIgFgFQABAuglAAIgIAAgAKdNFIAAATQAqg9gqgwIAABagAK7LhQAJAtATAkQACAEAAAFQAQABgFgWIgBgJQAFgFAGgDQAEgCAFAAIAFgBQAFgjgKgYQAAgFgDgDQgHgHgKgFIAAAUIAAAKIgKAAQgFAAgBgCQgDgHgGAAQgGAAgJAJgAj6MJQBngGgxAbQgFgDgdgIQAAAFABAAIAgAHIgdAMQgGADgFAAQgSAAAFglgAItGDQgZhAgNhMQAFgFAGgDQAEgCAFAAQAJBHATA7QACAFAAAFQAAAFgCAEQgDAGgFAFQAAgFgCgFgAmkFbIAKAAQBzAZCRgFIAKAAIAAAKIAAAKIgKAAQgdACgaAAQiBAAhWgqgAsFDvQgCgCgFAAIAAgKIAAgKQAfhFAlg/QACgDAAgFQAFAAACACQADADAAAFIgBAKQgCARgRADIAABGIAAAKQgFAAgDACQgaATgQAdQAAgFgDgDgAgXksQgCgCgFAAIAAgKQBHgXAahEQACgEAAgFQAFAFADAGQACAEAAAFQAAAFgCAEQgcBChFAZQAAgFgDgDgAjLs+QgCgCgFAAIAAgKQCHhDCYA9QACABAAAFQAAAFgDACQgCADgFAAQgFAAgFgCQiLg5h4BFQAAgFgDgDg");
	this.shape_95.setTransform(159.3672,124.2798);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.hand_mc},{t:this.border_mc},{t:this.show_mc},{t:this.changetext_btn}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(332.3,236.5,163.8,147.8);
// library properties:
lib.properties = {
	id: '7E195FEF96D5A7409E20458B0EE7A0F3',
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['7E195FEF96D5A7409E20458B0EE7A0F3'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;