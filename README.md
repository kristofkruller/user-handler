# user-handler
user handler - recipe app template

## start dev CLI
*potential debug: The shellcheck SC1017 warning occurs when you have an extra or misplaced carriage return (\r) in your shell script, usually due to using a Windows-style line ending (CRLF) rather than a Unix-style line ending (LF). Using the tr -d '\r' command will remove those carriage returns from the script `tr -d '\r' < start-something.sh > temp_script.sh && mv temp_script.sh start-something.sh`*

`git clone https://github.com/kristofkruller/user-handler.git`
`cd user-handler` 
`cd server && npm i && cd ..`
`cd admin-ui && npm i && cd ..`

*both start scripts req own terminal for real time logging and are collections of commands in package.json/scripts*
`./backend.sh`
`./frontend.sh`

*for docker full stack run (--build)*
`./docker-build.sh`

## env
env variables must be placed for both sides, check the readme of the service you want to start