def format(audio):# It works!!!
        c = ['artist', 'title']
        spl_arr = '. , ? ! / : ; - _ = +'.split(' ')
        spl_arr.append(' ')
        for key in c:
                line = audio[key]
                for sign in spl_arr:
                        line = ''.join(line.split(sign))
                audio[key] = line.lower()
