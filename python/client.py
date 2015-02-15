#!/usr/bin/env python3
# -*- coding: utf-8 -*- 
import vk
import base64
import requests
import json
import time
import socket

NOW_ID = 14205371
NOW_AUDIO_ID = ''
def format(audio):# It works!!!
        c = ['artist', 'title']
        spl_arr = '. , ? ! / : ; - _ = + ( )'.split(' ')
        spl_arr.append(' ')
        for key in c:
                line = audio[key]
                for sign in spl_arr:
                        line = ''.join(line.split(sign))
                audio[key] = line.lower()

def check_audios(audio1, audio2): #return 1 if audio1 is similar
        a = format(audio1)
        b = format(audio2)
        c = ['l', 'a', 't', 'd'] #check_box
        dur_delta = abs(a['duration']-b['duration'])
        if a['lyrics_id'] == b['lyrics_id']:
                return 1
        else: pass
        if (a['artist'], a['title']) == (b['artist'], b['title']) and dur_delta < 5:
                return 1
        else:
                return 0

def append_global(what, where): #add new items to arr and 
        flag = 1
        what = format(what)
        l = len(where[0])
        for i in range(l):
                item = where[1][i]
                if check_audios(what, format(item)):
                        flag *= 0
                        where[0][i] += 1
        if flag == 1:
                where[1].append(what)
        else: pass

def printd(dictionary):
        print json.dumps(dictionary, sort_keys=True, indent=4)
############################################
my_login = b'bWFzZ3VpdDQyQGdtYWlsLmNvbQ=='
my_login = base64.b64decode(my_login)
my_password = b'YXN0cm9sYWJpYXZrNDI='
my_password = base64.b64decode(my_password)
acces_token_all = '7c95a12e4e93c5ab9e5ba263d40689ceb4f50e5f77ec57aa3e0d34526f3927d4a9607c0c0c3e76a4d9e33e'
vkapi = vk.API('4649542', my_login, my_password)
vkapi.acces_token = acces_token_all
###########################################
CONST = 50
sock = socket.socket()
sock.connect(('localhost', 9090))
sock.send('hello, world!')
sock.send('thanks42')

data = sock.recv(1024)
sock.close()

print data
