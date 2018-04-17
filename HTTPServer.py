
#classHTTPServer.py

from socket import *
from time import *
from threading import *
import datetime

def getIPAddress():
    s = socket(AF_INET, SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    return s.getsockname()[0]

def getMessage(client):

    data = client.recv(1024)
    return data.decode('ascii')
    

def processRequest(cs, addr, lock):

    direct = "/Users/Anna/ideation/"

    print ("Connnection from " + str(addr))
    
    data = cs.recv(10000)
    data = data.decode('ascii')  
    print(data)

    end = data.find("HTTP/1.1") -1
    if data[0:3] == "GET":
        request = data[4:end]
    elif data[0:4] == "POST":
        request = data[5:end]
    print("*"+request+"*")

    try:
        if request == "/emoji":
            checkinFile = open("checkinData.txt", 'a')
            checkIn = data.split("\n")[-1].split("&")
            userID = checkIn[0][3:]
            emotion = checkIn[1][:checkIn[1].find("=")]
            print(userID + "," + emotion + "," + str(datetime.datetime.now()), file = checkinFile)
            checkinFile.close()
            response = "HTTP/1.1 200 OK \n"
            response += "Content-Type: text/html\n"
            response += "\r\n"
            response += "<HTML><HEAD><TITLE> Thank You </TITLE></HEAD><BODY><p>Thank you for checking in!</p></BODY></HTML>"
            cs.send(response.encode('ascii'))

        elif request == "/favicon.ico":
            response = "HTTP/1.1 200 OK \n"
            response += "Content-Type: image/x-icon\n"
            response += "\r\n"        
            cs.send(response.encode('ascii'))
            f = open(direct+"favicon.ico","rb")
            cs.send(f.read())

        if request == "/campusData":
            response = "HTTP/1.0 200 OK\n"
            response += "Content-Type: text/html\n"
            response +="\n" #
            
            checkinFile = open("checkinData.txt", 'r')
            response += checkinFile.read()
            cs.send(response.encode("ascii"))
            checkinFile.close()

        else:
            response = "HTTP/1.1 501 Not Implemented \n"
            response += "Content-Type: text/html\n"
            response += "\r\n"
            response += "Request not supported"
            cs.send(response.encode('ascii'))
            
    except FileNotFoundError:
        response = "404 Page not found"
        cs.send(response.encode('ascii'))

    cs.close()
    



def HTTPServer():

    port = 2080
    
    serversocket = socket(AF_INET, SOCK_STREAM)
    serversocket.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)

    host = getIPAddress()
    print("Listening on ", host)
    
    serversocket.bind((host, port))
    serversocket.listen(5)
    lock = Lock()
    
    while True:
        print("Waiting")
        cs,addr = serversocket.accept()
        Thread(target=processRequest, args=(cs, addr, lock)).start()

def addPet(newPet):
    file = open("pollresults.txt","a")
    file.write(newPet+"\n")
    file.close()

def getTotals():
    stats = ""
    file = open("pollresults.txt","r")
    pets = {}
    for line in file:
        pet = line.strip()
        if pet not in pets:
            pets[pet] = 1
        else:
            pets[pet] += 1
    file.close()
    for i in pets:
        stats += "\n"
        stats += i+": "+str(pets[i])
    return stats
            
          
HTTPServer()
