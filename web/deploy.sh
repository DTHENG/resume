#!/bin/bash

# Configure server ip
if [[ $1 ]]; then
    SERVER=$1
else 
    echo "What server? : "
    read SERVER
fi

echo -e "\x1b[34mWhat release? : "
read RELEASE
tput sgr0

ACTIVE_PROCESS_PID="0"
PORT=80

# Override default port
if [[ $2 ]]; then
    PORT=$2
fi

function uploadFile {
    cd ~/resume/web/target
    echo -e "\x1b[34m"
    scp dtheng-$RELEASE.war root@$SERVER:resume/webapps/dtheng.war
    tput sgr0
}

function buildWarFile {
    cd ~/resume/web
    source ~/.profile
    echo -e "\x1b[34m"
    mvn clean test compile war:war
    tput sgr0
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
    echo -e "Restarting app on http://\x1b[1m$SERVER\033[00m:\x1b[36m$PORT\033[00m/"
    restartApp
    echo -e "\x1b[1mDone!"
    tput sgr0
}

run
