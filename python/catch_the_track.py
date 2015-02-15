#! /usr/bin/env python3
# -*- coding: utf-8 -*- 
import vk
import base64
import requests
import json
import time
import threading
NOW_ID = 14205371
NOW_AUDIO_ID = ''
##########
q = 0
def incq():
	global q
	q += 1
##########
def setInterval(interval, times = -1):
    # This will be the actual decorator,
    # with fixed interval and times parameter
    def outer_wrap(function):
        # This will be the function to be
        # called
        def wrap(*args, **kwargs):
            # This is another function to be executed
            # in a different thread to simulate setInterval
            def inner_wrap():
                i = 0
                while i != times:
                    time.sleep(interval)
                    function(*args, **kwargs)
                    i += 1
            threading.Timer(0, inner_wrap).start()
        return wrap
    return outer_wrap

def format(audio):# It works!!!
	c = ['artist', 'title']
	spl_arr = '. , ? ! / : ; - _ = + ( )'.split(' ')
	spl_arr.append(' ')
	for key in c:
		line = audio[key]
		for sign in spl_arr:
			line = ''.join(line.split(sign))
		audio[key] = line.lower()
	
def check_audios(audio1, audio2): #return 1 if audio1
				  # is similar to audio2
	a = format(audio1)
	b = format(audio2)
	c = ['l', 'a', 't', 'd'] #check_box
	dur_delta = abs(a['duration']-b['duration'])
	if a['lyrics_id'] == b['lyrics_id']:
		return 1
	else: pass
	if (a['artist'], a['title']) == (b['artist'], b['title']) and dur_delta < 6:
		return 1
	else:
		return 0
		
def append_global(what, where): #add new items to arr and 
	flag = 1
	l = len(where[0])
	content = where[1]
	for i in range(l):
		item = where[1][i]
		if check_audios(what, format(item)):
			flag *= 0
			where[0][i] += 1
	if flag == 1:
		content.append(what)
		where[0].append(1)
	else: 
		print "no addings"
		pass
			
def printd(dictionary):
	print json.dumps(dictionary, sort_keys=True, indent=4)
############################################
my_login = b'bWFzZ3VpdDQyQGdtYWlsLmNvbQ=='
my_login = base64.b64decode(my_login)
my_password = b'YXN0cm9sYWJpYXZrNDI='
my_password = base64.b64decode(my_password)
acces_token_all = '7c95a12e4e93c5ab9e5ba263d40689ceb4f50e5f77ec57a3e0d34526f3927d4a9607c0c0c3e76a4d9e33e'
vkapi = vk.API('4649542', my_login, my_password)
vkapi.acces_token = acces_token_all
###########################################
CONST = 50
his_friends = vkapi.friends.get(id=NOW_ID, order='hints', fields='domain')
vkaudio = vkapi.audio
his_audios = vkaudio.get(owner_id=NOW_ID, need_user=1, count=CONST)
#printd(his_audios['items'][0])
a = his_audios['items'][1]
NOW_AUDIO_ID = a['id']
#printd(a)
#format(a)
#printd(a)
#print check_audios(a, a)
all_audios=[[],[]]
append_global(a, all_audios)
print all_audios
print his_friends['count']

@setInterval(1, 10)
def mains():			#go through all friends
	NOW_ID = his_friends['items'][q]['id']
	print NOW_ID
	incq()
	print q
	try:
		count = vkaudio.getCount(owner_id=NOW_ID)
	except Exception:
		return 0
	if count < 50:
		return 0
	try:
		friend_audios = vkaudio.get(owner_id=NOW_ID, need_user=1, count=CONST)
	except Exception:
		return 0
	if friend_audios.has_key('error_code'):
		return 0
	for audio in friend_audios['items'][1::]:
		all_audios[1].append(format(audio))
print '12312313131313123123123'
mains()
print q
print '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
print len(all_audios[1])
#print max(all_audios[0])
