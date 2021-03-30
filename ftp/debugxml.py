import os, shutil, time, datetime
try:
 import xml.etree.cElementTree as ET
except ImportError:
 import xml.etree.ElementTree as ET


# pyinstaller --onefile --icon=icon.ico debugxml.py

testXML = '/var/www/web-26.ml/ftp/cur_playing.xml'
filesXML = 'C:\Program Files (x86)\Icecast2 Win32\web\cur_playing.xml'
fileWorck = filesXML


def run():
    global fileWorck
    
    if os.path.exists(filesXML) == False:
        fileWorck = testXML
        # print('dev file', testXML)
    elif os.path.exists(testXML) == False:
        print('not find file')

    dateFile = int(os.path.getmtime(fileWorck))+1
    dateNow = int(datetime.datetime.timestamp(datetime.datetime.now()))
    path = os.getcwd()+'/ErrorXML/'
    time_name = time.strftime("%m-%d %H-%M-%S.xml")
    time_re_file = time.strftime("%Y-%m-%d %H:%M:%S")
    if dateFile >= dateNow:
        try:
            tree = ET.ElementTree(file=fileWorck)
            root = tree.getroot()
            name = root[0][3].text
            artist = root[0][4].text
            parse = time_re_file+' name ' + name +' artist '+ artist
            print(parse)
        except Exception as e:
            if not os.path.isdir(path):
                os.mkdir(path)
            shutil.copy2(fileWorck, os.getcwd()+'/ErrorXML/'+time_name)
            print('Error', time_re_file, e )
    

if __name__ == '__main__':
    while True:
        run()
        time.sleep(1)