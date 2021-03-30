import ftplib, time, datetime, configparser, os, json, shutil
# , xml.etree.ElementTree as ET
try:
 import xml.etree.cElementTree as ET
except ImportError:
 import xml.etree.ElementTree as ET

from bs4 import BeautifulSoup
from urllib.request import urlopen
from lxml2json import convert

# --onefile — сборка в один файл, т.е. файлы .dll не пишутся.
# --windowed — при запуске приложения, будет появляться консоль.
# --noconsole — при запуске приложения, консоль появляться не будет.
# --icon=icon.ico — добавляем иконку в окно.

#pip install

# open cmd command line
# tab next line

# pyinstaller --onefile --icon=icon.ico ftp.py

# pip install pyinstaller
# pip install beautifulsoup4
# pip install lxml2json





config = configparser.ConfigParser()
config.read('settings.ini', encoding='utf-8-sig')
VERSION = '2.1.3'
error = 0
playing = ''





def option():
    global config
    config = configparser.ConfigParser()
    config.read('settings.ini', encoding='utf-8-sig')


def str2bool(v):
    return v.lower() in ('yes', 'true')


def func():
    global playing
    global config
   
    if os.path.exists(config['file']['FILE_DIR']):
        dateFile = int(os.path.getmtime(config['file']['FILE_DIR']))+1
        dateNow = int(datetime.datetime.timestamp(datetime.datetime.now()))
        
        try:# не может найти файл FILE_XML_NAME
            if dateFile > dateNow or os.path.exists(config['file']['FILE_XML_NAME']) == False:
                path = shutil.copy(config['file']['FILE_DIR'], os.path.join(os.getcwd(), config['file']['FILE_XML_NAME']))
            else:
                path = os.path.join(os.getcwd(), config['file']['FILE_XML_NAME'])
        except Exception:
            print('cant find file: '+os.getcwd(), config['file']['FILE_XML_NAME'] )
            return False

        try:
            tree = ET.ElementTree(file=path)
            root = tree.getroot()
        except Exception as e:
            print('file is not xml format: %sn' % e)
            return False

        listner = root.find('LISTNER')
        curentListner = 0

        base = os.path.basename(path)
        filename = os.path.splitext(base)[0]

        name = root[0][3].text
        artist = root[0][4].text
        play = "%s - %s" % (artist, name)

        try:
            html_doc = urlopen(config['option']['URL'])
        except Exception:
            html_doc = None
            print('not started Icecast2')

        if html_doc is not None:
            soup = BeautifulSoup(html_doc, 'html.parser')
            for tag in soup.find_all('td'):
                if (tag.text == 'Current Listeners:'):
                    curentListner += int(tag.parent.find('td', attrs={"class": "streamdata"}).string)

            #if str2bool(config['option']['ONLINE_LISTNER']):
            if listner is None:
                LISTNER = ET.SubElement(root, 'LISTNER')
                LISTNER.text = str(curentListner)
                tree.write(path, xml_declaration=True, encoding="UTF-8")
            elif int(listner.text) != curentListner:
                listner.text = str(curentListner)
                tree.write(path, xml_declaration=True, encoding="UTF-8")

        if (playing != play):
            if not config['option']['ONLINE_LISTNER']:
                playing = play
            if (str2bool(config['option']['TITLE_TXT'])):
                if not config['file']['FILE_TXT_NAME']:
                    txt = open('%s.txt' % filename, 'w')
                else:
                    txt = open('%s' % config['file']['FILE_TXT_NAME'], 'w')
                txt.write(play)
                txt.close()

            if (str2bool(config['option']['JSON'])):
                xml_str = ET.tostring(root).decode()
                jsonStr = convert(xml_str)
                jsonFile = open('%s.json' % filename, 'wt', encoding='utf-8')
                jsonWriteFile = json.dumps(jsonStr, ensure_ascii=False)
                jsonFile.write(jsonWriteFile)
                jsonFile.close()

        if str2bool(config['option']['FTP']) and (dateFile >= dateNow or str2bool(config['option']['ONLINE_LISTNER'])):
            #print('sand')
            playing = play
            try:
                xmls = open(path, 'rb')
                jsons = open(config['file']['FILE_JSON_NAME'], 'rb')
                ftp = ftplib.FTP(config['server']['URL'], config['server']['USER'], config['server']['PASSWORD'])

                if not config['file']['FILE_XML_NAME']:
                    if (str2bool(config['option']['JSON'])):
                        ftp.storbinary('STOR %s' % base, jsons)
                    if (str2bool(config['option']['XML'])):
                        ftp.storbinary('STOR %s' % base, xmls)
                else:
                    if (str2bool(config['option']['JSON'])):
                        ftp.storbinary('STOR %s' % config['file']['FILE_JSON_NAME'], jsons)
                    if (str2bool(config['option']['XML'])):
                        ftp.storbinary('STOR %s' % config['file']['FILE_XML_NAME'], xmls)

                xmls.close()
                ftp.quit()
                ftp.close()
            except Exception:
                error + 1
                if (error % 3):
                    print('not ftp connect')
        
    else:
        print('not read %s file %s' % (config['file']['FILE_DIR'], os.path.exists(config['file']['FILE_DIR'])))

ss = f"""
{'-' * 40}
        ### "НАСТРОЙКА ПРОГРАММЫ" ### 
VERSION (версия программы): { config['option']['VERSION'] }
TIME (промежуток проверки данных): {config['option']['TIME']} (sec)
FTP (отправка файла через ftp): {config['option']['FTP']}
TITLE_TXT (создание текстового файла): {config['option']['TITLE_TXT']}
LISTNER (дописать в xml файл общее количество слушателей): {config['option']['LISTNER']}
JSON (создавать json файл из xml файла): {config['option']['JSON']}
XML (отправка xml файла): {config['option']['XML']}
ONLINE_LISTNER (ftp отправка изменений слушателей): {config['option']['ONLINE_LISTNER']}
URL (адрес icecast на плейлисты): {config['option']['URL']}
                            created by Freekazoid
                                       https://t.me/Ifreekazoid
{'-' * 40}
# Working messages:
"""
print(ss)


while True:
    vProg = VERSION.split('.')
    vSett = config['option']['VERSION'].split('.')
    time.sleep(int(config['option']['TIME']))

    if vProg[0] == vSett[0] and vProg[1] == vSett[1]:
        option()
        func()
    else:
        option()
        print('file settins.ini is not last version\r\n Please put the corresponding file next to the program ')
