#!/bin/bash

# Configure server ip
if [[ $1 ]]; then
    SERVER=$1
else 
    echo "What server? : "
    read SERVER
fi

ACTIVE_PROCESS_PID="0"
PORT=80

# Override default port
if [[ $2 ]]; then
    PORT=$2
fi

function uploadFile {
    cd ~/resume/web/target
    scp dtheng.war root@$SERVER:resume/webapps
}

function buildWarFile {
    cd ~/resume/web
    source ~/.profile
    mvn clean test compile war:war
    cd target
    mv dtheng-3.0.war dtheng.war
}

function parseLine {	
	if [[ $1 == *"jetty.port=$PORT"* ]]; then
	    echo "true";
	else
  		echo "false";
	fi
}

function getPID {
    COUNT=0
    for word in $1
    do
        if [[ $COUNT == 1 ]]; then
            echo $word
        fi
        ((COUNT+=1))
    done 
}

function restartApp {
    ssh root@$SERVER "kill -9 $ACTIVE_PROCESS_PID"
    ssh root@$SERVER "cd ~/resume;nohup java -jar start.jar jetty.port=$PORT > ~/nohup.out 2>&1 &";
}

function readOutput {
    OUTPUT_FILE=~/.deploy_dtheng_output
    ssh root@$SERVER 'ps aux | grep java' > $OUTPUT_FILE
    while read line; do
		if [[ $FATAL_ERROR == true ]]; then
		break
		fi
		if [[ $(parseLine "$line") == "true" ]]
		then
			ACTIVE_PROCESS_PID=$(getPID "$line")
		fi
	done < $OUTPUT_FILE
}

function run {
    echo "Building new war file"
    buildWarFile
    echo "Uploading war file to $SERVER"
    uploadFile
    readOutput
    echo "Restarting app on http://$SERVER:$PORT/"
    restartApp
    echo "Done."
}

run
