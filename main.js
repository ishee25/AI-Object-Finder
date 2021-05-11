status = "";
objects = [];

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function draw(){
    image(video, 0, 0, 480, 380);
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    objectName = document.getElementById("object_name_input").value;
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}

function gotResult(error, results ){
    if(error){
        console.log(error);
    }

    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    if(status != ""){
        image(video, 0, 0, 480, 380);
        objectDetector.detect(video, gotResult);

        for(i = 0; i < objects.length; i++){
            fill('#FF0000');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            

        if(objects[i].label == objectName){
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_found").innerHTML = objectName + " found";

            var synth = window.speechSynthesis;
            speak_data = objectName + " Found";
            var utterThis = new SpeechSynthesisUtterance(speak_data);
            synth.speak(utterThis);
            synth.stop();
        }

        else{
            document.getElementById("object_found").innerHTML = objectName + " not found";
            var synth = window.speechSynthesis;
            speak_data = objectName + " Not Found";
            var utterThis = new SpeechSynthesisUtterance(speak_data);
            synth.speak(utterThis);
            synth.stop();
        }
        }
    }
}